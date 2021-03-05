module Rpg.Client.Component.Pointer exposing (Pointer, empty)


type alias Pointer =
    { x : Float
    , y : Float
    }


empty : Pointer
empty =
    { x = 0
    , y = 0
    }
