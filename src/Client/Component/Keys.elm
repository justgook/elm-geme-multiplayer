module Client.Component.Keys exposing (Keys, empty, onKeyDown, onKeyUp, updateKeys)

import AltMath.Vector2 exposing (Vec2)
import Array
import Browser.Events
import Common.Util as Util
import Dict exposing (Dict)
import Json.Decode as D exposing (Decoder)
import Logic.Component as Component
import Logic.Entity exposing (EntityID)
import Set exposing (Set)


type alias Keys =
    { registered : Dict String ( EntityID, String )
    , pressed : Set String
    , comps : Component.Set { x : Float, y : Float, action : Set.Set String }
    }


empty : Keys
empty =
    { registered = Dict.empty
    , pressed = Set.empty
    , comps = Component.empty
    }


sub spec world =
    Sub.batch
        [ Browser.Events.onKeyDown (onKeyDown spec world)
        , Browser.Events.onKeyUp (onKeyUp spec world)
        ]


keyNames : { down : String, left : String, right : String, up : String }
keyNames =
    { left = "Move.west"
    , right = "Move.east"
    , down = "Move.south"
    , up = "Move.north"
    }


onKeyDown : Util.Spec Keys world -> world -> Decoder world
onKeyDown =
    onKeyChange Set.insert


onKeyUp : Util.Spec Keys world -> world -> Decoder world
onKeyUp =
    onKeyChange Set.remove


onKeyChange : (String -> Set String -> Set String) -> Util.Spec Keys world -> world -> Decoder world
onKeyChange update spec world =
    let
        input =
            spec.get world
    in
    D.field "code" D.string
        |> D.andThen (isRegistered input)
        |> D.andThen
            (\key ->
                update key input.pressed
                    |> updateKeys spec update key world
            )


updateKeys : Util.Spec Keys world -> (String -> Set String -> Set String) -> String -> world -> Set String -> Decoder world
updateKeys { get, set } update keyChanged world pressed =
    let
        input =
            get world
    in
    if input.pressed == pressed then
        D.fail "Nothing change"

    else
        let
            newComps =
                Dict.get keyChanged input.registered
                    |> Maybe.andThen
                        (\( id, action ) ->
                            Array.get id input.comps
                                |> Maybe.andThen identity
                                |> Maybe.map
                                    (\comp ->
                                        let
                                            actionSet =
                                                update action comp.action

                                            { x, y } =
                                                arrows keyNames actionSet
                                        in
                                        Component.set id
                                            { comp
                                                | x = x
                                                , y = y
                                                , action = actionSet
                                            }
                                            input.comps
                                    )
                        )
                    |> Maybe.withDefault input.comps

            updatedInput =
                { input | comps = newComps }
        in
        D.succeed (set { updatedInput | pressed = pressed } world)


isRegistered : { a | registered : Dict.Dict comparable v } -> comparable -> Decoder comparable
isRegistered input key =
    if Dict.member key input.registered then
        D.succeed key

    else
        D.fail "not registered key"


arrows : { a | down : String, left : String, right : String, up : String } -> Set String -> Vec2
arrows config actions =
    let
        key =
            { up = Set.member config.up actions |> boolToFloat
            , right = Set.member config.right actions |> boolToFloat
            , down = Set.member config.down actions |> boolToFloat
            , left = Set.member config.left actions |> boolToFloat
            }

        x =
            key.right - key.left

        y =
            key.up - key.down
    in
    { x = x, y = y }


boolToFloat : Bool -> Float
boolToFloat bool =
    if bool then
        1

    else
        0
