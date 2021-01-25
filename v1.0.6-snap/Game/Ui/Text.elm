module Game.Ui.Text exposing (char, chat, text, tileAnsiFont)

import Dict
import Game.Ui.Internal exposing (defaultEntitySettings, fragImageColor, mesh, vertTile)
import Game.Ui.Internal.AnsiText as AnsiText
import Game.Ui.Util as Util
import Math.Vector2 exposing (Vec2, vec2)
import Math.Vector3 exposing (Vec3)
import Playground exposing (Color, group, move, rgb)
import WebGL
import WebGL.Shape2d exposing (Form(..), Render, Shape2d(..))
import WebGL.Texture exposing (Texture)


text : String -> Shape2d
text =
    tileAnsiFont (.shapes >> group) (rgb 18 147 216)


chat : String -> Shape2d
chat =
    tileAnsiFont (.shapes >> group >> move 0 7) (rgb 18 147 216)


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


charW =
    7


charH =
    9


tileAnsiFont : ({ x : Float, y : Float, shapes : List Shape2d, color : Color } -> Shape2d) -> Color -> String -> Shape2d
tileAnsiFont fn color string =
    let
        fn2 code acc =
            case code of
                0 ->
                    { acc | color = color }

                31 ->
                    { acc | color = Playground.red }

                _ ->
                    acc

        start =
            { x = 4.5
            , y = -3.5
            , shapes = []
            , color = color
            }
    in
    Util.withTexture "/asset/font/charmap-oldschool_white.png"
        (\texture ->
            let
                fn1__ c acc =
                    case c of
                        '\n' ->
                            { acc | x = start.x, y = acc.y - charH }

                        ' ' ->
                            { acc | x = charW + acc.x }

                        _ ->
                            { acc
                                | shapes =
                                    char
                                        texture
                                        (Util.textureSize texture)
                                        charW
                                        charH
                                        acc.color
                                        acc.x
                                        acc.y
                                        (getIndex c)
                                        :: acc.shapes
                                , x = charW + acc.x
                            }
            in
            AnsiText.parse fn1__
                fn2
                start
                string
                |> fn
        )


getIndex : Char -> Float
getIndex c =
    Dict.get c letters
        |> Maybe.withDefault 96


letters =
    [ [ '\u{00A0}', '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', '0', '1' ]
    , [ '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@', 'A', 'B', 'C', ' ' ]
    , [ 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U' ]
    , [ 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g' ]
    , [ 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y' ]
    , [ 'z', '{', '|', '}', '~', '▯', '▮' ]
    ]
        |> List.concat
        |> List.indexedMap (\a b -> ( b, toFloat a ))
        |> Dict.fromList
