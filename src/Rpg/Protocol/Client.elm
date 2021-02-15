module Rpg.Protocol.Client exposing (decode, encode)

import Common.Direction2 as Direction
import Rpg.Bytes.Decode as D exposing (Decoder)
import Rpg.Bytes.Encode as E exposing (Encoder)
import Rpg.Protocol.Message exposing (LoginConfirmData, ToClient(..), ToServer(..))


decode : Decoder ToClient
decode =
    D.byte
        |> D.andThen
            (\packet ->
                case packet of
                    0x1B ->
                        D.succeed LoginConfirmData
                            |> D.andMap D.uint
                            |> D.andMap D.ushort
                            |> D.andMap D.ushort
                            |> D.andMap D.ushort
                            |> D.andMap D.sbyte
                            |> D.andMap (D.map Direction.formInt D.byte)
                            |> D.map LoginConfirm

                    _ ->
                        D.fail
            )


encode : ToServer -> Encoder
encode data =
    case data of
        MovementRequest dir srq key ->
            E.sequence [ E.byte 0x02, E.byte (Direction.toInt dir), E.byte srq, E.uint key ]

        LoginRequest { login, password } ->
            E.sequence [ E.byte 0x80, E.string login, E.md5 password ]
