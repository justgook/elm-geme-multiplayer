module Common.Component.Name exposing (Name, empty, spec)

import Logic.Component as Component


type alias Name =
    String


spec : Component.Spec Name { world | name : Component.Set Name }
spec =
    Component.Spec .name (\comps world -> { world | name = comps })


empty : Component.Set Name
empty =
    Component.empty
