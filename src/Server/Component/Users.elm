module Server.Component.Users exposing (Users, empty, entityId, remove, spawn, spec)

import Common.Util as Util
import Dict exposing (Dict)
import Logic.Entity exposing (EntityID)
import Server.Port exposing (ConnectionId)


type alias Users =
    Dict ConnectionId EntityID


spec : Util.Spec Users { world | users : Users }
spec =
    Util.Spec .users (\comps world -> { world | users = comps })


empty : Users
empty =
    Dict.empty


spawn id cnn world =
    { world | users = Dict.insert cnn id world.users }


remove : String -> { world | users : Users } -> ( EntityID, { world | users : Users } )
remove cnn world =
    ( entityId cnn world, { world | users = Dict.remove cnn world.users } )


entityId : ConnectionId -> { world | users : Users } -> EntityID
entityId cnn world =
    Dict.get cnn world.users |> Maybe.withDefault 0
