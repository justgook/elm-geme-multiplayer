module Client.Component.Pointer exposing (Pointer, empty, spec)

import AltMath.Vector2 exposing (Vec2)
import Common.Util as Util
import Logic.Component as Component


type alias Pointer =
    { down : Bool, p : Vec2 }


empty : Pointer
empty =
    { down = False, p = { x = 0, y = 0 } }


spec : Util.Spec Pointer { world | pointer : Pointer }
spec =
    Util.Spec .pointer (\comps world -> { world | pointer = comps })
