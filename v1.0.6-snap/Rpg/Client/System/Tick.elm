module Rpg.Client.System.Tick exposing (system)

import Game.Client.Model as Model exposing (Message(..), Model)
import Game.Client.Port as Port
import Game.Client.Util as Util
import Game.Protocol.Util as ProtocolUtil
import Playground exposing (Shape)
import Rpg.Client.System.Action
import Rpg.Client.System.Sprite
import Rpg.Client.System.Ui
import Rpg.Client.World exposing (World)
import Rpg.Protocol.Client
import Rpg.Protocol.Message exposing (ToServer)
import Set
import WebGL.Shape2d


system time ({ textures, screen } as model) =
    let
        andThen : (Model World -> ( World, Shape )) -> ( World, Shape ) -> ( World, Shape )
        andThen =
            andThen_ model

        -- Logic
        ( world, shape ) =
            model
                |> Rpg.Client.System.Sprite.system
                |> andThen Rpg.Client.System.Ui.system
                |> Tuple.mapFirst Rpg.Client.System.Action.system

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
        ProtocolUtil.toPacket Rpg.Protocol.Client.encode out |> Port.output


getTexture url =
    Model.getTexture url url


andThen_ : { a | world : world } -> ({ a | world : world } -> ( world, Shape )) -> ( world, Shape ) -> ( world, Shape )
andThen_ model fn ( world, shape ) =
    fn { model | world = world }
        |> Tuple.mapSecond (\a -> Playground.group [ shape, a ])
