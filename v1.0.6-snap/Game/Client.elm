module Game.Client exposing (GameClient, start)

import Browser
import Dict
import Game.Client.Model exposing (Message(..), Model)
import Game.Client.Port as Port
import Game.Client.Util as Util
import Html exposing (Html)
import Html.Attributes as H
import Html.Lazy
import Json.Decode as D exposing (Value)
import Set
import WebGL exposing (Entity)


type alias GameClient world =
    Program Value (Model world) Message


start :
    { init : Value -> (world -> Model world) -> ( Model world, Cmd Message )
    , update : Port.Message -> Model world -> ( Model world, Cmd Message )
    }
    -> GameClient world
start opt =
    Browser.element
        { init = init opt.init
        , view = view
        , update = update opt.update
        , subscriptions = Port.subscriptions
        }


view : Model world -> Html msg
view { screen, entities, world } =
    wrap [ H.width (round screen.width), H.height (round screen.height) ] entities


wrap : List (Html.Attribute msg) -> List Entity -> Html msg
wrap attrs entities =
    Html.Lazy.lazy3 WebGL.toHtmlWith webGLOption attrs entities


webGLOption : List WebGL.Option
webGLOption =
    [ WebGL.alpha True
    , WebGL.depth 1
    , WebGL.clearColor 1 1 1 1
    ]


init : (Value -> (world -> Model world) -> ( Model world, Cmd Message )) -> Value -> ( Model world, Cmd Message )
init initFn flags =
    let
        -- Just dirty fix to expose port
        _ =
            Port.output

        _ =
            Port.open

        _ =
            Port.connect

        _ =
            Port.disconnect

        ( model, cmd ) =
            initFn flags (\w -> Game.Client.Model.empty w)

        screen =
            let
                decoder =
                    D.map2 Util.toScreen
                        (D.at [ "screen", "width" ] D.float)
                        (D.at [ "screen", "height" ] D.float)
            in
            D.decodeValue decoder flags
                |> Result.withDefault (Util.toScreen 100 100)
    in
    ( { model | screen = screen }, cmd )


update update2 msg ({ textures } as model) =
    case msg of
        Message v ->
            case Port.parse v of
                Ok messages ->
                    messages
                        |> List.foldl
                            (\msg2 ( m, cmds ) -> update2 msg2 m |> Tuple.mapSecond (\a -> a :: cmds))
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
