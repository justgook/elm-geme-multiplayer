module Durak.Common.Role exposing (Role(..), fromInt, toInt)


type Role
    = Attack
    | Defense
    | Support
    | Win
    | Lose


toInt : Role -> Int
toInt role =
    case role of
        Attack ->
            1

        Defense ->
            2

        Support ->
            3

        Win ->
            4

        Lose ->
            5


fromInt : Int -> Role
fromInt i =
    case i of
        1 ->
            Attack

        2 ->
            Defense

        3 ->
            Support

        4 ->
            Win

        5 ->
            Lose

        _ ->
            fromInt i
