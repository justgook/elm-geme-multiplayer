module Client.World exposing (Message(..), Model, World, empty)

import Client.Component.Chat as Chat exposing (Chat)
import Client.Component.Pointer as Pointer exposing (Pointer)
import Client.Util as Util
import Common.Component.Name as Name exposing (Name)
import Common.Component.Position as Position exposing (Position)
import Dict exposing (Dict)
import Logic.Component as Component
import Playground exposing (Screen)
import Set exposing (Set)
import Time exposing (Posix)
import WebGL
import WebGL.Texture as Texture exposing (Texture)


type alias World =
    { pointer : Pointer
    , chat : Chat
    , p : Component.Set Position
    , name : Component.Set Name
    }


world : World
world =
    { pointer = Pointer.empty
    , chat = Chat.empty
    , p = Position.empty
    , name = Name.empty
    }


type Message
    = Tick Posix
    | Resize Screen
    | Texture String Texture
    | TextureFail Texture.Error
    | Event (World -> World)
    | Subscription World
      ---Network
    | Receive String
    | Join
    | Leave
    | Error String


type alias Model =
    { entities : List WebGL.Entity
    , textures : { done : Dict String Texture, loading : Set String }
    , screen : Screen
    , world : World
    }


empty : Model
empty =
    { textures = { done = Dict.empty, loading = Set.empty }
    , entities = []
    , screen = Util.toScreen 2 2
    , world = world
    }
