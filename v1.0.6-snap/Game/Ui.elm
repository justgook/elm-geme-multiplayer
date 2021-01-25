module Game.Ui exposing (panel, stick)

import Game.Ui.Panel
import Game.Ui.Stick
import WebGL.Shape2d exposing (Shape2d)


panel : String -> Game.Ui.Panel.Options -> Float -> Float -> Shape2d
panel =
    Game.Ui.Panel.panel


stick =
    Game.Ui.Stick.stick
