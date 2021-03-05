module Durak.Player.System.Ui exposing (click, keyboard, system)

import Durak.Common.Bounding.Tree as BoundingTree
import Durak.Player.Component.Card as Card
import Durak.Player.Component.Ui as Ui exposing (Ui(..))
import Durak.Player.System.Ui.Intro as Intro
import Durak.Player.Util as Util
import Durak.Player.World exposing (World)
import Durak.Protocol.Message as Protocol
import Game.Client.Component.Action exposing (Button(..))
import Game.Client.Model exposing (Model)
import Logic.System exposing (System)
import Playground exposing (Shape)


system : Model World -> ( World, Shape )
system { screen, world, time } =
    (case world.ui of
        _ ->
            [ world.qr |> Playground.fade 0.5 |> Playground.moveY (Card.size.height * -2)
            , Ui.render time world.ui
            ]
                |> Playground.group
    )
        |> Tuple.pair world


keyboard down button world =
    case world.ui of
        Intro data ->
            Intro.keyboard down button data world

        _ ->
            ( world, Cmd.none )


click : System World
click world =
    case world.ui of
        Intro data ->
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

        Defense { hitArea } ->
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
