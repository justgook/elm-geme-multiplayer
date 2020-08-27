module Client.Component.UI exposing (PointerFocus(..), UI, empty, spec)

import AltMath.Vector2 exposing (Vec2)
import Animator exposing (Timeline)
import Client.Component.UI.Stick as Stick exposing (Stick)
import Common.Util as Util


type PointerFocus
    = Stick1
    | Stick2
    | None


type alias UI =
    { focus : String
    , pointerFocus : PointerFocus
    , animator : Timeline Int
    , hitmap : List String
    , stick1 : Stick {}
    , stick2 : Stick {}
    , cursor : { p : Vec2, i : Int }
    }


specStick1 : Util.Spec (Stick {}) UI
specStick1 =
    Util.Spec .stick1 (\comps world -> { world | stick1 = comps })


specStick2 : Util.Spec (Stick {}) UI
specStick2 =
    Util.Spec .stick2 (\comps world -> { world | stick2 = comps })


spec : Util.Spec UI { world | ui : UI }
spec =
    Util.Spec .ui (\comps world -> { world | ui = comps })


empty : UI
empty =
    { focus = ""
    , pointerFocus = None
    , animator = Animator.init 0
    , hitmap = []
    , stick1 = Stick.empty
    , stick2 = Stick.empty
    , cursor = { p = Vec2 0 0, i = 0 }
    }
