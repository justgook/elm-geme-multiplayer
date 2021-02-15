module Durak.Player exposing (main)

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
            let
                world =
                    model.world
            in
            ( { model
                | world =
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
              }
            , Cmd.none
            )

        Port.NetworkData data ->
            fromPacket data
                |> List.foldl Data.system model.world
                |> (\w -> ( { model | world = w }, Cmd.none ))

        Port.NetworkError err ->
            ( { model | error = err }, Cmd.none )

        Port.NetworkJoin ->
            ( model |> Util.withWorld (\world -> { world | out = [ Join ] }), Cmd.none )

        Port.NetworkLeave ->
            ( model |> Util.withWorld (\world -> World.empty), Cmd.none )

        Port.Resize screen ->
            ( { model | screen = screen }, Cmd.none )

        _ ->
            ( model, Cmd.none )


init : Value -> (World -> Model World) -> ( Model World, Cmd Message )
init flags initModel =
    ( initModel World.empty, Cmd.none )


fromPacket : String -> List ToClient
fromPacket =
    ProtocolUtil.fromPacket Durak.Protocol.Player.decode
