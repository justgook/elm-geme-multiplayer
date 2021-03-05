module Playground.Extra.Render exposing
    ( fullscreenCircle
    , fullscreenColor
    , fullscreenTile
    , fullscreenTileX
    , sprite
    , tile
    )

import Math.Vector2 exposing (Vec2)
import Math.Vector3 exposing (Vec3)
import Math.Vector4 exposing (Vec4)
import Playground.Extra.Shader as Shader
import Playground.Util as Util
import WebGL exposing (Mesh, Shader)
import WebGL.Shape2d exposing (Render)
import WebGL.Texture exposing (Texture)


{-| fill everything except circle
-}
fullscreenCircle : Vec3 -> Render
fullscreenCircle bgColor uP uT z opacity =
    WebGL.entityWith
        Util.defaultEntitySettings
        Shader.vertFullscreenInvert
        Shader.fragFxCircle
        Shader.mesh
        { uC = Util.setAlpha bgColor opacity
        , uP = uP
        , uT = uT
        , z = z
        }


{-| Fill screen with single color
-}
fullscreenColor : Vec3 -> Render
fullscreenColor bgColor _ _ z opacity =
    WebGL.entityWith
        Util.defaultEntitySettings
        Shader.vertFullscreen
        Shader.fragColor
        Shader.mesh
        { uC = Util.setAlpha bgColor opacity
        , z = z
        }


{-| fill screen with tile
-}
fullscreenTile : Texture -> Vec2 -> Vec2 -> Float -> Render
fullscreenTile uImg spriteSize imageSize uI uP uT z opacity =
    WebGL.entityWith
        Util.defaultEntitySettings
        Shader.vertFullscreenInvert
        Shader.fragTileFullscreen
        Shader.mesh
        { uP = uP
        , uT = uT
        , uI = uI
        , spriteSize = spriteSize
        , uImg = uImg
        , uImgSize = imageSize
        , uA = opacity
        , z = z
        }


{-| fill screen with tile repeating by X only, and discarding by Y
-}
fullscreenTileX : Texture -> Vec2 -> Vec2 -> Float -> Render
fullscreenTileX uImg spriteSize imageSize uI uP uT z opacity =
    WebGL.entityWith
        Util.defaultEntitySettings
        Shader.vertFullscreenInvert
        Shader.fragTileXFullscreen
        Shader.mesh
        { uP = uP
        , uT = uT
        , uI = uI
        , spriteSize = spriteSize
        , uImg = uImg
        , uImgSize = imageSize
        , uA = opacity
        , z = z
        }


{-| Render tile from symmetrical tileset.

All tiles is fixed size and placed in grid

-}
tile : Texture -> Vec2 -> Vec2 -> Float -> Render
tile spriteSheet spriteSize imageSize index translate scaleRotateSkew z opacity =
    WebGL.entityWith
        Util.defaultEntitySettings
        Shader.vertTile
        Shader.fragImage
        Shader.mesh
        { uP = translate
        , uT = scaleRotateSkew
        , index = index
        , spriteSize = spriteSize
        , uImg = spriteSheet
        , uImgSize = imageSize
        , uA = opacity
        , z = z
        }


{-| Render sprite from asymmetrical sprite sheet.

Sprites can be placed anywhere in tileset and each have different size

-}
sprite : Texture -> Vec2 -> Vec4 -> Render
sprite image_ imageSize uv translate scaleRotateSkew z opacity =
    WebGL.entityWith
        Util.defaultEntitySettings
        Shader.vertSprite
        Shader.fragImage
        Shader.mesh
        { uP = translate
        , uT = scaleRotateSkew
        , uA = opacity
        , uImg = image_
        , uImgSize = imageSize
        , uUV = uv
        , z = z
        }
