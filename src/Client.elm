module Client exposing (main)

import Browser exposing (Document)
import Browser.Dom as Dom
import Browser.Events as Browser
import Client.Event.Keyboard
import Client.Port as Port
import Client.System as System
import Client.Util as Util
import Client.View as View
import Client.World as World exposing (Message(..), Model)
import Dict
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
    , body = [ View.view model ]
    }


update : Message -> Model -> ( Model, Cmd Message )
update msg ({ textures } as model) =
    case msg of
        Tick d ->
            System.system d model

        Subscription world ->
            ( { model | world = world }, Cmd.none )

        Event fn ->
            ( { model | world = fn model.world }, Cmd.none )

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
            ( model, Cmd.none )

        Join ->
            ( model, Cmd.none )

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
