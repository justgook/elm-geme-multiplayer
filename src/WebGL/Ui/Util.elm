module WebGL.Ui.Util exposing (..)

import Math.Vector2 exposing (Vec2)
import Math.Vector3 as Vec3 exposing (Vec3)
import Math.Vector4 exposing (Vec4)
import WebGL.Shape2d exposing (Form(..), Render, Shape2d(..))
import WebGL.Texture as Texture exposing (Texture)


textureSize : Texture -> Vec2
textureSize t =
    let
        ( imgW, imgH ) =
            t
                |> Texture.size
                |> Tuple.mapBoth toFloat toFloat
    in
    Math.Vector2.vec2 imgW imgH


setAlpha : Vec3 -> Float -> Vec4
setAlpha =
    Vec3.toRecord >> (\a -> Math.Vector4.vec4 a.x a.y a.z)


{-| Create your own shape

    redRect w h =
        (\uP uT opacity ->
            WebGL.entity
                rectVertexShader
                fillFragment
                clipPlate
                { color = Math.Vector4.vec4 1 0 0 opacity
                , uP = uP
                , uT = uT
                }
        )
            |> shape w h

-}
shape : Float -> Float -> Render -> Shape2d
shape width height render =
    Shape2d
        { x = 0
        , y = 0
        , z = 0
        , a = 0
        , sx = 1
        , sy = 1
        , o = 1
        , form = Form width height render
        }


{-| Get texture for your custom Shape

    withTexture "image.png" <|
        \t ->
            shape 32 32 <|
                myCustomRender t

-}
withTexture : String -> (Texture -> Shape2d) -> Shape2d
withTexture url fn =
    Shape2d
        { x = 0
        , y = 0
        , z = 0
        , a = 0
        , sx = 1
        , sy = 1
        , o = 1
        , form = Textured url fn
        }
