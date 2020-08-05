module Client.Event.Keyboard exposing (subscription)

import Browser.Events as Browser
import Client.System.UI as UI
import Json.Decode as D exposing (Decoder)


subscription world =
    Browser.onKeyDown (D.field "code" D.string |> D.andThen (\code -> UI.captureKey code world))
