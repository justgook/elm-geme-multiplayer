module Rpg.Server.World exposing (World, empty)

import Game.Generic.Component.IdSource as IdSource exposing (IdSource)
import Game.Generic.Component.User as User exposing (User)
import Logic.Component as Component
import Random exposing (Seed)
import Rpg.Protocol.Message exposing (ToClient)


type alias World =
    { {- , p : Component.Set Position -} out : Component.Set (List ToClient)
    , user : User
    , id : IdSource
    , seed : Seed
    }


empty : World
empty =
    { {- seed = Random.initialSeed 42


         , p = Position.empty
         ,
      -}
      out = Component.empty
    , user = User.empty
    , id = IdSource.empty 1
    , seed = Random.initialSeed 42
    }



--
--type alias Model =
--    { frame : Int
--    , time : Float
--    , error : String
--    , world : World
--
--    -- , schedule : Schedule (World -> World)
--    }
--
--
--init : Model
--init =
--    { frame = 0
--    , time = 0
--    , error = ""
--    , world = empty
--
--    -- , schedule = Schedule.empty
--    }
