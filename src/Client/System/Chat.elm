module Client.System.Chat exposing (ChatCacheWorld, system, view)

import Animator exposing (Movement)
import Client.Asset.Text
import Client.Component.ChatCache as ChatCache exposing (ChatCache)
import Common.Component.Chat exposing (Chat)
import Json.Decode as D exposing (Decoder)
import Logic.Entity exposing (EntityID)
import Playground exposing (Shape, fade, group, moveY)
import Time exposing (Posix)


type alias ChatCacheWorld world =
    { world
        | chat_ : ChatCache
        , chat : Chat
        , me : EntityID
    }


start =
    Animator.init 0


system : Posix -> ChatCache -> ChatCache
system time chat =
    { chat | animator = Animator.updateTimeline time chat.animator }


blink : state -> Movement
blink _ =
    Animator.wrap 1 0
        |> Animator.loop (Animator.millis 700)


view : ChatCache -> Shape
view chat =
    let
        newState =
            chat.animator

        fader =
            Animator.move newState blink
    in
    [ chat.messages |> group
    , Client.Asset.Text.chat chat.input
    , Client.Asset.Text.chat (chat.input ++ "|") |> fade fader
    ]
        |> group
