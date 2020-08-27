module Client.System.Render.Cursor exposing (system)

import Animator
import Playground exposing (..)
import Playground.Extra exposing (tile)


pxSnap =
    round >> toFloat


system { cursor, animator } =
    let
        { p, i } =
            cursor

        o =
            (Animator.move animator <|
                \_ ->
                    Animator.wrap 0 1 |> Animator.loop (Animator.seconds 0.8)
            )
                |> round
    in
    tile 32 32 "/assets/cursor.png" (i + o)
        |> move (pxSnap p.x) (pxSnap p.y)
