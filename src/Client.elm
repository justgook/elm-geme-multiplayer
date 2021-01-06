module Client exposing (init, subscriptions, update, wrap)

import Client.Model exposing (Message(..), Model, World)
import Client.Port as Port
import Client.Tick as Tick
import Client.Util as Util
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
        initTextures =
            Util.getTexture Texture TextureFail "magic" "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="

        flagsDecoder =
            D.map2 Util.toScreen
                (D.at [ "screen", "width" ] D.float)
                (D.at [ "screen", "height" ] D.float)

        screen =
            D.decodeValue flagsDecoder flags
                |> Result.withDefault (Util.toScreen 100 100)

        empty =
            Client.Model.empty
    in
    ( { empty | screen = screen }, Cmd.batch [ initTextures ] )


update : Message -> Model -> ( Model, Cmd Message )
update msg ({ textures } as model) =
    case msg of
        Input v ->
            case Port.parse v of
                Ok messages ->
                    messages
                        |> List.foldl
                            (\msg2 ( m, cmds ) ->
                                case msg2 of
                                    Port.RequestAnimationFrame time ->
                                        Tick.system time m
                                            |> Tuple.mapSecond (\a -> a :: cmds)

                                    Port.Resize screen ->
                                        ( { m | screen = screen }, cmds )

                                    Port.Button bool direction ->
                                        --let
                                        --    _ =
                                        --        direction
                                        --            |> Debug.log "got input!!"
                                        --in
                                        ( m, cmds )

                                    Port.NetworkData ->
                                        --let
                                        --    _ =
                                        --        msg2
                                        --            |> Debug.log "got network"
                                        --in
                                        ( m, cmds )

                                    Port.NetworkJoin ->
                                        --let
                                        --    _ =
                                        --        msg2
                                        --            |> Debug.log "got network"
                                        --in
                                        ( m, Port.output "Port.NetworkJoin" :: cmds )

                                    Port.NetworkLeave ->
                                        --let
                                        --    _ =
                                        --        msg2
                                        --            |> Debug.log "got network"
                                        --in
                                        ( m, cmds )

                                    Port.NetworkError ->
                                        --let
                                        --    _ =
                                        --        msg2
                                        --            |> Debug.log "got network"
                                        --in
                                        ( m, cmds )
                            )
                            ( model, [] )
                        |> Tuple.mapSecond Cmd.batch

                Err err ->
                    --let
                    --    _ =
                    --        Debug.log "Got Dcoding error" err
                    --in
                    ( model, Cmd.none )

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
