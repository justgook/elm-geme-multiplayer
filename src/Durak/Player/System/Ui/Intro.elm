module Durak.Player.System.Ui.Intro exposing (keyboard)

import Durak.Player.Component.Ui exposing (Ui(..))
import Game.Client.Component.Action exposing (Button(..), buttonToChar)
import Game.Client.Port as Port


keyboard down button data world =
    case ( down, button ) of
        ( True, ArrowDown ) ->
            if data.selected < 4 then
                ( { world | ui = Intro { data | selected = min 3 (data.selected + 1) } }, Cmd.none )

            else
                ( world, Cmd.none )

        ( True, ArrowUp ) ->
            if data.selected < 4 then
                ( { world | ui = Intro { data | selected = max 0 (data.selected - 1) } }, Cmd.none )

            else
                ( world, Cmd.none )

        ( True, Escape ) ->
            case data.selected of
                100 ->
                    ( { world | ui = Intro { data | selected = 0 } }, Cmd.none )

                _ ->
                    ( world, Cmd.none )

        ( True, Enter ) ->
            case data.selected of
                0 ->
                    ( { world | ui = Intro { data | selected = 100 } }, Cmd.none )

                1 ->
                    ( { world | ui = Intro { data | selected = 101 } }, Cmd.none )

                2 ->
                    --let
                    --    _ =
                    --        Debug.log "hit" "Rules"
                    --in
                    --( { world | ui = Intro { data | selected = 102 } }, Cmd.none )
                    ( world, Cmd.none )

                3 ->
                    --let
                    --    _ =
                    --        Debug.log "hit" "Credits"
                    --in
                    ( world, Cmd.none )

                100 ->
                    ( { world | ui = Intro { data | selected = 200 } }, Port.open data.text )

                101 ->
                    ( { world | ui = Intro { data | selected = 201 } }, Port.connect data.text )

                _ ->
                    ( world, Cmd.none )

        ( True, Backspace ) ->
            if data.selected == 100 || data.selected == 101 then
                ( { world | ui = Intro { data | text = String.dropRight 1 data.text } }, Cmd.none )

            else
                ( world, Cmd.none )

        ( True, _ ) ->
            if data.selected == 100 || data.selected == 101 then
                ( { world | ui = Intro { data | text = data.text ++ String.fromChar (buttonToChar button) } }
                , Cmd.none
                )

            else
                ( world, Cmd.none )

        _ ->
            ( world, Cmd.none )
