module Common.System.VelocityPosition exposing (system)

import AltMath.Vector2 as Vec2
import Common.Component.Position exposing (Position)
import Common.Component.Velocity exposing (Velocity)
import Logic.Component
import Logic.System exposing (System)


system : Int -> Logic.Component.Spec Velocity world -> Logic.Component.Spec Position world -> System world
system delta =
    Logic.System.step2
        (\( velocity, _ ) ( pos, setPos ) -> setPos (Vec2.add velocity pos))
