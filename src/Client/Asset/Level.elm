module Client.Asset.Level exposing (level)

import Playground exposing (fade, group, move, red)
import Playground.Fullscreen as Fullscreen
import Playground.Tilemap


level_ a b =
    Playground.Tilemap.tilemap 32 32 a b


level_0001 b =
    Playground.Tilemap.tilemap 32 32 "/assets2/LPC/0001.png" b


level =
    ( [ Fullscreen.tile 32 32 "/assets2/LPC/0001.png" 353
      , level_0001 "/data/world-output/maps/level_0000_Sand.png" |> move 0 0
      , level_0001 "/data/world-output/maps/level_0001_Sand.png" |> move 512 0

      --, level_0001 "/data/world-output/maps/level_0002_Sand.png" |> move 1024 0
      --, level_0001 "/data/world-output/maps/level_0003_Sand.png" |> move 1536 0
      , level_0001 "/data/world-output/maps/level_0004_Sand.png" |> move 0 -512
      , level_0001 "/data/world-output/maps/level_0005_Sand.png" |> move 512 -512
      , level_0001 "/data/world-output/maps/level_0006_Sand.png" |> move 1024 -512
      , level_0001 "/data/world-output/maps/level_0007_Sand.png" |> move 1536 -512
      , level_0001 "/data/world-output/maps/level_0008_Sand.png" |> move 0 -1024
      , level_0001 "/data/world-output/maps/level_0009_Sand.png" |> move 512 -1024
      , level_0001 "/data/world-output/maps/level_0010_Sand.png" |> move 1024 -1024
      , level_0001 "/data/world-output/maps/level_0011_Sand.png" |> move 1536 -1024
      , level_0001 "/data/world-output/maps/level_0012_Sand.png" |> move 0 -1536
      , level_0001 "/data/world-output/maps/level_0013_Sand.png" |> move 512 -1536
      , level_0001 "/data/world-output/maps/level_0014_Sand.png" |> move 1024 -1536

      --, level_0001 "/data/world-output/maps/level_0015_Sand.png" |> move 1536 -1536
      ]
        |> group
        |> move (-1536 / 2) (1536 / 2)
    , []
        |> group
    )


level22 =
    ( [ Fullscreen.tile 32 32 "/assets/hyptosis/2.png" 4
      , level_ "/assets/wang/desert.png" "/data/003-1-3.png"

      --, Fullscreen.circle 50 red |> fade 0.3
      ]
        --[ level_ "/assets/hyptosis/1.png" "/data/001-1-0.png"
        --  , level_ "/assets/hyptosis/1.png" "/data/001-1-1.png"
        --  ]
        |> group
    , []
        |> group
      --, [ level_ "/assets/hyptosis/1.png" "/data/003-1-3.png"
      --  ]
      --    |> group
    )
