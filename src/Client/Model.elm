module Client.Model exposing (Message(..), Model, World, empty, world)

import Client.Component.Action as Action exposing (Action)
import Client.Component.Ground as Ground exposing (Ground)
import Client.Component.Sprite as Sprite exposing (Sprite)
import Client.Component.Ui as Ui exposing (Ui)
import Client.Util as Util
import Common.Component.Position as Position exposing (Position)
import Common.Protocol.Message exposing (ToServer)
import Dict exposing (Dict)
import Json.Decode exposing (Value)
import Logic.Component as Component
import Playground exposing (Screen)
import Set exposing (Set)
import WebGL
import WebGL.Texture as Texture exposing (Texture)


type alias World =
    { ui : Ui
    , action : Action
    , p : Component.Set Position
    , sprite : Component.Set Sprite
    , ground : Ground
    , out : List ToServer
    }


world : World
world =
    { ui = Ui.empty
    , action = Action.empty
    , p = Position.empty
    , sprite = Sprite.empty
    , ground = Ground.empty
    , out = []
    }


type alias Model =
    { entities : List WebGL.Entity
    , textures : { done : Dict String Texture, loading : Set String }
    , screen : Screen
    , time : Float
    , error : String
    , world : World
    }


empty : Model
empty =
    { textures =
        { done = Dict.empty
        , loading = Set.empty
        }
    , entities = []
    , screen = Util.toScreen 2 2
    , time = 0
    , error = ""
    , world = world
    }


type Message
    = Texture String Texture
    | TextureFail Texture.Error
    | Message Value
