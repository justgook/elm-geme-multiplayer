module Playground.Fullscreen exposing (circle, tile)

import Math.Vector2 exposing (vec2)
import Math.Vector3 exposing (Vec3, vec3)
import Playground.Settings exposing (defaultEntitySettings, setAlpha, size)
import Playground.ShaderNew as ShaderNew
import Playground.ShaderOld as ShaderOld
import WebGL exposing (Entity, Shader)
import WebGL.Shape2d exposing (Form(..), Render, Shape2d(..))
import WebGL.Texture exposing (Texture)


tile : Float -> Float -> String -> Int -> Shape2d
tile tileW tileH tileset uI =
    Shape2d
        { x = 0
        , y = 0
        , z = 0
        , a = 0
        , sx = 1
        , sy = 1
        , o = 1
        , form =
            Textured tileset <|
                \t ->
                    Shape2d
                        { x = 0
                        , y = 0
                        , z = 0
                        , a = 0
                        , sx = 1
                        , sy = 1
                        , o = 1
                        , form =
                            Form tileW tileH <| tileRender t (vec2 tileW tileH) (size t) (toFloat uI)
                        }
        }


tileRender uImg spriteSize imageSize uI uP uT z opacity =
    WebGL.entityWith
        defaultEntitySettings
        ShaderNew.vertFullscreenInvert
        ShaderNew.fragFxTile
        ShaderOld.mesh
        { uP = uP
        , uT = uT
        , uI = uI
        , spriteSize = spriteSize
        , uImg = uImg
        , uImgSize = imageSize
        , uA = opacity
        , z = z
        }


circle : Float -> Vec3 -> Shape2d
circle d bgColor =
    Shape2d
        { x = 0
        , y = 0
        , z = 0
        , a = 0
        , sx = 1
        , sy = 1
        , o = 1
        , form =
            Form d d <|
                \uP uT z opacity ->
                    WebGL.entityWith
                        defaultEntitySettings
                        ShaderNew.vertFullscreenInvert
                        ShaderNew.fragFxCircle
                        ShaderOld.mesh
                        { uC = setAlpha bgColor opacity
                        , uP = uP
                        , uT = uT
                        , z = z
                        }
        }
