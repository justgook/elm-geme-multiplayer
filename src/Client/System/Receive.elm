module Client.System.Receive exposing (system)

import Base64
import Bytes.Decode as D
import Client.World exposing (Message, World)
import Common.Contract as Contract


system : String -> World -> World
system package =
    let
        decoder =
            Contract.toClient 0
                |> Tuple.second
    in
    package
        |> Base64.toBytes
        |> Maybe.andThen (\bytes -> D.decode decoder bytes)
        |> Maybe.withDefault identity
