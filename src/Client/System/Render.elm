module Client.System.Render exposing (system)

import Animator
import Client.Asset.Text
import Client.Debug
import Client.System.Chat as Chat
import Client.World exposing (Model)
import Playground exposing (Screen, blue, fade, move, rectangle, red, rgb, yellow)
import Set exposing (Set)
import WebGL exposing (Entity)
import WebGL.Shape2d


testTest1 =
    "Before \u{001B}[31mConnecting\u{001B}[0mAfter"


testTest2 =
    "Before \u{001B}[31m\nReady\n\u{001B}[0mAfter"


system : Model -> ( List Entity, Set String )
system { screen, textures, time, world } =
    Client.Debug.cross
        :: [ Client.Asset.Text.text
                (if world.connected then
                    testTest2

                 else
                    testTest1
                )
           , Chat.view world.chat_
                |> move screen.left screen.bottom
           ]
        |> WebGL.Shape2d.toEntities textures.done
            { width = screen.width, height = screen.height }


transition timeline =
    let
        nowShowing =
            Animator.current timeline

        osc =
            Animator.interpolate
                (\v ->
                    if v > 0.5 then
                        1

                    else
                        0
                )

        anim =
            Animator.move timeline <|
                \state ->
                    if nowShowing == state then
                        Animator.at 1

                    else
                        Animator.at 0
    in
    if anim < 0.5 then
        Animator.previous timeline
            |> draw
            |> fade (1 - anim * 2)

    else
        Animator.current timeline
            |> draw
            |> fade ((anim - 0.5) * 2)


draw item =
    case item of
        1 ->
            rectangle yellow 10 20

        2 ->
            rectangle blue 10 20

        _ ->
            rectangle red 0 0
