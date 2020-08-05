module Playground.Extra2 exposing (circleInvert, color, greyscale, invert, none, spriteWith, tileWith, tint)

import Math.Vector2 exposing (Vec2, vec2)
import Math.Vector3 exposing (Vec3)
import Math.Vector4 exposing (Vec4)
import Playground.ShaderNew as Shader
import Playground.ShaderOld as Shader
import WebGL exposing (Entity, Shader)
import WebGL.Settings as WebGL exposing (Setting)
import WebGL.Settings.Blend as Blend
import WebGL.Settings.DepthTest as DepthTest
import WebGL.Shape2d exposing (Form(..), Render, Shape2d(..))
import WebGL.Texture exposing (Texture)


circleInvert : Float -> Vec3 -> Shape2d
circleInvert d bgColor =
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
                        Shader.vertFullscreenInvert
                        Shader.fragFxCircle
                        Shader.mesh
                        { uC = setAlpha bgColor opacity
                        , uP = uP
                        , uT = uT
                        , z = z
                        }
        }


{-| Show tile with effect from a tileset.

    tileWith none 16 24 "sprites.png" 3

-}
tileWith effect tileW tileH tileset index =
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
                            Form tileW tileH <| effect Shader.vertTile t (vec2 tileW tileH) (size t) (toFloat index)
                        }
        }


{-| Show sprite with effect from a sprite sheet.

    spriteWith none 16 24 "sprites.png" 3

-}
spriteWith effect tileW tileH tileset index =
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
                            Form tileW tileH <| effect Shader.vertSprite t (vec2 tileW tileH) (size t) (toFloat index)
                        }
        }



{- Effects -}


invert vert spriteSheet spriteSize imageSize index translate scaleRotateSkew z opacity =
    effectWrap Shader.fragInvert
        vert
        { uP = translate
        , uT = scaleRotateSkew
        , index = index
        , spriteSize = spriteSize
        , uImg = spriteSheet
        , uImgSize = imageSize
        , uA = opacity
        , z = z
        }


none vert spriteSheet spriteSize imageSize index translate scaleRotateSkew z opacity =
    effectWrap Shader.fragImage
        vert
        { uP = translate
        , uT = scaleRotateSkew
        , index = index
        , spriteSize = spriteSize
        , uImg = spriteSheet
        , uImgSize = imageSize
        , uA = opacity
        , z = z
        }


color cColor vert spriteSheet spriteSize imageSize index translate scaleRotateSkew z opacity =
    effectWrap Shader.fragColor
        vert
        { uP = translate
        , uT = scaleRotateSkew
        , index = index
        , spriteSize = spriteSize
        , uImg = spriteSheet
        , uImgSize = imageSize
        , uA = opacity
        , z = z

        ----
        , uC = cColor
        }


tint cColor vert spriteSheet spriteSize imageSize index translate scaleRotateSkew z opacity =
    effectWrap Shader.fragTint
        vert
        { uP = translate
        , uT = scaleRotateSkew
        , index = index
        , spriteSize = spriteSize
        , uImg = spriteSheet
        , uImgSize = imageSize
        , uA = opacity
        , z = z

        ----
        , uC = cColor
        }


greyscale vert spriteSheet spriteSize imageSize index translate scaleRotateSkew z opacity =
    effectWrap Shader.fragGreyscale
        vert
        { uP = translate
        , uT = scaleRotateSkew
        , index = index
        , spriteSize = spriteSize
        , uImg = spriteSheet
        , uImgSize = imageSize
        , uA = opacity
        , z = z

        ----
        }


effectWrap frag vert uniforms =
    WebGL.entityWith
        defaultEntitySettings
        vert
        frag
        Shader.mesh
        uniforms



---JUST COPY


size : WebGL.Texture.Texture -> Math.Vector2.Vec2
size t =
    WebGL.Texture.size t |> (\( w, h ) -> vec2 (toFloat w) (toFloat h))


{-| -}
defaultEntitySettings : List Setting
defaultEntitySettings =
    [ Blend.add Blend.srcAlpha Blend.oneMinusSrcAlpha
    , WebGL.colorMask True True True False
    , DepthTest.lessOrEqual { write = True, near = 0, far = 1 }
    ]


setAlpha : Vec3 -> Float -> Vec4
setAlpha =
    Math.Vector3.toRecord >> (\a -> Math.Vector4.vec4 a.x a.y a.z)
