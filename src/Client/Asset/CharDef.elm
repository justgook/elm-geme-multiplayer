module Client.Asset.CharDef exposing (get)

import Dict exposing (Dict)
import Playground exposing (Shape)
import Playground.Extra exposing (tile)


get : number -> Maybe (Int -> Shape)
get i =
    [ ( 1, base ) ]
        |> Dict.fromList
        |> Dict.get i


base =
    tile 32 32 "/assets/BaseGunA.png"
