module Rpg.Bytes.Encode exposing
    ( byte, sbyte, bool, char, uni, short, ushort, int, uint, md5
    , string
    , Encoder, encode, sequence
    )

{-|


# Protocol

@docs byte, sbyte, bool, char, uni, short, ushort, int, uint, md5


# String

@docs string


# Aliases

@docs Encoder, encode, sequence

-}

import Bytes exposing (Bytes, Endianness(..))
import Bytes.Encode as E exposing (Encoder)
import MD5


{-| -}
encode : Encoder -> Bytes
encode =
    E.encode


{-| -}
sequence : List Encoder -> Encoder
sequence =
    E.sequence


{-| -}
type alias Encoder =
    E.Encoder


{-| An 8-bit unsigned integer.
-}
byte =
    E.unsignedInt8


{-| An 8-bit signed integer.
-}
sbyte =
    E.signedInt8


{-| An 8-bit unsigned integer representing a boolean value.
0=False, 1=True
-}
bool i =
    (if i then
        1

     else
        0
    )
        |> E.unsignedInt8



--- PROTOCOL


{-| MD5 hash password
-}
md5 : String -> Encoder
md5 =
    MD5.bytes >> List.map byte >> sequence


{-| An 8-bit unsigned integer that represents a single ASCII character.
-}
char : Char -> Encoder
char =
    Char.toCode >> E.unsignedInt8


{-| A 16-bit unsigned integer that represents a single unicode character.
-}
uni : Int -> Encoder
uni =
    E.unsignedInt16 BE


{-| A 16-bit signed integer.
-}
short : Int -> Encoder
short =
    E.signedInt16 BE


{-| A 16-bit unsigned integer.
-}
ushort : Int -> Encoder
ushort =
    E.unsignedInt16 BE


{-| A 32-bit signed integer.
-}
int : Int -> Encoder
int =
    E.signedInt32 BE


{-| A 32-bit unsigned integer.
-}
uint : Int -> Encoder
uint =
    E.unsignedInt32 BE


string : String -> Encoder
string str =
    E.sequence
        [ E.unsignedInt32 BE (E.getStringWidth str)
        , E.string str
        ]
