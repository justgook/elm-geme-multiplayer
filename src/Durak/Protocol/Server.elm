module Durak.Protocol.Server exposing (..)

import Bytes.Encode as E exposing (Encoder)
import Bytes.WithOffset.Decode as D exposing (Decoder)
import Durak.Common.Card as Card
import Durak.Common.Role as Role
import Durak.Common.Table as Table
import Durak.Protocol.Message exposing (ToClient(..), ToServer(..))


decode : Decoder ToServer
decode =
    D.unsignedInt8
        |> D.andThen
            (\packet ->
                case packet of
                    0x01 ->
                        D.map (Card.fromInt >> Attack) D.unsignedInt8

                    0x02 ->
                        D.succeed Join

                    0x03 ->
                        D.succeed Watch

                    0x04 ->
                        D.succeed Ready

                    0x05 ->
                        D.map2 Defence
                            (D.map Table.spotFromInt D.unsignedInt8)
                            (D.map Card.fromInt D.unsignedInt8)

                    0x06 ->
                        D.succeed Pickup

                    0x07 ->
                        D.succeed Pass

                    _ ->
                        D.fail
            )


encode : ToClient -> Encoder
encode msg =
    case msg of
        TakeCard card ->
            E.sequence [ E.unsignedInt8 0x01, Card.toInt card |> E.unsignedInt8 ]

        Trump card ->
            E.sequence [ E.unsignedInt8 0x02, Card.toInt card |> E.unsignedInt8 ]

        CardsLeft count ->
            E.sequence [ E.unsignedInt8 0x03, E.unsignedInt8 count ]

        TableReset role ->
            E.sequence [ E.unsignedInt8 0x04, Role.toInt role |> E.unsignedInt8 ]

        --E.sequence [ E.unsignedInt8 0x04 ]
        ConfirmCard card ->
            E.sequence [ E.unsignedInt8 0x05, Card.toInt card |> E.unsignedInt8 ]

        NoMoreSeats ->
            E.sequence [ E.unsignedInt8 0x06 ]

        JoinSuccess ->
            E.sequence [ E.unsignedInt8 0x07 ]

        OnlineCount i ->
            E.sequence [ E.unsignedInt8 0x08, E.unsignedInt8 i ]

        --Role role ->
        --    E.sequence [ E.unsignedInt8 0x08, Role.toInt role |> E.unsignedInt8 ]
        RejectCard card ->
            E.sequence [ E.unsignedInt8 0x09, Card.toInt card |> E.unsignedInt8 ]

        TableSpot spot card ->
            E.sequence [ E.unsignedInt8 0x0A, Table.spotToInt spot |> E.unsignedInt8, Card.toInt card |> E.unsignedInt8 ]
