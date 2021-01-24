module Server.Component.User exposing (User, empty, entityId, remove, spawn, spec)

import Common.Port exposing (ConnectionId)
import Common.Util as Util
import Dict exposing (Dict)
import Logic.Entity exposing (EntityID)


type alias User =
    Dict ConnectionId EntityID


spec : Util.Spec User { world | user : User }
spec =
    Util.Spec .user (\comps world -> { world | user = comps })


empty : User
empty =
    Dict.empty


spawn id cnn world =
    { world | user = Dict.insert cnn id world.user }


remove : String -> { world | user : User } -> ( EntityID, { world | user : User } )
remove cnn world =
    ( entityId cnn world, { world | user = Dict.remove cnn world.user } )


entityId : ConnectionId -> { world | user : User } -> EntityID
entityId cnn world =
    Dict.get cnn world.user |> Maybe.withDefault 0
