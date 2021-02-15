module Durak.Player.System.Tick exposing (system)

import Durak.Common.Util as Util
import Durak.Player.Component.Ui as Ui
import Durak.Player.System.Deck as Deck
import Durak.Player.System.Hand as Hand
import Durak.Player.System.Mouse as Mouse
import Durak.Player.System.Table as Table
import Durak.Player.World exposing (World)
import Durak.Protocol.Message exposing (ToServer)
import Durak.Protocol.Player
import Game.Client.Model as Model exposing (Message(..), Model)
import Game.Client.Port as Port
import Game.Protocol.Util as ProtocolUtil
import Logic.System as System
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
            , Playground.group [ Ui.render model.world.ui ]
            )
                |> System.applyIf model.world.mouse.dirty (andThen Mouse.system)
                |> andThen Hand.system
                |> andThen Table.system
                |> andThen Deck.system

        -- Render
        ( entities, missing ) =
            [ shape ]
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
