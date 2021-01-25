module Common.Protocol.Client exposing (decode, encode)

import Bytes.Encode as E exposing (Encoder)
import Bytes.WithOffset.Decode as D exposing (Decoder)
import Common.Bytes.NewDecode as D
import Common.Bytes.NewEncode as E
import Common.Direction2 as Direction
import Common.Protocol.Message exposing (LoginConfirmData, ToClient(..), ToServer(..))
import MD5


decode : Decoder ToClient
decode =
    D.unsignedInt8
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
        RequestMovement dir srq key ->
            E.sequence [ E.byte 0x02, E.byte (Direction.toInt dir), E.byte srq, E.uint key ]

        LoginRequest { password, login } ->
            let
                pass =
                    MD5.bytes password |> List.map E.byte |> E.sequence
            in
            E.sequence [ E.byte 0x80, pass ]
