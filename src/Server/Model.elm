module Server.Model exposing (Message(..), Model, World, empty, init, tick, tickTime)

import Process
import Task
import Time exposing (Posix)


type alias World =
    {}


empty : World
empty =
    {}


tickTime : Float
tickTime =
    1000 / 30


type Message
    = Tick Posix
    | Receive ( String, String )
    | Join String
    | Leave String
    | Error String


type alias Model =
    { frame : Int
    , time : Int
    , error : String
    , world : World

    -- , schedule : Schedule (World -> World)
    }


init : Model
init =
    { frame = 0
    , time = 0
    , error = ""
    , world = empty

    -- , schedule = Schedule.empty
    }


tick : Int -> Int -> Cmd Message
tick was now =
    now
        |> (-) was
        |> max -50
        |> toFloat
        |> (+) tickTime
        |> (+) tickTime
        |> Process.sleep
        |> Task.andThen (\_ -> Time.now)
        |> Task.perform Tick
