module Server.Sync exposing (pack, receive, send)

import Base64
import Bytes.Decode as D
import Bytes.Encode as E exposing (Encoder)
import Common.Bytes.Decode as D
import Common.Bytes.Encode as E
import Common.Component.Body as Body
import Common.Component.Chat exposing (Chat)
import Common.Component.Name as Name
import Common.Component.Position as Position
import Common.Component.Velocity as Velocity
import Common.Direction as Direction
import Common.Patch as Patch
import Common.Sync
import Common.Util as Util
import Dict exposing (Dict)
import Logic.Component as Component
import Server.Component.Users as Users
import Server.Port as Port exposing (ConnectionId)


pack was now =
    [ Patch.diff (Name.spec.get was) (Name.spec.get now) |> Patch.encode Name.encode
    , Patch.diff (Position.spec.get was) (Position.spec.get now) |> Patch.encode Position.encode
    , Patch.diff (Body.spec.get was) (Body.spec.get now) |> Patch.encode Body.encode
    , Patch.diff (Velocity.spec.get was) (Velocity.spec.get now) |> Patch.encode Velocity.encode
    , E.id 666
    , chatEncoder was.chat now.chat
    ]
        |> List.reverse


unpack cnn =
    let
        ll =
            [ unpackChat
            , unpackDesire cnn
            ]
    in
    ll |> Common.Sync.decompose (List.length ll - 1)


unpackChat =
    D.map2 Tuple.pair D.id D.sizedString
        |> D.map (\chat w -> { w | chat = chat :: w.chat })



--unpackDesire : Component.EntityID -> D.Decoder ({ world | v : Component.Set Velocity.Velocity } -> { world | v : Component.Set Velocity.Velocity })


unpackDesire cnn =
    --decode
    D.map3
        (\move look shoot wold ->
            let
                _ =
                    Debug.log "unpackDesire" ( look, shoot )
            in
            (Direction.fromInt >> Direction.toRecord >> always >> Component.update cnn >> Util.update Velocity.spec) move wold
        )
        D.int
        D.int
        D.bool


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
    if data == "/w==" then
        let
            _ =
                Debug.log "Server.Sync::nothing" data
        in
        Cmd.none

    else
        let
            _ =
                Debug.log "Server.Sync::sending" data
        in
        Port.send ( cnn, data )


receive ( cnn, data ) was =
    case data |> Base64.toBytes |> Maybe.andThen (D.decode (unpack (Users.entityId cnn was))) of
        Just fn ->
            let
                now =
                    fn was

                toAll =
                    pack was now
                        |> Common.Sync.compose
                        |> send
            in
            ( now, Dict.foldl (\k _ -> (::) (toAll k)) [] was.users |> Cmd.batch )

        Nothing ->
            ( was, Cmd.none )
