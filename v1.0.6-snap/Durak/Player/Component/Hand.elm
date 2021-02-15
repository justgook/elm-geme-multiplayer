module Durak.Player.Component.Hand exposing (Hand, empty, foldl, indexedFoldl, length, push, remove)

{-| Remove the element at the given index
-}

import Durak.Common.Card as Card exposing (Card)
import Set.Any


type alias Hand =
    Set.Any.AnySet Int Card


empty : Hand
empty =
    Set.Any.empty Card.toInt


length : Hand -> Int
length =
    Set.Any.size


foldl : (Card -> acc -> acc) -> acc -> Hand -> acc
foldl =
    Set.Any.foldl


indexedFoldl : (Int -> Card -> acc -> acc) -> acc -> Hand -> acc
indexedFoldl func acc list =
    Tuple.second (foldl (indexedFoldlStep func) ( 0, acc ) list)


indexedFoldlStep : (Int -> Card -> acc -> acc) -> Card -> ( Int, acc ) -> ( Int, acc )
indexedFoldlStep fn x ( i, thisAcc ) =
    ( i + 1, fn i x thisAcc )


remove : Card -> Hand -> Hand
remove =
    Set.Any.remove


push : Card -> Hand -> Hand
push =
    Set.Any.insert
