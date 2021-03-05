port module Game.Client.Port exposing (Message(..), MouseData, connect, disconnect, open, output, parse, subscriptions)

import Game.Client.Component.Action as Action exposing (Button)
import Game.Client.Model
import Game.Client.Util as Util
import Json.Decode as D exposing (Value)
import Playground exposing (Screen)


port input : (Value -> msg) -> Sub msg


port output : String -> Cmd msg


port open : String -> Cmd msg


port connect : String -> Cmd msg


port disconnect : String -> Cmd msg


subscriptions : a -> Sub Game.Client.Model.Message
subscriptions _ =
    input Game.Client.Model.Message


parse : D.Value -> Result D.Error (List Message)
parse =
    D.decodeValue (D.list decoder)


type Message
    = Tick Float
    | Resize Screen
    | InputKeyboard Bool Button
    | InputMouse MouseData
    | InputTouch (List TouchData)
      --- Network
    | NetworkJoin
    | NetworkLeave
    | NetworkData String
    | NetworkError String


type alias MouseData =
    { x : Float
    , y : Float
    , key1 : Bool
    , key2 : Bool
    }


type alias TouchData =
    { x : Float
    , y : Float
    , identifier : Int
    }


decoder : D.Decoder Message
decoder =
    D.index 0 D.int
        |> D.andThen
            (\msg ->
                case msg of
                    100 ->
                        --tick = 100,
                        D.index 1 D.float
                            |> D.map Tick

                    101 ->
                        --resize = 101,
                        D.map2 Util.toScreen
                            (D.index 1 D.float)
                            (D.index 2 D.float)
                            |> D.map Resize

                    102 ->
                        --inputKeyboard = 102,
                        D.map2 InputKeyboard
                            (D.index 1 D.bool)
                            (D.index 2 Action.decode)

                    --| [cmd: MessageId.inputMouse, x: number, y: number, key1: boolean, key2: boolean]
                    --| [cmd: MessageId.inputTouch, x: number, y: number, isDown: boolean]
                    103 ->
                        --inputMouse = 103,
                        D.map4 MouseData
                            (D.index 1 D.float)
                            (D.index 2 D.float)
                            (D.index 3 D.bool)
                            (D.index 4 D.bool)
                            |> D.map InputMouse

                    104 ->
                        --inputTouch = 104,
                        let
                            touchDecoder =
                                D.map3 (\id x y -> { identifier = id, x = x, y = y })
                                    (D.index 0 D.int)
                                    (D.index 1 D.float)
                                    (D.index 2 D.float)
                        in
                        D.index 1 (D.list touchDecoder)
                            |> D.map InputTouch

                    201 ->
                        --networkJoin = 201,
                        D.succeed NetworkJoin

                    202 ->
                        --networkLeave = 202,
                        D.succeed NetworkLeave

                    203 ->
                        --networkReceive = 203,
                        D.map NetworkData
                            (D.index 1 D.string)

                    204 ->
                        --networkError = 204,
                        D.map NetworkError
                            (D.index 1 D.string)

                    _ ->
                        D.fail "unknown message type"
            )
