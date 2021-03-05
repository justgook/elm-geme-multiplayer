module Durak.Server.Component.Turn exposing (Turn, add, attack, defence, empty, fold, length, member, next, remove)

import Logic.Entity exposing (EntityID)


{-| [attack, defence, support,..support]
-}
type alias Turn =
    List EntityID


empty : Turn
empty =
    []


member : EntityID -> Turn -> Bool
member =
    List.member


length : Turn -> Int
length =
    List.length


attack : Turn -> EntityID
attack turn =
    case turn of
        a :: _ ->
            a

        _ ->
            -1


defence : Turn -> EntityID
defence turn =
    case turn of
        _ :: a :: _ ->
            a

        a :: _ ->
            a

        _ ->
            -1


add : EntityID -> Turn -> Turn
add id t =
    id :: t


remove : EntityID -> Turn -> Turn
remove id turn =
    case turn of
        [] ->
            []

        y :: ys ->
            if id == y then
                ys

            else
                y :: remove id ys


next : Turn -> Turn
next t =
    case t of
        id :: rest ->
            rest ++ [ id ]

        [] ->
            []


fold : (EntityID -> acc -> acc) -> acc -> Turn -> acc
fold fn acc turn =
    List.foldl fn acc turn
