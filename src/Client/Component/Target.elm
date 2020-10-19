module Client.Component.Target exposing (Target, empty, spec, view)

import AltMath.Vector2 exposing (Vec2)
import Animator exposing (Timeline)
import Client.Util as Util
import Common.Util as CommonUtil
import Playground exposing (..)
import Playground.Extra exposing (tile)


type alias Target =
    { p : Vec2
    , i : Int
    , anim : Timeline Int
    }


spec : CommonUtil.Spec Target { world | target : Target }
spec =
    CommonUtil.Spec .target (\comps world -> { world | target = comps })


empty : Target
empty =
    { p = Vec2 0 0
    , i = 0
    , anim = Animator.init 0
    }


view : Target -> Shape
view { p, i, anim } =
    let
        o =
            (Animator.move anim <|
                \_ ->
                    Animator.wrap 0 1 |> Animator.loop (Animator.seconds 0.8)
            )
                |> round
    in
    tile 32 32 "/assets/cursor.png" (i + o)
        |> move (Util.snap p.x) (Util.snap p.y)
