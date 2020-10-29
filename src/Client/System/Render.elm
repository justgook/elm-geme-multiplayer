module Client.System.Render exposing (system)

import Client.Asset.Level as Level
import Client.Asset.Text
import Client.Component.Target as Target
import Client.Component.UI as UI
import Client.System.Chat as Chat
import Client.System.Render.Char
import Client.System.Render.Stick as Stick
import Client.World exposing (Model)
import Logic.Component as Component
import Playground exposing (Screen, group, move)
import Set exposing (Set)
import WebGL exposing (Entity)
import WebGL.Shape2d


testTest1 =
    "Before \u{001B}[31mConnecting \u{001B}[0m After"


testTest2 =
    "Before \u{001B}[31m\nReady\n\u{001B}[0mAfter"


zero =
    { x = 0, y = 0 }


moveScreen p =
    move (p.x * -16) (p.y * -16)


system : Model -> ( List Entity, Set String )
system { screen, textures, time, world } =
    let
        ( testBackground, testForeground ) =
            Level.level

        offset =
            Component.get 1 world.p
                |> Maybe.withDefault zero
    in
    [ --Game world
      [ testBackground
      , Client.Asset.Text.text
            (if world.connected then
                testTest2

             else
                testTest1
            )

      --, Playground.image 100 100 "magic"
      , Client.System.Render.Char.system world |> group
      , testForeground

      --, Client.Debug.cross
      ]
        |> group
        |> moveScreen offset

    ---  UI
    , Target.view (Target.spec.get world)
    , Chat.view world.ui world.chat_
        |> move screen.left screen.bottom
    , Stick.system (UI.spec.get world).stick1
    ]
        |> WebGL.Shape2d.toEntities textures.done { width = screen.width, height = screen.height }
