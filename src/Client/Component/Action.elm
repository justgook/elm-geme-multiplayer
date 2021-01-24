module Client.Component.Action exposing (Action, Button(..), down, empty, spec, up)

import Common.Util as Util
import Logic.System exposing (System)
import Set.Any


type alias Action =
    Set.Any.AnySet Int Button


spec : Util.Spec Action { world | action : Action }
spec =
    Util.Spec .action (\comps world -> { world | action = comps })


empty : Action
empty =
    Set.Any.empty buttonToInt


down : Button -> Action -> Action
down btn stats =
    Set.Any.insert btn stats


up : Button -> Action -> Action
up btn stats =
    Set.Any.remove btn stats


type Button
    = ArrowDown
    | ArrowLeft
    | ArrowRight
    | ArrowUp
    | Backslash
    | Backspace
    | BracketLeft
    | BracketRight
    | Comma
    | Digit0
    | Digit1
    | Digit2
    | Digit3
    | Digit4
    | Digit5
    | Digit6
    | Digit7
    | Digit8
    | Digit9
    | Enter
    | Equal
    | IntlBackslash
    | KeyA
    | KeyB
    | KeyC
    | KeyD
    | KeyE
    | KeyF
    | KeyG
    | KeyH
    | KeyI
    | KeyJ
    | KeyK
    | KeyL
    | KeyM
    | KeyN
    | KeyO
    | KeyP
    | KeyQ
    | KeyR
    | KeyS
    | KeyT
    | KeyU
    | KeyV
    | KeyW
    | KeyX
    | KeyY
    | KeyZ
    | Minus
    | Period
    | Quote
    | Semicolon
    | Slash
    | Space
    | Tab


buttonToInt : Button -> Int
buttonToInt btn =
    case btn of
        ArrowDown ->
            0

        ArrowLeft ->
            1

        ArrowRight ->
            2

        ArrowUp ->
            3

        Backslash ->
            4

        Backspace ->
            5

        BracketLeft ->
            6

        BracketRight ->
            7

        Comma ->
            8

        Digit0 ->
            9

        Digit1 ->
            10

        Digit2 ->
            11

        Digit3 ->
            12

        Digit4 ->
            13

        Digit5 ->
            14

        Digit6 ->
            15

        Digit7 ->
            16

        Digit8 ->
            17

        Digit9 ->
            18

        Enter ->
            19

        Equal ->
            20

        IntlBackslash ->
            21

        KeyA ->
            22

        KeyB ->
            23

        KeyC ->
            24

        KeyD ->
            25

        KeyE ->
            26

        KeyF ->
            27

        KeyG ->
            28

        KeyH ->
            29

        KeyI ->
            30

        KeyJ ->
            31

        KeyK ->
            32

        KeyL ->
            33

        KeyM ->
            34

        KeyN ->
            35

        KeyO ->
            36

        KeyP ->
            37

        KeyQ ->
            38

        KeyR ->
            39

        KeyS ->
            40

        KeyT ->
            41

        KeyU ->
            42

        KeyV ->
            43

        KeyW ->
            44

        KeyX ->
            45

        KeyY ->
            46

        KeyZ ->
            47

        Minus ->
            48

        Period ->
            49

        Quote ->
            50

        Semicolon ->
            51

        Slash ->
            52

        Space ->
            53

        Tab ->
            54
