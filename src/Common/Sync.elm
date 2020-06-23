module Common.Sync exposing (compose, decompose)

import Bytes
import Bytes.Decode as D exposing (Decoder, Step(..))
import Bytes.Encode as E exposing (Encoder)


compose : List Encoder -> Encoder
compose =
    indexedFoldl
        (\i e acc ->
            if (e |> E.encode |> Bytes.width) > 0 then
                E.sequence [ E.unsignedInt8 i, e ] :: acc

            else
                acc
        )
        [ E.unsignedInt8 -1 ]
        >> E.sequence


decompose : Int -> List (Decoder (c -> c)) -> Decoder (c -> c)
decompose index decoders =
    D.loop
        { decoders = decoders
        , index = index
        , fn = identity
        , id = Nothing
        }
        decomposeStep


decomposeStep ({ decoders, index, id } as acc) =
    case decoders of
        decoder :: rest ->
            Maybe.map D.succeed id
                |> Maybe.withDefault D.unsignedInt8
                |> D.andThen
                    (\i ->
                        if i < 0 then
                            D.succeed (Done acc.fn)

                        else if index == i then
                            decoder
                                |> D.map
                                    (\fn ->
                                        Loop
                                            { acc
                                                | decoders = rest
                                                , index = index - 1
                                                , fn = fn >> acc.fn
                                                , id = Nothing
                                            }
                                    )

                        else if index > i then
                            Loop
                                { acc
                                    | decoders = rest
                                    , index = index - 1
                                    , id = Just i
                                }
                                |> D.succeed

                        else
                            D.succeed (Done acc.fn)
                    )

        [] ->
            D.succeed (Done acc.fn)



--- LIST.EXTRA


indexedFoldl : (Int -> a -> b -> b) -> b -> List a -> b
indexedFoldl func acc list =
    let
        step : a -> ( Int, b ) -> ( Int, b )
        step x ( i, thisAcc ) =
            ( i + 1, func i x thisAcc )
    in
    Tuple.second (List.foldl step ( 0, acc ) list)
