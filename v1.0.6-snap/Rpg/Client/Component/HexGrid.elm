module Rpg.Client.Component.HexGrid exposing (shape)

import Playground exposing (black, blue, fade, move, red, rotate, white)


size =
    40


grid =
    { minQ = -5
    , maxQ = 5
    , minR = -5
    , maxR = 5
    }


shape : Point -> Playground.Shape
shape pointer =
    let
        hover =
            pointToFlatHex pointer
    in
    List.range grid.minQ grid.maxQ
        |> List.concatMap
            (\q ->
                List.range grid.minR grid.maxR
                    |> List.map
                        (\r ->
                            myHex
                                (if hover.q == q && hover.r == r then
                                    red

                                 else
                                    blue
                                )
                                { q = toFloat q, r = toFloat r }
                        )
            )
        |> Playground.group


myHex color hex =
    let
        { x, y } =
            flatHexToPoint hex
    in
    [ Playground.hexagon color size
        |> rotate 30
    , Playground.words white (String.fromFloat hex.q ++ "," ++ String.fromFloat hex.r)
    ]
        |> Playground.group
        |> fade 0.8
        |> move x y


flatHexToPoint : Hex -> Point
flatHexToPoint hex =
    { x = size * (3 / 2 * hex.q)
    , y = size * (sqrt 3 / 2 * hex.q + sqrt 3 * hex.r)
    }


pointToFlatHex point =
    { q = (2 / 3 * point.x) / size
    , r = (-1 / 3 * point.x + sqrt 3 / 3 * point.y) / size
    }
        |> hexRound


type alias Hex =
    { q : Float
    , r : Float
    }


type alias Point =
    { x : Float
    , y : Float
    }


hexRound hex =
    --https://www.redblobgames.com/grids/hexagons/#rounding
    -- TODO implement correct rounding
    { q = hex.q |> round
    , r = hex.r |> round
    }
