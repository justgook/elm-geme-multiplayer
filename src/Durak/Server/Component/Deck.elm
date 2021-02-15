module Durak.Server.Component.Deck exposing (Deck, deal, dealN, empty, init, length, trump)

import Durak.Common.Card as Card exposing (Card(..))
import Random exposing (Generator)
import Random.List
import Set.Any


type alias Deck =
    { trump : Card
    , cards : List Card
    , left : Int
    }


empty : Deck
empty =
    { trump = ClubsAce
    , cards = []
    , left = 0
    }


length : Deck -> Int
length =
    .left


shuffle : Generator (List Card)
shuffle =
    Card.smallDeck
        |> Set.Any.toList
        |> Random.List.shuffle



--Random.constant
--    [ ClubsAce
--    , Clubs7
--    , Diamond7
--
--    --, Spades7
--    --, Hearts7
--    , Hearts8
--    , Spades8
--    , Diamond8
--    , Clubs8
--    , Clubs6
--    , Diamond6
--
--    --, Hearts6
--    --, Spades6
--    --, Clubs9
--    --, Diamond9
--    --, Hearts9
--    --, Spades9
--    --, Spades10
--    --, Hearts10
--    --, Clubs10
--    --, Diamond10
--    --, ClubsJack
--    --, ClubsQueen
--    --, ClubsKing
--    --, HeartsAce
--    --, HeartsJack
--    --, HeartsQueen
--    --, HeartsKing
--    --, SpadesAce
--    --, SpadesJack
--    --, SpadesQueen
--    --, SpadesKing
--    --, DiamondAce
--    --, DiamondJack
--    --, DiamondQueen
--    --, DiamondKing
--]


trump : Deck -> Card
trump =
    .trump


deal : Deck -> ( Maybe Card, Deck )
deal deck =
    case deck.cards of
        card :: rest ->
            ( Just card
            , { deck
                | cards = rest
                , left = deck.left - 1
              }
            )

        [] ->
            ( Nothing, deck )


dealN : Int -> Deck -> ( List Card, Deck )
dealN =
    dealN_ []


dealN_ : List Card -> Int -> Deck -> ( List Card, Deck )
dealN_ cards dealLeft deck =
    if dealLeft > 0 then
        case deal deck of
            ( Just card, newDeck ) ->
                dealN_ (card :: cards) (dealLeft - 1) newDeck

            ( Nothing, _ ) ->
                ( cards, deck )

    else
        ( cards, deck )


init : Deck -> Random.Seed -> ( Deck, Random.Seed )
init deck_ seed_ =
    let
        ( cardsList, seed ) =
            Random.step shuffle seed_
    in
    case cardsList of
        trump_ :: rest ->
            ( { trump = trump_
              , cards = rest ++ [ trump_ ]
              , left = List.length cardsList
              }
            , seed
            )

        _ ->
            ( deck_, seed_ )
