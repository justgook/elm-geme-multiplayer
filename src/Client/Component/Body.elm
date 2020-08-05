module Client.Component.Body exposing (Body, decode, empty, spawn, spec, unpack)

import Bytes.Decode as D exposing (Decoder)
import Common.Bytes.Decode as D
import Common.Component.Body as CommonBody
import Logic.Component as Component


type alias Body =
    { id : Int }


spec : Component.Spec Body { world | body : Component.Set Body }
spec =
    Component.Spec .body (\comps world -> { world | body = comps })


empty : Component.Set Body
empty =
    Component.empty


spawn : Int -> Body
spawn id =
    { id = id }


unpack : CommonBody.Body -> Maybe Body -> Body
unpack now was =
    spawn now


decode : Decoder Body
decode =
    D.id |> D.map (\id -> { id = id })
