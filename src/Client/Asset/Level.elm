module Client.Asset.Level exposing (level)

import Playground exposing (fade, group, red)
import Playground.Fullscreen as Fullscreen
import Playground.Tilemap


level_ a b =
    Playground.Tilemap.tilemap 32 32 a b


level =
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
