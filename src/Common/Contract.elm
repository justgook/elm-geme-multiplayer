module Common.Contract exposing
    ( ClientWorld
    , ServerWorld
    , emptyServerWorld
    , toClient
    , toServer
    )

import Bytes
import Bytes.Decode as D exposing (Decoder)
import Bytes.Encode as E exposing (Encoder)
import Client.Component.ChatCache as ChatCache
import Common.Bytes.Decode as D
import Common.Bytes.Encode as E
import Common.Component.Chat as Chat
import Common.Component.Name as Name exposing (Name)
import Common.Component.Position as Position exposing (Position)
import Dict exposing (Dict)
import Logic.Component as Component exposing (Set)
import Logic.Entity exposing (EntityID)
import Server.Port as Port


type alias Packer state =
    ( Pack state, Unpack state )


type alias Pack state =
    state -> Encoder


type alias Unpack state =
    Decoder (state -> state)


toServer : ( { a | chat : List ( EntityID, String ) } -> Encoder, Unpack { b | chat : List ( EntityID, String ) } )
toServer =
    ( [ .chat >> E.list (\( a, b ) -> E.sequence [ E.id a, E.sizedString b ]) ]
        |> List.reverse
        |> concatAndWrapPack
    , [ D.reverseList (D.map2 Tuple.pair D.id D.sizedString)
            |> D.map (\chat w -> { w | chat = chat ++ w.chat })
      ]
        |> concatAndWrapUnpack
    )


type alias ClientWorld world =
    { world
        | chat : Chat.Chat
        , chat_ : ChatCache.ChatCache
        , me : Int
        , name : Set Name
        , p : Set Position
    }


type alias ServerWorld world =
    { world
        | chat : Chat.Chat
        , name : Set Name
        , p : Set Position
    }


emptyServerWorld : ServerWorld {}
emptyServerWorld =
    { chat = Chat.empty
    , p = Position.empty
    , name = Name.empty
    }


toClient : Int -> ( ServerWorld a -> Encoder, Unpack (ClientWorld b) )
toClient me =
    ( [ Position.spec.get >> E.components E.xy
      , Name.spec.get >> E.components E.sizedString
      , .chat >> E.list (\( a, b ) -> E.sequence [ E.id a, E.sizedString b ])
      , \_ -> E.id me
      ]
        -- Have no clue why it is needed - but it is how it works
        |> List.reverse
        |> concatAndWrapPack
    , [ D.components D.xy |> D.map (\comp w -> Position.spec.set comp w)
      , D.components D.sizedString |> D.map (\comp w -> Name.spec.set comp w)
      , D.reverseList (D.map2 Tuple.pair D.id D.sizedString)
            |> D.map List.reverse
            |> D.map (\chat w -> { w | chat = chat, chat_ = ChatCache.cache chat w.chat_ })
      , D.id |> D.map (\comp w -> { w | me = comp })
      ]
        |> concatAndWrapUnpack
    )


concatAndWrapPack : List (Pack state) -> Pack state
concatAndWrapPack encoders w =
    List.map (\f -> w |> toMaybe f) encoders
        |> E.sequence


concatAndWrapUnpack : List (Unpack a) -> Unpack a
concatAndWrapUnpack =
    List.map fromMaybe >> D.sequence


fromMaybe : Unpack state -> Unpack state
fromMaybe fn =
    D.maybe fn
        |> D.map (\m -> m |> Maybe.withDefault identity)


toMaybe : Pack state -> Pack state
toMaybe p1 =
    p1
        |> (\fn a ->
                if (fn a |> E.encode |> Bytes.width) > 0 then
                    E.maybe fn (Just a)

                else
                    E.maybe fn Nothing
           )
