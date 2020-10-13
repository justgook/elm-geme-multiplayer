module Common.Component.Desire exposing (Desire, decode, empty, encode, spawn, spec)

import AltMath.Vector2 exposing (Vec2)
import Bytes.Decode as D exposing (Decoder)
import Bytes.Encode as E
import Common.Bytes.Decode as D
import Common.Bytes.Encode as E
import Common.Direction as Direction
import Logic.Component as Component


type alias Desire =
    { move : Vec2
    , look : Vec2
    , shoot : Bool
    }


spawn : Desire
spawn =
    { move = Vec2 0 0
    , look = Vec2 0 0
    , shoot = False
    }


encode : Desire -> E.Encoder
encode { move, look, shoot } =
    [ move |> Direction.fromRecord |> Direction.toInt |> E.int
    , look |> Direction.fromRecord |> Direction.toInt |> E.int
    , E.bool shoot
    ]
        |> E.sequence


decode : Decoder Desire
decode =
    D.map3
        (\move look shoot ->
            { move = move |> Direction.fromInt |> Direction.toRecord
            , look = look |> Direction.fromInt |> Direction.toRecord
            , shoot = shoot
            }
        )
        D.int
        D.int
        D.bool


spec : Component.Spec Desire { world | desire : Component.Set Desire }
spec =
    Component.Spec .desire (\comps world -> { world | desire = comps })


empty : Component.Set Desire
empty =
    Component.empty
