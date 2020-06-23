module Contract exposing (contract, toClientInitContract, toServerInitContract)

import Bytes.Decode as D exposing (Decoder)
import Bytes.Encode as E exposing (Encoder)
import Client.Component.ChatCache as ChatCache
import Common.Bytes.Decode as D
import Common.Bytes.Encode as E
import Common.Component.Body as Body exposing (Body)
import Common.Component.Chat as Chat
import Common.Component.Name as Name exposing (Name)
import Common.Component.Position as Position exposing (Position)
import Common.Patch as Patch
import Logic.Component as Component
import Server.Component.User exposing (User)


contract =
    []



---- TO server


toServerInitContract =
    [ ( toServerEncode.chat, toServerDecode.chat )
    ]


toServerEncode =
    { chat = .chat >> E.list (\( a, b ) -> E.sequence [ E.id a, E.sizedString b ]) }


toServerDecode =
    { chat =
        D.reverseList (D.map2 Tuple.pair D.id D.sizedString)
            |> D.map (\chat w -> { w | chat = chat ++ w.chat })
    }



---- TO Client


toClientInitContract =
    [ ( toClientEncode.chat, toClientDecode.chat )
    ]


toClientEncode =
    { chat = .chat >> E.list (\( a, b ) -> E.sequence [ E.id a, E.sizedString b ])
    , me = \me -> E.id me

    -- Components
    , name = \was now -> Patch.diff (Name.spec.get was) (Name.spec.get now) |> Patch.encode Name.encode
    }


toClientDecode =
    { chat =
        D.reverseList (D.map2 Tuple.pair D.id D.sizedString)
            |> D.map List.reverse
            |> D.map (\chat w -> { w | chat = chat, chat_ = ChatCache.cache chat w.chat_ })
    , me = D.id |> D.map (\comp w -> { w | me = comp })

    -- Components
    , name = Patch.decode Name.decode |> D.map (Patch.apply Name.spec)
    }


type alias World world =
    { world
        | chat : Chat.Chat
        , name : Component.Set Name
        , p : Component.Set Position
        , body : Component.Set Body
    }


type alias ClientWorld world =
    World
        { world
            | chat_ : ChatCache.ChatCache
            , me : Int
            , p : Component.Set Position
            , body : Component.Set Body
        }


type alias ServerWorld world =
    World
        { world
            | user : User
        }
