module Durak.Player.Component.Ui.Intro exposing (Data, empty, render)

import Durak.Common.Bounding.Tree as Bounding
import Game.Client.Util as Util
import Math.Vector3 as Vector3
import Playground exposing (Shape, move, moveX, moveY, scale)
import Playground.Extra.Fullscreen


type alias Data =
    { selected : Int
    , text : String
    , menu : { hitArea : Bounding.Tree Int, shape : Shape }
    }


empty : Data
empty =
    { selected = 0
    , text = ""
    , menu = initMenu [ "New Game", "Join", "Rules", "Credits" ]
    }


render : Float -> Data -> Playground.Shape
render time data =
    [ bg
    , parallax time
    , Playground.image 328 124 "logo"
        |> moveY (Util.snap (inQuad (cos (time * 0.0025) * 0.5 + 0.5) * 20))
    , (if data.selected < 4 then
        startMenu data

       else if data.selected == 100 || data.selected == 101 then
        let
            title =
                if data.selected == 100 then
                    "Server Name"

                else
                    "Join To"

            text =
                if remainderBy 1000 (round time) > 300 then
                    data.text ++ "_"

                else
                    data.text ++ " "
        in
        [ Playground.words color2 title |> move 1 -1
        , Playground.words color1 title
        , [ Playground.words color2 text |> move 1 -1
          , Playground.words color1 text
          ]
            |> Playground.group
            |> Playground.moveY -32
        ]
            |> Playground.group

       else if data.selected == 200 || data.selected == 201 then
        let
            ( title, count ) =
                if data.selected == 200 then
                    ( "Creating Server", 15 )

                else
                    ( "Joining Server", 14 )
        in
        title
            |> String.padRight (count + remainderBy 4 (round (time * 0.0025))) '.'
            |> String.padRight (count + 3) ' '
            |> Playground.words color1

       else
        [ Playground.words color1 data.text ] |> Playground.group
      )
        |> moveY -96
    ]
        |> Playground.group
        |> moveY 64


parallax time =
    [ "bg0", "bg1", "bg2", "bg3", "bg4", "bg5", "bg6", "bg7", "bg8", "bg9" ]
        |> indexedFoldl
            (\i item ->
                Playground.Extra.Fullscreen.tileX 928 793 item 0
                    |> moveX (Util.snap <| toFloat (9 - i) * time * -0.01)
                    |> (::)
            )
            []
        |> Playground.group


bg =
    [ Playground.rectangle (Vector3.vec3 (0x0C / 255) (0x11 / 255) (0x22 / 255)) 9999 9999
    , Playground.rectangle (Vector3.vec3 0.462745098 0.5764705882 0.7019607843) 9999 9999
        |> moveY 5000
    ]
        |> Playground.group


type alias Easing =
    Float -> Float


inQuad : Easing
inQuad time =
    time ^ 2


startMenu data =
    let
        selected =
            toFloat data.selected
    in
    [ data.menu.shape
    , Playground.words color2 ">        <" |> scale 2 |> move 1 (-48 * selected - 2)
    , Playground.words color1 ">        <" |> scale 2 |> moveY (-48 * selected)
    ]
        |> Playground.group


initMenu : List String -> { shape : Shape, hitArea : Bounding.Tree a }
initMenu ll =
    { shape =
        indexedFoldl
            (\i text acc ->
                (Playground.words color2 text |> scale 2 |> move 1 (-48 * toFloat i - 2))
                    :: (Playground.words color1 text |> scale 2 |> moveY (-48 * toFloat i))
                    :: acc
            )
            []
            ll
            |> Playground.group
    , hitArea = Bounding.empty
    }


color1 =
    Vector3.vec3 (0xF0 / 255) (0xD6 / 255) (0x61 / 255)


color2 =
    Vector3.vec3 (0xE7 / 255) (0xA7 / 255) (0x47 / 255)


indexedFoldl : (Int -> a -> b -> b) -> b -> List a -> b
indexedFoldl func acc list =
    let
        step : a -> ( Int, b ) -> ( Int, b )
        step x ( i, thisAcc ) =
            ( i + 1, func i x thisAcc )
    in
    Tuple.second (List.foldl step ( 0, acc ) list)
