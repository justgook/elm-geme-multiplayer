module Client.System.Render.Char exposing (system)

import Client.Asset.CharDef as CharDef
import Logic.System as System
import Playground exposing (move)


system w =
    System.foldl2
        (\body p acc ->
            CharDef.get body
                |> Maybe.map (\fn -> (fn 0 |> move p.x p.y) :: acc)
                |> Maybe.withDefault acc
        )
        w.body
        w.p
        []
