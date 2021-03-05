module Game.Client.Component.Action exposing (Action, Button(..), buttonToChar, decode, down, empty, spec, up)

import Common.Util as Util
import Json.Decode as D
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
    | Escape


buttonToChar : Button -> Char
buttonToChar btn =
    case btn of
        ArrowDown ->
            '↓'

        ArrowLeft ->
            '←'

        ArrowRight ->
            '→'

        ArrowUp ->
            '↑'

        Backslash ->
            '\\'

        Backspace ->
            '\u{0008}'

        BracketLeft ->
            '{'

        BracketRight ->
            '}'

        Comma ->
            ','

        Digit0 ->
            '0'

        Digit1 ->
            '1'

        Digit2 ->
            '2'

        Digit3 ->
            '3'

        Digit4 ->
            '4'

        Digit5 ->
            '5'

        Digit6 ->
            '6'

        Digit7 ->
            '7'

        Digit8 ->
            '8'

        Digit9 ->
            '9'

        Enter ->
            '⏎'

        Equal ->
            '='

        IntlBackslash ->
            '/'

        KeyA ->
            'a'

        KeyB ->
            'b'

        KeyC ->
            'c'

        KeyD ->
            'd'

        KeyE ->
            'e'

        KeyF ->
            'f'

        KeyG ->
            'g'

        KeyH ->
            'h'

        KeyI ->
            'i'

        KeyJ ->
            'j'

        KeyK ->
            'k'

        KeyL ->
            'l'

        KeyM ->
            'm'

        KeyN ->
            'n'

        KeyO ->
            'o'

        KeyP ->
            'p'

        KeyQ ->
            'q'

        KeyR ->
            'r'

        KeyS ->
            's'

        KeyT ->
            't'

        KeyU ->
            'u'

        KeyV ->
            'v'

        KeyW ->
            'w'

        KeyX ->
            'x'

        KeyY ->
            'y'

        KeyZ ->
            'z'

        Minus ->
            '-'

        Period ->
            '.'

        Quote ->
            '"'

        Semicolon ->
            ';'

        Slash ->
            '/'

        Space ->
            ' '

        Tab ->
            '\t'

        Escape ->
            '\u{001B}'


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

        Escape ->
            55


decode : D.Decoder Button
decode =
    D.int
        |> D.andThen
            (\a ->
                case a of
                    0 ->
                        D.succeed ArrowDown

                    1 ->
                        D.succeed ArrowLeft

                    2 ->
                        D.succeed ArrowRight

                    3 ->
                        D.succeed ArrowUp

                    4 ->
                        D.succeed Backslash

                    5 ->
                        D.succeed Backspace

                    6 ->
                        D.succeed BracketLeft

                    7 ->
                        D.succeed BracketRight

                    8 ->
                        D.succeed Comma

                    9 ->
                        D.succeed Digit0

                    10 ->
                        D.succeed Digit1

                    11 ->
                        D.succeed Digit2

                    12 ->
                        D.succeed Digit3

                    13 ->
                        D.succeed Digit4

                    14 ->
                        D.succeed Digit5

                    15 ->
                        D.succeed Digit6

                    16 ->
                        D.succeed Digit7

                    17 ->
                        D.succeed Digit8

                    18 ->
                        D.succeed Digit9

                    19 ->
                        D.succeed Enter

                    20 ->
                        D.succeed Equal

                    21 ->
                        D.succeed IntlBackslash

                    22 ->
                        D.succeed KeyA

                    23 ->
                        D.succeed KeyB

                    24 ->
                        D.succeed KeyC

                    25 ->
                        D.succeed KeyD

                    26 ->
                        D.succeed KeyE

                    27 ->
                        D.succeed KeyF

                    28 ->
                        D.succeed KeyG

                    29 ->
                        D.succeed KeyH

                    30 ->
                        D.succeed KeyI

                    31 ->
                        D.succeed KeyJ

                    32 ->
                        D.succeed KeyK

                    33 ->
                        D.succeed KeyL

                    34 ->
                        D.succeed KeyM

                    35 ->
                        D.succeed KeyN

                    36 ->
                        D.succeed KeyO

                    37 ->
                        D.succeed KeyP

                    38 ->
                        D.succeed KeyQ

                    39 ->
                        D.succeed KeyR

                    40 ->
                        D.succeed KeyS

                    41 ->
                        D.succeed KeyT

                    42 ->
                        D.succeed KeyU

                    43 ->
                        D.succeed KeyV

                    44 ->
                        D.succeed KeyW

                    45 ->
                        D.succeed KeyX

                    46 ->
                        D.succeed KeyY

                    47 ->
                        D.succeed KeyZ

                    48 ->
                        D.succeed Minus

                    49 ->
                        D.succeed Period

                    50 ->
                        D.succeed Quote

                    51 ->
                        D.succeed Semicolon

                    52 ->
                        D.succeed Slash

                    53 ->
                        D.succeed Space

                    54 ->
                        D.succeed Tab

                    55 ->
                        D.succeed Escape

                    _ ->
                        D.fail ""
            )
