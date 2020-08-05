module Common.Component.Velocity exposing (Velocity, decode, empty, encode, spawn, spec)

import Bytes.Decode exposing (Decoder)
import Bytes.Encode exposing (Encoder)
import Common.Bytes.Decode as D
import Common.Bytes.Encode as E
import Logic.Component as Component


type alias Velocity =
    { x : Float
    , y : Float
    }


spec : Component.Spec Velocity { world | v : Component.Set Velocity }
spec =
    Component.Spec .v (\comps world -> { world | v = comps })


empty : Component.Set Velocity
empty =
    Component.empty


spawn : { a | x : Float, y : Float } -> Velocity
spawn { x, y } =
    { x = x, y = y }


encode : Velocity -> Encoder
encode =
    E.xy


decode : Decoder Velocity
decode =
    D.xy
