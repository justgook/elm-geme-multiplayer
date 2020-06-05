module Client.World.Intro exposing (World, empty, system)

import Animator
import Time exposing (Posix)


type alias World =
    Animator.Timeline Int


empty : World
empty =
    Animator.init 0
        |> Animator.queue
            [ Animator.event (Animator.seconds 0.5) 1
            , Animator.wait (Animator.seconds 1)
            , Animator.event (Animator.seconds 1.5) 2
            ]


system : Posix -> World -> World
system newTime model =
    Animator.updateTimeline newTime model
