module Common.Protocol.Util exposing (fromPacket, toPacket)

import Base64
import Bytes
import Bytes.Decode exposing (Step(..))
import Bytes.Encode as E
import Bytes.WithOffset.Decode as D


type alias Packet =
    String


toPacket : (a -> E.Encoder) -> List a -> String
toPacket encode out =
    out
        |> List.map encode
        |> E.sequence
        |> E.encode
        |> Base64.fromBytes
        |> Maybe.withDefault ""


fromPacket : D.Decoder a -> String -> List a
fromPacket decoder data =
    Base64.toBytes data
        |> Maybe.andThen (\bytes -> D.decode (repeat (Bytes.width bytes) decoder) bytes)
        |> Maybe.withDefault []


repeat : Int -> D.Decoder a -> D.Decoder (List a)
repeat total decoder =
    D.loopWith []
        (\offset acc ->
            if total <= offset then
                D.succeed (Done acc)

            else
                D.map (\x -> Loop (x :: acc)) decoder
        )
