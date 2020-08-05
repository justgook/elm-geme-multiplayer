module Client exposing (main)

import Browser exposing (Document)
import Browser.Dom as Dom
import Browser.Events as Browser
import Client.Event.Keyboard
import Client.Port as Port
import Client.Sync
import Client.System.Event
import Client.System.Join as Join
import Client.System.Tick as Tick
import Client.Util as Util
import Client.View as View
import Client.World as World exposing (Message(..), Model)
import Dict
import Html exposing (div)
import Html.Attributes exposing (class)
import Json.Decode as Json
import Set
import Task


main : Program Json.Value Model Message
main =
    Browser.document
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


init : Json.Value -> ( Model, Cmd Message )
init flags =
    let
        cmd =
            Dom.getViewport
                |> Task.map (\{ viewport } -> Util.toScreen viewport.width viewport.height)
                |> Task.perform Resize
    in
    ( World.empty, cmd )


view : Model -> Document Message
view model =
    { title = "Client"
    , body = [ View.view model, div [ class "debug" ] [] ]
    }


update : Message -> Model -> ( Model, Cmd Message )
update msg ({ textures } as model) =
    case msg of
        Tick time ->
            Tick.system time model

        Subscription world ->
            Client.System.Event.system model world

        Event fn ->
            fn model.world
                |> Client.System.Event.system model

        Resize screen ->
            ( { model | screen = screen }, Cmd.none )

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

        ---- NETWORK
        Receive income ->
            ( { model | world = Client.Sync.receive income model.world }, Cmd.none )

        Join ->
            ( { model | world = Join.system model.world }, Cmd.none )

        Leave ->
            ( model, Cmd.none )

        Error err ->
            ( model, Cmd.none )


subscriptions model =
    Sub.batch
        [ Port.receive Receive
        , Port.join (\_ -> Join)
        , Port.leave (\_ -> Leave)
        , Port.error Error
        , Client.Event.Keyboard.subscription model.world |> Sub.map Subscription
        , Browser.onAnimationFrame Tick
        ]
