module Client.System.Data exposing (keyboard, system)

import Client.Component.Action as Action exposing (Button(..))
import Client.Model exposing (World)
import Common.Protocol.Message exposing (ToClient)
import Common.Util
import Logic.System exposing (System)


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
