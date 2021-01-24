module Client.Component.Ground exposing (Ground, empty, spec)

import Common.Util as Util


type alias Ground =
    {}


spec : Util.Spec Ground { world | ground : Ground }
spec =
    Util.Spec .ground (\comps world -> { world | ground = comps })


empty : Ground
empty =
    {}
