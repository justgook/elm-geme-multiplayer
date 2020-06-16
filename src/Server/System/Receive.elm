module Server.System.Receive exposing (system)

import Common.Contract as Contract exposing (ServerWorld, emptyServerWorld)
import Server.Component.User exposing (User)
import Server.Contract


toServerDecoder =
    Contract.toServer |> Tuple.second


system ( cnn, str ) world =
    let
        newWorld =
            Server.Contract.income toServerDecoder str world
    in
    ( newWorld, worldDiff world newWorld )


worldDiff : ServerWorld a -> ServerWorld { b | user : User } -> Cmd msg
worldDiff was now =
    if was.chat /= now.chat then
        Server.Contract.broadcastToClient
            (Server.Contract.outcome
                { emptyServerWorld | chat = now.chat }
            )
            now.user
            |> Cmd.batch

    else
        Cmd.none
