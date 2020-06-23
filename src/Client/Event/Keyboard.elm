module Client.Event.Keyboard exposing (subscription)

import Browser.Events as Browser
import Client.Component.ChatCache as ChatCache
import Client.System.Chat as Chat exposing (ChatCacheWorld)
import Json.Decode as D exposing (Decoder)
import Logic.Entity exposing (EntityID)
import Platform.Sub exposing (Sub)


subscription : ChatCacheWorld world -> Sub (ChatCacheWorld world)
subscription ({ chat_ } as world) =
    if chat_.active then
        Browser.onKeyUp (D.field "key" D.string |> D.andThen (input world))

    else
        Browser.onKeyDown (D.field "code" D.string |> D.map (\code -> world))


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
            , chat_ =
                { newCache
                    | input = ""
                }
        }
