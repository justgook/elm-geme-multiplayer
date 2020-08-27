module WebGL.Ui.Element.Border exposing
    ( slice
    , color, gradient
    , width, widthXY, widthEach
    )

{-|


# Magic

@docs slice


# Color

@docs color, gradient


## Border Widths

@docs width, widthXY, widthEach

-}

import WebGL.Ui.Internal.Element as Internal exposing (Attribute, Color, Slice)


{-| The slicing process creates nine regions in total: four corners, four edges, and a middle region.
Four slice lines, set a given distance from their respective sides, control the size of the regions.
copy documentation from - <https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-slice>
-}
slice : Slice -> Attribute msg
slice slice9 =
    Internal.NoAttribute


{-| -}
color : Color -> Attribute msg
color clr =
    Internal.NoAttribute


{-| A linear gradient.
First you need to specify what direction the gradient is going by providing an angle in radians. `0` is up and `pi` is down.
The colors will be evenly spaced.
-}
gradient :
    { angle : Float
    , steps : List Color
    }
    -> Attribute msg
gradient { angle, steps } =
    Internal.NoAttribute


{-| -}
width : Int -> Attribute msg
width v =
    Internal.NoAttribute


{-| Set horizontal and vertical borders.
-}
widthXY : Int -> Int -> Attribute msg
widthXY x y =
    Internal.NoAttribute


{-| -}
widthEach : { bottom : Int, left : Int, right : Int, top : Int } -> Attribute msg
widthEach { bottom, top, left, right } =
    Internal.NoAttribute
