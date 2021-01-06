port module Client.Port exposing (Input(..), output, parse, subscriptions)

import Client.Model exposing (Message(..))
import Client.Util as Util
import Common.Direction as Direction exposing (Direction)
import Json.Decode as D exposing (Value)
import Playground exposing (Screen)


port input : (Value -> msg) -> Sub msg


port output : String -> Cmd msg


subscriptions : a -> Sub Message
subscriptions _ =
    input Client.Model.Input


parse : D.Value -> Result D.Error (List Input)
parse =
    D.list decoder
        |> D.decodeValue


type Input
    = RequestAnimationFrame Float
    | Resize Screen
    | Button Bool Direction
      --- Network
    | NetworkJoin
    | NetworkLeave
    | NetworkData
    | NetworkError


decoder : D.Decoder Input
decoder =
    D.index 0 D.int
        |> D.andThen
            (\msg ->
                case msg of
                    0 ->
                        D.index 1 D.float
                            |> D.map RequestAnimationFrame

                    1 ->
                        D.map2 Util.toScreen
                            (D.index 1 D.float)
                            (D.index 2 D.float)
                            |> D.map Resize

                    2 ->
                        D.map2 Button
                            (D.index 1 D.bool)
                            (D.index 2 D.int |> D.map Direction.fromInt)

                    3 ->
                        D.succeed NetworkJoin

                    4 ->
                        D.succeed NetworkLeave

                    5 ->
                        D.succeed NetworkData

                    6 ->
                        D.succeed NetworkError

                    _ ->
                        --let
                        --    _ =
                        --        Debug.log "msg::decoder::UNKNOWN" msg
                        --in
                        D.fail "unknown message type"
            )
