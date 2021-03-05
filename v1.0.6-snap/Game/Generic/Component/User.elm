module Game.Generic.Component.User exposing (User, connectionId, connectionIds, empty, entityId, entityIds, foldl, length, remove, spawn, spec)

import Common.Util as Util
import Dict exposing (Dict)
import Game.Server.Port exposing (ConnectionId)
import Logic.Entity exposing (EntityID)


type alias User =
    { cnn2id : Dict ConnectionId EntityID
    , id2cnn : Dict EntityID ConnectionId
    }


length : User -> Int
length { cnn2id } =
    cnn2id |> Dict.size


connectionIds : User -> List ConnectionId
connectionIds u =
    Dict.keys u.cnn2id


foldl : (EntityID -> ConnectionId -> acc -> acc) -> acc -> User -> acc
foldl func acc u =
    Dict.foldl func acc u.id2cnn


entityIds : User -> List EntityID
entityIds u =
    Dict.keys u.id2cnn


spec : Util.Spec User { world | user : User }
spec =
    Util.Spec .user (\comps world -> { world | user = comps })


empty : User
empty =
    { cnn2id = Dict.empty
    , id2cnn = Dict.empty
    }


spawn : EntityID -> ConnectionId -> { world | user : User } -> { world | user : User }
spawn id cnn ({ user } as world) =
    { world
        | user =
            { user
                | cnn2id = Dict.insert cnn id user.cnn2id
                , id2cnn = Dict.insert id cnn user.id2cnn
            }
    }


remove : ConnectionId -> { world | user : User } -> ( EntityID, { world | user : User } )
remove cnn ({ user } as world) =
    ( entityId cnn world
    , { world
        | user =
            { user
                | cnn2id = Dict.remove cnn user.cnn2id
                , id2cnn = Dict.remove (entityId cnn world) user.id2cnn
            }
      }
    )


entityId : ConnectionId -> { world | user : User } -> EntityID
entityId cnn world =
    Dict.get cnn world.user.cnn2id |> Maybe.withDefault 0


connectionId : EntityID -> { world | user : User } -> ConnectionId
connectionId id world =
    Dict.get id world.user.id2cnn |> Maybe.withDefault ""
