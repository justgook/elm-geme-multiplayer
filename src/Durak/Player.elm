module Durak.Player exposing (main)

import Dict
import Durak.Common.Qr as Qr
import Durak.Common.Util as Util
import Durak.Player.System.Data as Data
import Durak.Player.System.Tick as Tick
import Durak.Player.World as World exposing (World)
import Durak.Protocol.Message exposing (ToClient, ToServer(..))
import Durak.Protocol.Player
import Game.Client
import Game.Client.Model exposing (Message, Model)
import Game.Client.Port as Port
import Game.Protocol.Util as ProtocolUtil
import Json.Decode exposing (Value)
import Playground


main : Game.Client.GameClient World
main =
    Game.Client.start { init = init, update = update }


update : Port.Message -> Model World -> ( Model World, Cmd Message )
update msg model =
    case msg of
        Port.Tick time ->
            Tick.system time model
                |> Tuple.mapFirst
                    (\m ->
                        if m.world.mouse.dirty then
                            m
                                |> Util.withWorld
                                    (\world ->
                                        let
                                            mouse =
                                                m.world.mouse
                                        in
                                        { world | mouse = { mouse | dirty = False, click = False } }
                                    )

                        else
                            m
                    )

        Port.InputMouse data ->
            ( model
                |> Util.withWorld
                    (\world ->
                        { world
                            | mouse =
                                { x = model.screen.left + data.x
                                , y = model.screen.top - data.y
                                , key1 = data.key1
                                , key2 = data.key2
                                , click = model.world.mouse.key1 && not data.key1
                                , dirty = True
                                }
                        }
                    )
            , Cmd.none
            )

        Port.InputTouch touches_ ->
            let
                touches =
                    List.foldl (\({ identifier } as a) -> Dict.insert identifier a) Dict.empty touches_

                mouse =
                    model.world.mouse
            in
            case model.world.touchId of
                Just activeTouch ->
                    case Dict.get activeTouch touches of
                        Just touch ->
                            ( model
                                |> Util.withWorld
                                    (\world ->
                                        { world
                                            | mouse =
                                                { mouse
                                                    | dirty = True
                                                    , key1 = True
                                                    , x = model.screen.left + touch.x
                                                    , y = model.screen.top - touch.y
                                                }
                                        }
                                    )
                            , Cmd.none
                            )

                        Nothing ->
                            ( model
                                |> Util.withWorld
                                    (\world ->
                                        case touches_ of
                                            touch :: _ ->
                                                { world
                                                    | touchId = Just touch.identifier
                                                    , mouse =
                                                        { mouse
                                                            | dirty = True
                                                            , key1 = True
                                                            , click = True
                                                            , x = model.screen.left + touch.x
                                                            , y = model.screen.top - touch.y
                                                        }
                                                }

                                            [] ->
                                                { world | touchId = Nothing, mouse = { mouse | dirty = True, key1 = False, click = True } }
                                    )
                            , Cmd.none
                            )

                Nothing ->
                    ( model
                        |> Util.withWorld
                            (\world ->
                                case touches_ of
                                    touch :: _ ->
                                        { world
                                            | mouse =
                                                { mouse
                                                    | dirty = True
                                                    , key1 = True
                                                    , x = model.screen.left + touch.x
                                                    , y = model.screen.top - touch.y
                                                }
                                            , touchId = Just touch.identifier
                                        }

                                    [] ->
                                        { world | touchId = Nothing, mouse = { mouse | dirty = True, key1 = False, click = False } }
                            )
                    , Cmd.none
                    )

        Port.NetworkData data ->
            fromPacket data
                |> List.foldl Data.system model.world
                |> (\w -> ( { model | world = w, error = "" }, Cmd.none ))

        Port.NetworkError err ->
            ( { model | error = err }, Cmd.none )

        Port.NetworkJoin ->
            ( model |> Util.withWorld (\world -> { world | out = [ Join ] }), Cmd.none )

        Port.NetworkLeave ->
            ( model
                |> Util.withWorld
                    (\was ->
                        let
                            now =
                                World.empty
                        in
                        { now | qr = was.qr }
                    )
            , Cmd.none
            )

        Port.Resize screen ->
            ( { model | screen = screen }, Cmd.none )

        _ ->
            ( model, Cmd.none )


init : Value -> (World -> Model World) -> ( Model World, Cmd Message )
init flags initModel =
    let
        w =
            World.empty
    in
    ( initModel
        { w
            | qr =
                Qr.render "https://pandemic.z0.lv/?asdasdas"
        }
    , Cmd.none
    )


fromPacket : String -> List ToClient
fromPacket =
    ProtocolUtil.fromPacket Durak.Protocol.Player.decode
