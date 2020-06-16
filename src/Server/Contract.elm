module Server.Contract exposing (broadcastToClient, income, outcome)

import Base64
import Bytes.Decode as D
import Bytes.Encode as Bytes
import Common.Contract as Contract exposing (ServerWorld)
import Dict exposing (Dict)
import Logic.Entity exposing (EntityID)
import Server.Port as Port



---- INCOME


income decoder str =
    str
        |> Base64.toBytes
        |> Maybe.andThen (\bytes -> D.decode decoder bytes)
        |> Maybe.withDefault identity



---- OUTCOME


outcome : ServerWorld a -> EntityID -> String
outcome newWorld me =
    Contract.toClient me
        |> Tuple.first
        |> (\fn -> fn newWorld)
        |> Bytes.encode
        |> Base64.fromBytes
        |> Maybe.withDefault ""


broadcastToClient : (b -> String) -> Dict String b -> List (Cmd msg)
broadcastToClient fn users =
    users
        |> Dict.foldl (\k v -> (::) (Port.send ( k, fn v ))) []
