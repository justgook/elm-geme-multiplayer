module Client.Asset.CharDef exposing (get)

import Dict exposing (Dict)
import Playground exposing (Shape, fade, rgb)
import Playground.Extra2 as Extra


get : number -> Maybe (Int -> Shape)
get i =
    [ ( 1, base ) ]
        |> Dict.fromList
        |> Dict.get i


base =
    Extra.tileWith (Extra.tint (rgb 255 0 255)) 32 32 "/assets/BaseGunA.png"



--        >> fade 0.3
