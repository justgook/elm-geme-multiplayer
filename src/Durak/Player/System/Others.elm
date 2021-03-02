module Durak.Player.System.Others exposing (system)

import Durak.Common.Role as Role exposing (Role)
import Durak.Player.Component.Card as Card
import Durak.Player.World exposing (World)
import Game.Client.Model exposing (Model)
import Logic.System exposing (applyIf)
import Playground exposing (Shape, blue, group, move, moveY, red)


system : Model World -> ( World, Shape )
system { screen, world } =
    let
        others =
            world.others

        count =
            List.length others
                |> toFloat

        cardXOffset =
            toFloat >> (+) 0.5 >> (*) (screen.width / max count 1) >> (+) screen.left
    in
    others
        |> List.indexedMap
            (\i ( role, cards ) ->
                let
                    cardsWillDraw =
                        min 3 cards
                in
                Card.back
                    |> List.repeat cardsWillDraw
                    |> List.indexedMap (\ii -> move (Card.size.minWidth * toFloat ii - 0.5 * Card.size.minWidth * toFloat (cardsWillDraw - 1)) 0)
                    |> (::) (roleShape role |> moveY -Card.size.height)
                    |> cardCount cards
                    |> group
                    |> move (cardXOffset i) (screen.top - 40)
            )
        |> group
        |> Tuple.pair world


cardCount cards =
    if cards > 3 then
        [ Playground.circle Playground.white 12
        , Playground.words Playground.black (String.fromInt cards)
        ]
            |> Playground.group
            |> move (-Card.size.width * 0.5) (-Card.size.height * 0.5)
            |> Playground.moveZ 1
            |> (::)

    else
        identity


roleShape : Role -> Shape
roleShape role =
    case role of
        Role.Attack ->
            Playground.words red "Attack"

        Role.Defense ->
            Playground.words Playground.brown "Defense"

        Role.Support ->
            Playground.words blue "Support"

        Role.Win ->
            Playground.group []

        Role.Lose ->
            Playground.group []
