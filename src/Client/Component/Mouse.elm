module Client.Component.Mouse exposing (events)

import Client.Component.Target as Target
import Client.Util as Util
import Common.Util as Util
import Json.Decode as D


events world =
    [ Util.onEvent "pointermove" (moveMouse updateTarget)

    --, Util.onEvent "pointerdown" (decoder startStick)
    ]


updateTarget p =
    Util.update Target.spec (\cursor -> { cursor | p = p })


moveMouse fn =
    D.map4
        (\x_ y_ w h -> Util.eventToWorld x_ y_ w h |> fn)
        (D.field "pageX" D.float)
        (D.field "pageY" D.float)
        (D.at [ "target", "offsetWidth" ] D.float)
        (D.at [ "target", "offsetHeight" ] D.float)
