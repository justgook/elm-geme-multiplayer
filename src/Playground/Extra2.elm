module Playground.Extra2 exposing (color, greyscale, invert, none, spriteWith, tileWith, tint)

import Math.Vector2 exposing (Vec2, vec2)
import Playground.Settings exposing (defaultEntitySettings, size)
import Playground.ShaderNew as Shader
import Playground.ShaderOld as Shader
import WebGL exposing (Entity, Shader)
import WebGL.Shape2d exposing (Form(..), Render, Shape2d(..))


{-| Show tile with effect from a tileset.

    tileWith none 16 24 "sprites.png" 3

-}
tileWith effect tileW tileH tileset uI =
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
                            Form tileW tileH <| effect Shader.vertTile t (vec2 tileW tileH) (size t) (toFloat uI)
                        }
        }


{-| Show sprite with effect from a sprite sheet.

    spriteWith none 16 24 "sprites.png" 3

-}
spriteWith effect tileW tileH tileset uI =
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
                            Form tileW tileH <| effect Shader.vertSprite t (vec2 tileW tileH) (size t) (toFloat uI)
                        }
        }



{- Effects -}


invert vert spriteSheet spriteSize imageSize uI translate scaleRotateSkew z opacity =
    effectWrap Shader.fragInvert
        vert
        { uP = translate
        , uT = scaleRotateSkew
        , uI = uI
        , spriteSize = spriteSize
        , uImg = spriteSheet
        , uImgSize = imageSize
        , uA = opacity
        , z = z
        }


none vert spriteSheet spriteSize imageSize uI translate scaleRotateSkew z opacity =
    effectWrap Shader.fragImage
        vert
        { uP = translate
        , uT = scaleRotateSkew
        , uI = uI
        , spriteSize = spriteSize
        , uImg = spriteSheet
        , uImgSize = imageSize
        , uA = opacity
        , z = z
        }


color cColor vert spriteSheet spriteSize imageSize uI translate scaleRotateSkew z opacity =
    effectWrap Shader.fragColor
        vert
        { uP = translate
        , uT = scaleRotateSkew
        , uI = uI
        , spriteSize = spriteSize
        , uImg = spriteSheet
        , uImgSize = imageSize
        , uA = opacity
        , z = z

        ----
        , uC = cColor
        }


tint cColor vert spriteSheet spriteSize imageSize uI translate scaleRotateSkew z opacity =
    effectWrap Shader.fragTint
        vert
        { uP = translate
        , uT = scaleRotateSkew
        , uI = uI
        , spriteSize = spriteSize
        , uImg = spriteSheet
        , uImgSize = imageSize
        , uA = opacity
        , z = z

        ----
        , uC = cColor
        }


greyscale vert spriteSheet spriteSize imageSize uI translate scaleRotateSkew z opacity =
    effectWrap Shader.fragGreyscale
        vert
        { uP = translate
        , uT = scaleRotateSkew
        , uI = uI
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
