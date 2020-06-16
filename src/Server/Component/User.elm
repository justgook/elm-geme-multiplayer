module Server.Component.User exposing (User, empty, spawn, spec)

import Common.Util as Util
import Dict exposing (Dict)
import Logic.Entity exposing (EntityID)


type alias User =
    Dict String EntityID


spec : Util.Spec User { world | user : User }
spec =
    Util.Spec .user (\comps world -> { world | user = comps })


empty : User
empty =
    Dict.empty


spawn id cnn world =
    { world | user = Dict.insert cnn id world.user }
