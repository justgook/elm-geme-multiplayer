module Client.Component.UI.Stick exposing (Stick, dir8, empty)

import Animator exposing (Timeline)
import Common.Direction exposing (Direction(..))


empty : Stick {}
empty =
    { active = Animator.init False
    , center = { x = 0, y = 0 }
    , cursor = { x = 0, y = 0 }
    , dir = Neither
    }


dir8 center cursor =
    { x = dir_ 5 center.x cursor.x
    , y = dir_ 5 center.y cursor.y
    }


type alias XY =
    { x : Float, y : Float }


type alias Stick a =
    { a
        | active : Timeline Bool
        , center : XY
        , cursor : XY
        , dir : Direction
    }


dir_ dead a b =
    let
        current =
            a - b
    in
    if current * current < dead * dead then
        0

    else
        clamp -40 40 current / -40
