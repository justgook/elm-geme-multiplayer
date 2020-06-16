module Client.System.Chat exposing (ChatCacheWorld, input, system, view)

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


input : ChatCacheWorld world -> String -> Decoder (ChatCacheWorld world)
input ({ chat_, chat, me } as world) key =
    case key of
        "Backspace" ->
            D.succeed { world | chat_ = { chat_ | input = String.dropRight 1 chat_.input } }

        "Enter" ->
            D.succeed (exec me world)

        _ ->
            case String.toList key of
                [ _ ] ->
                    D.succeed { world | chat_ = { chat_ | input = chat_.input ++ key } }

                _ ->
                    D.fail ""


exec : EntityID -> ChatCacheWorld world -> ChatCacheWorld world
exec entityId ({ chat, chat_ } as w) =
    if chat_.input == "" then
        w

    else if String.startsWith ".add" chat_.input then
        w

    else
        let
            newChat =
                ( entityId, chat_.input ) :: chat

            newCache =
                ChatCache.cache newChat w.chat_
        in
        { w
            | chat = newChat
            , chat_ = { newCache | input = "" }
        }
