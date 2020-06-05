module Server exposing (main)

import Json.Decode as Json
import Server.Port as Port
import Server.System.Join as Joint
import Server.World as World exposing (Message(..), World)
import Time


main : Program Json.Value World Message
main =
    Platform.worker
        { init = init
        , update = update
        , subscriptions = subscriptions
        }


init : Json.Value -> ( World, Cmd Message )
init flags =
    ( World.empty, World.tick 0 30 )


update : Message -> World -> ( World, Cmd Message )
update msg world =
    case msg of
        Tick posix ->
            let
                now =
                    Time.posixToMillis posix
            in
            ( { world
                | time = now
                , frame = world.frame + 1
              }
            , World.tick world.time now
            )

        Receive ( cnn, income ) ->
            ( world, Cmd.none )

        Join cnn ->
            Joint.system cnn world

        Leave cnn ->
            ( world, Cmd.none )

        Error err ->
            ( world, Cmd.none )


subscriptions model =
    Sub.batch
        [ Port.receive Receive
        , Port.join Join
        , Port.leave Leave
        , Port.error Error
        ]
