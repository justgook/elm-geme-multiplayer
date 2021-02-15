module Durak.Player.Component.Card exposing (back, render, shape, size, suit)

import Durak.Common.Card as Card exposing (Card, Suit)
import Playground exposing (Shape)
import Playground.Extra as Playground


size =
    { width = 32
    , height = 48
    , minHeight = 4
    , minWidth = 7
    }


shape : Int -> Shape
shape =
    Playground.tile size.width size.height "/Durak/asset/cards.png"


render : Card -> Shape
render =
    Card.toInt >> shape


back : Shape
back =
    shape 53


suit : Suit -> Shape
suit ss =
    case ss of
        Card.Clubs ->
            shape 59

        Card.Hearts ->
            shape 60

        Card.Spades ->
            shape 61

        Card.Diamond ->
            shape 62
