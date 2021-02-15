port module Game.Server.Port exposing (ConnectionId, Data, Message(..), output, parse, subscriptions)

import Json.Decode as D exposing (Value)


type alias ConnectionId =
    String


type alias Data =
    String


subscriptions : a -> Sub Value
subscriptions _ =
    input identity


parse : D.Value -> Result D.Error (List Message)
parse =
    D.decodeValue (D.list decoder)


type Message
    = Tick Float
      --- Network
    | NetworkJoin ConnectionId
    | NetworkLeave ConnectionId
    | NetworkData ConnectionId Data
    | NetworkError String


decoder : D.Decoder Message
decoder =
    D.index 0 D.int
        |> D.andThen
            (\msg ->
                case msg of
                    100 ->
                        D.index 1 D.float
                            |> D.map Tick

                    201 ->
                        D.index 1 D.string
                            |> D.map NetworkJoin

                    202 ->
                        D.index 1 D.string
                            |> D.map NetworkLeave

                    203 ->
                        D.map2 NetworkData
                            (D.index 1 D.string)
                            (D.index 2 D.string)

                    204 ->
                        D.map NetworkError (D.index 1 D.string)

                    _ ->
                        D.fail ""
            )


port input : (Value -> msg) -> Sub msg


port output : ( ConnectionId, Data ) -> Cmd msg
