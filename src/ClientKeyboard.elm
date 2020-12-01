module ClientKeyboard exposing (main)

import Browser exposing (Document)
import Client
import Client.Component.Mouse as Mouse
import Client.World exposing (Message(..), Model)
import Html exposing (Html)
import Html.Attributes as H
import Json.Decode exposing (Value)


main : Program Value Model Message
main =
    Browser.document
        { init = Client.init
        , view = view2
        , update = Client.update
        , subscriptions =
            \model ->
                Sub.batch
                    [ Client.subscriptions model

                    --,
                    ]
        }


view2 : Model -> Document Message
view2 model =
    { title = "ClientKeyboard"
    , body = [ view model ]
    }


view : Model -> Html Message
view { screen, entities, world } =
    Client.wrap
        (H.width (round screen.width)
            :: H.height (round screen.height)
            :: Mouse.events world
         --:: UI.pointer world
        )
        entities
        |> Html.map Event
