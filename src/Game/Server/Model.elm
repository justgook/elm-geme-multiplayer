module Game.Server.Model exposing (Model, init)


type alias Model world =
    { frame : Int
    , time : Float
    , error : String
    , world : world
    }


init : world -> Model world
init world =
    { frame = 0
    , time = 0
    , error = ""
    , world = world
    }
