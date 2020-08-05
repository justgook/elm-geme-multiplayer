module Client.Asset.Text exposing (chat, text, tileAnsiFont)

import Dict
import Playground exposing (Color, group, move, rgb)
import WebGL.Shape2d exposing (Shape2d)
import WebGL.Ui.Advanced
import WebGL.Ui.AnsiText
import WebGL.Ui.Util


text : String -> Shape2d
text =
    tileAnsiFont (.shapes >> group) (rgb 18 147 216)


chat : String -> Shape2d
chat =
    tileAnsiFont (.shapes >> group >> move 0 7) (rgb 18 147 216)


charW =
    7


charH =
    9


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
    WebGL.Ui.Util.withTexture "/assets/charmap-oldschool_white.png"
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
                                    WebGL.Ui.Advanced.char
                                        texture
                                        (WebGL.Ui.Util.textureSize texture)
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
            WebGL.Ui.AnsiText.parse fn1__
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
