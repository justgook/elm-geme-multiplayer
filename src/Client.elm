module Client exposing (main)

import Base64
import Browser exposing (Document)
import Browser.Dom as Dom
import Browser.Events as Browser
import Bytes.Encode as Bytes
import Client.Event.Keyboard
import Client.Port as Port
import Client.System as System
import Client.System.Join as Join
import Client.System.Receive as Receive
import Client.Util as Util
import Client.View as View
import Client.World as World exposing (Message(..), Model)
import Common.Contract as Contract
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
        Tick time ->
            System.system time model

        Subscription world ->
            let
                changed =
                    (if world.chat /= model.world.chat then
                        let
                            diffWorld =
                                List.head world.chat |> Maybe.map (\chat -> { chat = [ chat ] })
                        in
                        diffWorld

                     else
                        Nothing
                    )
                        |> Maybe.andThen
                            (\aa ->
                                Contract.toServer
                                    |> Tuple.first
                                    |> (\fn -> fn aa)
                                    |> Bytes.encode
                                    |> Base64.fromBytes
                            )
            in
            case changed of
                Just str ->
                    ( { model | world = world }, Port.send str )

                Nothing ->
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
            ( { model | world = Receive.system income model.world }, Cmd.none )

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
