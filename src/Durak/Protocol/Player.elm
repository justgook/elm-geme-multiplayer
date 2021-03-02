module Durak.Protocol.Player exposing (decode, encode)

import Bytes.Encode as E exposing (Encoder)
import Bytes.WithOffset.Decode as D exposing (Decoder)
import Durak.Common.Card as Card
import Durak.Common.Role as Role
import Durak.Common.Table as Table
import Durak.Protocol.Message exposing (ToClient(..), ToServer(..))


decode : Decoder ToClient
decode =
    D.unsignedInt8
        |> D.andThen
            (\packet ->
                case packet of
                    0x01 ->
                        D.map (Card.fromInt >> TakeCard) D.unsignedInt8

                    0x02 ->
                        D.map (Card.fromInt >> Trump) D.unsignedInt8

                    0x03 ->
                        D.map CardsLeft D.unsignedInt8

                    0x04 ->
                        D.map (Role.fromInt >> TableReset) D.unsignedInt8

                    0x05 ->
                        D.map (Card.fromInt >> ConfirmCard) D.unsignedInt8

                    0x06 ->
                        D.succeed NoMoreSeats

                    0x07 ->
                        D.succeed JoinSuccess

                    0x08 ->
                        D.map OnlineCount D.unsignedInt8

                    0x09 ->
                        D.map (Card.fromInt >> RejectCard) D.unsignedInt8

                    0x0A ->
                        D.map2 TableSpot
                            (D.map Table.spotFromInt D.unsignedInt8)
                            (D.map Card.fromInt D.unsignedInt8)

                    0x0B ->
                        D.map2 (\role cards -> ( Role.fromInt role, cards )) D.unsignedInt8 D.unsignedInt8
                            |> D.reverseList
                            |> D.map PlayerStatus

                    _ ->
                        D.fail
            )


encode : ToServer -> Encoder
encode msg =
    case msg of
        Attack card ->
            E.sequence [ E.unsignedInt8 0x01, Card.toInt card |> E.unsignedInt8 ]

        Join ->
            E.sequence [ E.unsignedInt8 0x02 ]

        Watch ->
            E.sequence [ E.unsignedInt8 0x03 ]

        Ready ->
            E.sequence [ E.unsignedInt8 0x04 ]

        Defense cover card ->
            E.sequence [ E.unsignedInt8 0x05, Table.spotToInt cover |> E.unsignedInt8, Card.toInt card |> E.unsignedInt8 ]

        Pickup ->
            E.sequence [ E.unsignedInt8 0x06 ]

        Pass ->
            E.sequence [ E.unsignedInt8 0x07 ]
