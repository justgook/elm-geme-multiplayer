module Client.Util exposing (onEvent, toScreen)

import Html exposing (Attribute)
import Html.Events
import Json.Decode exposing (Decoder)
import Playground exposing (Screen)


toScreen : Float -> Float -> Screen
toScreen width height =
    { width = width
    , height = height
    , top = height * 0.5
    , left = -width * 0.5
    , right = width * 0.5
    , bottom = -height * 0.5
    }


onEvent : String -> Decoder a -> Attribute a
onEvent e decoder =
    Html.Events.custom e
        (decoder
            |> Json.Decode.map
                (\a ->
                    { message = a
                    , stopPropagation = False
                    , preventDefault = False
                    }
                )
        )
