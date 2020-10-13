module Server.System.Tick exposing (system)

import Common.Component.Position as Position
import Common.Component.Velocity as Velocity
import Common.Sync
import Common.System.VelocityPosition as VelocityPosition
import Dict
import Logic.System as System
import Server.Port exposing (ConnectionId)
import Server.Sync
import Server.World as World exposing (Model)
import Time


system : Time.Posix -> Model -> ( Model, Cmd World.Message )
system time model =
    let
        newTime =
            Time.posixToMillis time

        now =
            { model
                | time = newTime
                , frame = model.frame + 1
                , world =
                    model.world
                        |> VelocityPosition.system Velocity.spec Position.spec
            }

        --_ =
        --    Debug.log "vel" now.v
        --|> System.step (\p -> { p | y = p.y + 0.1 }) Position.spec
        toAll : ConnectionId -> Cmd msg
        toAll =
            Server.Sync.pack model.world now.world
                |> Common.Sync.compose
                |> Server.Sync.send
    in
    ( now
      --, [ World.tick model.time newTime ]
    , (World.tick model.time newTime :: Dict.foldl (\k _ -> (::) (toAll k)) [] now.world.users)
        |> Cmd.batch
    )
