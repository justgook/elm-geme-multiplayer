module Rpg.Client.System.Data exposing (keyboard, system)

import Common.Util
import Game.Client.Component.Action as Action exposing (Button)
import Logic.System exposing (System)
import Rpg.Client.World exposing (World)
import Rpg.Protocol.Message exposing (ToClient)


system : ToClient -> System World
system data world =
    --let
    --    _ =
    --        Debug.log "Client::NetworkData" data
    --in
    world


keyboard : Bool -> Button -> World -> World
keyboard down button =
    Common.Util.update Action.spec
        (\comp ->
            if down then
                Action.down button comp

            else
                Action.up button comp
        )
