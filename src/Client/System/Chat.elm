module Client.System.Chat exposing (ChatCacheWorld, view)

import Animator exposing (Movement)
import Client.Asset.Text
import Client.Component.ChatCache as ChatCache exposing (ChatCache)
import Client.Component.UI exposing (UI)
import Common.Component.Chat exposing (Chat)
import Json.Decode as D exposing (Decoder)
import Logic.Entity exposing (EntityID)
import Playground exposing (Shape, fade, group, moveY)
import Time exposing (Posix)


type alias ChatCacheWorld world =
    { world
        | chat_ : ChatCache
        , chat : Chat
        , ui : UI
        , me : EntityID
    }


blink : state -> Movement
blink _ =
    Animator.wrap 1 0
        |> Animator.loop (Animator.millis 700)


view : UI -> ChatCache -> Shape
view ui chat_ =
    let
        newState =
            ui.animator

        fader =
            Animator.move newState blink
    in
    if ui.focus == "chat" then
        [ chat_.messages |> group
        , Client.Asset.Text.chat chat_.input
        , Client.Asset.Text.chat (chat_.input ++ "▮") |> fade fader
        ]
            |> group

    else
        chat_.messages |> group
