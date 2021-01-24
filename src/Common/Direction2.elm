module Common.Direction2 exposing (Direction(..), formInt, fromRecord, toInt)


type Direction
    = Northeast
    | East
    | Southeast
    | South
    | Southwest
    | West
    | Northwest
    | North


toInt : Direction -> Int
toInt dir =
    case dir of
        Northeast ->
            0

        East ->
            1

        Southeast ->
            2

        South ->
            3

        Southwest ->
            4

        West ->
            5

        Northwest ->
            6

        North ->
            7


formInt : Int -> Direction
formInt i =
    case i of
        0 ->
            Northeast

        1 ->
            East

        2 ->
            Southeast

        3 ->
            South

        4 ->
            Southwest

        5 ->
            West

        6 ->
            Northwest

        7 ->
            North

        _ ->
            North


fromRecord : { a | x : Float, y : Float } -> Maybe Direction
fromRecord ({ x, y } as rec) =
    if x > 0 then
        if y > 0 then
            Just Northeast

        else if y < 0 then
            Just Southeast

        else
            Just East

    else if x < 0 then
        if y > 0 then
            Just Northwest

        else if y < 0 then
            Just Southwest

        else
            Just West

    else if y > 0 then
        Just North

    else if y < 0 then
        Just South

    else
        Nothing
