module Durak.Spectator.System.Tick exposing (system)

import Durak.Common.Qr as Qr
import Durak.Common.Util as Util
import Durak.Protocol.Message exposing (ToServer)
import Durak.Protocol.Player
import Durak.Spectator.System.Players as Players
import Durak.Spectator.World exposing (World)
import Game.Client.Model as Model exposing (Message(..), Model)
import Game.Client.Port as Port
import Game.Protocol.Util as ProtocolUtil
import Playground exposing (Shape, red)
import Set
import WebGL.Shape2d


system : Float -> Model World -> ( Model World, Cmd Message )
system time ({ textures, screen } as model) =
    let
        andThen : (Model World -> ( World, Shape )) -> ( World, Shape ) -> ( World, Shape )
        andThen =
            Util.andThen model

        -- Logic
        ( world, shape ) =
            ( model.world
            , [ Qr.render "https://pandemic.z0.lv/?asdasdas"
                    |> Playground.scale 0.5

              --, Playground.rectangle red 10 1000
              ]
                |> Playground.group
            )
                |> andThen Players.system

        --|> andThen
        --( model.world
        --, Playground.group
        --    [-- Playground.words Playground.blue "Spectator █▄▌▐▀"
        --    ]
        --)
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
        ProtocolUtil.toPacket Durak.Protocol.Player.encode out |> Port.output


getTexture : String -> Cmd Message
getTexture url =
    Model.getTexture url url
