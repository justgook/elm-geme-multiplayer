module Rpg.Protocol.Server exposing (decode, encode)

import Common.Direction2 as Direction
import Rpg.Bytes.Decode as D exposing (Decoder)
import Rpg.Bytes.Encode as E exposing (Encoder)
import Rpg.Protocol.Message exposing (LoginRequestData, ToClient(..), ToServer(..))


decode : Decoder ToServer
decode =
    D.byte
        |> D.andThen
            (\packet ->
                case packet of
                    0x02 ->
                        D.map3 MovementRequest (D.map Direction.formInt D.byte) D.byte D.uint

                    0x80 ->
                        D.map2 LoginRequestData D.string D.md5 |> D.map LoginRequest

                    _ ->
                        D.fail
            )


encode : ToClient -> Encoder
encode data =
    case data of
        LoginConfirm { id, body, x, y, z, dir } ->
            E.sequence [ E.byte 0x1B, E.uint id, E.ushort body, E.ushort x, E.ushort y, E.sbyte z, E.byte (Direction.toInt dir) ]
