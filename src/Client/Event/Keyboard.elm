module Client.Event.Keyboard exposing (subscription)

import Browser.Events as Browser
import Client.System.Chat as Chat exposing (ChatCacheWorld)
import Json.Decode as D
import Platform.Sub exposing (Sub)


subscription : ChatCacheWorld world -> Sub (ChatCacheWorld world)
subscription ({ chat_ } as world) =
    if chat_.active then
        Browser.onKeyUp (D.field "key" D.string |> D.andThen (Chat.input world))

    else
        Browser.onKeyDown (D.field "code" D.string |> D.map (\code -> world))
