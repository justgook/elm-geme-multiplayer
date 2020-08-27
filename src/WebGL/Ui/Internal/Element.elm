module WebGL.Ui.Internal.Element exposing (Aligned(..), Attribute(..), Color(..), Element(..), HAlign(..), Layout, Length(..), Location(..), Option, Slice(..), VAlign(..))


type Element msg
    = Text String
    | Empty
    | Custom msg


type Attribute msg
    = NoAttribute
    | Click msg
    | Width Length
    | Height Length
    | AlignY VAlign
    | AlignX HAlign
    | Nearby Location (Element msg)


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
