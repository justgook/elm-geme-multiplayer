module Game.Ui.Stick exposing (stick)

import Playground exposing (circle, fade, rgb)


stick start end =
    Playground.group
        [ circle (rgb 53 53 53) 40
        , circle (rgb 85 85 85) 38
        , circle (rgb 218 218 218) 30
        ]
        |> fade 0.5
