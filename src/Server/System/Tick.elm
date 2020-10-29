module Server.System.Tick exposing (system)

import Common.Component.Position as Position
import Common.Component.Schedule as Schedule
import Common.Component.Velocity as Velocity
import Common.Sync
import Common.System.VelocityPosition as VelocityPosition
import Dict
import Logic.System exposing (applyIf)
import Server.Port exposing (ConnectionId)
import Server.Sync
import Server.World as World exposing (Model)
import Time


system : Time.Posix -> Model -> ( Model, Cmd World.Message )
system time model =
    let
        newTime =
            Time.posixToMillis time

        frame =
            model.frame + 1

        ( cleanSchedule, scheduledWorld ) =
            Schedule.apply (\fn w -> fn w) frame ( model.schedule, model.world )

        delmeLockTime =
            2

        now =
            { model
                | time = newTime
                , schedule =
                    cleanSchedule
                        |> applyIf (not scheduledWorld.delmeLock) (Schedule.add ( frame + delmeLockTime, \w -> { w | delmeLock = False } ))
                , frame = frame
                , world =
                    scheduledWorld
                        |> applyIf (not scheduledWorld.delmeLock)
                            (VelocityPosition.system Velocity.spec Position.spec
                                >> (\w -> { w | delmeLock = True })
                            )
            }

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
