module Playground.Util exposing
    ( shape, withTexture
    , setAlpha, size
    , defaultEntitySettings
    )

{-|


# Utils

@docs shape, withTexture


## Converting fun

@docs setAlpha, size


## WebGL settings

@docs defaultEntitySettings

-}

import Math.Vector2 exposing (Vec2, vec2)
import Math.Vector3 exposing (Vec3)
import Math.Vector4 exposing (Vec4)
import WebGL.Settings as WebGL exposing (Setting)
import WebGL.Settings.Blend as Blend
import WebGL.Settings.DepthTest as DepthTest
import WebGL.Shape2d exposing (Form(..), Render, Shape2d(..))
import WebGL.Texture exposing (Texture)


{-| -}
defaultEntitySettings : List Setting
defaultEntitySettings =
    [ Blend.add Blend.srcAlpha Blend.oneMinusSrcAlpha
    , WebGL.colorMask True True True False
    , DepthTest.lessOrEqual { write = True, near = 0, far = 1 }
    ]


{-| -}
setAlpha : Vec3 -> Float -> Vec4
setAlpha =
    Math.Vector3.toRecord >> (\a -> Math.Vector4.vec4 a.x a.y a.z)


{-| -}
size : Texture -> Vec2
size t =
    WebGL.Texture.size t |> (\( w, h ) -> vec2 (toFloat w) (toFloat h))


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
