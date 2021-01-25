port module Client.Port exposing (Input(..), output, parse, subscriptions)

import Client.Component.Action exposing (Button)
import Client.Component.Keyboard as Keyboard
import Client.Model exposing (Message(..))
import Client.Util as Util
import Common.Port exposing (Data)
import Json.Decode as D exposing (Value)
import Playground exposing (Screen)


port input : (Value -> msg) -> Sub msg


port output : String -> Cmd msg


subscriptions : a -> Sub Message
subscriptions _ =
    input Client.Model.Message


parse : D.Value -> Result D.Error (List Input)
parse =
    D.list decoder
        |> D.decodeValue


type Input
    = Tick Float
    | Resize Screen
    | InputKeyboard Bool Button
    | InputMouse { x : Float, y : Float, key1 : Bool, key2 : Bool }
    | InputTouch
      --- Network
    | NetworkJoin
    | NetworkLeave
    | NetworkData Data
    | NetworkError String


type alias InputMouseRecord =
    { x : Float, y : Float, key1 : Bool, key2 : Bool }


decoder : D.Decoder Input
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
                            (D.index 2 Keyboard.decode)

                    --| [cmd: MessageId.inputMouse, x: number, y: number, key1: boolean, key2: boolean]
                    --| [cmd: MessageId.inputTouch, x: number, y: number, isDown: boolean]
                    103 ->
                        --inputMouse = 103,
                        D.map4 InputMouseRecord
                            (D.index 1 D.float)
                            (D.index 2 D.float)
                            (D.index 3 D.bool)
                            (D.index 4 D.bool)
                            |> D.map InputMouse

                    104 ->
                        --inputTouch = 104,
                        D.succeed InputTouch

                    201 ->
                        --networkJoin = 201,
                        D.succeed NetworkJoin

                    --|> Debug.log "NetworkJoin"
                    202 ->
                        --networkLeave = 202,
                        D.succeed NetworkLeave

                    203 ->
                        --networkReceive = 203,
                        D.map NetworkData
                            (D.index 1 D.string)

                    --|> Debug.log "NetworkData"
                    204 ->
                        --networkError = 204,
                        D.map NetworkError
                            (D.index 1 D.string)

                    _ ->
                        D.fail "unknown message type"
            )
