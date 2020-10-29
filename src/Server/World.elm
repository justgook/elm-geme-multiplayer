module Server.World exposing (Message(..), Model, World, empty, init, tick, tickTime)

import Common.Component.Body as Body exposing (Body)
import Common.Component.Chat as Chat exposing (Chat)
import Common.Component.Desire as Desire exposing (Desire)
import Common.Component.Name as Name exposing (Name)
import Common.Component.Position as Position exposing (Position)
import Common.Component.Schedule as Schedule exposing (Schedule)
import Common.Component.Velocity as Velocity exposing (Velocity)
import Common.Component.Weapon as Weapon exposing (Weapon)
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


type alias Model =
    { world : World
    , schedule : Schedule (World -> World)
    , frame : Int
    , time : Int
    , error : String
    }


init : Model
init =
    { world = empty
    , schedule = Schedule.empty
    , frame = 0
    , time = 0
    , error = ""
    }


type Message
    = Tick Posix
    | Receive ( String, String )
    | Join String
    | Leave String
    | Error String


type alias World =
    { seed : Seed
    , id : IdSource
    , users : Users
    , chat : Chat

    --    , connections: Dict Int String
    , p : Component.Set Position
    , v : Component.Set Velocity
    , name : Component.Set Name
    , body : Component.Set Body
    , weapon : Component.Set Weapon
    , desire : Component.Set Desire

    ----
    , delmeLock : Bool
    }


empty : World
empty =
    { seed = Random.initialSeed 42
    , id = IdSource.empty 1
    , users = Users.empty
    , chat = Chat.empty

    ---
    , p = Position.empty
    , v = Velocity.empty
    , name = Name.empty
    , body = Body.empty
    , weapon = Weapon.empty
    , desire = Desire.empty

    ----
    , delmeLock = False
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
