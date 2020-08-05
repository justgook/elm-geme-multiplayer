module Server exposing (main)

import Json.Decode as Json
import Server.Port as Port
import Server.Sync
import Server.System.Tick as Tick
import Server.System.Users as Users
import Server.World as World exposing (Message(..), World)


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
        Tick t ->
            Tick.system t world

        Receive income ->
            Server.Sync.receive income world

        Join cnn ->
            Users.join cnn world

        Leave cnn ->
            Users.leave cnn world

        Error err ->
            ( world, Cmd.none )


subscriptions model =
    Sub.batch
        [ Port.receive Receive
        , Port.join Join
        , Port.leave Leave
        , Port.error Error
        ]
