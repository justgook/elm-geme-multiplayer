module Durak.Spectator exposing (main)

import Durak.Protocol.Message exposing (ToServer(..))
import Durak.Spectator.System.Tick as Tick
import Durak.Spectator.World as World exposing (World)
import Game.Client
import Game.Client.Model exposing (Message, Model)
import Game.Client.Port as Port
import Json.Decode exposing (Value)


main : Game.Client.GameClient World
main =
    Game.Client.start { init = init, update = update }


update msg model =
    case msg of
        Port.Tick time ->
            Tick.system time model

        Port.Resize screen ->
            ( { model | screen = screen }, Cmd.none )

        _ ->
            ( model, Cmd.none )


init : Value -> (World -> Model World) -> ( Model World, Cmd Message )
init flags initModel =
    let
        world =
            World.empty
    in
    ( initModel { world | out = [ Watch ] }, Cmd.none )
