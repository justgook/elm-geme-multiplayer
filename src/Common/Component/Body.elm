module Common.Component.Body exposing (Body, decode, empty, encode, spawn, spec)

import Bytes.Decode exposing (Decoder)
import Bytes.Encode exposing (Encoder)
import Common.Bytes.Decode as D
import Common.Bytes.Encode as E
import Logic.Component as Component


type alias Body =
    Int


spec : Component.Spec Body { world | body : Component.Set Body }
spec =
    Component.Spec .body (\comps world -> { world | body = comps })


empty : Component.Set Body
empty =
    Component.empty


spawn : Body
spawn =
    0


encode : Body -> Encoder
encode =
    E.id


decode : Decoder Body
decode =
    D.id
