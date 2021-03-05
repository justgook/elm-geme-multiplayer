module Game.Client.Model exposing (Assets, Message(..), Model, empty, getTexture, preload)

import Dict exposing (Dict)
import Game.Client.Util as Util
import Json.Decode exposing (Value)
import Playground exposing (Screen)
import Set exposing (Set)
import Task
import WebGL
import WebGL.Texture as Texture exposing (Texture)


type alias Assets =
    { done : Dict String Texture, loading : Set String }


type alias Model world =
    { entities : List WebGL.Entity
    , textures : Assets
    , screen : Screen
    , time : Float
    , error : String
    , world : world
    }


empty : world -> Model world
empty world =
    { textures = { done = Dict.empty, loading = Set.empty }
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


getTexture : String -> String -> Cmd Message
getTexture name url =
    Texture.loadWith textureOption url
        |> Task.attempt
            (\r ->
                case r of
                    Ok t ->
                        Texture name t

                    Err e ->
                        TextureFail e
            )


textureOption : Texture.Options
textureOption =
    { magnify = Texture.linear
    , minify = Texture.linear
    , horizontalWrap = Texture.clampToEdge
    , verticalWrap = Texture.clampToEdge
    , flipY = True
    }


preload : List ( String, String ) -> Assets -> ( Assets, Cmd Message )
preload data textures =
    data
        |> List.foldl
            (\( name, url ) ( txt, cmd ) ->
                ( { txt | loading = Set.insert name txt.loading }, getTexture name url :: cmd )
            )
            ( textures, [] )
        |> Tuple.mapSecond Cmd.batch
