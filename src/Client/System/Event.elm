module Client.System.Event exposing (system)

import Client.Sync
import Common.Sync


system model world =
    let
        cmd =
            Client.Sync.pack model.world world
                |> Common.Sync.compose
                |> Client.Sync.send
    in
    ( { model | world = world }, cmd )
