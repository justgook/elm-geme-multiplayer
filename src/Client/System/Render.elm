module Client.System.Render exposing (system)

import Animator
import Client.Asset.Text
import Client.Debug
import Client.System.Chat as Chat
import Client.System.Render.Char
import Client.World exposing (Model)
import Playground exposing (Screen, blue, fade, group, move, rectangle, red, yellow)
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
        :: (Client.System.Render.Char.system world |> group)
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
