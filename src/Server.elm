module Server exposing (main)

import Common.Protocol.Message exposing (ToClient)
import Common.Protocol.Server
import Common.Protocol.Util
import Json.Decode as D exposing (Value)
import Server.Model as World exposing (Model)
import Server.Port as Port exposing (Input(..))
import Server.System.Data as Data
import Server.System.Tick as Tick
import Server.System.User as User


main : Program Value Model Value
main =
    Platform.worker
        { init = init
        , update = update
        , subscriptions = Port.subscriptions
        }


init : Value -> ( Model, Cmd msg )
init flags =
    ( World.init, Cmd.none )


update : Value -> Model -> ( Model, Cmd Value )
update v model =
    case Port.parse v of
        Ok messages ->
            messages
                |> List.foldl
                    (\msg m ->
                        case msg of
                            Tick time ->
                                Tick.system time m

                            NetworkJoin cnn ->
                                let
                                    _ =
                                        Debug.log "Server::NetworkJoin" cnn
                                in
                                { m | world = User.join cnn m.world }

                            NetworkLeave cnn ->
                                { m | world = User.leave cnn m.world }

                            NetworkData cnn data ->
                                let
                                    _ =
                                        Debug.log "Server.NetworkData" data
                                in
                                fromPacket data
                                    |> List.foldl (\a acc -> { acc | world = Data.system cnn a m.world }) m

                            NetworkError error ->
                                { m | error = error }
                    )
                    model
                |> (\m ->
                        let
                            _ =
                                output
                        in
                        ( m, Cmd.none )
                   )

        Err err ->
            ( { model | error = D.errorToString err }, Cmd.none )


output : List ToClient -> Cmd msg
output a =
    if a == [] then
        Cmd.none

    else
        Common.Protocol.Util.toPacket Common.Protocol.Server.encode a |> Tuple.pair "" |> Port.output


fromPacket : String -> List Common.Protocol.Message.ToServer
fromPacket =
    Common.Protocol.Util.fromPacket Common.Protocol.Server.decode
