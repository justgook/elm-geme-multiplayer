module Client.System.Tick exposing (system)

import Client.Model exposing (Message(..), Model, World)
import Client.Port as Port
import Client.System.Action
import Client.System.Sprite
import Client.System.Ui
import Client.Util as Util
import Common.Protocol.Client
import Common.Protocol.Message exposing (ToServer)
import Common.Protocol.Util
import Logic.System exposing (System)
import Playground exposing (Shape)
import Set
import WebGL.Shape2d


system : Float -> Model -> ( Model, Cmd Message )
system time ({ textures, screen } as model) =
    let
        andThen =
            andThen_ model

        -- Logic
        ( world, shape ) =
            model
                |> Client.System.Sprite.system
                |> andThen Client.System.Ui.system
                |> Tuple.mapFirst Client.System.Action.system

        -- Render
        ( entities, missing ) =
            [ shape
            ]
                |> WebGL.Shape2d.toEntities textures.done screen

        -- Communication
        cmd =
            output world.out
    in
    ( { model
        | entities = entities
        , time = time
        , textures = { textures | loading = Set.union missing textures.loading }
        , world = { world | out = [] }
      }
    , Set.diff missing textures.loading
        |> Set.foldl (getTexture >> (::)) [ cmd ]
        |> Cmd.batch
    )


output : List ToServer -> Cmd msg
output out =
    if out == [] then
        Cmd.none

    else
        Common.Protocol.Util.toPacket Common.Protocol.Client.encode out |> Port.output


getTexture : String -> Cmd Message
getTexture url =
    Util.getTexture Texture TextureFail url url


andThen_ : Model -> (Model -> ( World, Shape )) -> ( World, Shape ) -> ( World, Shape )
andThen_ model fn ( world, shape ) =
    fn { model | world = world }
        |> Tuple.mapSecond (\a -> Playground.group [ shape, a ])
