module Common.Component.Name exposing (Name, decode, empty, encode, spec)

import Bytes.Decode exposing (Decoder)
import Bytes.Encode exposing (Encoder)
import Common.Bytes.Decode as D
import Common.Bytes.Encode as E
import Logic.Component as Component


type alias Name =
    String


spec : Component.Spec Name { world | name : Component.Set Name }
spec =
    Component.Spec .name (\comps world -> { world | name = comps })


empty : Component.Set Name
empty =
    Component.empty


encode : Name -> Encoder
encode =
    E.sizedString


decode : Decoder Name
decode =
    D.sizedString
