module Server.System.Tick exposing (system)

import Server.Model exposing (Message, Model)
import Time exposing (Posix)


system : Posix -> Model -> ( Model, Cmd Message )
system t model =
    ( model, Cmd.none )