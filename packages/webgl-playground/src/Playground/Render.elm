module Playground.Render exposing
    ( triangle, rect, circle, image, ngon
    , tileWithColor
    )

{-|


# Types

@docs Render, Opacity, ScaleRotateSkew, Translate


# Renders

@docs triangle, rect, circle, image, ngon, tile, sprite, spriteWithColor

-}

import Math.Vector2 exposing (Vec2)
import Math.Vector3 exposing (Vec3)
import Math.Vector4 exposing (Vec4)
import Playground.Shader as Shader
import Playground.Util as Util
import WebGL exposing (Mesh, Shader)
import WebGL.Shape2d exposing (Render)
import WebGL.Texture exposing (Texture)


{-| Rectangle render
-}
rect : Vec3 -> Render
rect color uP uT z opacity =
    WebGL.entityWith
        Util.defaultEntitySettings
        Shader.vertNone
        Shader.fragFill
        Shader.mesh
        { color = Util.setAlpha color opacity
        , uP = uP
        , uT = uT
        , z = z
        }


{-| Render circle or ellipse

Example [Playground.oval](Playground#oval):

-}
circle : Vec3 -> Render
circle color uP uT z opacity =
    WebGL.entityWith
        Util.defaultEntitySettings
        Shader.vertRect
        Shader.fragCircle
        Shader.mesh
        { color = Util.setAlpha color opacity
        , uP = uP
        , uT = uT
        , z = z
        }


{-| Render regular polygon
-}
ngon : Float -> Vec3 -> Render
ngon n color uP uT z opacity =
    WebGL.entityWith
        Util.defaultEntitySettings
        Shader.vertRect
        Shader.fragNgon
        Shader.mesh
        { color = Util.setAlpha color opacity
        , uP = uP
        , n = n
        , uT = uT
        , z = z
        }


{-| -}
image : Texture -> Vec2 -> Render
image uImg uImgSize uP uT z opacity =
    WebGL.entityWith
        Util.defaultEntitySettings
        Shader.vertImage
        Shader.fragImage
        Shader.mesh
        { uP = uP
        , uT = uT
        , uImg = uImg
        , uImgSize = uImgSize
        , uA = opacity
        , z = z
        }


{-| Render tile from symmetrical tileset.

Same as [`tile`](#tile), but with color blending.

-}
tileWithColor : Texture -> Vec2 -> Vec2 -> Vec3 -> Float -> Vec2 -> Vec4 -> Float -> Float -> WebGL.Entity
tileWithColor spriteSheet spriteSize imageSize color index translate scaleRotateSkew z opacity =
    WebGL.entityWith
        Util.defaultEntitySettings
        Shader.vertTile
        Shader.fragImageColor
        Shader.mesh
        { uP = translate
        , uT = scaleRotateSkew
        , index = index
        , spriteSize = spriteSize
        , uImg = spriteSheet
        , uImgSize = imageSize
        , uA = opacity
        , color = Util.setAlpha color opacity
        , z = z
        }


{-| Render triangle
-}
triangle : Vec3 -> ( Vec2, Vec2, Vec2 ) -> Render
triangle color ( vert0, vert1, vert2 ) translate scaleRotateSkew z opacity =
    WebGL.entityWith
        Util.defaultEntitySettings
        Shader.vertTriangle
        Shader.fragFill
        Shader.meshTriangle
        { uP = translate
        , uT = scaleRotateSkew
        , vert0 = vert0
        , vert1 = vert1
        , vert2 = vert2
        , color = Util.setAlpha color opacity
        , z = z
        }
