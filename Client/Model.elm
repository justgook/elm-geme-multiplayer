module Client.Model exposing (Message(..), Model, World, empty, world)

--import Client.Util as Util

import Client.Util as Util
import Dict exposing (Dict)
import Json.Decode exposing (Value)
import Playground exposing (Screen)
import Set exposing (Set)
import Time exposing (Posix)
import WebGL
import WebGL.Texture as Texture exposing (Texture)


type alias World =
    {}


empty : Model
empty =
    { textures = { done = Dict.empty, loading = Set.empty }
    , entities = []
    , screen = Util.toScreen 2 2
    , time = 0
    , world = world
    }


world : World
world =
    {}


type Message
    = Texture String Texture
    | TextureFail Texture.Error
      ---Network
    | Receive String
    | Join
    | Leave
    | Error String
      -- New Way
    | Input Value


type alias Model =
    { entities : List WebGL.Entity
    , textures : { done : Dict String Texture, loading : Set String }
    , screen : Screen
    , time : Float
    , world : World
    }
