module Client.Component.Chat exposing (Chat, empty)

import Playground exposing (Shape)


type alias Chat =
    { input : String
    , active : Bool
    , messages : List Shape
    , messages_ : List String
    }


empty : Chat
empty =
    { input = "Enter Your text"
    , active = True
    , messages = []
    , messages_ = []
    }
