module Rpg.Client exposing (..)

import Game.Client
import Game.Client.Model exposing (Message, Model)
import Game.Client.Port as Port
import Game.Protocol.Util as ProtocolUtil
import Json.Decode as D exposing (Value)
import Rpg.Client.RomDecode as RomDecode
import Rpg.Client.System.Data as Data
import Rpg.Client.System.Tick as Tick
import Rpg.Client.World as World exposing (World)
import Rpg.Protocol.Client
import Rpg.Protocol.Message exposing (ToClient, ToServer(..))


main : Game.Client.GameClient World
main =
    Game.Client.start { init = init, update = update }


update : Port.Message -> Model World -> ( Model World, Cmd Message )
update msg m =
    case msg of
        Port.Tick time ->
            Tick.system time m

        Port.Resize screen ->
            ( { m | screen = screen }, Cmd.none )

        Port.InputKeyboard down button ->
            ( { m | world = Data.keyboard down button m.world }, Cmd.none )

        Port.InputMouse mouseData ->
            ( m, Cmd.none )

        Port.InputTouch ->
            ( m, Cmd.none )

        Port.NetworkData data ->
            fromPacket data
                |> List.foldl Data.system m.world
                |> (\w -> ( { m | world = w }, Cmd.none ))

        Port.NetworkJoin ->
            ( m, Cmd.none )

        Port.NetworkLeave ->
            ( { m | error = "KickOut" }, Cmd.none )

        Port.NetworkError error ->
            ( { m | error = error }, Cmd.none )


init : Value -> (World -> Model World) -> ( Model World, Cmd Message )
init flags initModel =
    let
        model =
            initModel World.empty

        account =
            let
                decoder =
                    D.map2 (\login pass -> { login = login, password = pass })
                        (D.at [ "login" ] D.string)
                        (D.at [ "password" ] D.string)
            in
            D.decodeValue decoder flags

        ( textures, cmd ) =
            RomDecode.parse model.textures flags

        loginRequest =
            case account of
                Ok rec ->
                    LoginRequest rec :: model.world.out

                Err _ ->
                    model.world.out

        world =
            model.world
    in
    ( { model
        | textures = textures
        , world = { world | out = loginRequest }
      }
    , cmd
    )


fromPacket : String -> List ToClient
fromPacket =
    ProtocolUtil.fromPacket Rpg.Protocol.Client.decode
