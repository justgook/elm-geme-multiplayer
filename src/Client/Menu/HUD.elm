module Client.Menu.HUD exposing (view)

import WebGL.Ui.Element as Element exposing (..)


view =
    let
        box : Element Int
        box =
            Element.el [ width (px 100), height (px 100) ] (image [] 0)

        myLayout : Layout Int
        myLayout =
            [ Element.row [ width fill, spaceEvenly ] [ box, box, box ]
            , Element.row [ width fill, spaceEvenly ] [ box, box, box ]
            , Element.row [ width fill, spaceEvenly ] [ box, box, box ]
            ]
                |> Element.column
                    [ width fill
                    , height fill
                    , spaceEvenly
                    , padding 20
                    ]
                |> Element.layout []
    in
    myLayout
