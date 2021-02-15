module Durak.Server.World exposing (World, empty)

import Durak.Protocol.Message exposing (ToClient)
import Durak.Server.Component.Flow as Flow exposing (Flow)
import Game.Generic.Component.IdSource as IdSource exposing (IdSource)
import Game.Generic.Component.User as User exposing (User)
import Logic.Component as Component
import Random exposing (Seed)


type alias World =
    { out : Component.Set (List ToClient)
    , user : User
    , id : IdSource

    --
    , flow : Flow
    }


empty : World
empty =
    { out = Component.empty
    , user = User.empty
    , id = IdSource.empty 1

    --
    , flow = Flow.empty (Random.initialSeed 2)
    }
