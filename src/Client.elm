module Client exposing (init, subscriptions, update, wrap)

import Client.Model exposing (Message(..), Model, World)
import Client.Port as Port
import Client.RomDecode as RomDecode
import Client.System.Data as Data
import Client.System.Tick as Tick
import Client.Util as Util
import Common.Protocol.Client
import Common.Protocol.Message exposing (ToServer(..))
import Common.Protocol.Util
import Dict
import Html exposing (Html)
import Html.Lazy
import Json.Decode as D exposing (Value)
import Set
import WebGL exposing (Entity)


wrap : List (Html.Attribute msg) -> List Entity -> Html msg
wrap attrs entities =
    Html.Lazy.lazy3 WebGL.toHtmlWith
        webGLOption
        attrs
        entities


webGLOption : List WebGL.Option
webGLOption =
    [ WebGL.alpha True
    , WebGL.depth 1
    , WebGL.clearColor 1 1 1 1
    ]


init : Value -> ( Model, Cmd Message )
init flags =
    let
        empty =
            Client.Model.empty

        screen =
            let
                decoder =
                    D.map2 Util.toScreen
                        (D.at [ "screen", "width" ] D.float)
                        (D.at [ "screen", "height" ] D.float)
            in
            D.decodeValue decoder flags
                |> Result.withDefault (Util.toScreen 100 100)

        account =
            let
                decoder =
                    D.map2 (\login pass -> { login = login, password = pass })
                        (D.at [ "login" ] D.string)
                        (D.at [ "password" ] D.string)
            in
            D.decodeValue decoder flags

        ( textures, cmd ) =
            RomDecode.parse empty.textures flags

        loginOut =
            case account of
                Ok rec ->
                    LoginRequest rec :: empty.world.out

                Err _ ->
                    empty.world.out

        world =
            empty.world
    in
    ( { empty
        | screen = screen
        , textures = textures
        , world = { world | out = loginOut }
      }
    , cmd
    )


update : Message -> Model -> ( Model, Cmd Message )
update msg ({ textures } as model) =
    case msg of
        Message v ->
            case Port.parse v of
                Ok messages ->
                    messages
                        |> List.foldl
                            (\msg2 ( m, cmds ) ->
                                case msg2 of
                                    Port.Tick time ->
                                        Tick.system time m
                                            |> Tuple.mapSecond (\a -> a :: cmds)

                                    Port.Resize screen ->
                                        ( { m | screen = screen }, cmds )

                                    Port.InputKeyboard down button ->
                                        ( { m | world = Data.keyboard down button m.world }, cmds )

                                    Port.InputMouse mouseData ->
                                        --let
                                        --    _ =
                                        --        Debug.log "Mouse" mouseData
                                        --in
                                        ( m, cmds )

                                    Port.InputTouch ->
                                        ( m, cmds )

                                    Port.NetworkData data ->
                                        fromPacket data
                                            |> List.foldl (\a acc -> { acc | world = Data.system a m.world }) m
                                            |> (\a -> ( a, cmds ))

                                    Port.NetworkJoin ->
                                        --let
                                        --    _ =
                                        --        Debug.log "Client::NetworkJoin" "join"
                                        --in
                                        ( m, cmds )

                                    Port.NetworkLeave ->
                                        ( { m | error = "KickOut" }, cmds )

                                    Port.NetworkError error ->
                                        ( { m | error = error }, cmds )
                            )
                            ( model, [] )
                        |> Tuple.mapSecond Cmd.batch

                Err err ->
                    ( { model | error = D.errorToString err }, Cmd.none )

        -- Textures
        Texture url t ->
            ( { model
                | textures =
                    { textures
                        | loading = Set.remove url textures.loading
                        , done = Dict.insert url t textures.done
                    }
              }
            , Cmd.none
            )

        TextureFail _ ->
            ( model, Cmd.none )


subscriptions =
    Port.subscriptions


fromPacket : String -> List Common.Protocol.Message.ToClient
fromPacket =
    Common.Protocol.Util.fromPacket Common.Protocol.Client.decode
