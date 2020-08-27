module Client.Menu.Start exposing (empty, view)

import WebGL.Ui.Element as Element


empty =
    {}


view model =
    let
        return =
            Element.el [] (Element.text "Howdy!")

        --|> Debug.log "Client.Menu.Start"
    in
    return


update e m =
    m
