module Durak.Player.System.Table exposing (system)

import Durak.Common.Table as Table
import Durak.Player.Component.Card as Card
import Durak.Player.World exposing (World)
import Game.Client.Model exposing (Model)
import Playground exposing (Shape, move, scale)


spacing =
    Card.size.minWidth * -1


system : Model World -> ( World, Shape )
system { screen, world } =
    let
        length =
            toFloat (Table.length world.table)

        width =
            spacing + Card.size.width

        --_ =
        --    world.table
        --        |> Table.toList
        --        |> Debug.log "table:system"
        shapes =
            world.table
                |> Table.toList
                |> List.indexedMap
                    (\i { current, cover } ->
                        let
                            left =
                                Card.render current |> move (width * toFloat i * 2) 0
                        in
                        (case cover of
                            Just a ->
                                [ left, Card.render a |> move (width * (toFloat i * 2) + Card.size.minWidth) 0 ]

                            Nothing ->
                                [ left ]
                        )
                            |> Playground.group
                            |> move (width * 0.5 - width * length) 0
                    )
    in
    Playground.group shapes
        |> scale 2
        |> Tuple.pair world
