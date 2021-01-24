module Common.Protocol.Server exposing (decode, encode)

import Bytes.Encode as E exposing (Encoder)
import Bytes.WithOffset.Decode as D exposing (Decoder)
import Common.Bytes.NewDecode as D
import Common.Bytes.NewEncode as E
import Common.Direction2 as Direction
import Common.Protocol.Message exposing (ToClient(..), ToServer(..))


decode : Decoder ToServer
decode =
    D.unsignedInt8
        |> D.andThen
            (\packet ->
                case packet of
                    0x02 ->
                        D.map3 RequestMovement (D.map Direction.formInt D.byte) D.byte D.uint

                    0x80 ->
                        let
                            _ =
                                Debug.log "Server Got" "LoginRequest"
                        in
                        D.fail

                    _ ->
                        D.fail
            )


encode : ToClient -> Encoder
encode data =
    case data of
        LoginConfirm { id, body, x, y, z, dir } ->
            E.sequence [ E.byte 0x1B, E.uint id, E.ushort body, E.ushort x, E.ushort y, E.sbyte z, E.byte (Direction.toInt dir) ]
