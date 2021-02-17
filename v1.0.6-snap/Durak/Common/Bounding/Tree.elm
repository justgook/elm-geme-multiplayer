module Durak.Common.Bounding.Tree exposing (Tree, empty, get, insert)

import Durak.Common.Bounding as Bounding exposing (Bounding, Point)



--https://github.com/ianmackenzie/elm-geometry/blob/master/src/Set2d.elm
--https://github.com/yujota/elm-collision-detection/tree/1.0.1/src


type alias Tree a =
    List ( a, Bounding )


empty : Tree a
empty =
    []


get : Point -> Tree a -> Maybe a
get p tree =
    find (Tuple.second >> Bounding.point p) tree
        |> Maybe.map Tuple.first


insert : a -> Bounding -> Tree a -> Tree a
insert a b t =
    ( a, b ) :: t



--- Util


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
