module Common.Bytes.NewDecode exposing
    ( byte, sbyte, bool, char, uni, short, ushort, uint
    , andMap
    )

{-|


# Protocol

@docs byte, sbyte, bool, char, uni, short, ushort, int, uint


# Util

@docs andMap

-}

import Bytes exposing (Endianness(..))
import Bytes.WithOffset.Decode as D exposing (Decoder)
import Common.Bytes.Bytes exposing (Byte, Sbyte, Uint, Ushort)


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
    D.fail


{-| A 16-bit unsigned integer that represents a single unicode character.
-}
uni : Decoder Int
uni =
    D.unsignedInt16 BE


{-| A 16-bit signed integer.
-}
short : Decoder Int
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



-- Util


{-| Can be helpful when decoding large objects incrementally.
-}
andMap : Decoder a -> Decoder (a -> b) -> Decoder b
andMap argument function =
    D.map2 (<|) function argument
