module Client.System.UI exposing (captureKey, system)

import Animator
import Client.Component.ChatCache as ChatCache
import Client.Component.UI as UI exposing (UI)
import Client.System.Chat exposing (ChatCacheWorld)
import Common.Util as Util
import Json.Decode as D exposing (Decoder)
import Logic.Entity exposing (EntityID)
import Time exposing (Posix)


system time =
    Util.update UI.spec
        (\({ stick1 } as ui) ->
            { ui
                | animator = Animator.updateTimeline time ui.animator
                , stick1 = { stick1 | active = Animator.updateTimeline time stick1.active }
            }
        )


captureKey code ({ ui } as world) =
    case ui.focus of
        "chat" ->
            D.field "key" D.string |> D.andThen (input world)

        _ ->
            case code of
                "Enter" ->
                    D.succeed { world | ui = { ui | focus = "chat" } }

                _ ->
                    let
                        _ =
                            Debug.log "got Key" code
                    in
                    D.succeed world


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
exec entityId ({ chat, chat_, ui } as w) =
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
            , ui = { ui | focus = "" }
            , chat_ = { newCache | input = "" }
        }
