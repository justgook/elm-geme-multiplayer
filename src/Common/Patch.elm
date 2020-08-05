module Common.Patch exposing (Patch, apply, applyWith, decode, diff, encode)

import Array exposing (Array)
import Bytes.Decode as D exposing (Decoder)
import Bytes.Encode as E exposing (Encoder)
import Common.Bytes.Decode as D
import Common.Bytes.Encode as E
import Logic.Component as Component
import Logic.Entity exposing (EntityID)
import Logic.System as System


type alias Patch comp =
    { add : List ( EntityID, comp )
    , remove : List EntityID
    }


decode : Decoder comp -> Decoder (Patch comp)
decode d =
    D.map2 (\add remove -> { add = add, remove = remove })
        (D.reverseList (D.map2 (\id_ shapes -> ( id_, shapes )) D.id d))
        (D.reverseList D.id)


encode : (comp -> Encoder) -> Patch comp -> Encoder
encode e { add, remove } =
    E.sequence
        [ add |> E.list (\( id_, shapes ) -> E.sequence [ E.id id_, e shapes ])
        , remove |> E.list E.id
        ]


apply : Component.Spec comp world -> Patch comp -> world -> world
apply spec { add, remove } =
    System.update spec (\was -> List.foldl (\( id, v ) -> Component.spawn id v) was add)
        >> System.update spec (\was -> List.foldl Component.remove was remove)


applyWith : (comp -> Maybe comp1 -> comp1) -> Component.Spec comp1 world -> Patch comp -> world -> world
applyWith fn spec { add, remove } =
    System.update spec (\was -> List.foldl (\( id, v ) acc -> Component.spawn id (fn v (Component.get id acc)) acc) was add)
        >> System.update spec (\was -> List.foldl Component.remove was remove)


diff : Component.Set comp -> Component.Set comp -> Patch comp
diff was now =
    if was == now then
        { add = [], remove = [] }

    else
        (if Array.length was > Array.length now then
            was

         else
            now
        )
            |> indexedFoldlArray
                (\i _ (( toAdd, toRemove ) as acc) ->
                    let
                        a =
                            Array.get i was |> Maybe.withDefault Nothing

                        b =
                            Array.get i now |> Maybe.withDefault Nothing
                    in
                    if a /= b then
                        case b of
                            Just b_ ->
                                ( ( i, b_ ) :: toAdd, toRemove )

                            Nothing ->
                                ( toAdd, i :: toRemove )

                    else
                        acc
                )
                ( [], [] )
            |> (\( a, b ) -> { add = a, remove = b })


indexedFoldlArray : (Int -> a -> b -> b) -> b -> Array a -> b
indexedFoldlArray func acc arr =
    let
        step : a -> ( Int, b ) -> ( Int, b )
        step x ( i, thisAcc ) =
            ( i + 1, func i x thisAcc )
    in
    Tuple.second (Array.foldl step ( 0, acc ) arr)
