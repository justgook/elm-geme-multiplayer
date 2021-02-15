module Game.Protocol.Util exposing (fromPacket, toPacket)

import Base64
import Bytes
import Bytes.Encode as E exposing (Encoder)
import Bytes.WithOffset.Decode as D exposing (Decoder)


type alias Packet =
    String


toPacket : (a -> Encoder) -> List a -> String
toPacket encode out =
    out
        |> List.map encode
        |> E.sequence
        |> E.encode
        |> Base64.fromBytes
        |> Maybe.withDefault ""


fromPacket : Decoder a -> String -> List a
fromPacket decoder data =
    Base64.toBytes data
        |> Maybe.andThen (\bytes -> D.decode (D.repeat (Bytes.width bytes) decoder) bytes)
        |> Maybe.withDefault []
