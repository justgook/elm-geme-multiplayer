module Common.Component.Weapon exposing (Bullet, Weapon, empty, spec)

import AltMath.Vector2 exposing (Vec2)
import Logic.Component as Component


type alias Weapon =
    List
        { interval : Int
        , bullet : Bullet
        }


type alias Bullet =
    { x : Float
    , y : Float
    , r : Float
    , a : Float
    , v : Vec2

    --, shape : Time -> Shape
    }


spec : Component.Spec Weapon { world | weapon : Component.Set Weapon }
spec =
    Component.Spec .weapon (\comps world -> { world | weapon = comps })


empty : Component.Set Weapon
empty =
    Component.empty
