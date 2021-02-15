module Rpg.Client.System.Action exposing (system)

import Common.Direction2 as Direction
import Game.Client.Component.Action exposing (Button(..))
import Logic.System exposing (System)
import Rpg.Client.World exposing (World)
import Rpg.Protocol.Message exposing (ToServer(..))
import Set.Any


system : System World
system ({ out, action } as world) =
    --TODO Add delay for fast walk prevention
    case arrows firstConfig action |> Direction.fromRecord of
        Just dir ->
            { world | out = MovementRequest dir 0x12 0x1234 :: out }

        Nothing ->
            world


firstConfig =
    { up = KeyW
    , right = KeyD
    , down = KeyS
    , left = KeyA
    }


boolToFloat : Bool -> Float
boolToFloat bool =
    if bool then
        1

    else
        0


arrows config actions =
    let
        key =
            { up = Set.Any.member config.up actions |> boolToFloat
            , right = Set.Any.member config.right actions |> boolToFloat
            , down = Set.Any.member config.down actions |> boolToFloat
            , left = Set.Any.member config.left actions |> boolToFloat
            }

        x =
            key.right - key.left

        y =
            key.up - key.down
    in
    { x = x, y = y }
