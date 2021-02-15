module Durak.Server.Component.Hand exposing (Hand, addCards, empty, isEmpty, length, removeCard, spawn)

import Durak.Common.Card as Card exposing (Card)
import Durak.Common.Role exposing (Role(..))
import Logic.Component as Component
import Set.Any as AnySet exposing (AnySet)


type alias Hand =
    { cards : AnySet Int Card
    }


empty : Component.Set Hand
empty =
    Component.empty


spawn : Hand
spawn =
    { cards = AnySet.empty Card.toInt
    }


isEmpty : Hand -> Bool
isEmpty { cards } =
    AnySet.isEmpty cards


length : Hand -> Int
length hand =
    AnySet.size hand.cards


addCards : List Card -> Hand -> Hand
addCards cards hand =
    { hand | cards = AnySet.union (AnySet.fromList Card.toInt cards) hand.cards }


removeCard : Card -> Hand -> Hand
removeCard card hand =
    { hand | cards = AnySet.remove card hand.cards }
