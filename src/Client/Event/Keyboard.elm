module Client.Event.Keyboard exposing (subscription)

import Browser.Events as Browser
import Client.System.Render.Chat as Chat
import Json.Decode as D


subscription ({ chat } as world) =
    if chat.active then
        Browser.onKeyUp (D.field "key" D.string |> D.andThen (Chat.input world))

    else
        Browser.onKeyDown (D.field "code" D.string |> D.map (\code -> world))
