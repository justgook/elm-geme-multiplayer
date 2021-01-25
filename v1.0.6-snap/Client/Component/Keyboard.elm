module Client.Component.Keyboard exposing (decode, keyboard)

import Client.Component.Action exposing (Action, Button(..))
import Json.Decode as D
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


decode : D.Decoder Button
decode =
    D.int
        |> D.andThen
            (\a ->
                case a of
                    0 ->
                        D.succeed ArrowDown

                    1 ->
                        D.succeed ArrowLeft

                    2 ->
                        D.succeed ArrowRight

                    3 ->
                        D.succeed ArrowUp

                    4 ->
                        D.succeed Backslash

                    5 ->
                        D.succeed Backspace

                    6 ->
                        D.succeed BracketLeft

                    7 ->
                        D.succeed BracketRight

                    8 ->
                        D.succeed Comma

                    9 ->
                        D.succeed Digit0

                    10 ->
                        D.succeed Digit1

                    11 ->
                        D.succeed Digit2

                    12 ->
                        D.succeed Digit3

                    13 ->
                        D.succeed Digit4

                    14 ->
                        D.succeed Digit5

                    15 ->
                        D.succeed Digit6

                    16 ->
                        D.succeed Digit7

                    17 ->
                        D.succeed Digit8

                    18 ->
                        D.succeed Digit9

                    19 ->
                        D.succeed Enter

                    20 ->
                        D.succeed Equal

                    21 ->
                        D.succeed IntlBackslash

                    22 ->
                        D.succeed KeyA

                    23 ->
                        D.succeed KeyB

                    24 ->
                        D.succeed KeyC

                    25 ->
                        D.succeed KeyD

                    26 ->
                        D.succeed KeyE

                    27 ->
                        D.succeed KeyF

                    28 ->
                        D.succeed KeyG

                    29 ->
                        D.succeed KeyH

                    30 ->
                        D.succeed KeyI

                    31 ->
                        D.succeed KeyJ

                    32 ->
                        D.succeed KeyK

                    33 ->
                        D.succeed KeyL

                    34 ->
                        D.succeed KeyM

                    35 ->
                        D.succeed KeyN

                    36 ->
                        D.succeed KeyO

                    37 ->
                        D.succeed KeyP

                    38 ->
                        D.succeed KeyQ

                    39 ->
                        D.succeed KeyR

                    40 ->
                        D.succeed KeyS

                    41 ->
                        D.succeed KeyT

                    42 ->
                        D.succeed KeyU

                    43 ->
                        D.succeed KeyV

                    44 ->
                        D.succeed KeyW

                    45 ->
                        D.succeed KeyX

                    46 ->
                        D.succeed KeyY

                    47 ->
                        D.succeed KeyZ

                    48 ->
                        D.succeed Minus

                    49 ->
                        D.succeed Period

                    50 ->
                        D.succeed Quote

                    51 ->
                        D.succeed Semicolon

                    52 ->
                        D.succeed Slash

                    53 ->
                        D.succeed Space

                    54 ->
                        D.succeed Tab

                    _ ->
                        D.fail ""
            )
