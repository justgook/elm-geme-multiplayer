module WebGL.Ui.Internal.Element exposing
    ( Aligned(..)
    , Attribute(..)
    , Color(..)
    , Element(..)
    , HAlign(..)
    , Layout
    , Length(..)
    , Location(..)
    , Option
    , Slice(..)
    , Spacing(..)
    , VAlign(..)
    , layoutWith
    , toProperties
    )


type Element msg
    = Text String
    | Empty
    | Custom Properties msg
    | Parent Properties (Element msg)
    | VParent Properties (List (Element msg))
    | HParent Properties (List (Element msg))


type Attribute msg
    = NoAttribute
      --| Custom { inherit : Bool, prop: msg2
    | Click msg
    | Width Length
    | Height Length
    | AlignY VAlign
    | AlignX HAlign
    | Padding { top : Int, right : Int, bottom : Int, left : Int }
    | Spacing Spacing
    | Nearby Location (Element msg)


type Spacing
    = SpacingEvenly
    | SpacingXY { x : Int, y : Int }


type Length
    = Px Int
    | Content
    | Fill Int
    | Min Int Length
    | Max Int Length


type Color
    = Color


type Slice
    = Slice9


type Aligned
    = Unaligned
    | Aligned (Maybe HAlign) (Maybe VAlign)


type HAlign
    = Left
    | CenterX
    | Right


type VAlign
    = Top
    | CenterY
    | Bottom


type Location
    = Above
    | Below
    | OnRight
    | OnLeft
    | InFront
    | Behind


type Option
    = Option


type alias Layout msg =
    List
        { key : msg
        , x : Int
        , y : Int
        , w : Int
        , h : Int
        }


layoutWith : List Option -> List (Attribute msg) -> Element msg -> Layout msg
layoutWith options attributes element =
    let
        propsTop =
            toProperties attributes

        defaultDimensions =
            { width = 640
            , heiht = 480
            , top = 0
            , left = 0
            , fill = { width = 640, heiht = 480 }
            }
    in
    layoutWith_ element defaultDimensions


countFillDimensions children =
    { width = 640, heiht = 480 }


layoutWith_ element dimensions =
    case element of
        Text t ->
            []

        Empty ->
            []

        Custom props id ->
            []

        Parent props child ->
            []

        VParent props children ->
            let
                _ =
                    props

                countFill =
                    List.foldl (\child acc -> acc + 1) 0 children
                        |> Debug.log "layoutWith::element"
            in
            []

        HParent props children ->
            []


type Properties2
    = WidthKnown Int
    | HeightKnown Int
    | WidthFill Int
    | HeightFill Int
    | DimensionsKnown Int Int
    | DimensionsFill Int Int


type alias Properties =
    { w : Maybe Int
    , h : Maybe Int
    , maxW : Maybe Int
    , minW : Maybe Int
    , maxH : Maybe Int
    , minH : Maybe Int
    , fillW : Maybe Int
    , fillH : Maybe Int
    , x : Int
    , y : Int
    , padding : { top : Int, right : Int, bottom : Int, left : Int }
    , spacing : Spacing
    }


toProperties : List (Attribute msg) -> Properties
toProperties attrs =
    { w = Nothing
    , h = Nothing
    , maxW = Nothing
    , minW = Nothing
    , maxH = Nothing
    , minH = Nothing
    , fillW = Nothing
    , fillH = Nothing
    , padding = { top = 0, right = 0, bottom = 0, left = 0 }
    , spacing = SpacingXY { x = 0, y = 0 }
    , x = 0
    , y = 0
    }
        |> toProperties_ attrs


toProperties_ attrs acc =
    case attrs of
        attr :: rest ->
            (case attr of
                Width l ->
                    setWidth l acc

                Height l ->
                    setHeight l acc

                Spacing spacing ->
                    { acc | spacing = spacing }

                Padding padding ->
                    { acc | padding = padding }

                _ ->
                    attr
                        |> Debug.toString
                        |> (++) "Implement toProperties for "
                        |> Debug.todo
            )
                |> toProperties_ rest

        [] ->
            acc


setWidth : Length -> Properties -> Properties
setWidth =
    setLength
        (\v acc -> { acc | w = Just v })
        (\v acc -> { acc | minW = Just v })
        (\v acc -> { acc | maxW = Just v })
        (\v acc -> { acc | fillW = Just v })


setHeight : Length -> Properties -> Properties
setHeight =
    setLength
        (\v acc -> { acc | h = Just v })
        (\v acc -> { acc | minH = Just v })
        (\v acc -> { acc | maxH = Just v })
        (\v acc -> { acc | fillH = Just v })


setLength set setMin setMax setFill value acc =
    let
        recursion =
            setLength set setMin setMax setFill
    in
    case value of
        Px v ->
            set v acc

        Fill v ->
            setFill v acc

        Min a l ->
            setMin a acc
                |> recursion l

        Max a l ->
            setMax a acc
                |> recursion l

        Content ->
            Debug.todo "Implement Content length type"
