module Common.Component.Position exposing (Position, decode, empty, encode, spawn, spec)

import Bytes.Decode exposing (Decoder)
import Bytes.Encode exposing (Encoder)
import Common.Bytes.Decode as D
import Common.Bytes.Encode as E
import Logic.Component as Component


type alias Position =
    { x : Float
    , y : Float
    }


spec : Component.Spec Position { world | p : Component.Set Position }
spec =
    Component.Spec .p (\comps world -> { world | p = comps })


empty : Component.Set Position
empty =
    Component.empty


spawn : { a | x : Float, y : Float } -> Position
spawn { x, y } =
    { x = x, y = y }


encode : Position -> Encoder
encode =
    E.xy


decode : Decoder Position
decode =
    D.xy
