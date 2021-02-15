module Rpg.Client.System.Ui exposing (system)

import AltMath.Vector2 exposing (vec2)
import Game.Client.Model exposing (Model)
import Game.Ui as Ui
import Game.Ui.Text as Text
import Playground exposing (Shape, move)
import Rpg.Client.Component.Keyboard as Keyboard
import Rpg.Client.World exposing (World)


system : Model World -> ( World, Shape )
system m =
    let
        move1 =
            --move (sin (m.time * 0.0024) * m.screen.left) (cos (m.time * 0.003) * m.screen.top * 0.75)
            move 100 100

        move2 =
            --move (cos (m.time * 0.0024) * m.screen.left) (sin (m.time * 0.003) * m.screen.top * 0.5)
            move -100 100
    in
    ( m.world
    , [ panel1 100 100 |> move2
      , panel2 200 200 |> move1
      , Text.text "Some text goes here"
      , stick1 (vec2 10 10) (vec2 20 20)
      , Keyboard.keyboard m.world.action
      ]
        |> Playground.group
        |> Playground.fade 0.6
    )


panel1 : Float -> Float -> Shape
panel1 =
    Ui.panel
        "asset/ui/1.png"
        { bounds = { x = 1, y = 34, w = 67, h = 39 }
        , slice = { x = 9, y = 9, w = 50, h = 24 }
        }


panel2 =
    Ui.panel
        "asset/ui/1.png"
        { bounds = { x = 69, y = 34, w = 8, h = 8 }
        , slice = { x = 4, y = 4, w = 1, h = 1 }
        }


stick1 =
    Ui.stick
