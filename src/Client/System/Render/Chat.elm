module Client.System.Render.Chat exposing (cache, input, view)

import Client.Asset.Text
import Client.Component.Chat exposing (Chat)
import Json.Decode as D exposing (Decoder)
import Playground exposing (Shape, group, moveY)


view : Chat -> Shape
view chat =
    [ chat.messages |> group
    , Client.Asset.Text.chat chat.input
    ]
        |> group


input :
    { a | chat : Chat }
    -> String
    -> Decoder { a | chat : Chat }
input ({ chat } as world) key =
    case key of
        "Backspace" ->
            { world
                | chat =
                    { chat
                        | input = String.dropRight 1 chat.input
                    }
            }
                |> D.succeed

        "Enter" ->
            { world | chat = cache chat }
                |> D.succeed

        _ ->
            case String.toList key of
                [ _ ] ->
                    { world | chat = { chat | input = chat.input ++ key } }
                        |> D.succeed

                _ ->
                    D.fail ""


lineHeight =
    10


cache chat =
    if chat.input == "" then
        chat

    else if String.startsWith ".add" chat.input then
        chat

    else
        let
            messages_ =
                chat.input :: List.take 10 chat.messages_

            messages =
                messages_
                    |> List.foldl
                        (\a ( acc, offset ) ->
                            ( (Client.Asset.Text.chat a |> moveY offset)
                                :: acc
                            , offset + lineHeight
                            )
                        )
                        ( [], lineHeight )
                    |> Tuple.first
        in
        { chat
            | input = ""
            , messages = messages
            , messages_ = messages_
        }
