module WebGL.Ui.Element.Background exposing
    ( slice
    , color, gradient
    , image, uncropped, tiled, tiledX, tiledY
    )

{-|


# Magic

@docs slice


# Color

@docs color, gradient


# Images

@docs image, uncropped, tiled, tiledX, tiledY

**Note** if you want more control over a background image than is provided here, you should try just using a normal `Element.image` with something like `Element.behindContent`.

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


{-| Resize the image to fit the containing element while maintaining proportions and cropping the overflow.
-}
image : String -> Attribute msg
image src =
    Internal.NoAttribute


{-| A centered background image that keeps its natural proportions, but scales to fit the space.
-}
uncropped : String -> Attribute msg
uncropped src =
    Internal.NoAttribute


{-| Tile an image in the x and y axes.
-}
tiled : String -> Attribute msg
tiled src =
    Internal.NoAttribute


{-| Tile an image in the x axis.
-}
tiledX : String -> Attribute msg
tiledX src =
    Internal.NoAttribute


{-| Tile an image in the y axis.
-}
tiledY : String -> Attribute msg
tiledY src =
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
