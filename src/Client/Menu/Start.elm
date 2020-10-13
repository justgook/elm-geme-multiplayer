module Client.Menu.Start exposing (empty, view)

import WebGL.Ui.Element as Element


empty =
    {}


view model =
    let
        return =
            [ Element.text "Hello"
            , Element.text "World"
            ]
                |> Element.row
                    [ Element.spacing 8
                    , Element.padding 16
                    ]
                |> Element.el
                    [ Element.width (Element.px 300)
                    , Element.height (Element.px 300 |> Element.minimum 200 |> Element.maximum 400)
                    ]
                |> Element.layout []
    in
    return


update e m =
    m
