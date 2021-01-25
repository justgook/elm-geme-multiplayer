module Common.Protocol.Message exposing (LoginConfirmData, ToClient(..), ToServer(..))

import Common.Bytes.Bytes exposing (Byte, Sbyte, Uint, Ushort)
import Common.Direction2 exposing (Direction)


type ToServer
    = {- 0x0 -} RequestMovement Direction Byte Uint
    | {- 0x80 -} LoginRequest { login : String, password : String }


type ToClient
    = {- 0x1B -} LoginConfirm LoginConfirmData


{-| Data alias
-}
type alias LoginConfirmData =
    { id : Uint, body : Ushort, x : Ushort, y : Ushort, z : Sbyte, dir : Direction }
