module Server exposing (main)

import Json.Decode exposing (Value)
import Server.Port as Port
import Server.System.Packet as Packet
import Server.System.Tick as Tick
import Server.System.Users as Users
import Server.World as World exposing (Message(..), Model)
import Time exposing (Posix)


main : Program Value Model Message
main =
    Platform.worker
        { init = init
        , update = update
        , subscriptions = subscriptions
        }


init : Value -> ( Model, Cmd msg )
init flags =
    ( World.init, Cmd.none )


update : Message -> Model -> ( Model, Cmd Message )
update msg ({ world } as model) =
    case msg of
        Tick t ->
            Tick.system t model

        Receive income ->
            Packet.receive income world
                |> Tuple.mapFirst (\w -> { model | world = w })

        Join cnn ->
            Users.join cnn world
                |> Tuple.mapFirst (\w -> { model | world = w })

        Leave cnn ->
            Users.leave cnn world
                |> Tuple.mapFirst (\w -> { model | world = w })

        Error err ->
            ( { model | error = err }, Cmd.none )


subscriptions model =
    Sub.batch
        [ Port.receive Receive
        , Port.join Join
        , Port.leave Leave
        , Port.error Error
        ]
