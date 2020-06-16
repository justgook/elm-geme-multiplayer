module Common.Component.Chat exposing (Chat, empty)

import Logic.Entity exposing (EntityID)


type alias Chat =
    List ( EntityID, String )


empty : Chat
empty =
    []
