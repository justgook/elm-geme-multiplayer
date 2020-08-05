module Client.World exposing (Message(..), Model, World, empty)

import Client.Component.Body as Body exposing (Body)
import Client.Component.ChatCache as ChatCache exposing (ChatCache)
import Client.Component.Timeline as Timeline exposing (Timeline)
import Client.Component.UI as UI exposing (UI)
import Client.Util as Util
import Common.Component.Chat as Chat exposing (Chat)
import Common.Component.Name as Name exposing (Name)
import Common.Component.Position as Position exposing (Position)
import Common.Component.Velocity as Velocity exposing (Velocity)
import Dict exposing (Dict)
import Logic.Component as Component
import Logic.Entity exposing (EntityID)
import Playground exposing (Screen)
import Set exposing (Set)
import Time exposing (Posix)
import WebGL
import WebGL.Texture as Texture exposing (Texture)


type alias World =
    { connected : Bool
    , me : EntityID
    , chat_ : ChatCache
    , chat : Chat
    , ui : UI
    , p : Component.Set Position
    , v : Component.Set Velocity
    , timeline : Component.Set Timeline
    , name : Component.Set Name
    , body : Component.Set Body
    }


world : World
world =
    let
        chat =
            Chat.empty
    in
    { connected = False
    , me = 0
    , chat_ = ChatCache.empty chat
    , chat = chat
    , ui = UI.empty
    , p = Position.empty
    , v = Velocity.empty
    , timeline = Timeline.empty
    , name = Name.empty
    , body = Body.empty
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
    , time : Posix
    , world : World
    }


empty : Model
empty =
    { textures = { done = Dict.empty, loading = Set.empty }
    , entities = []
    , screen = Util.toScreen 2 2
    , time = Time.millisToPosix 0
    , world = world
    }
