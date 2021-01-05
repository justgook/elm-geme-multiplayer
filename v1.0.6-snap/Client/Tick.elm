module Client.Tick exposing (system)

import Client.Model exposing (Message(..), Model)
import Client.Util as Util
import Playground
import Set
import WebGL.Shape2d


system : Float -> Model -> ( Model, Cmd Message )
system time ({ textures, screen } as model) =
    let
        world =
            model.world

        ( entities, missing ) =
            [ Playground.circle Playground.red 20 ]
                |> WebGL.Shape2d.toEntities textures.done screen
    in
    ( { model
        | entities = entities
        , time = time
        , textures = { textures | loading = Set.union missing textures.loading }
        , world = world
      }
    , Set.diff missing textures.loading
        |> Set.foldl (getTexture >> (::)) []
        |> Cmd.batch
    )


getTexture : String -> Cmd Message
getTexture url =
    Util.getTexture Texture TextureFail url url
