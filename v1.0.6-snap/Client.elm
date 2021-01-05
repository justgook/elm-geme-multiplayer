module Client exposing (init, subscriptions, update, wrap)

import Client.Income as Income
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
            case Income.parse v of
                Ok messages ->
                    messages
                        |> List.foldl
                            (\msg2 ( m, cmds ) ->
                                case msg2 of
                                    Income.RequestAnimationFrame time ->
                                        Tick.system time m
                                            |> Tuple.mapSecond (\a -> a :: cmds)

                                    Income.Resize screen ->
                                        ( { m | screen = screen }, cmds )

                                    Income.Button bool direction ->
                                        --let
                                        --    _ =
                                        --        direction
                                        --            |> Debug.log "got input!!"
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

        --Tick time ->
        --    Tick.system time model
        ---- NETWORK
        Receive income ->
            --( { model | world = Client.Sync.receive income model.world }, Cmd.none )
            ( model, Cmd.none )

        Join ->
            --( { model | world = Join.system model.world }, Cmd.none )
            ( model, Cmd.none )

        Leave ->
            ( model, Cmd.none )

        Error err ->
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


subscriptions model =
    Sub.batch
        [ Port.receive Receive
        , Port.join (\_ -> Join)
        , Port.leave (\_ -> Leave)
        , Port.error Error
        , Port.input Input
        ]
