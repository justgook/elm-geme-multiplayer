module Durak.Server.Component.Flow exposing
    ( Flow(..)
    , GameData
    , attack
    , clearTable
    , dealAll
    , defence
    , empty
    , isRoundEnd
    , join
    , pass
    , pickup
    , ready
    )

import Durak.Common.Card as Card exposing (Card)
import Durak.Common.Component.Hand as Hand exposing (Hand)
import Durak.Common.Table as Table exposing (Spot, Table)
import Durak.Server.Component.Deck as Deck exposing (Deck)
import Durak.Server.Component.Turn as Turn exposing (Turn)
import Logic.Component as Component
import Logic.Entity exposing (EntityID)
import Logic.System as System exposing (applyIf)
import Random exposing (Seed)
import Set exposing (Set)


type Flow
    = PreGame PreGameData
    | Game GameData


type alias PreGameData =
    { ready : Set EntityID
    , hands : Component.Set Hand
    , turn : Turn
    , seed : Seed
    }


type alias GameData =
    { table : Table
    , deck : Deck
    , hands : Component.Set Hand
    , turn : Turn
    , pass : Set EntityID
    , seed : Seed
    }


autoPass : GameData -> GameData
autoPass gameData =
    let
        defenderId =
            Turn.defence gameData.turn
    in
    { gameData
        | pass =
            System.indexedFoldl
                (\id hand acc ->
                    if Turn.member id gameData.turn && id /= defenderId && not (Table.haveToAdd gameData.table hand) then
                        Set.insert id acc

                    else
                        acc
                )
                gameData.hands
                gameData.pass
    }


attack : EntityID -> Card -> GameData -> Maybe GameData
attack id card gameData =
    let
        table =
            Table.add card gameData.table

        attackId =
            Turn.attack gameData.turn

        firstCard =
            Table.length gameData.table == 0

        defenceId =
            Turn.defence gameData.turn

        defenceCardsCount =
            Component.get defenceId gameData.hands
                |> Maybe.map Hand.length
                |> Maybe.withDefault 0

        valid =
            { firstAttack = not firstCard || attackId == id
            , selfAttack = defenceId /= id
            , canPlace = Table.validateAttack card gameData.table
            , havePlace = table /= gameData.table
            , canHit = Table.cardsToCover gameData.table - 6 + min 6 defenceCardsCount > 0
            }
    in
    if
        valid.firstAttack
            && valid.selfAttack
            && valid.canPlace
            && valid.havePlace
            && valid.canHit
    then
        Just
            { gameData
                | table = table
                , pass = Set.empty
                , hands = Component.update id (Hand.remove card) gameData.hands
            }

    else
        Nothing


defence : EntityID -> Spot -> Card -> GameData -> Maybe GameData
defence id spot card gameData =
    let
        table =
            Table.hit spot card gameData.table

        defenseId =
            Turn.defence gameData.turn
    in
    if defenseId == id && Table.validateDefense spot card gameData.table && table /= gameData.table then
        Just
            { gameData
                | table = table
                , hands = Component.update id (Hand.remove card) gameData.hands
            }

    else
        Nothing


pickup : GameData -> GameData
pickup gameData =
    let
        cards =
            Table.flat gameData.table

        id =
            Turn.defence gameData.turn
    in
    { gameData | hands = Component.update id (Hand.add cards) gameData.hands }


pass : EntityID -> GameData -> GameData
pass id gameData =
    { gameData | pass = Set.insert id gameData.pass }


isRoundEnd : GameData -> Bool
isRoundEnd gameData =
    let
        defenseId =
            Turn.defence gameData.turn

        defenseNoMoreCards =
            Component.get defenseId gameData.hands |> Maybe.map Hand.isEmpty |> Maybe.withDefault False
    in
    Table.allCover gameData.table && (defenseNoMoreCards || (gameData |> autoPass |> .pass) == (Set.fromList gameData.turn |> Set.remove defenseId))


clearTable : GameData -> GameData
clearTable gameData =
    { gameData | table = Table.clean gameData.table }


dealAll : GameData -> GameData
dealAll gameData =
    let
        output =
            gameData.turn
                |> Turn.fold
                    (\id acc ->
                        case Component.get id acc.hands of
                            Just hand ->
                                let
                                    missing =
                                        6 - Hand.length hand

                                    ( cards, newDeck ) =
                                        Deck.dealN missing acc.deck
                                in
                                if missing > 0 then
                                    { acc
                                        | hands = Component.set id (Hand.add cards hand) acc.hands
                                        , turn = applyIf (Hand.isEmpty hand) (Turn.remove id) acc.turn
                                        , deck = newDeck
                                    }

                                else
                                    acc

                            Nothing ->
                                acc
                    )
                    { hands = gameData.hands, deck = gameData.deck, turn = gameData.turn }
    in
    { gameData
        | hands = output.hands
        , deck = output.deck
        , turn = output.turn
    }


empty : Seed -> Flow
empty seed =
    PreGame
        { ready = Set.empty
        , hands = Component.empty
        , seed = seed
        , turn = Turn.empty
        }


join : EntityID -> Flow -> Maybe Flow
join id flow =
    case flow of
        PreGame a ->
            PreGame
                { a
                    | hands = Component.spawn id Hand.empty a.hands
                    , turn = Turn.add id a.turn
                }
                |> Just

        Game _ ->
            Nothing


ready : EntityID -> Flow -> Flow
ready id flow =
    case flow of
        PreGame a ->
            let
                newReady =
                    Set.insert id a.ready
            in
            if newReady /= Set.fromList a.turn then
                PreGame { a | ready = newReady }

            else
                startGame a

        _ ->
            flow


startGame : PreGameData -> Flow
startGame preGameData =
    let
        ( deck, seed ) =
            Deck.init Deck.empty preGameData.seed

        ( hands, newDeck ) =
            System.indexedFoldl
                (\id hand ( hands_, d ) ->
                    let
                        ( cards, d2 ) =
                            Deck.dealN 6 d
                    in
                    ( Component.set id (Hand.add cards hand) hands_, d2 )
                )
                preGameData.hands
                ( preGameData.hands, deck )
    in
    Game
        { table = Table.init (Deck.trump newDeck |> Card.suit)
        , hands = hands
        , deck = newDeck
        , turn = preGameData.turn
        , pass = Set.empty
        , seed = seed
        }
