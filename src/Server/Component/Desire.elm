module Server.Component.Desire exposing (Desire, empty, spawn, spec)

import AltMath.Vector2 exposing (Vec2)
import Logic.Component as Component


type alias Desire =
    { move : Vec2
    , look : Vec2
    , shoot : Bool
    }


spawn : Desire
spawn =
    { move = Vec2 0 0
    , look = Vec2 0 0
    , shoot = False
    }


spec : Component.Spec Desire { world | desire : Component.Set Desire }
spec =
    Component.Spec .desire (\comps world -> { world | desire = comps })


empty : Component.Set Desire
empty =
    Component.empty
