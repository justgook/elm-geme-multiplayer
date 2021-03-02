module Durak.Player.System.Data exposing (system)

import Durak.Common.Card as Card
import Durak.Common.Component.Hand as Hand
import Durak.Common.Table as Table
import Durak.Player.Component.Ui as Ui
import Durak.Player.World as World exposing (World)
import Durak.Protocol.Message exposing (ToClient(..))


system : ToClient -> World -> World
system msg world =
    case msg of
        TakeCard card ->
            { world | hand = Hand.push card world.hand }

        Trump card ->
            { world
                | table = Table.init (Card.suit card)
                , lastCard = card
            }

        CardsLeft count ->
            { world | cardsLeft = count }

        TableReset role ->
            { world
                | table = Table.clean world.table
                , ui = Ui.role role world.ui
            }

        ConfirmCard card ->
            { world
              -- TODO make me work as ECS  - so i can animate cards position / scale
                | hand = world.hand |> Hand.remove card
            }

        NoMoreSeats ->
            { world | ui = Ui.waitForNextGame }

        JoinSuccess ->
            { world | ui = Ui.waiting }

        RejectCard card ->
            { world | hand = Hand.push card world.hand }

        TableSpot spot card ->
            let
                table =
                    Table.set spot card world.table
            in
            { world
                | table = table
                , ui =
                    case world.ui of
                        Ui.Defense _ ->
                            if Table.allCover table then
                                Ui.Defense Ui.noneButton

                            else
                                Ui.Defense Ui.pickupButton

                        Ui.Support ->
                            if Table.allCover table then
                                Ui.CanPass Ui.passButton

                            else
                                world.ui

                        Ui.Attack ->
                            if Table.allCover table then
                                Ui.CanPass Ui.passButton

                            else
                                world.ui

                        Ui.CanPass _ ->
                            if Table.allCover table then
                                world.ui

                            else
                                Ui.Support

                        Ui.Init ->
                            world.ui

                        Ui.WaitForNextGame ->
                            world.ui

                        Ui.Waiting buttons ->
                            world.ui

                        Ui.Ready ->
                            world.ui

                        Ui.CountDown float ->
                            world.ui

                        Ui.YouPass ->
                            if Table.allCover table then
                                world.ui

                            else
                                Ui.Support

                        Ui.Win ->
                            world.ui

                        Ui.Lose ->
                            world.ui
            }

        OnlineCount i ->
            { world | playersOnline = i }

        PlayerStatus others ->
            { world | others = others }
