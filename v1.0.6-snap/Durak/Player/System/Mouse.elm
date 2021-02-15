module Durak.Player.System.Mouse exposing (system)

import Durak.Common.Bounding.Tree as BoundingTree
import Durak.Common.Table as Table
import Durak.Player.Component.Ui as Ui
import Durak.Player.System.Ui as UiSystem
import Durak.Player.Util as Util
import Durak.Player.World exposing (World)
import Durak.Protocol.Message as Message
import Game.Client.Model exposing (Model)
import Logic.System as System exposing (applyIf, applyMaybe)
import Playground exposing (Shape)


system : Model World -> ( World, Shape )
system { world, time } =
    ( case BoundingTree.get { x = world.mouse.x, y = world.mouse.y } world.cardHitArea of
        Just card ->
            let
                attack =
                    applyIf world.mouse.click (Util.send (Message.Attack card))
            in
            { world | hoverCard = Just card }
                |> (case world.ui of
                        Ui.Attack ->
                            attack

                        Ui.Support ->
                            attack

                        Ui.CanPass _ ->
                            attack

                        Ui.Defence _ ->
                            applyIfAndMaybe
                                world.mouse.click
                                (Table.nextHitSpot world.table)
                                (\spot -> Util.send (Message.Defence spot card))

                        _ ->
                            identity
                   )

        Nothing ->
            { world | hoverCard = Nothing }
                -- Pass click to UI
                |> System.applyIf world.mouse.click UiSystem.click
    , Playground.group []
    )


applyIfAndMaybe : Bool -> Maybe a -> (a -> c -> c) -> c -> c
applyIfAndMaybe i m fn =
    applyIf i (applyMaybe m fn)
