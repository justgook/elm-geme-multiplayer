module Server.World exposing (Message(..), World, empty, tick, tickTime)

import Common.Component.Body as Body exposing (Body)
import Common.Component.Chat as Chat exposing (Chat)
import Common.Component.Name as Name exposing (Name)
import Common.Component.Position as Position exposing (Position)
import Common.Component.Velocity as Velocity exposing (Velocity)
import Logic.Component as Component
import Process
import Random exposing (Seed)
import Server.Component.IdSource as IdSource exposing (IdSource)
import Server.Component.Users as Users exposing (Users)
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
    , users : Users
    , chat : Chat

    --    , connections: Dict Int String
    , p : Component.Set Position
    , v : Component.Set Velocity
    , name : Component.Set Name
    , body : Component.Set Body
    }


empty : World
empty =
    { frame = 0
    , time = 0
    , seed = Random.initialSeed 42
    , id = IdSource.empty 1
    , users = Users.empty
    , chat = Chat.empty

    ---
    , p = Position.empty
    , v = Velocity.empty
    , name = Name.empty
    , body = Body.empty
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
