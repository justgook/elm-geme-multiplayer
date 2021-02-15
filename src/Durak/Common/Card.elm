module Durak.Common.Card exposing (Card(..), Suit(..), Value(..), deck, fromInt, smallDeck, suit, toInt, value, valueToInt)

import Set.Any



{- The cards in a regular order with all Clubs, followed by all Hearts, all Spades, and all Diamonds.
   Within each suit, the cards should be in this order: Ace, 2, 3, 4, 5 6,7, 8, 9, 10, Jack, Queen, and King.
-}


deck : Set.Any.AnySet Int Card
deck =
    [ ClubsAce
    , Clubs2
    , Clubs3
    , Clubs4
    , Clubs5
    , Clubs6
    , Clubs7
    , Clubs8
    , Clubs9
    , Clubs10
    , ClubsJack
    , ClubsQueen
    , ClubsKing
    , HeartsAce
    , Hearts2
    , Hearts3
    , Hearts4
    , Hearts5
    , Hearts6
    , Hearts7
    , Hearts8
    , Hearts9
    , Hearts10
    , HeartsJack
    , HeartsQueen
    , HeartsKing
    , SpadesAce
    , Spades2
    , Spades3
    , Spades4
    , Spades5
    , Spades6
    , Spades7
    , Spades8
    , Spades9
    , Spades10
    , SpadesJack
    , SpadesQueen
    , SpadesKing
    , DiamondAce
    , Diamond2
    , Diamond3
    , Diamond4
    , Diamond5
    , Diamond6
    , Diamond7
    , Diamond8
    , Diamond9
    , Diamond10
    , DiamondJack
    , DiamondQueen
    , DiamondKing
    ]
        |> Set.Any.fromList toInt


smallDeck : Set.Any.AnySet Int Card
smallDeck =
    [ ClubsAce
    , Clubs6
    , Clubs7
    , Clubs8
    , Clubs9
    , Clubs10
    , ClubsJack
    , ClubsQueen
    , ClubsKing
    , HeartsAce
    , Hearts6
    , Hearts7
    , Hearts8
    , Hearts9
    , Hearts10
    , HeartsJack
    , HeartsQueen
    , HeartsKing
    , SpadesAce
    , Spades6
    , Spades7
    , Spades8
    , Spades9
    , Spades10
    , SpadesJack
    , SpadesQueen
    , SpadesKing
    , DiamondAce
    , Diamond6
    , Diamond7
    , Diamond8
    , Diamond9
    , Diamond10
    , DiamondJack
    , DiamondQueen
    , DiamondKing
    ]
        |> Set.Any.fromList toInt


type Suit
    = Clubs
    | Hearts
    | Spades
    | Diamond


type Value
    = Ace
    | Two
    | Three
    | Four
    | Five
    | Six
    | Seven
    | Eight
    | Nine
    | Ten
    | Jack
    | Queen
    | King


valueToInt : Value -> Int
valueToInt v =
    case v of
        Ace ->
            13

        Two ->
            1

        Three ->
            2

        Four ->
            3

        Five ->
            4

        Six ->
            5

        Seven ->
            6

        Eight ->
            7

        Nine ->
            8

        Ten ->
            9

        Jack ->
            10

        Queen ->
            11

        King ->
            12


value : Card -> Value
value card =
    case card of
        ClubsAce ->
            Ace

        Clubs2 ->
            Two

        Clubs3 ->
            Three

        Clubs4 ->
            Four

        Clubs5 ->
            Five

        Clubs6 ->
            Six

        Clubs7 ->
            Seven

        Clubs8 ->
            Eight

        Clubs9 ->
            Nine

        Clubs10 ->
            Ten

        ClubsJack ->
            Jack

        ClubsQueen ->
            Queen

        ClubsKing ->
            King

        HeartsAce ->
            Ace

        Hearts2 ->
            Two

        Hearts3 ->
            Three

        Hearts4 ->
            Four

        Hearts5 ->
            Five

        Hearts6 ->
            Six

        Hearts7 ->
            Seven

        Hearts8 ->
            Eight

        Hearts9 ->
            Nine

        Hearts10 ->
            Ten

        HeartsJack ->
            Jack

        HeartsQueen ->
            Queen

        HeartsKing ->
            King

        SpadesAce ->
            Ace

        Spades2 ->
            Two

        Spades3 ->
            Three

        Spades4 ->
            Four

        Spades5 ->
            Five

        Spades6 ->
            Six

        Spades7 ->
            Seven

        Spades8 ->
            Eight

        Spades9 ->
            Nine

        Spades10 ->
            Ten

        SpadesJack ->
            Jack

        SpadesQueen ->
            Queen

        SpadesKing ->
            King

        DiamondAce ->
            Ace

        Diamond2 ->
            Two

        Diamond3 ->
            Three

        Diamond4 ->
            Four

        Diamond5 ->
            Five

        Diamond6 ->
            Six

        Diamond7 ->
            Seven

        Diamond8 ->
            Eight

        Diamond9 ->
            Nine

        Diamond10 ->
            Ten

        DiamondJack ->
            Jack

        DiamondQueen ->
            Queen

        DiamondKing ->
            King


suit : Card -> Suit
suit card =
    case card of
        ClubsAce ->
            Clubs

        Clubs2 ->
            Clubs

        Clubs3 ->
            Clubs

        Clubs4 ->
            Clubs

        Clubs5 ->
            Clubs

        Clubs6 ->
            Clubs

        Clubs7 ->
            Clubs

        Clubs8 ->
            Clubs

        Clubs9 ->
            Clubs

        Clubs10 ->
            Clubs

        ClubsJack ->
            Clubs

        ClubsQueen ->
            Clubs

        ClubsKing ->
            Clubs

        HeartsAce ->
            Hearts

        Hearts2 ->
            Hearts

        Hearts3 ->
            Hearts

        Hearts4 ->
            Hearts

        Hearts5 ->
            Hearts

        Hearts6 ->
            Hearts

        Hearts7 ->
            Hearts

        Hearts8 ->
            Hearts

        Hearts9 ->
            Hearts

        Hearts10 ->
            Hearts

        HeartsJack ->
            Hearts

        HeartsQueen ->
            Hearts

        HeartsKing ->
            Hearts

        SpadesAce ->
            Spades

        Spades2 ->
            Spades

        Spades3 ->
            Spades

        Spades4 ->
            Spades

        Spades5 ->
            Spades

        Spades6 ->
            Spades

        Spades7 ->
            Spades

        Spades8 ->
            Spades

        Spades9 ->
            Spades

        Spades10 ->
            Spades

        SpadesJack ->
            Spades

        SpadesQueen ->
            Spades

        SpadesKing ->
            Spades

        DiamondAce ->
            Diamond

        Diamond2 ->
            Diamond

        Diamond3 ->
            Diamond

        Diamond4 ->
            Diamond

        Diamond5 ->
            Diamond

        Diamond6 ->
            Diamond

        Diamond7 ->
            Diamond

        Diamond8 ->
            Diamond

        Diamond9 ->
            Diamond

        Diamond10 ->
            Diamond

        DiamondJack ->
            Diamond

        DiamondQueen ->
            Diamond

        DiamondKing ->
            Diamond


type Card
    = ClubsAce
    | Clubs2
    | Clubs3
    | Clubs4
    | Clubs5
    | Clubs6
    | Clubs7
    | Clubs8
    | Clubs9
    | Clubs10
    | ClubsJack
    | ClubsQueen
    | ClubsKing
    | HeartsAce
    | Hearts2
    | Hearts3
    | Hearts4
    | Hearts5
    | Hearts6
    | Hearts7
    | Hearts8
    | Hearts9
    | Hearts10
    | HeartsJack
    | HeartsQueen
    | HeartsKing
    | SpadesAce
    | Spades2
    | Spades3
    | Spades4
    | Spades5
    | Spades6
    | Spades7
    | Spades8
    | Spades9
    | Spades10
    | SpadesJack
    | SpadesQueen
    | SpadesKing
    | DiamondAce
    | Diamond2
    | Diamond3
    | Diamond4
    | Diamond5
    | Diamond6
    | Diamond7
    | Diamond8
    | Diamond9
    | Diamond10
    | DiamondJack
    | DiamondQueen
    | DiamondKing



--
--type Value =


fromInt : Int -> Card
fromInt i =
    case i of
        0 ->
            ClubsAce

        1 ->
            Clubs2

        2 ->
            Clubs3

        3 ->
            Clubs4

        4 ->
            Clubs5

        5 ->
            Clubs6

        6 ->
            Clubs7

        7 ->
            Clubs8

        8 ->
            Clubs9

        9 ->
            Clubs10

        10 ->
            ClubsJack

        11 ->
            ClubsQueen

        12 ->
            ClubsKing

        13 ->
            HeartsAce

        14 ->
            Hearts2

        15 ->
            Hearts3

        16 ->
            Hearts4

        17 ->
            Hearts5

        18 ->
            Hearts6

        19 ->
            Hearts7

        20 ->
            Hearts8

        21 ->
            Hearts9

        22 ->
            Hearts10

        23 ->
            HeartsJack

        24 ->
            HeartsQueen

        25 ->
            HeartsKing

        26 ->
            SpadesAce

        27 ->
            Spades2

        28 ->
            Spades3

        29 ->
            Spades4

        30 ->
            Spades5

        31 ->
            Spades6

        32 ->
            Spades7

        33 ->
            Spades8

        34 ->
            Spades9

        35 ->
            Spades10

        36 ->
            SpadesJack

        37 ->
            SpadesQueen

        38 ->
            SpadesKing

        39 ->
            DiamondAce

        40 ->
            Diamond2

        41 ->
            Diamond3

        42 ->
            Diamond4

        43 ->
            Diamond5

        44 ->
            Diamond6

        45 ->
            Diamond7

        46 ->
            Diamond8

        47 ->
            Diamond9

        48 ->
            Diamond10

        49 ->
            DiamondJack

        50 ->
            DiamondQueen

        51 ->
            DiamondKing

        _ ->
            fromInt i


toInt : Card -> Int
toInt c =
    case c of
        ClubsAce ->
            0

        Clubs2 ->
            1

        Clubs3 ->
            2

        Clubs4 ->
            3

        Clubs5 ->
            4

        Clubs6 ->
            5

        Clubs7 ->
            6

        Clubs8 ->
            7

        Clubs9 ->
            8

        Clubs10 ->
            9

        ClubsJack ->
            10

        ClubsQueen ->
            11

        ClubsKing ->
            12

        HeartsAce ->
            13

        Hearts2 ->
            14

        Hearts3 ->
            15

        Hearts4 ->
            16

        Hearts5 ->
            17

        Hearts6 ->
            18

        Hearts7 ->
            19

        Hearts8 ->
            20

        Hearts9 ->
            21

        Hearts10 ->
            22

        HeartsJack ->
            23

        HeartsQueen ->
            24

        HeartsKing ->
            25

        SpadesAce ->
            26

        Spades2 ->
            27

        Spades3 ->
            28

        Spades4 ->
            29

        Spades5 ->
            30

        Spades6 ->
            31

        Spades7 ->
            32

        Spades8 ->
            33

        Spades9 ->
            34

        Spades10 ->
            35

        SpadesJack ->
            36

        SpadesQueen ->
            37

        SpadesKing ->
            38

        DiamondAce ->
            39

        Diamond2 ->
            40

        Diamond3 ->
            41

        Diamond4 ->
            42

        Diamond5 ->
            43

        Diamond6 ->
            44

        Diamond7 ->
            45

        Diamond8 ->
            46

        Diamond9 ->
            47

        Diamond10 ->
            48

        DiamondJack ->
            49

        DiamondQueen ->
            50

        DiamondKing ->
            51
