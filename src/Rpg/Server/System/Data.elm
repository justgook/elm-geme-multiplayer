module Rpg.Server.System.Data exposing (system)

import Game.Generic.Component.User as User
import Game.Server.Port as Port
import Logic.System exposing (System)
import Rpg.Protocol.Message exposing (ToClient(..), ToServer(..))
import Rpg.Server.World exposing (World)


system : Port.ConnectionId -> ToServer -> System World
system cnn msg world =
    case msg of
        MovementRequest direction byte uint ->
            world

        LoginRequest loginRequestData ->
            world
