module Playground.Extra.Fullscreen exposing
    ( circle, tile, color
    , tileX
    )

{-|


# Fullscreen effects

@docs circle, tile, color

-}

import Math.Vector2 exposing (Vec2, vec2)
import Math.Vector3 exposing (Vec3)
import Playground exposing (Color)
import Playground.Extra.Render as Render
import Playground.Util as Util
import WebGL.Shape2d exposing (Form(..), Render, Shape2d(..))


type alias Shape =
    Shape2d


tileX : Float -> Float -> String -> Int -> Shape
tileX tileW tileH tileset uI =
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
                        , form = Form tileW tileH <| Render.fullscreenTileX t (vec2 tileW tileH) (Util.size t) (toFloat uI)
                        }
        }


color : Color -> Shape
color bgColor =
    Shape2d
        { x = 0
        , y = 0
        , z = 0
        , a = 0
        , sx = 0
        , sy = 0
        , o = 1
        , form = Form 0 0 <| Render.fullscreenColor bgColor
        }


{-| -}
tile : Float -> Float -> String -> Int -> Shape
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
                        , form = Form tileW tileH <| Render.fullscreenTile t (vec2 tileW tileH) (Util.size t) (toFloat uI)
                        }
        }


{-| -}
circle : Float -> Vec3 -> Shape
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
            Form d d <| Render.fullscreenCircle bgColor
        }
