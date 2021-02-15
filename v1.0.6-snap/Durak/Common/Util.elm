module Durak.Common.Util exposing (andThen, withWorld)

import Playground exposing (Shape)


andThen : { a | world : world } -> ({ a | world : world } -> ( world, Shape )) -> ( world, Shape ) -> ( world, Shape )
andThen model fn ( world, shape ) =
    fn { model | world = world }
        |> Tuple.mapSecond (\a -> Playground.group [ shape, a ])


withWorld : (b -> b) -> { a | world : b } -> { a | world : b }
withWorld fn model =
    { model | world = fn model.world }
