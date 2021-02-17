module Durak.Server.System.Data exposing (system)

import Durak.Common.Component.Hand as Hand exposing (Hand)
import Durak.Common.Role as Role
import Durak.Common.Table as Table exposing (Spot(..))
import Durak.Protocol.Message exposing (ToClient(..), ToServer(..))
import Durak.Server.Component.Deck as Deck
import Durak.Server.Component.Flow as Flow exposing (Flow(..), GameData)
import Durak.Server.Component.Turn as Turn
import Durak.Server.World exposing (World)
import Game.Generic.Component.User as User
import Game.Server.Port exposing (ConnectionId)
import Logic.Component as Component
import Logic.Entity exposing (EntityID)
import Logic.System as System exposing (applyIf, applyMaybe)
import Set.Any


system : ConnectionId -> ToServer -> World -> World
system cnn msg world =
    let
        senderId =
            User.entityId cnn world
    in
    case msg of
        Attack card ->
            case world.flow of
                Game gameData_ ->
                    case Flow.attack senderId card gameData_ of
                        Just gameData ->
                            { world | flow = Game gameData }
                                |> send cnn [ ConfirmCard card ]
                                |> applyMaybe (Table.spot gameData.table) (\a -> broadcast [ TableSpot a card ])

                        Nothing ->
                            world |> send cnn [ RejectCard card ]

                PreGame _ ->
                    world

        Defence spot card ->
            case world.flow of
                Game gameData_ ->
                    case Flow.defence senderId spot card gameData_ of
                        Just gameData ->
                            { world | flow = Game gameData }
                                |> send cnn [ ConfirmCard card ]
                                |> broadcast [ TableSpot spot card ]
                                |> resolve False world

                        Nothing ->
                            world |> send cnn [ RejectCard card ]

                PreGame _ ->
                    world

        Pickup ->
            case world.flow of
                Game gameData_ ->
                    if senderId == Turn.defence gameData_.turn && not (Table.allCover gameData_.table) then
                        world |> resolve True world

                    else
                        world

                PreGame _ ->
                    world

        Pass ->
            case world.flow of
                Game gameData_ ->
                    resolve False world { world | flow = Game (Flow.pass senderId gameData_) }

                PreGame _ ->
                    world

        Join ->
            let
                id =
                    User.entityId cnn world
            in
            (case world.flow of
                PreGame gameData ->
                    { world
                        | flow =
                            PreGame
                                { gameData
                                    | hands = Component.spawn id Hand.empty gameData.hands
                                    , turn = Turn.add id gameData.turn
                                }
                    }
                        |> send cnn [ JoinSuccess ]

                Game gameData ->
                    case ( Component.get id gameData.hands, getRole id gameData ) of
                        ( Just hand, Just role ) ->
                            world
                                |> send cnn
                                    (Table.toList gameData.table
                                        |> List.concatMap
                                            (\a ->
                                                case a.cover of
                                                    Just cover ->
                                                        [ TableSpot a.spot a.current, TableSpot a.spot cover ]

                                                    Nothing ->
                                                        [ TableSpot a.spot a.current ]
                                            )
                                        |> List.reverse
                                    )
                                |> send cnn [ Trump (Deck.trump gameData.deck) ]
                                |> send cnn [ CardsLeft (Deck.length gameData.deck) ]
                                |> send cnn (Set.Any.foldl (TakeCard >> (::)) [] hand)
                                |> send cnn [ TableReset role ]

                        _ ->
                            world |> send cnn [ NoMoreSeats ]
            )
                |> (\w -> broadcast [ OnlineCount (User.length w.user) ] w)

        Watch ->
            world

        Ready ->
            let
                flow =
                    Flow.ready senderId world.flow
            in
            case flow of
                Game { hands, deck, turn } ->
                    { world | flow = flow }
                        |> broadcast [ Trump (Deck.trump deck) ]
                        |> broadcast [ CardsLeft (Deck.length deck) ]
                        |> broadcastCards world
                        |> broadcastTableReset

                _ ->
                    { world | flow = flow }


resolve : Bool -> World -> World -> World
resolve pickup was now =
    case now.flow of
        Game gameData ->
            if Flow.isRoundEnd gameData || pickup then
                let
                    newGameData =
                        gameData
                            |> applyIf pickup Flow.pickup
                            |> Flow.clearTable
                            |> Flow.dealAll
                            |> (\a ->
                                    if Turn.length a.turn < 3 then
                                        if pickup then
                                            a

                                        else
                                            { a | turn = Turn.next a.turn }

                                    else if pickup then
                                        { a | turn = a.turn |> Turn.next |> Turn.next }

                                    else
                                        { a | turn = Turn.next a.turn }
                               )

                    --|> (\a -> { a | turn = a.turn |> Turn.next })
                in
                { now | flow = Game newGameData }
                    |> broadcast [ CardsLeft (Deck.length newGameData.deck) ]
                    |> broadcastCards was
                    |> broadcastTableReset

            else
                now

        PreGame _ ->
            now


broadcastCards : World -> World -> World
broadcastCards was now =
    case ( was.flow, now.flow ) of
        ( wasFlow, Game gameDataNow ) ->
            let
                gameDataWasHands =
                    case wasFlow of
                        PreGame preGameData ->
                            preGameData.hands

                        Game gameData ->
                            gameData.hands
            in
            { now
                | out =
                    System.indexedFoldl2
                        (\entityId compWas compNow ->
                            Set.Any.diff compNow compWas
                                |> Set.Any.foldl (TakeCard >> (::)) []
                                |> updateOrSpawn entityId
                        )
                        gameDataWasHands
                        gameDataNow.hands
                        now.out
            }

        _ ->
            now


broadcastTableReset : World -> World
broadcastTableReset now =
    case now.flow of
        Game gameDataNow ->
            let
                attackerId =
                    Turn.attack gameDataNow.turn

                defenderId =
                    Turn.defence gameDataNow.turn
            in
            { now
                | out =
                    System.indexedFoldl
                        (\entityId handComp ->
                            findRole attackerId defenderId handComp entityId
                                |> TableReset
                                |> List.singleton
                                |> updateOrSpawn entityId
                        )
                        gameDataNow.hands
                        now.out
            }

        _ ->
            now


getRole : EntityID -> Flow.GameData -> Maybe Role.Role
getRole entityId gameDataNow =
    let
        attackerId =
            Turn.attack gameDataNow.turn

        defenderId =
            Turn.defence gameDataNow.turn

        maybeHand =
            Component.get entityId gameDataNow.hands
    in
    maybeHand
        |> Maybe.map (\handComp -> findRole attackerId defenderId handComp entityId)


findRole : EntityID -> EntityID -> Hand -> EntityID -> Role.Role
findRole attackerId defenderId handComp entityId =
    if attackerId == defenderId && entityId == defenderId then
        Role.Lose

    else if entityId == attackerId then
        Role.Attack

    else if entityId == defenderId then
        Role.Defence

    else if Hand.length handComp > 0 then
        Role.Support

    else
        Role.Win


broadcast : List ToClient -> World -> World
broadcast msg world =
    User.connectionIds world.user
        |> List.foldl (\a acc -> send a msg acc) world


send cnn msg world =
    case msg of
        _ :: _ ->
            let
                playerId =
                    User.entityId cnn world
            in
            { world | out = updateOrSpawn playerId msg world.out }

        _ ->
            world


updateOrSpawn : EntityID -> appendable -> Component.Set appendable -> Component.Set appendable
updateOrSpawn id msg comps =
    case Component.get id comps of
        Just ll ->
            Component.set id (ll ++ msg) comps

        Nothing ->
            Component.spawn id msg comps
