module Durak.Protocol.Message exposing (ToClient(..), ToServer(..))

import Durak.Common.Card exposing (Card)
import Durak.Common.Role exposing (Role)
import Durak.Common.Table exposing (Spot)


type ToServer
    = {- 0x01 -} Attack Card
    | {- 0x02 -} Join
    | {- 0x03 -} Watch
    | {- 0x04 -} Ready
    | {- 0x05 -} Defence Spot Card
    | {- 0x06 -} Pickup
    | {- 0x07 -} Pass


type ToClient
    = {- 0x01 -} TakeCard Card
    | {- 0x02 -} Trump Card
    | {- 0x03 -} CardsLeft Int
    | {- 0x04 -} TableReset Role
    | {- 0x05 -} ConfirmCard Card
    | {- 0x06 -} NoMoreSeats
    | {- 0x07 -} JoinSuccess
    | {- 0x09 -} RejectCard Card
    | {- 0x0A -} TableSpot Spot Card
