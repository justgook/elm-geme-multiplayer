module Durak.Common.Table exposing
    ( Spot(..)
    , Table
    , add
    , allCover
    , cardsToCover
    , clean
    , flat
    , haveToAdd
    , hit
    , init
    , isEmpty
    , length
    , nextHitSpot
    , set
    , spot
    , spotFromInt
    , spotToInt
    , toList
    , validateAttack
    , validateDefense
    )

import Durak.Common.Card as Card exposing (Card, Suit)
import Durak.Common.Component.Hand exposing (Hand)
import Set.Any exposing (AnySet)


type alias Node a next =
    { current : a
    , cover : Maybe a
    , next : next
    }


type alias NodeLast a =
    { current : a
    , cover : Maybe a
    }


type alias Node6 a =
    Maybe (Node a (Maybe (Node a (Maybe (Node a (Maybe (Node a (Maybe (Node a (Maybe (NodeLast a)))))))))))


type alias Table =
    { table : Node6 Card
    , values : AnySet Int Card.Value
    , trump : Suit
    }


isEmpty : Table -> Bool
isEmpty { table } =
    table == Nothing


cardsToCover : Table -> Int
cardsToCover table =
    toList table
        |> List.foldl
            (\a acc ->
                if a.cover == Nothing then
                    acc - 1

                else
                    acc
            )
            6


haveToAdd : Table -> Hand -> Bool
haveToAdd table hand =
    haveToAdd_ table.values (hand |> Set.Any.toList)


haveToAdd_ values cards =
    case cards of
        card :: rest ->
            if Set.Any.member (Card.value card) values then
                True

            else
                haveToAdd_ values rest

        [] ->
            False


allCover : Table -> Bool
allCover =
    let
        helper l =
            case l of
                { cover } :: rest ->
                    if cover == Nothing then
                        False

                    else
                        helper rest

                [] ->
                    True
    in
    toList >> helper


spot : Table -> Maybe Spot
spot table =
    case length table of
        1 ->
            Just Spot1

        2 ->
            Just Spot2

        3 ->
            Just Spot3

        4 ->
            Just Spot4

        5 ->
            Just Spot5

        6 ->
            Just Spot6

        _ ->
            Nothing


validateDefense : Spot -> Card -> Table -> Bool
validateDefense spot_ card table =
    case get spot_ table of
        Just { current, cover } ->
            case cover of
                Nothing ->
                    if Card.suit card == Card.suit current then
                        Card.valueToInt (Card.value card) > Card.valueToInt (Card.value current)

                    else
                        Card.suit card == table.trump && Card.suit current /= table.trump

                Just _ ->
                    False

        _ ->
            False


validateAttack : Card -> Table -> Bool
validateAttack card { table, values } =
    if table == Nothing then
        True

    else
        Set.Any.member (Card.value card) values


nextHitSpot : Table -> Maybe Spot
nextHitSpot table =
    let
        helper a i =
            case a of
                x :: xs ->
                    if x.cover == Nothing then
                        Just (spotFromInt i)

                    else
                        helper xs (i + 1)

                [] ->
                    Nothing
    in
    helper (toList table) 1


length : Table -> Int
length { table } =
    case table of
        Just a ->
            case a.next of
                Just b ->
                    case b.next of
                        Just c ->
                            case c.next of
                                Just d ->
                                    case d.next of
                                        Just e ->
                                            case e.next of
                                                Just f ->
                                                    6

                                                Nothing ->
                                                    5

                                        Nothing ->
                                            4

                                Nothing ->
                                    3

                        Nothing ->
                            2

                Nothing ->
                    1

        Nothing ->
            0


set : Spot -> Card -> Table -> Table
set spot_ card table =
    let
        triplet =
            { current = card, cover = Nothing, next = Nothing }
    in
    (case ( spot_, table.table ) of
        ( Spot1, Nothing ) ->
            Just triplet

        ( Spot1, Just spot1 ) ->
            Just { spot1 | cover = Just card }

        ( Spot2, Just spot1 ) ->
            spot1
                |> (triplet |> applyNext)
                |> Just

        ( Spot3, Just spot1 ) ->
            spot1
                |> (triplet |> applyNext |> mapNext)
                |> Just

        ( Spot4, Just spot1 ) ->
            spot1
                |> (triplet |> applyNext |> mapNext |> mapNext)
                |> Just

        ( Spot5, Just spot1 ) ->
            spot1
                |> (triplet |> applyNext |> mapNext |> mapNext |> mapNext)
                |> Just

        ( Spot6, Just spot1 ) ->
            spot1
                |> ({ current = card, cover = Nothing } |> applyNext |> mapNext |> mapNext |> mapNext |> mapNext)
                |> Just

        _ ->
            table.table
    )
        |> (\t ->
                { table
                    | table = t
                    , values = Set.Any.insert (Card.value card) table.values
                }
           )


mapNext fn a =
    { a | next = a.next |> Maybe.map fn }


applyNext triplet a =
    case a.next of
        Just next ->
            { a | next = Just { next | cover = Just triplet.current } }

        Nothing ->
            { a | next = Just triplet }


get : Spot -> Table -> Maybe (NodeLast Card)
get spot_ table =
    let
        clean_ { current, cover } =
            { current = current, cover = cover }

        andThenNext fn =
            Maybe.andThen (.next >> fn)

        end =
            Maybe.andThen (.next >> Maybe.map clean_)
    in
    table.table
        |> (case spot_ of
                Spot1 ->
                    Maybe.map clean_

                Spot2 ->
                    end

                Spot3 ->
                    andThenNext end

                Spot4 ->
                    andThenNext (andThenNext end)

                Spot5 ->
                    andThenNext (andThenNext (andThenNext end))

                Spot6 ->
                    andThenNext (andThenNext (andThenNext (andThenNext end)))
           )


flat : Table -> List Card
flat table =
    toList table
        |> List.concatMap
            (\{ cover, current } ->
                case cover of
                    Just card ->
                        [ current, card ]

                    Nothing ->
                        [ current ]
            )


toList : Table -> List { current : Card, cover : Maybe Card, spot : Spot }
toList { table } =
    let
        clean_ spot_ { current, cover } =
            { current = current, cover = cover, spot = spot_ }
    in
    case table of
        Just a ->
            case a.next of
                Just b ->
                    case b.next of
                        Just c ->
                            case c.next of
                                Just d ->
                                    case d.next of
                                        Just e ->
                                            case e.next of
                                                Just f ->
                                                    [ clean_ Spot1 a, clean_ Spot2 b, clean_ Spot3 c, clean_ Spot4 d, clean_ Spot5 e, clean_ Spot6 f ]

                                                Nothing ->
                                                    [ clean_ Spot1 a, clean_ Spot2 b, clean_ Spot3 c, clean_ Spot4 d, clean_ Spot5 e ]

                                        Nothing ->
                                            [ clean_ Spot1 a, clean_ Spot2 b, clean_ Spot3 c, clean_ Spot4 d ]

                                Nothing ->
                                    [ clean_ Spot1 a, clean_ Spot2 b, clean_ Spot3 c ]

                        Nothing ->
                            [ clean_ Spot1 a, clean_ Spot2 b ]

                Nothing ->
                    [ clean_ Spot1 a ]

        Nothing ->
            []


type Spot
    = Spot1
    | Spot2
    | Spot3
    | Spot4
    | Spot5
    | Spot6


spotToInt : Spot -> Int
spotToInt spot_ =
    case spot_ of
        Spot1 ->
            1

        Spot2 ->
            2

        Spot3 ->
            3

        Spot4 ->
            4

        Spot5 ->
            5

        Spot6 ->
            6


spotFromInt : Int -> Spot
spotFromInt spot_ =
    case spot_ of
        1 ->
            Spot1

        2 ->
            Spot2

        3 ->
            Spot3

        4 ->
            Spot4

        5 ->
            Spot5

        6 ->
            Spot6

        _ ->
            spotFromInt spot_


add : Card -> Table -> Table
add card table =
    let
        triplet =
            Just { current = card, cover = Nothing, next = Nothing }

        tripletLast =
            Just { current = card, cover = Nothing }
    in
    (case table.table of
        Just input1 ->
            case input1.next of
                Just input2 ->
                    Just
                        { input1
                            | next =
                                Just
                                    { input2
                                        | next =
                                            case input2.next of
                                                Just input3 ->
                                                    Just
                                                        { input3
                                                            | next =
                                                                case input3.next of
                                                                    Just input4 ->
                                                                        Just
                                                                            { input4
                                                                                | next =
                                                                                    case input4.next of
                                                                                        Just input5 ->
                                                                                            Just { input5 | next = tripletLast }

                                                                                        Nothing ->
                                                                                            triplet
                                                                            }

                                                                    Nothing ->
                                                                        triplet
                                                        }

                                                Nothing ->
                                                    triplet
                                    }
                        }

                Nothing ->
                    Just { input1 | next = triplet }

        Nothing ->
            triplet
    )
        |> (\t ->
                { table
                    | table = t
                    , values = Set.Any.insert (Card.value card) table.values
                }
           )


hit : Spot -> Card -> Table -> Table
hit spot_ card table =
    (case spot_ of
        Spot1 ->
            table.table |> Maybe.map (\a -> { a | cover = Just card })

        Spot2 ->
            table.table
                |> Maybe.map
                    (\({ next } as a) ->
                        { a | next = next |> Maybe.map (\b -> { b | cover = Just card }) }
                    )

        Spot3 ->
            table.table
                |> Maybe.map
                    (\a ->
                        let
                            next1 =
                                a.next
                        in
                        { a
                            | next =
                                next1
                                    |> Maybe.map
                                        (\b ->
                                            let
                                                next2 =
                                                    b.next
                                            in
                                            { b | next = next2 |> Maybe.map (\finish -> { finish | cover = Just card }) }
                                        )
                        }
                    )

        Spot4 ->
            table.table
                |> Maybe.map
                    (\a ->
                        let
                            next1 =
                                a.next
                        in
                        { a
                            | next =
                                next1
                                    |> Maybe.map
                                        (\b ->
                                            let
                                                next2 =
                                                    b.next
                                            in
                                            { b
                                                | next =
                                                    next2
                                                        |> Maybe.map
                                                            (\c ->
                                                                let
                                                                    next3 =
                                                                        c.next
                                                                in
                                                                { c | next = next3 |> Maybe.map (\finish -> { finish | cover = Just card }) }
                                                            )
                                            }
                                        )
                        }
                    )

        Spot5 ->
            table.table
                |> Maybe.map
                    (\a ->
                        let
                            next1 =
                                a.next
                        in
                        { a
                            | next =
                                next1
                                    |> Maybe.map
                                        (\b ->
                                            let
                                                next2 =
                                                    b.next
                                            in
                                            { b
                                                | next =
                                                    next2
                                                        |> Maybe.map
                                                            (\c ->
                                                                let
                                                                    next3 =
                                                                        c.next
                                                                in
                                                                { c
                                                                    | next =
                                                                        next3
                                                                            |> Maybe.map
                                                                                (\d ->
                                                                                    let
                                                                                        next4 =
                                                                                            d.next
                                                                                    in
                                                                                    { d
                                                                                        | next =
                                                                                            next4
                                                                                                |> Maybe.map (\finish -> { finish | cover = Just card })
                                                                                    }
                                                                                )
                                                                }
                                                            )
                                            }
                                        )
                        }
                    )

        Spot6 ->
            table.table
                |> Maybe.map
                    (\a ->
                        let
                            next1 =
                                a.next
                        in
                        { a
                            | next =
                                next1
                                    |> Maybe.map
                                        (\b ->
                                            let
                                                next2 =
                                                    b.next
                                            in
                                            { b
                                                | next =
                                                    next2
                                                        |> Maybe.map
                                                            (\c ->
                                                                let
                                                                    next3 =
                                                                        c.next
                                                                in
                                                                { c
                                                                    | next =
                                                                        next3
                                                                            |> Maybe.map
                                                                                (\d ->
                                                                                    let
                                                                                        next4 =
                                                                                            d.next
                                                                                    in
                                                                                    { d
                                                                                        | next =
                                                                                            next4
                                                                                                |> Maybe.map
                                                                                                    (\e ->
                                                                                                        let
                                                                                                            next5 =
                                                                                                                e.next
                                                                                                        in
                                                                                                        { e
                                                                                                            | next =
                                                                                                                next5
                                                                                                                    |> Maybe.map (\finish -> { finish | cover = Just card })
                                                                                                        }
                                                                                                    )
                                                                                    }
                                                                                )
                                                                }
                                                            )
                                            }
                                        )
                        }
                    )
    )
        |> (\t ->
                { table
                    | table = t
                    , values = Set.Any.insert (Card.value card) table.values
                }
           )


init : Suit -> Table
init trump =
    { table = Nothing
    , values = Set.Any.empty Card.valueToInt
    , trump = trump
    }


clean : Table -> Table
clean table =
    { table
        | table = Nothing
        , values = Set.Any.empty Card.valueToInt
    }
