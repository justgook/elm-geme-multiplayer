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
            [ Util.onEvent "pointerdown" (decoder startStick) ]

        UI.Stick1 ->
            [ Util.onEvent "pointerup" (decoder stopStick)
            , Util.onEvent "pointermove" (decoder moveStick)
            ]


moveStick x y btn =
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


stopStick x y btn world =
    Util.update UI.spec
        (\({ stick1 } as ui) ->
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


startStick x y btn world =
    Util.update UI.spec
        (\ui ->
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
                ui
        )
        world


decoder fn =
    D.map5
        (\x_ y_ w h btn world ->
            let
                x =
                    -w * 0.5 + x_

                y =
                    h * 0.5 - y_
            in
            fn x y btn world
        )
        (D.field "pageX" D.float)
        (D.field "pageY" D.float)
        (D.at [ "target", "offsetWidth" ] D.float)
        (D.at [ "target", "offsetHeight" ] D.float)
        (D.field "buttons" D.int)
