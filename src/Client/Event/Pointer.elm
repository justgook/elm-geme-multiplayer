module Client.Event.Pointer exposing (event)

import Client.Component.Pointer exposing (Pointer)
import Common.Util as Util
import Html exposing (Attribute)
import Html.Events as Event
import Json.Decode as D exposing (Decoder)
import Logic.System exposing (applyIf)


event : Util.Spec Pointer world -> world -> List (Attribute (world -> world))
event spec world =
    [ Event.on "pointerdown" (decoder spec)
    , Event.on "pointerup" (decoder spec)
    ]
        |> applyIf (spec.get world |> .down)
            ((::) (Event.on "pointermove" (decoder spec)))


decoder : Util.Spec Pointer world -> Decoder (world -> world)
decoder { set } =
    D.map5
        (\x y w h btn ->
            { down = btn /= 0, p = { x = -w * 0.5 + x, y = h / 2 - y } }
                |> set
        )
        (D.field "pageX" D.float)
        (D.field "pageY" D.float)
        (D.at [ "target", "offsetWidth" ] D.float)
        (D.at [ "target", "offsetHeight" ] D.float)
        (D.field "buttons" D.int)
