module Client.System exposing (system)

import Client.Component.ChatCache as ChatCache
import Client.System.Chat as Chat
import Client.System.Render as Render
import Client.World exposing (Message(..), Model)
import Common.Util as Util
import Set
import Task
import Time exposing (Posix)
import WebGL.Texture as Texture


system : Posix -> Model -> ( Model, Cmd Message )
system time ({ textures } as model) =
    let
        world =
            model.world
                |> Util.update ChatCache.spec (Chat.system time)

        --                        |> (\w -> { w | delme = Intro.system time w.delme })
        --|> Path.system delta
        --|> Input.system 5
        --|> Movement.system
        --|> Action.system delta
        --|> PathRandomizer.system model.screen
        --|> Fx.system model.screen delta
        --|> Grid.system delta
        ( entities, missing ) =
            Render.system { model | world = world }
    in
    ( { model
        | entities = entities
        , time = time
        , textures =
            { textures
                | loading = Set.union missing textures.loading
            }
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
