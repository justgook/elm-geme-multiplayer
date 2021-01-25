module Common.Bytes.NewEncode exposing (byte, sbyte, bool, char, uni, short, ushort, uint)

{-|


# Protocol

@docs byte, sbyte, bool, char, uni, short, ushort, int, uint


# Util

@docs andMap

-}

import Bytes exposing (Endianness(..))
import Bytes.Encode as E


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


{-| An 8-bit unsigned integer that represents a single ASCII character.
-}
char =
    E.unsignedInt8 13


{-| A 16-bit unsigned integer that represents a single unicode character.
-}
uni =
    E.unsignedInt16 BE


{-| A 16-bit signed integer.
-}
short =
    E.signedInt16 BE


{-| A 16-bit unsigned integer.
-}
ushort =
    E.unsignedInt16 BE


{-| A 32-bit signed integer.
-}
int =
    E.signedInt32 BE


{-| A 32-bit unsigned integer.
-}
uint =
    E.unsignedInt32 BE
