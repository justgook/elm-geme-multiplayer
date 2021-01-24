module ClientDebug exposing (main)

import Browser exposing (Document)
import Client
import Client.Model exposing (Message(..), Model)
import Html exposing (Html)
import Html.Attributes as H
import Json.Decode exposing (Value)


main : Program Value Model Message
main =
    Browser.element
        { init = Client.init
        , view = view2
        , update = Client.update
        , subscriptions = Client.subscriptions
        }


view2 model =
    view model


view : Model -> Html Message
view { screen, entities, world } =
    Client.wrap [ H.width (round screen.width), H.height (round screen.height) ] entities
