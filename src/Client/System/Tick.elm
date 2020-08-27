module Client.System.Tick exposing (system)

import Client.Component.UI as UI
import Client.System.Render as Render
import Client.System.UI as UISystem
import Client.World exposing (Message(..), Model)
import Common.Component.Position as Position
import Common.Component.Velocity as Velocity
import Common.System.VelocityPosition as VelocityPosition
import Common.Util as Util
import Set
import Task
import Time exposing (Posix)
import WebGL.Texture as Texture


system : Posix -> Model -> ( Model, Cmd Message )
system time ({ textures } as model) =
    let
        newTime =
            Time.posixToMillis time

        wasTime =
            Time.posixToMillis model.time

        delta =
            newTime - wasTime

        world =
            model.world
                |> UISystem.system time
                |> VelocityPosition.system Velocity.spec Position.spec

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
        |> Set.foldl (\url -> (::) (getTexture url)) []
        |> Cmd.batch
    )


getTexture : String -> Cmd Message
getTexture url =
    Texture.loadWith textureOption url
        |> Task.attempt
            (\r ->
                case r of
                    Ok t ->
                        Texture url t

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
