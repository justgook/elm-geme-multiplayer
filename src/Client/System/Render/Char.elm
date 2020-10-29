module Client.System.Render.Char exposing (system)

import Client.Asset.CharDef as CharDef
import Logic.System as System
import Playground exposing (black, circle, fade, group, move, moveY, red, square)


system w =
    System.foldl2
        (\body p acc ->
            CharDef.get body.id
                |> Maybe.map
                    (\fn ->
                        ([ circle black 8 |> fade 0.5
                         , fn 0 |> moveY 16
                         ]
                            |> group
                            |> move (p.x * 16) (p.y * 16)
                        )
                            :: acc
                    )
                |> Maybe.withDefault acc
        )
        w.body
        w.p
        []
