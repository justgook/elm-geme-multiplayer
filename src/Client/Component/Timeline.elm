module Client.Component.Timeline exposing (Timeline, empty, spec)

import Animator
import Logic.Component as Component


type alias Timeline =
    Animator.Timeline Int


spec : Component.Spec Timeline { world | timeline : Component.Set Timeline }
spec =
    Component.Spec .timeline (\comps world -> { world | timeline = comps })


empty : Component.Set Timeline
empty =
    Component.empty
