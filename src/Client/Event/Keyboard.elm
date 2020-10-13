module Client.Event.Keyboard exposing (subscription)

import Browser.Events as Browser
import Client.System.UI as UI
import Json.Decode as D exposing (Decoder)


subscription world =
    [ Browser.onKeyDown (D.field "code" D.string |> D.andThen (\code -> UI.captureKeyDown code world))
    , Browser.onKeyUp (D.field "code" D.string |> D.andThen (\code -> UI.captureKeyUp code world))
    ]
        |> Sub.batch
