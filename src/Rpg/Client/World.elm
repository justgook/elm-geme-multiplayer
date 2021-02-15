module Rpg.Client.World exposing (World, empty)

import Common.Component.Position as Position exposing (Position)
import Game.Client.Component.Action as Action exposing (Action)
import Logic.Component as Component
import Rpg.Client.Component.Ground as Ground exposing (Ground)
import Rpg.Client.Component.Sprite as Sprite exposing (Sprite)
import Rpg.Client.Component.Ui as Ui exposing (Ui)
import Rpg.Protocol.Message exposing (ToServer)


type alias World =
    { ui : Ui
    , action : Action
    , p : Component.Set Position
    , sprite : Component.Set Sprite
    , ground : Ground
    , out : List ToServer
    }


empty : World
empty =
    { ui = Ui.empty
    , action = Action.empty
    , p = Position.empty
    , sprite = Sprite.empty
    , ground = Ground.empty
    , out = []
    }
