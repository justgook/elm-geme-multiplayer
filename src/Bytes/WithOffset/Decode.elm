module Bytes.WithOffset.Decode exposing
    ( loopWith, andThenWith
    , Decoder, decode
    , signedInt8, signedInt16, signedInt24, signedInt32
    , unsignedInt8, unsignedInt16, unsignedInt24, unsignedInt32
    , float32, float64
    , bytes
    , string
    , map, map2, map3, map4, map5
    , andThen, succeed, fail
    , loop, repeat
    )

{-|


# Extra

@docs loopWith, andThenWith


# Decoders

@docs Decoder, decode


# Integers

@docs signedInt8, signedInt16, signedInt24, signedInt32
@docs unsignedInt8, unsignedInt16, unsignedInt24, unsignedInt32


# Floats

@docs float32, float64


# Bytes

@docs bytes


# Strings

@docs string


# Map

@docs map, map2, map3, map4, map5


# And Then

@docs andThen, succeed, fail


# Loop

@docs loop, repeat

-}

import Bitwise
import Bytes exposing (Bytes, Endianness(..))
import Bytes.Decode as D exposing (Step(..))


{-| Describes how to turn a sequence of bytes into a nice Elm value.
-}
type Decoder a
    = Decoder (D.Decoder ( Int, a ))


{-| Turn a sequence of bytes into a nice Elm value.

    -- decode (unsignedInt16 BE) <0007> == Just 7
    -- decode (unsignedInt16 LE) <0700> == Just 7
    -- decode (unsignedInt16 BE) <0700> == Just 1792
    -- decode (unsignedInt32 BE) <0700> == Nothing



The `Decoder` specifies exactly how this should happen. This process may fail
if the sequence of bytes is corrupted or unexpected somehow. The examples above
show a case where there are not enough bytes.

-}
decode : Decoder a -> Bytes -> Maybe a
decode (Decoder decoder) bs =
    D.decode (D.map (\( _, v ) -> v) decoder) bs



-- SIGNED INTEGERS


{-| Decode one byte into an integer from `-128` to `127`.
-}
signedInt8 : Decoder Int
signedInt8 =
    Decoder (D.signedInt8 |> D.map (Tuple.pair 1))


{-| Decode two bytes into an integer from `-32768` to `32767`.
-}
signedInt16 : Endianness -> Decoder Int
signedInt16 endianness =
    Decoder (D.signedInt16 endianness |> D.map (Tuple.pair 2))


{-| Decode three bytes into an integer from `-8388608` to `8388607`.
-}
signedInt24 : Endianness -> Decoder Int
signedInt24 endianness =
    case endianness of
        BE ->
            map3 pack24 signedInt8 unsignedInt8 unsignedInt8

        LE ->
            map3 (\b1 b2 b3 -> pack24 b3 b2 b1) unsignedInt8 unsignedInt8 signedInt8


{-| Decode four bytes into an integer from `-2147483648` to `2147483647`.
-}
signedInt32 : Endianness -> Decoder Int
signedInt32 endianness =
    Decoder (D.signedInt32 endianness |> D.map (Tuple.pair 4))



-- UNSIGNED INTEGERS


{-| Decode one byte into an integer from `0` to `255`.
-}
unsignedInt8 : Decoder Int
unsignedInt8 =
    Decoder (D.unsignedInt8 |> D.map (Tuple.pair 1))


{-| Decode two bytes into an integer from `0` to `65535`.
-}
unsignedInt16 : Endianness -> Decoder Int
unsignedInt16 endianness =
    Decoder (D.unsignedInt16 endianness |> D.map (Tuple.pair 2))


{-| Decode three bytes into an integer from `0` to `16777215`.
-}
unsignedInt24 : Endianness -> Decoder Int
unsignedInt24 endianness =
    case endianness of
        BE ->
            map3 pack24 unsignedInt8 unsignedInt8 unsignedInt8

        LE ->
            map3 (\b1 b2 b3 -> pack24 b3 b2 b1) unsignedInt8 unsignedInt8 unsignedInt8


{-| Decode four bytes into an integer from `0` to `4294967295`.
-}
unsignedInt32 : Endianness -> Decoder Int
unsignedInt32 endianness =
    Decoder (D.unsignedInt32 endianness |> D.map (Tuple.pair 4))



-- FLOATS


{-| Decode four bytes into a floating point number.
-}
float32 : Endianness -> Decoder Float
float32 endianness =
    Decoder (D.float32 endianness |> D.map (Tuple.pair 4))


{-| Decode eight bytes into a floating point number.
-}
float64 : Endianness -> Decoder Float
float64 endianness =
    Decoder (D.float64 endianness |> D.map (Tuple.pair 8))



-- BYTES


{-| Copy a given number of bytes into a new `Bytes` sequence.
-}
bytes : Int -> Decoder Bytes
bytes n =
    Decoder (D.bytes n |> D.map (Tuple.pair n))



-- STRINGS


{-| Decode a given number of UTF-8 bytes into a `String`.

Most protocols store the width of the string right before the content, so you
will probably write things like this:

    import Bytes exposing (Endianness(..))
    import Bytes.Decode as Decode

    sizedString : Decode.Decoder String
    sizedString =
        Decode.unsignedInt32 BE
            |> Decode.andThen Decode.string

In this case we read the width as a 32-bit unsigned integer, but you have the
leeway to read the width as a [Base 128 Varint][pb] for ProtoBuf, a
[Variable-Length Integer][sql] for SQLite, or whatever else they dream up.

[pb]: https://developers.google.com/protocol-buffers/docs/encoding#varints
[sql]: https://www.sqlite.org/src4/doc/trunk/www/varint.wiki

-}
string : Int -> Decoder String
string n =
    Decoder (D.string n |> D.map (Tuple.pair n))



-- MAP


{-| Transform the value produced by a decoder. If you encode negative numbers
in a special way, you can say something like this:

    negativeInt8 : Decoder Int
    negativeInt8 =
        map negate unsignedInt8

In practice you may see something like ProtoBuf’s [ZigZag encoding][zz] which
decreases the size of small negative numbers.

[zz]: https://developers.google.com/protocol-buffers/docs/encoding#types

-}
map : (a -> b) -> Decoder a -> Decoder b
map func (Decoder decoder) =
    decoder
        |> D.map (\( n, value ) -> ( n, func value ))
        |> Decoder


{-| Combine two decoders.

    import Bytes exposing (Endiannness(..))
    import Bytes.Decode as Decode

    type alias Point =
        { x : Float, y : Float }

    decoder : Decode.Decoder Point
    decoder =
        Decode.map2 Point
            (Decode.float32 BE)
            (Decode.float32 BE)

-}
map2 : (a -> b -> result) -> Decoder a -> Decoder b -> Decoder result
map2 func (Decoder decoder1) (Decoder decoder2) =
    D.map2 (\( n1, v1 ) ( n2, v2 ) -> ( n1 + n2, func v1 v2 )) decoder1 decoder2
        |> Decoder


{-| Combine three decoders.
-}
map3 : (a -> b -> c -> result) -> Decoder a -> Decoder b -> Decoder c -> Decoder result
map3 func (Decoder decoder1) (Decoder decoder2) (Decoder decoder3) =
    D.map3 (\( n1, v1 ) ( n2, v2 ) ( n3, v3 ) -> ( n1 + n2 + n3, func v1 v2 v3 )) decoder1 decoder2 decoder3
        |> Decoder


{-| Combine four decoders.
-}
map4 : (a -> b -> c -> d -> result) -> Decoder a -> Decoder b -> Decoder c -> Decoder d -> Decoder result
map4 func (Decoder decoder1) (Decoder decoder2) (Decoder decoder3) (Decoder decoder4) =
    D.map4 (\( n1, v1 ) ( n2, v2 ) ( n3, v3 ) ( n4, v4 ) -> ( n1 + n2 + n3 + n4, func v1 v2 v3 v4 )) decoder1 decoder2 decoder3 decoder4
        |> Decoder


{-| Combine five decoders. If you need to combine more things, it is possible
to define more of these with `map2` or `andThen`.
-}
map5 : (a -> b -> c -> d -> e -> result) -> Decoder a -> Decoder b -> Decoder c -> Decoder d -> Decoder e -> Decoder result
map5 func (Decoder decoder1) (Decoder decoder2) (Decoder decoder3) (Decoder decoder4) (Decoder decoder5) =
    D.map5
        (\( n1, v1 ) ( n2, v2 ) ( n3, v3 ) ( n4, v4 ) ( n5, v5 ) ->
            ( n1 + n2 + n3 + n4 + n5, func v1 v2 v3 v4 v5 )
        )
        decoder1
        decoder2
        decoder3
        decoder4
        decoder5
        |> Decoder



-- AND THEN


{-| Decode something **and then** use that information to decode something
else. This is most common with strings or sequences where you need to read
how long the value is going to be:

    import Bytes exposing (Endianness(..))
    import Bytes.Decode as Decode

    string : Decoder String
    string =
        Decode.unsignedInt32 BE
            |> Decode.andThen Decode.string

Check out the docs for [`succeed`](#succeed), [`fail`](#fail), and
[`loop`](#loop) to see `andThen` used in more ways!

-}
andThen : (a -> Decoder b) -> Decoder a -> Decoder b
andThen callback (Decoder decode1) =
    decode1
        |> D.andThen
            (\( n1, v ) ->
                let
                    (Decoder decoder2) =
                        callback v
                in
                decoder2 |> D.map (\( n2, v2 ) -> ( n1 + n2, v2 ))
            )
        |> Decoder


{-| A decoder that always succeeds with a certain value. Maybe we are making
a `Maybe` decoder:

    import Bytes.Decode as Decode exposing (Decoder)

    maybe : Decoder a -> Decoder (Maybe a)
    maybe decoder =
        let
            helper n =
                if n == 0 then
                    Decode.succeed Nothing

                else
                    Decode.map Just decoder
        in
        Decode.unsignedInt8
            |> Decode.andThen helper

If the first byte is `00000000` then it is `Nothing`, otherwise we start
decoding the value and put it in a `Just`.

-}
succeed : a -> Decoder a
succeed a =
    Decoder <| D.succeed ( 0, a )


{-| A decoder that always fails. This can be useful when using `andThen` to
decode custom types:

    import Bytes exposing (Endianness(..))
    import Bytes.Decode as Decode
    import Bytes.Encode as Encode

    type Distance
        = Yards Float
        | Meters Float

    toEncoder : Distance -> Encode.Encoder
    toEncoder distance =
        case distance of
            Yards n ->
                Encode.sequence [ Encode.unsignedInt8 0, Encode.float32 BE n ]

            Meters n ->
                Encode.sequence [ Encode.unsignedInt8 1, Encode.float32 BE n ]

    decoder : Decode.Decoder Distance
    decoder =
        Decode.unsignedInt8
            |> Decode.andThen pickDecoder

    pickDecoder : Int -> Decode.Decoder Distance
    pickDecoder tag =
        case tag of
            0 ->
                Decode.map Yards (Decode.float32 BE)

            1 ->
                Decode.map Meters (Decode.float32 BE)

            _ ->
                Decode.fail

The encoding chosen here uses an 8-bit unsigned integer to indicate which
variant we are working with. If we are working with yards do this, if we are
working with meters do that, and otherwise something went wrong!

-}
fail : Decoder a
fail =
    Decoder <| D.fail



-- LOOP


{-| A decoder that can loop indefinitely. This can be helpful when parsing
repeated structures, like a list:

    import Bytes exposing (Endianness(..))
    import Bytes.Decode as Decode exposing (..)

    list : Decoder a -> Decoder (List a)
    list decoder =
        unsignedInt32 BE
            |> andThen (\len -> loop ( len, [] ) (listStep decoder))

    listStep : Decoder a -> ( Int, List a ) -> Decoder (Step ( Int, List a ) (List a))
    listStep decoder ( n, xs ) =
        if n <= 0 then
            succeed (Done xs)

        else
            map (\x -> Loop ( n - 1, x :: xs )) decoder

The `list` decoder first reads a 32-bit unsigned integer. That determines how
many items will be decoded. From there we use [`loop`](#loop) to track all the
items we have parsed so far and figure out when to stop.

-}
loop : state -> (state -> Decoder (Step state a)) -> Decoder a
loop state callback =
    D.loop ( 0, state )
        (\( n1, v1 ) ->
            let
                (Decoder decoder2) =
                    callback v1
            in
            decoder2
                |> D.map
                    (\( n2, v2 ) ->
                        case v2 of
                            Loop newState ->
                                Loop ( n1 + n2, newState )

                            Done result ->
                                Done ( n1 + n2, result )
                    )
        )
        |> Decoder



-- Extra


{-| Same as loop, but with current offset
-}
loopWith : state -> (Int -> state -> Decoder (Step state a)) -> Decoder a
loopWith state callback =
    D.loop ( 0, state )
        (\( n1, v1 ) ->
            let
                (Decoder decoder2) =
                    callback n1 v1
            in
            decoder2
                |> D.map
                    (\( n2, v2 ) ->
                        case v2 of
                            Loop newState ->
                                Loop ( n1 + n2, newState )

                            Done result ->
                                Done ( n1 + n2, result )
                    )
        )
        |> Decoder


{-| Same as andThen, but with current offset
-}
andThenWith : (Int -> a -> Decoder b) -> Decoder a -> Decoder b
andThenWith callback (Decoder decode1) =
    decode1
        |> D.andThen
            (\( n1, v ) ->
                let
                    (Decoder decoder2) =
                        callback n1 v
                in
                decoder2 |> D.map (\( n2, v2 ) -> ( n1 + n2, v2 ))
            )
        |> Decoder


{-| Repeat decoder bytes amount
-}
repeat : Int -> Decoder a -> Decoder (List a)
repeat total decoder =
    loopWith []
        (\offset acc ->
            if total <= offset then
                succeed (Done acc)

            else
                map (\x -> Loop (x :: acc)) decoder
        )



--- UTIL


pack24 : Int -> Int -> Int -> Int
pack24 a b c =
    Bitwise.or (Bitwise.shiftLeftBy 16 a) (Bitwise.or (Bitwise.shiftLeftBy 8 b) c)
