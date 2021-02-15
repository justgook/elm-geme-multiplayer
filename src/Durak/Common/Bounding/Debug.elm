module Durak.Common.Bounding.Debug exposing (Todo, explain, explainOne)

{-| This is just an alias for `Debug.todo`
-}

import Durak.Common.Bounding exposing (Bounding)
import Durak.Common.Bounding.Tree as Bounding
import Playground exposing (Shape, blue, fade, move, rectangle)


type alias Todo =
    String -> Never


explain : Todo -> Bounding.Tree a -> Shape
explain a l =
    List.map (Tuple.second >> explainOne a) l
        |> Playground.group


explainOne : Todo -> Bounding -> Shape
explainOne _ { xmin, xmax, ymin, ymax } =
    let
        width =
            abs (xmin - xmax)

        height =
            abs (ymin - ymax)
    in
    rectangle blue width height
        |> move (min xmin xmax + width * 0.5) (min ymin ymax + height * 0.5)
        |> fade 0.5
