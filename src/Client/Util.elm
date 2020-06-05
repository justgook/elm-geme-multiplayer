module Client.Util exposing (toScreen)

import Playground exposing (Screen)


toScreen : Float -> Float -> Screen
toScreen width height =
    { width = width
    , height = height
    , top = height * 0.5
    , left = -width * 0.5
    , right = width * 0.5
    , bottom = -height * 0.5
    }
