module Rpg.Client.Component.Keyboard exposing (keyboard)

import Game.Client.Component.Action exposing (Action, Button(..))
import Playground exposing (moveX, moveY, red, yellow)
import Playground.Extra as Playground
import Set.Any


keyboard : Action -> Playground.Shape
keyboard stats =
    let
        draw =
            Playground.tile 7 9 "/asset/font/charmap-oldschool_white.png"

        _ =
            Set.Any.member ArrowDown stats
    in
    keys2
        |> List.indexedMap
            (\i row ->
                List.indexedMap
                    (\j btn ->
                        let
                            color =
                                if True then
                                    red

                                else
                                    yellow
                        in
                        [ Playground.square color 30, draw btn ]
                            |> Playground.group
                            |> moveX (toFloat j * 33)
                    )
                    row
                    |> Playground.group
                    |> moveY (toFloat i * -33)
            )
        |> Playground.group
        |> moveX -199


keys2 =
    [ [ 82, 88, 70, 83, 85, 90, 86, 74, 80, 81 ]
    , [ 66, 84, 69, 71, 72, 73, 75, 76, 77, 14 ]
    , [ -1, 91, 89, 68, 87, 67, 79, 78, 12, -1 ]
    , [ -1, -1, -1, -1, 13, 64 ]
    ]
