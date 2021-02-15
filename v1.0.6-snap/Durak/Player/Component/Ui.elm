module Durak.Player.Component.Ui exposing (Ui(..), empty, noneButton, passButton, pickupButton, render, role, waitForNextGame, waiting)

import Durak.Common.Bounding exposing (Bounding)
import Durak.Common.Bounding.Tree as Bounding
import Durak.Common.Role as Role exposing (Role)
import Durak.Player.Component.Card as Card
import Game.Ui as Ui
import Playground exposing (Shape, black, move, moveY, red, white)
import Playground.Extra as Playground


type Ui
    = Init
    | WaitForNextGame
    | Waiting Buttons
    | Ready
    | CountDown Float
    | Attack
    | Support
    | CanPass Buttons
    | YouPass
    | Defence Buttons
    | Win
    | Lose


type alias Buttons =
    { hitArea : Bounding.Tree Int
    , shape : Shape
    }


empty : Ui
empty =
    Init


role : Role -> Ui -> Ui
role rr ui =
    case rr of
        Role.Attack ->
            Attack

        Role.Defence ->
            let
                state =
                    noneButton
            in
            Defence
                { state | shape = Playground.words red "Defence" }

        Role.Support ->
            Support

        Role.Win ->
            Win

        Role.Lose ->
            Lose


noneButton : Buttons
noneButton =
    { hitArea = Bounding.empty
    , shape = Playground.group []
    }


pickupButton : Buttons
pickupButton =
    let
        ( hitArea, shape ) =
            button "Pickup" 0 (Card.size.height * 2)
    in
    { hitArea = Bounding.empty |> Bounding.insert 1 hitArea
    , shape = shape
    }


waiting : Ui
waiting =
    Waiting
        { hitArea = Bounding.empty |> Bounding.insert 1 { xmin = -72, xmax = 72, ymin = -34, ymax = 34 }
        , shape =
            [ Playground.sprite "/Durak/asset/buttons.png"
                { xmin = 0, xmax = 36, ymin = 0, ymax = 17 }
            ]
                |> Playground.group
                |> Playground.scale 4
        }


passButton =
    let
        ( hitArea, shape ) =
            button "Pass" 0 (Card.size.height * 2)
    in
    { hitArea = Bounding.empty |> Bounding.insert 1 hitArea
    , shape = shape
    }


waitForNextGame : Ui
waitForNextGame =
    WaitForNextGame


render : Ui -> Shape
render ui =
    case ui of
        Init ->
            Playground.words Playground.blue "Connecting"

        WaitForNextGame ->
            Playground.words Playground.blue "Wait For Next Game"

        Waiting { shape } ->
            shape

        Ready ->
            Playground.words Playground.blue "Ready"

        Attack ->
            Playground.words Playground.blue "Attack"
                |> moveY (Card.size.height * 2)

        Support ->
            Playground.words Playground.blue "Support"
                |> moveY (Card.size.height * 2)

        CanPass { shape } ->
            shape

        YouPass ->
            Playground.words Playground.blue "You Pass"
                |> moveY (Card.size.height * 2)

        Defence { shape } ->
            shape

        Win ->
            Playground.words Playground.blue "Win"

        Lose ->
            Playground.words Playground.blue "Lose"

        CountDown timeLeft ->
            ceiling timeLeft
                |> String.fromInt
                |> (++) "Game Starts in"
                |> Playground.words Playground.blue


button : String -> Float -> Float -> ( Bounding, Shape )
button words x y =
    let
        width =
            words |> String.length |> (*) 4 |> (+) 8 |> toFloat

        height =
            18

        x1 =
            width * -2 + x

        x2 =
            width * 2 + x

        y1 =
            height * 2 + y

        y2 =
            height * -2 + y

        bounding =
            { xmin = min x1 x2
            , xmax = max x1 x2
            , ymin = min y1 y2
            , ymax = max y1 y2
            }
    in
    ( bounding
    , [ [ background width height
        ]
            |> Playground.group
            |> Playground.scale 4
      , [ Playground.words black words |> move 2 -2
        , Playground.words white words
        ]
            |> Playground.group
            |> moveY 4
      ]
        |> Playground.group
        |> move x y
    )


background =
    Ui.panel
        "/Durak/asset/buttons.png"
        { bounds = { x = 34, y = 72, w = 18, h = 18 }
        , slice = { x = 7, y = 6, w = 4, h = 5 }
        }
