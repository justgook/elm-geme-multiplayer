module Client.System.Render.Char exposing (system)

import Client.Asset.CharDef as CharDef
import Logic.System as System
import Playground exposing (fade, move, red)
import Playground.Extra2 exposing (circleInvert)


system w =
    System.foldl2
        (\body p acc ->
            CharDef.get body.id
                |> Maybe.map (\fn -> (fn 0 |> move (p.x * 16) (p.y * 16)) :: acc)
                |> Maybe.withDefault acc
        )
        w.body
        w.p
        [ circleInvert 120 red
            |> move 100 10
            |> fade 0.3
        ]
