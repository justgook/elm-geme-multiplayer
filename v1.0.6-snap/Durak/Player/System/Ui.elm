module Durak.Player.System.Ui exposing (click, system)

import Durak.Common.Bounding.Tree as BoundingTree
import Durak.Player.Component.Card as Card
import Durak.Player.Component.Ui as Ui exposing (Ui(..))
import Durak.Player.Util as Util
import Durak.Player.World exposing (World)
import Durak.Protocol.Message as Protocol
import Game.Client.Model exposing (Model)
import Logic.System exposing (System)
import Playground exposing (Shape)


system : Model World -> ( World, Shape )
system { screen, world } =
    (case world.ui of
        _ ->
            [ world.qr |> Playground.fade 0.5 |> Playground.moveY (Card.size.height * -2)
            , Ui.render world.ui
            ]
                |> Playground.group
    )
        |> Tuple.pair world


click : System World
click world =
    case world.ui of
        Init ->
            world

        WaitForNextGame ->
            world

        Waiting { hitArea } ->
            world |> firstButtonClick hitArea (\w -> { w | ui = Ready } |> Util.send Protocol.Ready)

        Ready ->
            world

        CountDown _ ->
            world

        Attack ->
            world

        Support ->
            world

        CanPass { hitArea } ->
            world
                |> firstButtonClick hitArea
                    (\w ->
                        Util.send Protocol.Pass { w | ui = YouPass }
                    )

        YouPass ->
            world

        Defence { hitArea } ->
            world |> firstButtonClick hitArea (Util.send Protocol.Pickup)

        Win ->
            world

        Lose ->
            world


firstButtonClick : BoundingTree.Tree Int -> (World -> World) -> World -> World
firstButtonClick hitArea fn world =
    case BoundingTree.get { x = world.mouse.x, y = world.mouse.y } hitArea of
        Just 1 ->
            fn world

        Just _ ->
            world

        Nothing ->
            world
