module Client.Component.UI exposing (PointerFocus(..), UI, empty, spec)

import Animator exposing (Timeline)
import Client.Component.UI.Stick as Stick exposing (Stick)
import Common.Util as Util


type PointerFocus
    = Stick1
    | None


type alias UI =
    { focus : String
    , pointerFocus : PointerFocus
    , animator : Timeline Int
    , hitmap : List String
    , stick1 : Stick {}
    }


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
    }
