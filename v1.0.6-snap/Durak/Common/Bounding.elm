module Durak.Common.Bounding exposing (Bounding, Point, point)


type alias Bounding =
    { xmin : Float
    , ymin : Float
    , xmax : Float
    , ymax : Float
    }


type alias Point =
    { x : Float, y : Float }


point : Point -> Bounding -> Bool
point p box =
    let
        px =
            p.x

        py =
            p.y

        { xmin, xmax, ymin, ymax } =
            box
    in
    px >= xmin && px <= xmax && py >= ymin && py <= ymax
