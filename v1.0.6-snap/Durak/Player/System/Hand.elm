module Durak.Player.System.Hand exposing (system)

import Durak.Common.Component.Hand as Hand
import Durak.Common.Role as Role
import Durak.Common.Table as Table
import Durak.Player.Component.Card as Card
import Durak.Player.Component.Ui as Ui
import Durak.Player.World exposing (World)
import Game.Client.Model exposing (Model)
import Playground exposing (Shape, fade, move, scale)


system : Model World -> ( World, Shape )
system { screen, world } =
    let
        activeCard =
            world.hoverCard

        paddingH =
            10

        paddingV =
            0

        maxCardGap =
            5

        maxBottomOffset =
            screen.height * 0.2

        count =
            Hand.length world.hand |> toFloat

        minWidthNeeded =
            Card.size.minWidth * (count - 1) + Card.size.width

        availableSpace =
            screen.width - paddingH - paddingH

        maxScaleFactor =
            4

        scaleFactor =
            min maxScaleFactor (availableSpace / minWidthNeeded |> floor |> toFloat)

        spreadSpace =
            ((availableSpace / scaleFactor - Card.size.width) / (count - 1))
                |> floor
                |> toFloat

        cardSpace =
            max spreadSpace Card.size.minWidth
                |> min (maxCardGap + Card.size.width)

        ----
        scaledWidth =
            Card.size.width * scaleFactor

        scaledHeight =
            Card.size.height * scaleFactor

        bottomOffset =
            min (maxBottomOffset - Card.size.height * scaleFactor * 0.5) (paddingV + scaledHeight * 0.5)

        recentering =
            -cardSpace * scaleFactor * (count - 1) * 0.5

        ---- Hit area
        hitAreaHorizontal =
            min cardSpace Card.size.width * scaleFactor

        hitAreaVertical =
            min (bottomOffset + scaledHeight * 0.5) scaledHeight

        canAddAtAll =
            case find (Tuple.first >> (==) Role.Defense) world.others of
                Just ( _, defenderCards ) ->
                    Table.cardsToCover world.table - 6 + min 6 defenderCards > 0

                Nothing ->
                    False
    in
    world.hand
        |> Hand.indexedFoldl
            (\i_ card ->
                let
                    i =
                        toFloat i_

                    offsetY =
                        if Just card == activeCard then
                            10 * scaleFactor

                        else
                            0

                    hitAreaHorizontal_ =
                        if i == count - 1 then
                            scaledWidth

                        else
                            hitAreaHorizontal

                    offset =
                        recentering + cardSpace * scaleFactor * i

                    bounding =
                        let
                            xmin =
                                (offset + (hitAreaHorizontal_ - scaledWidth) * 0.5) - 0.5 * hitAreaHorizontal_

                            ymin =
                                screen.bottom + hitAreaVertical * 0.5 + offsetY * 0.5 - 0.5 * (hitAreaVertical + offsetY)
                        in
                        ( card
                        , { xmin = xmin
                          , ymin = ymin
                          , xmax = xmin + hitAreaHorizontal_
                          , ymax = ymin + (hitAreaVertical + offsetY)
                          }
                        )

                    opacity =
                        case world.ui of
                            Ui.Attack ->
                                fadeOut (canAddAtAll && Table.validateAttack card world.table)

                            Ui.Support ->
                                fadeOut (canAddAtAll && not (Table.isEmpty world.table) && Table.validateAttack card world.table)

                            Ui.CanPass _ ->
                                fadeOut (canAddAtAll && Table.validateAttack card world.table)

                            Ui.YouPass ->
                                0.5

                            Ui.Defense _ ->
                                case Table.nextHitSpot world.table of
                                    Just spot ->
                                        fadeOut (Table.validateDefense spot card world.table)

                                    Nothing ->
                                        0.5

                            _ ->
                                1
                in
                ( Card.render card
                    |> fade opacity
                    |> move offset (screen.bottom + bottomOffset + offsetY)
                    |> scale scaleFactor
                , bounding
                )
                    |> (::)
            )
            []
        |> List.foldl (\( shape, hit ) ( acc1, acc2 ) -> ( shape :: acc1, hit :: acc2 )) ( [], [] )
        |> (\( shapes, hit ) ->
                ( { world | cardHitArea = hit }
                  --, Playground.group (shapes ++ [ explain hit ])
                , Playground.group shapes
                )
           )


fadeOut : Bool -> Float
fadeOut b =
    if b then
        1

    else
        0.5


find : (a -> Bool) -> List a -> Maybe a
find predicate list =
    case list of
        [] ->
            Nothing

        first :: rest ->
            if predicate first then
                Just first

            else
                find predicate rest
