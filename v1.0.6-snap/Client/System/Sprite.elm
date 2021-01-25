module Client.System.Sprite exposing (system)

import Client.Model exposing (Model, World)
import Client.Util as Util
import Playground exposing (Shape, circle, move, red)
import Playground.Extra exposing (tile)


system : Model -> ( World, Shape )
system m =
    let
        move1 =
            --identity
            move -100 200

        --    (Util.snap (sin (m.time * 0.0024) * m.screen.left))
        --    (Util.snap (cos (m.time * 0.003) * m.screen.top * 0.75))
        fps =
            12

        frame =
            -- TODO add easing function / or custom frame rate (frame order)
            floor (m.time * 0.001 * fps) |> remainderBy 7

        character =
            [ tile 64 64 "c2" (26 + frame)
            , tile 64 64 "c1" (26 + frame)
            ]
                |> Playground.group
    in
    ( m.world, Playground.group [ character |> move1 ] )
