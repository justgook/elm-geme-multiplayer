module Client.Income exposing (Input(..), parse)

import Client.Util as Util
import Common.Direction as Direction exposing (Direction)
import Json.Decode as D
import Playground exposing (Screen)


parse : D.Value -> Result D.Error (List Input)
parse =
    D.list decoder
        |> D.decodeValue


type Input
    = RequestAnimationFrame Float
    | Resize Screen
    | Button Bool Direction


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

                    _ ->
                        --let
                        --    _ =
                        --        Debug.log "msg::decoder::UNKNOWN" msg
                        --in
                        D.fail "unknown message type"
            )
