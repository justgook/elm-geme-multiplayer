module Durak.Player.System.Tick exposing (system)

import Common.Util as Util
import Durak.Player.System.Deck as Deck
import Durak.Player.System.Hand as Hand
import Durak.Player.System.Mouse as Mouse
import Durak.Player.System.Others as Others
import Durak.Player.System.Table as Table
import Durak.Player.System.Ui as Ui
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
            , Playground.group
                [ ("Online: " ++ String.fromInt model.world.playersOnline)
                    |> Playground.words Playground.blue
                    |> Playground.move (screen.right - 96) (screen.top - 16)
                    |> Playground.moveZ 1
                ]
            )
                |> System.applyIf model.world.mouse.dirty (andThen Mouse.system)
                |> andThen Ui.system
                |> andThen Hand.system
                |> andThen Table.system
                |> andThen Deck.system
                |> andThen Others.system

        -- Render
        ( entities, missing ) =
            (if String.length model.error == 0 then
                [ shape ]

             else
                [ Playground.words red model.error ]
            )
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
