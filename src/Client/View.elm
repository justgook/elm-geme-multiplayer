module Client.View exposing (view, wrap)

import Client.Component.Pointer as PointerComponent
import Client.Event.Pointer as Pointer
import Client.World exposing (Message(..), Model, World)
import Html exposing (Html)
import Html.Attributes as H
import WebGL exposing (Entity)


view : Model -> Html Message
view { screen, entities, world } =
    wrap
        (H.width (round screen.width)
            :: H.height (round screen.height)
            :: Pointer.event PointerComponent.spec world
        )
        entities
        |> Html.map Event


wrap : List (Html.Attribute msg) -> List Entity -> Html msg
wrap attrs entities =
    WebGL.toHtmlWith webGLOption
        attrs
        entities


webGLOption : List WebGL.Option
webGLOption =
    [ WebGL.alpha True
    , WebGL.depth 1
    , WebGL.clearColor 1 1 1 1
    ]
