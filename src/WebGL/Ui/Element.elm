module WebGL.Ui.Element exposing
    ( Element, none, text, el
    , row, wrappedRow, column
    , Attribute, width, height, Length, px, shrink, fill, fillPortion, maximum, minimum
    , padding, paddingXY, paddingEach
    , spacing, spacingXY, spaceEvenly
    , centerX, centerY, alignLeft, alignRight, alignTop, alignBottom
    , Layout, layout, layoutWith, Option
    , image
    , above, below, onRight, onLeft, inFront, behindContent
    )

{-|


# Basic Elements

@docs Element, none, text, el


# Rows and Columns

When we want more than one child on an element, we want to be _specific_ about how they will be laid out.
So, the common ways to do that would be `row` and `column`.

@docs row, wrappedRow, column


# Size

@docs Attribute, width, height, Length, px, shrink, fill, fillPortion, maximum, minimum


# Padding and Spacing

There's no concept of margin in, instead we have padding and spacing.

Padding is the distance between the outer edge and the content, and spacing is the space between children.

So, if we have the following row, with some padding and spacing.

    Element.row [ padding 10, spacing 7 ]
        [ Element.el [] none
        , Element.el [] none
        , Element.el [] none
        ]

Here's what we can expect:

![Three boxes spaced 7 pixels apart. There's a 10 pixel distance from the edge of the parent to the boxes.](https://mdgriffith.gitbooks.io/style-elements/content/assets/spacing-400.png)

**Note** `spacing` set on a `paragraph`, will set the pixel spacing between lines.

@docs padding, paddingXY, paddingEach
@docs spacing, spacingXY, spaceEvenly


# Alignment

Alignment can be used to align an `Element` within another `Element`.

    Element.el [ centerX, alignTop ] (text "I'm centered and aligned top!")

If alignment is set on elements in a layout such as `row`, then the element will push the other elements in that direction. Here's an example.

    Element.row []
        [ Element.el [] Element.none
        , Element.el [ alignLeft ] Element.none
        , Element.el [ centerX ] Element.none
        , Element.el [ alignRight ] Element.none
        ]

will result in a layout like

    |-|-|    |-|    |-|

Where there are two elements on the left, one on the right, and one in the center of the space between the elements on the left and right.

**Note** For text alignment, check out `Element.Font`!

@docs centerX, centerY, alignLeft, alignRight, alignTop, alignBottom


# Rendering

@docs Layout, layout, layoutWith, Option


# Images

@docs image


# Nearby Elements

Let's say we want a dropdown menu. Essentially we want to say: _put this element below this other element, but don't affect the layout when you do_.

    Element.row []
        [ Element.el
            [ Element.below (Element.text "I'm below!")
            ]
            (Element.text "I'm normal!")
        ]

This will result in

    |- I'm normal! -|
       I'm below

Where `"I'm Below"` doesn't change the size of `Element.row`.

This is very useful for things like dropdown menus or tooltips.

@docs above, below, onRight, onLeft, inFront, behindContent

-}

import WebGL.Ui.Internal.Element as Internal


{-| The basic building block of your layout.

    howdy : Element msg
    howdy =
        Element.el [] (Element.text "Howdy!")

-}
type alias Element msg =
    Internal.Element msg


{-| An attribute that can be attached to an `Element`
-}
type alias Attribute msg =
    Internal.Attribute msg


{-| When you want to render exactly nothing.
-}
none : Element msg
none =
    Internal.Empty


{-| Create some plain text.

    text "Hello, you stylish developer!"

**Note** text does not wrap by default. In order to get text to wrap, check out `paragraph`!

-}
text : String -> Element msg
text content =
    Internal.Text content


{-| The basic building block of your layout.

You can think of an `el` as a `div`, but it can only have one child.

If you want multiple children, you'll need to use something like `row` or `column`

    import Element exposing (Element, rgb)
    import Element.Background as Background
    import Element.Border as Border

    myElement : Element msg
    myElement =
        Element.el
            [ Background.color (rgb 0 0.5 0)
            , Border.color (rgb 0 0.7 0)
            ]
            (Element.text "You've made a stylish element!")

-}
el : List (Attribute msg) -> Element msg -> Element msg
el attrs children =
    Internal.Parent (Internal.toProperties attrs) children


{-| -}
row : List (Attribute msg) -> List (Element msg) -> Element msg
row attrs children =
    Internal.HParent (Internal.toProperties attrs) children


{-| -}
column : List (Attribute msg) -> List (Element msg) -> Element msg
column attrs children =
    Internal.VParent (Internal.toProperties attrs) children


{-| Same as `row`, but will wrap if it takes up too much horizontal space.
-}
wrappedRow : List (Attribute msg) -> List (Element msg) -> Element msg
wrappedRow attrs children =
    Internal.Empty


{-| -}
type alias Length =
    Internal.Length


{-| -}
width : Length -> Attribute msg
width =
    Internal.Width


{-| -}
height : Length -> Attribute msg
height =
    Internal.Height


{-| -}
px : Int -> Length
px =
    Internal.Px


{-| Shrink an element to fit its contents.
-}
shrink : Length
shrink =
    Internal.Content


{-| Fill the available space. The available space will be split evenly between elements that have `width fill`.
-}
fill : Length
fill =
    Internal.Fill 1


{-| Sometimes you may not want to split available space evenly. In this case you can use `fillPortion` to define which elements should have what portion of the available space.

So, two elements, one with `width (fillPortion 2)` and one with `width (fillPortion 3)`. The first would get 2 portions of the available space, while the second would get 3.

**Also:** `fill == fillPortion 1`

-}
fillPortion : Int -> Length
fillPortion =
    Internal.Fill


{-| Similarly you can set a minimum boundary.

     el
        [ height
            (fill
                |> maximum 300
                |> minimum 30
            )
        ]
        (text "I will stop at 300px")

-}
minimum : Int -> Length -> Length
minimum i l =
    Internal.Min i l


{-| Add a maximum to a length.

    el
        [ height
            (fill
                |> maximum 300
            )
        ]
        (text "I will stop at 300px")

-}
maximum : Int -> Length -> Length
maximum i l =
    Internal.Max i l


{-| -}
padding : Int -> Attribute msg
padding x =
    paddingXY x x


{-| Set horizontal and vertical padding.
-}
paddingXY : Int -> Int -> Attribute msg
paddingXY x y =
    paddingEach { top = y, right = x, bottom = y, left = x }


{-| If you find yourself defining unique paddings all the time, you might consider defining

    edges =
        { top = 0
        , right = 0
        , bottom = 0
        , left = 0
        }

And then just do

    paddingEach { edges | right = 5 }

-}
paddingEach : { top : Int, right : Int, bottom : Int, left : Int } -> Attribute msg
paddingEach =
    Internal.Padding


{-| -}
centerX : Attribute msg
centerX =
    Internal.AlignX Internal.CenterX


{-| -}
centerY : Attribute msg
centerY =
    Internal.AlignY Internal.CenterY


{-| -}
alignTop : Attribute msg
alignTop =
    Internal.AlignY Internal.Top


{-| -}
alignBottom : Attribute msg
alignBottom =
    Internal.AlignY Internal.Bottom


{-| -}
alignLeft : Attribute msg
alignLeft =
    Internal.AlignX Internal.Left


{-| -}
alignRight : Attribute msg
alignRight =
    Internal.AlignX Internal.Right


{-| -}
spaceEvenly : Attribute msg
spaceEvenly =
    Internal.Spacing Internal.SpacingEvenly


{-| -}
spacing : Int -> Attribute msg
spacing x =
    spacingXY x x


{-| In the majority of cases you'll just need to use `spacing`, which will work as intended.

However for some layouts, like `textColumn`, you may want to set a different spacing for the x axis compared to the y axis.

-}
spacingXY : Int -> Int -> Attribute msg
spacingXY x y =
    Internal.Spacing (Internal.SpacingXY { x = x, y = y })


{-| This is your top level node where you can turn `Element` into `Layout`.
-}
layout : List (Attribute msg) -> Element msg -> Layout msg
layout =
    Internal.layoutWith []


{-| -}
layoutWith : List Option -> List (Attribute msg) -> Element msg -> Layout msg
layoutWith =
    Internal.layoutWith


{-| -}
type alias Option =
    Internal.Option


{-| -}
type alias Layout msg =
    Internal.Layout msg


{-| Building block of UI, to create basic shapes, for later rendering
-}
image : List (Attribute msg) -> msg -> Element msg
image attrs src =
    Internal.Custom (Internal.toProperties attrs) src



{- NEARBYS -}


createNearby : Internal.Location -> Element msg -> Attribute msg
createNearby loc element =
    case element of
        Internal.Empty ->
            Internal.NoAttribute

        _ ->
            Internal.Nearby loc element


{-| -}
below : Element msg -> Attribute msg
below element =
    createNearby Internal.Below element


{-| -}
above : Element msg -> Attribute msg
above element =
    createNearby Internal.Above element


{-| -}
onRight : Element msg -> Attribute msg
onRight element =
    createNearby Internal.OnRight element


{-| -}
onLeft : Element msg -> Attribute msg
onLeft element =
    createNearby Internal.OnLeft element


{-| This will place an element in front of another.
-}
inFront : Element msg -> Attribute msg
inFront element =
    createNearby Internal.InFront element


{-| This will place an element between the background and the content of an element.
-}
behindContent : Element msg -> Attribute msg
behindContent element =
    createNearby Internal.Behind element
