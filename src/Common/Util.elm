module Common.Util exposing (Spec)


type alias Spec comp world =
    { get : world -> comp
    , set : comp -> world -> world
    }
