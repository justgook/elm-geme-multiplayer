module Game.Client.Util exposing (eventToWorld, snap, toScreen)

import Playground exposing (Screen)
import Set


snap : Float -> Float
snap =
    round >> toFloat


eventToWorld : Float -> Float -> Float -> Float -> { x : Float, y : Float }
eventToWorld x_ y_ w h =
    let
        x =
            -w * 0.5 + x_

        y =
            h * 0.5 - y_
    in
    { x = x, y = y }


toScreen : Float -> Float -> Screen
toScreen width height =
    { width = width
    , height = height
    , top = height * 0.5
    , left = -width * 0.5
    , right = width * 0.5
    , bottom = -height * 0.5
    }
