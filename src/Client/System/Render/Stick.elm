module Client.System.Render.Stick exposing (system)

import Animator
import Client.Component.UI as UI
import Playground exposing (..)


left =
    rgb 200 200 255


outside =
    40


inside =
    20


system stick =
    let
        o =
            Animator.move stick.active <|
                \state ->
                    if state then
                        Animator.once Animator.quickly (Animator.interpolate identity)

                    else
                        Animator.once Animator.quickly (Animator.interpolate (\v -> 1 - v))
    in
    [ circle left outside
        |> move stick.center.x stick.center.y
        |> fade 0.75
    , circle red inside
        |> move stick.cursor.x stick.cursor.y
    ]
        |> group
        |> fade o
