module Rpg.Protocol.Message exposing (LoginConfirmData, LoginRequestData, ToClient(..), ToServer(..))

import Common.Direction2 exposing (Direction)
import Rpg.Bytes exposing (Byte, Sbyte, Uint, Ushort)


type ToServer
    = {- 0x0 -} MovementRequest Direction Byte Uint
    | {- 0x80 -} LoginRequest LoginRequestData


type ToClient
    = {- 0x1B -} LoginConfirm LoginConfirmData


{-| Data alias
-}
type alias LoginConfirmData =
    { id : Uint, body : Ushort, x : Ushort, y : Ushort, z : Sbyte, dir : Direction }


type alias LoginRequestData =
    { login : String, password : String }
