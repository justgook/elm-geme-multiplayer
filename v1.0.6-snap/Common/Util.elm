module Common.Util exposing (Spec, andThen, update, withWorld)

import Playground exposing (Shape)


type alias Spec comp world =
    { get : world -> comp
    , set : comp -> world -> world
    }


update : Spec comp world -> (comp -> comp) -> world -> world
update spec f world =
    spec.set (f (spec.get world)) world


andThen : { a | world : world } -> ({ a | world : world } -> ( world, Shape )) -> ( world, Shape ) -> ( world, Shape )
andThen model fn ( world, shape ) =
    fn { model | world = world }
        |> Tuple.mapSecond (\a -> Playground.group [ shape, a ])


withWorld : (b -> b) -> { a | world : b } -> { a | world : b }
withWorld fn model =
    { model | world = fn model.world }
