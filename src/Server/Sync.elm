module Server.Sync exposing (pack, receive, send)

import Base64
import Bytes
import Bytes.Decode as D
import Bytes.Encode as E exposing (Encoder)
import Common.Bytes.Decode as D
import Common.Bytes.Encode as E
import Common.Component.Body as Body
import Common.Component.Chat exposing (Chat)
import Common.Component.Name as Name
import Common.Component.Position as Position
import Common.Patch as Patch
import Common.Sync
import Dict exposing (Dict)
import Server.Port as Port exposing (ConnectionId)


pack was now =
    [ Patch.diff (Name.spec.get was) (Name.spec.get now) |> Patch.encode Name.encode
    , Patch.diff (Position.spec.get was) (Position.spec.get now) |> Patch.encode Position.encode
    , Patch.diff (Body.spec.get was) (Body.spec.get now) |> Patch.encode Body.encode
    , E.id 666
    , chatEncoder was.chat now.chat
    ]
        |> List.reverse


chatEncoder : Chat -> Chat -> Encoder
chatEncoder was now =
    if was /= now then
        List.take 10 now
            |> E.list (\( a, b ) -> E.sequence [ E.id a, E.sizedString b ])

    else
        E.sequence []


send : Encoder -> ConnectionId -> Cmd msg
send info cnn =
    let
        data =
            info
                |> E.encode
                |> Base64.fromBytes
                |> Maybe.withDefault ""
    in
    Port.send ( cnn, data )


unpack =
    [ D.map2 Tuple.pair D.id D.sizedString |> D.map (\chat w -> { w | chat = chat :: w.chat })
    ]
        |> Common.Sync.decompose 0


receive ( cnn, data ) was =
    case data |> Base64.toBytes |> Maybe.andThen (D.decode unpack) of
        Just fn ->
            let
                now =
                    fn was

                toAll =
                    pack was now
                        |> Common.Sync.compose
                        |> send
            in
            ( fn was, Dict.foldl (\k _ -> (::) (toAll k)) [] was.user |> Cmd.batch )

        Nothing ->
            ( was, Cmd.none )
