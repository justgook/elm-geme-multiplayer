module Client.Sync exposing (pack, receive, send)

import Base64
import Bytes.Decode as D exposing (Decoder)
import Bytes.Encode as E
import Client.Component.ChatCache as ChatCache
import Client.Port as Port
import Common.Bytes.Decode as D
import Common.Bytes.Encode as E
import Common.Component.Body as Body
import Common.Component.Name as Name
import Common.Component.Position as Position
import Common.Patch as Patch
import Common.Sync


pack was now =
    [ if was.chat /= now.chat then
        case now.chat of
            ( a, b ) :: _ ->
                E.sequence [ E.id a, E.sizedString b ]

            [] ->
                E.sequence []

      else
        E.sequence []
    ]


unpack =
    [ Patch.decode Name.decode |> D.map (Patch.apply Name.spec)
    , Patch.decode Position.decode |> D.map (Patch.apply Position.spec)
    , Patch.decode Body.decode |> D.map (Patch.apply Body.spec)
    , D.id |> D.map (\me w -> { w | me = me })
    , D.reverseList (D.map2 Tuple.pair D.id D.sizedString)
        |> D.map List.reverse
        |> D.map (\chat w -> { w | chat = chat, chat_ = ChatCache.cache chat w.chat_ })
    ]
        |> Common.Sync.decompose 4


receive data world =
    case data |> Base64.toBytes |> Maybe.andThen (D.decode unpack) of
        Just fn ->
            fn world

        Nothing ->
            world


send info =
    let
        data =
            info
                |> E.encode
                |> Base64.fromBytes
                |> Maybe.withDefault ""
    in
    if data == "/w==" then
        Cmd.none

    else
        Port.send data


decompose : List (Decoder (a -> a)) -> Decoder (a -> a)
decompose =
    List.map fromMaybe >> D.sequence


fromMaybe : Decoder (a -> a) -> Decoder (a -> a)
fromMaybe fn =
    D.maybe fn
        |> D.map (\m -> m |> Maybe.withDefault identity)
