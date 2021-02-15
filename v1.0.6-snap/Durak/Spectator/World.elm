module Durak.Spectator.World exposing (World, empty)

import Durak.Protocol.Message exposing (ToServer)


type alias World =
    { out : List ToServer
    , players : { a : Int, b : Int, d : Int, e : Int, f : Int, g : Int }
    }


empty : World
empty =
    { out = []
    , players =
        { a = 2
        , b = 6
        , d = 6
        , e = 6
        , f = 16
        , g = 6
        }
    }
