module Rpg.Bytes.Decode exposing
    ( byte, sbyte, bool, char, uni, short, ushort, uint, md5
    , string
    , andMap
    , Decoder, decode, map, map2, map3, map4, map5, andThen, succeed, fail
    )

{-|


# Protocol

@docs byte, sbyte, bool, char, uni, short, ushort, int, uint, md5


# String

@docs string


# Util

@docs andMap, repeat


# Aliases

@docs Decoder, decode, map, map2, map3, map4, map5, andThen, succeed, fail

-}

import Bitwise
import Bytes exposing (Endianness(..))
import Bytes.Decode exposing (Step(..))
import Bytes.WithOffset.Decode as D
import Rpg.Bytes exposing (Byte, Sbyte, Short, Uint, Uni, Ushort)


{-| -}
decode : D.Decoder a -> Bytes.Bytes -> Maybe a
decode =
    D.decode


{-| -}
type alias Decoder a =
    D.Decoder a


{-| -}
map : (a -> b) -> Decoder a -> Decoder b
map =
    D.map


{-| -}
map2 : (a -> b -> result) -> Decoder a -> Decoder b -> Decoder result
map2 =
    D.map2


{-| -}
map3 : (a -> b -> c -> result) -> Decoder a -> Decoder b -> Decoder c -> Decoder result
map3 =
    D.map3


{-| -}
map4 : (a -> b -> c -> d -> result) -> Decoder a -> Decoder b -> Decoder c -> Decoder d -> Decoder result
map4 =
    D.map4


{-| -}
map5 : (a -> b -> c -> d -> e -> result) -> Decoder a -> Decoder b -> Decoder c -> Decoder d -> Decoder e -> Decoder result
map5 =
    D.map5


{-| -}
andThen : (a -> Decoder b) -> Decoder a -> Decoder b
andThen =
    D.andThen


{-| -}
succeed : a -> D.Decoder a
succeed =
    D.succeed


{-| -}
fail : Decoder a
fail =
    D.fail



--- PROTOCOL


{-| MD5 hash password
-}
md5 : Decoder String
md5 =
    let
        listStep d ( n, xs ) =
            if n <= 0 then
                D.succeed (Done xs)

            else
                D.map (\x -> Loop ( n - 1, x :: xs )) d

        decoder =
            D.map (\a -> String.fromList [ unsafeToDigit (Bitwise.shiftRightBy 4 a), unsafeToDigit (Bitwise.and a 15) ]) D.unsignedInt8
    in
    D.loop ( 16, [] ) (listStep decoder)
        |> D.map (List.reverse >> String.join "")



--MD5.bytes >> List.map byte >> sequence


{-| An 8-bit unsigned integer.
-}
byte : Decoder Byte
byte =
    D.unsignedInt8


{-| An 8-bit signed integer.
-}
sbyte : Decoder Sbyte
sbyte =
    D.signedInt8


{-| An 8-bit unsigned integer representing a boolean value.
0=False, 1=True
-}
bool : Decoder Bool
bool =
    D.unsignedInt8
        |> D.andThen
            (\i ->
                if i == 1 then
                    D.succeed True

                else if i == 0 then
                    D.succeed False

                else
                    D.fail
            )


{-| An 8-bit unsigned integer that represents a single ASCII character.
-}
char : Decoder Char
char =
    D.unsignedInt8 |> D.map Char.fromCode


{-| A 16-bit unsigned integer that represents a single unicode character.
-}
uni : Decoder Uni
uni =
    D.unsignedInt16 BE


{-| A 16-bit signed integer.
-}
short : Decoder Short
short =
    D.signedInt16 BE


{-| A 16-bit unsigned integer.
-}
ushort : Decoder Ushort
ushort =
    D.unsignedInt16 BE


{-| A 32-bit signed integer.
-}
int : Decoder Int
int =
    D.signedInt32 BE


{-| A 32-bit unsigned integer.
-}
uint : Decoder Uint
uint =
    D.unsignedInt32 BE


string : Decoder String
string =
    D.unsignedInt32 BE
        |> D.andThen D.string



-- Util


{-| Can be helpful when decoding large objects incrementally.
-}
andMap : Decoder a -> Decoder (a -> b) -> Decoder b
andMap argument function =
    D.map2 (<|) function argument



-- Helper functions


unsafeToDigit : Int -> Char
unsafeToDigit num =
    case num of
        0 ->
            '0'

        1 ->
            '1'

        2 ->
            '2'

        3 ->
            '3'

        4 ->
            '4'

        5 ->
            '5'

        6 ->
            '6'

        7 ->
            '7'

        8 ->
            '8'

        9 ->
            '9'

        10 ->
            'a'

        11 ->
            'b'

        12 ->
            'c'

        13 ->
            'd'

        14 ->
            'e'

        15 ->
            'f'

        _ ->
            -- if this ever gets called with a number over 15, it will never
            -- terminate! If that happens, debug further by uncommenting this:
            --
            -- Debug.todo ("Tried to convert " ++ toString num ++ " to hexadecimal.")
            unsafeToDigit num
