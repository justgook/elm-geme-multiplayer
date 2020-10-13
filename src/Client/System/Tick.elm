module Client.System.Tick exposing (system)

import Client.System.Render as Render
import Client.System.UI as UISystem
import Client.Util as Util
import Client.World exposing (Message(..), Model)
import Set
import Time exposing (Posix)


system : Posix -> Model -> ( Model, Cmd Message )
system time ({ textures } as model) =
    let
        world =
            model.world
                |> UISystem.system time

        ( entities, missing ) =
            Render.system { model | world = world }
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
