module Durak.Common.Role exposing (Role(..), fromInt, toInt)


type Role
    = Attack
    | Defence
    | Support
    | Win
    | Lose


toInt : Role -> Int
toInt role =
    case role of
        Attack ->
            1

        Defence ->
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
            Defence

        3 ->
            Support

        4 ->
            Win

        5 ->
            Lose

        _ ->
            fromInt i
