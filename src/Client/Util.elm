module Client.Util exposing (getTexture, onEvent, toScreen)

import Html exposing (Attribute)
import Html.Events
import Json.Decode exposing (Decoder)
import Playground exposing (Screen)
import Task
import WebGL.Texture as Texture exposing (Texture)


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


getTexture : (String -> Texture -> msg) -> (Texture.Error -> msg) -> String -> String -> Cmd msg
getTexture good bad name url =
    Texture.loadWith textureOption url
        |> Task.attempt
            (\r ->
                case r of
                    Ok t ->
                        good name t

                    Err e ->
                        bad e
            )


textureOption : Texture.Options
textureOption =
    { magnify = Texture.linear
    , minify = Texture.linear
    , horizontalWrap = Texture.clampToEdge
    , verticalWrap = Texture.clampToEdge
    , flipY = True
    }
