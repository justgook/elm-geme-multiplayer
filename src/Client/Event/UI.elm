module Client.Event.UI exposing (pointer)

import AltMath.Vector2 as Vec2 exposing (Vec2)
import Animator
import Client.Component.UI as UI
import Client.Component.UI.Stick exposing (dir8)
import Client.Util as Util
import Common.Direction as Direction exposing (Direction(..))
import Common.Util as Util
import Json.Decode as D exposing (Decoder)


pointer world =
    let
        ui =
            UI.spec.get world
    in
    case ui.pointerFocus of
        UI.None ->
            [ Util.onEvent "pointerdown" (decoder startStick)
            , Util.onEvent "pointermove" moveMouse
            ]

        UI.Stick1 ->
            [ Util.onEvent "pointerup" (decoder stopStick)
            , Util.onEvent "pointerout" (decoder stopStick)
            , Util.onEvent "pointercancel" (decoder stopStick)
            , Util.onEvent "pointermove" (decoder moveStick)
            ]

        UI.Stick2 ->
            []


moveMouse =
    D.field "pointerType" D.string
        |> D.andThen
            (\pointerType ->
                case pointerType of
                    "mouse" ->
                        D.map4
                            (\x_ y_ w h world ->
                                let
                                    p =
                                        Util.eventToWorld x_ y_ w h
                                in
                                world
                                    |> Util.update UI.spec
                                        (\({ cursor } as ui) ->
                                            { ui
                                                | cursor = { cursor | p = p }
                                            }
                                        )
                            )
                            (D.field "pageX" D.float)
                            (D.field "pageY" D.float)
                            (D.at [ "target", "offsetWidth" ] D.float)
                            (D.at [ "target", "offsetHeight" ] D.float)

                    _ ->
                        D.fail ""
            )


moveStick x y btn pointerType pointerId =
    Util.update UI.spec
        (\ui ->
            let
                stick1 =
                    ui.stick1

                cursor =
                    dir8 stick1.center { x = x, y = y }
                        |> Vec2.scale 40
                        |> Vec2.add stick1.center
            in
            { ui
                | stick1 =
                    { stick1
                        | cursor = cursor
                        , dir =
                            stick1.center
                                |> Vec2.sub cursor
                                |> Direction.fromRecord
                    }
            }
        )


stopStick x y btn pointerType pointerId world =
    Util.update UI.spec
        (\({ stick1 } as ui) ->
            let
                _ =
                    Debug.log "pointerType" pointerType
            in
            { ui
                | pointerFocus = UI.None
                , stick1 =
                    { stick1
                        | active = Animator.go Animator.immediately False ui.stick1.active
                        , dir = Neither
                    }
            }
        )
        world


startStick x y btn pointerType pointerId world =
    Util.update UI.spec
        (\ui ->
            --TODO add possibility for multiple stick same time
            if x < 0 then
                { ui
                    | stick1 =
                        { center = Vec2 x y
                        , cursor = Vec2 x y
                        , active = Animator.go Animator.immediately True ui.stick1.active
                        , dir = Neither
                        }
                    , pointerFocus = UI.Stick1
                }

            else
                { ui
                    | stick2 =
                        { center = Vec2 x y
                        , cursor = Vec2 x y
                        , active = Animator.go Animator.immediately True ui.stick2.active
                        , dir = Neither
                        }
                    , pointerFocus = UI.Stick2
                }
        )
        world


decoder fn =
    D.map7
        (\x_ y_ w h btn pointerType pointerId world ->
            let
                { x, y } =
                    Util.eventToWorld x_ y_ w h
            in
            fn x y btn pointerType pointerId world
        )
        (D.field "pageX" D.float)
        (D.field "pageY" D.float)
        (D.at [ "target", "offsetWidth" ] D.float)
        (D.at [ "target", "offsetHeight" ] D.float)
        (D.field "buttons" D.int)
        (D.field "pointerType" D.string)
        (D.field "pointerId" D.int)
