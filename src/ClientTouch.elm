module ClientTouch exposing (main)

import Browser exposing (Document)
import Client
import Client.Event.UI as UI
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
        , subscriptions = Client.subscriptions
        }


view2 : Model -> Document Message
view2 model =
    { title = "ClientTouch"
    , body = [ view model ]
    }


view : Model -> Html Message
view { screen, entities, world } =
    Client.wrap
        (H.width (round screen.width)
            :: H.height (round screen.height)
            :: UI.pointer world
        )
        entities
        |> Html.map Event
