module WebGL.Ui.Advanced exposing (char)

import Math.Vector2 exposing (Vec2, vec2)
import Math.Vector3 as Vec3 exposing (Vec3)
import WebGL exposing (Mesh, Shader)
import WebGL.Shape2d exposing (Form(..), Render, Shape2d(..))
import WebGL.Texture as Texture exposing (Texture)
import WebGL.Ui.Internal exposing (defaultEntitySettings, fragImageColor, mesh, vertTile)
import WebGL.Ui.Util as Util


char : Texture -> Vec2 -> Float -> Float -> Vec3 -> Float -> Float -> Float -> Shape2d
char spriteSheet imageSize w h color x y index =
    Shape2d
        { x = x
        , y = y
        , z = 0
        , a = 0
        , sx = 1
        , sy = 1
        , o = 1
        , form =
            Form w h <|
                tileWithColor spriteSheet (vec2 w h) imageSize color index
        }


tileWithColor : Texture -> Vec2 -> Vec2 -> Vec3 -> Float -> Render
tileWithColor spriteSheet spriteSize imageSize color index translate scaleRotateSkew z opacity =
    WebGL.entityWith
        defaultEntitySettings
        vertTile
        fragImageColor
        mesh
        { uP = translate
        , uT = scaleRotateSkew
        , index = index
        , spriteSize = spriteSize
        , uImg = spriteSheet
        , uImgSize = imageSize

        --        , uA = opacity
        , z = z
        , color = Util.setAlpha color opacity
        }
