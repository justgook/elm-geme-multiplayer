module Client.Util exposing (eventToWorld, getTexture, snap, toScreen)

import Html exposing (Attribute)
import Html.Events
import Json.Decode exposing (Decoder)
import Playground exposing (Screen)
import Task
import WebGL.Texture as Texture exposing (Texture)


snap : Float -> Float
snap =
    round >> toFloat


eventToWorld : Float -> Float -> Float -> Float -> { x : Float, y : Float }
eventToWorld x_ y_ w h =
    let
        x =
            -w * 0.5 + x_

        y =
            h * 0.5 - y_
    in
    { x = x, y = y }


toScreen : Float -> Float -> Screen
toScreen width height =
    { width = width
    , height = height
    , top = height * 0.5
    , left = -width * 0.5
    , right = width * 0.5
    , bottom = -height * 0.5
    }


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
