module Server.System.Data exposing (system)

import Common.Port as Port
import Common.Protocol.Message exposing (ToServer)
import Logic.System exposing (System)
import Server.Component.User as User
import Server.Model exposing (World)


system : Port.ConnectionId -> ToServer -> System World
system cnn data world =
    let
        user =
            User.entityId cnn world

        --
        --_ =
        --    Debug.log "ToServer::system" ( user, data )
    in
    world
