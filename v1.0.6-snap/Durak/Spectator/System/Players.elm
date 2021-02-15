module Durak.Spectator.System.Players exposing (system)

import Durak.Player.Component.Card as Card
import Durak.Spectator.World exposing (World)
import Game.Client.Model exposing (Model)
import Playground exposing (Shape, move, moveX, moveY, rotate, scale)



--type alias Screen =
--    { width : Float
--    , height : Float
--    , top : Float
--    , left : Float
--    , right : Float
--    , bottom : Float
--    }


system : Model World -> ( World, Shape )
system { screen, world } =
    let
        offset =
            10
    in
    List.filterMap
        (\count ->
            if count > 0 then
                ( List.repeat count Card.back
                    |> List.indexedMap (\i -> moveX (toFloat i * offset))
                    |> Playground.group
                , toFloat count
                )
                    |> Just

            else
                Nothing
        )
        [ world.players.a, world.players.b, world.players.d, world.players.e, world.players.f, world.players.g ]
        |> (\l ->
                let
                    pCount =
                        List.length l
                            |> toFloat
                in
                if pCount > 0 then
                    l
                        |> List.indexedMap
                            (\i ( a, count ) ->
                                Playground.group [ move ((count - 1) * -offset * 0.5) (screen.top - 32) a ]
                                    |> rotate (360 / pCount * toFloat i)
                            )

                else
                    l |> List.map Tuple.first
           )
        |> Playground.group
        |> Tuple.pair world
