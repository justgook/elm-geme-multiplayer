module Durak.Player.System.Deck exposing (system)

import Durak.Player.Component.Card as Card
import Durak.Player.World exposing (World)
import Game.Client.Model exposing (Model)
import Playground exposing (Shape, blue, move, moveX, red, rotate)


system : Model World -> ( World, Shape )
system { screen, world } =
    (if world.cardsLeft > 52 then
        []

     else if world.cardsLeft < 1 then
        [ Card.suit world.table.trump ]

     else if world.cardsLeft < 4 then
        deck world.cardsLeft world.lastCard world.cardsLeft

     else
        deck world.cardsLeft world.lastCard 4
    )
        |> Playground.group
        |> moveX (screen.left + Card.size.width)
        |> Tuple.pair world


deck cardsLeft lastCard i_ =
    (List.repeat i_ Card.back
        |> List.indexedMap (\i a -> a |> move (toFloat -i * 2) (toFloat i * 2))
        |> (::) (Card.render lastCard |> rotate 90 |> moveX (Card.size.width * 0.5))
    )
        ++ [ Playground.words blue (String.fromInt cardsLeft) |> move -6 Card.size.height ]
