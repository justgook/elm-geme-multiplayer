module Client.Debug exposing (cross)

import Playground exposing (..)


cross : Shape
cross =
    group
        [ rectangle red 2 1000
        , rectangle red 1000 2
        , rectangle red 100 2 |> moveY 100
        , rectangle red 100 2 |> moveY -100
        , rectangle red 2 100 |> moveX 100
        , rectangle red 2 100 |> moveX -100
        ]
