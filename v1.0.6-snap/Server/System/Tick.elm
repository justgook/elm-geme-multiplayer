module Server.System.Tick exposing (system)

import Server.Model exposing (Model)
import Server.Port as Port


system : Float -> Model -> Model
system time model =
    { model | time = time }
