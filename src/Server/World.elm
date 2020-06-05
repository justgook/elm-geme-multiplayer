module Server.World exposing (Message(..), World, empty, tick, tickTime)

import Common.Component.Name as Name exposing (Name)
import Common.Component.Position as Position exposing (Position)
import Logic.Component as Component
import Process
import Random exposing (Seed)
import Server.Component.IdSource as IdSource exposing (IdSource)
import Task
import Time exposing (Posix)


tickTime : Float
tickTime =
    1000 / 30


type Message
    = Tick Posix
    | Receive ( String, String )
    | Join String
    | Leave String
    | Error String


type alias World =
    { frame : Int
    , time : Int
    , seed : Seed
    , id : IdSource

    --    , connections: Dict Int String
    , p : Component.Set Position
    , name : Component.Set Name
    }


empty : World
empty =
    { frame = 0
    , time = 0
    , seed = Random.initialSeed 42
    , id = IdSource.empty 0

    ---
    , p = Position.empty
    , name = Name.empty
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
