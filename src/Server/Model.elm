module Server.Model exposing (Model, World, empty, init)

import Common.Component.Position as Position exposing (Position)
import Common.Protocol.Message exposing (ToClient)
import Logic.Component as Component
import Random exposing (Seed)
import Server.Component.IdSource as IdSource exposing (IdSource)
import Server.Component.User as User exposing (User)


type alias World =
    { seed : Seed
    , id : IdSource
    , user : User
    , p : Component.Set Position
    , out : Component.Set (List ToClient)
    }


empty : World
empty =
    { seed = Random.initialSeed 42
    , id = IdSource.empty 1
    , user = User.empty
    , p = Position.empty
    , out = Component.empty
    }


type alias Model =
    { frame : Int
    , time : Float
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
