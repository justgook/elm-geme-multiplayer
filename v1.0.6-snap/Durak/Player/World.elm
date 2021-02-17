module Durak.Player.World exposing (World, empty)

import Durak.Common.Bounding.Tree as Bounding
import Durak.Common.Card exposing (Card(..), Suit(..))
import Durak.Common.Component.Hand as Hand exposing (Hand)
import Durak.Common.Table as Table exposing (Table)
import Durak.Player.Component.Ui as Ui exposing (Ui)
import Durak.Protocol.Message exposing (ToServer)
import Playground
import WebGL exposing (Entity)


type alias World =
    { out : List ToServer
    , mouse :
        { x : Float
        , y : Float
        , key1 : Bool
        , key2 : Bool
        , click : Bool
        , dirty : Bool
        }
    , touchId : Maybe Int
    , cardHitArea : Bounding.Tree Card
    , hoverCard : Maybe Card
    , hand : Hand
    , table : Table
    , cardsLeft : Int
    , lastCard : Card
    , ui : Ui
    , playerCount : Int
    , qr : Playground.Shape
    }


empty : World
empty =
    { out = []
    , mouse =
        { x = 0
        , y = 0
        , key1 = False
        , key2 = False
        , click = False
        , dirty = False
        }
    , touchId = Nothing
    , cardHitArea = Bounding.empty
    , hoverCard = Nothing
    , hand = Hand.empty
    , table = Table.init Clubs
    , cardsLeft = 666
    , lastCard = ClubsAce
    , ui = Ui.empty
    , playerCount = 0
    , qr = Playground.group []
    }
