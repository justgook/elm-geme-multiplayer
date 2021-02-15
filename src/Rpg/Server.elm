module Rpg.Server exposing (main)

import Game.Generic.System.User as User
import Game.Protocol.Util as ProtocolUtil
import Game.Server as Server exposing (GameServer)
import Game.Server.Port exposing (Message(..))
import Rpg.Protocol.Message exposing (ToServer)
import Rpg.Protocol.Server
import Rpg.Server.System.Data as Data
import Rpg.Server.System.Tick as Tick
import Rpg.Server.World as World exposing (World)


main : GameServer World
main =
    Server.start { init = init, update = update }


update msg model =
    case msg of
        Tick time ->
            ( Tick.system time model, Cmd.none )

        NetworkJoin cnn ->
            ( { model | world = User.join cnn model.world }, Cmd.none )

        NetworkLeave cnn ->
            ( { model | world = User.leave cnn model.world }, Cmd.none )

        NetworkData cnn data ->
            ( fromPacket data
                |> List.foldl (\a acc -> { acc | world = Data.system cnn a acc.world }) model
            , Cmd.none
            )

        NetworkError error ->
            ( { model | error = error }, Cmd.none )


init flags initModel =
    ( initModel World.empty, Cmd.none )


fromPacket : String -> List ToServer
fromPacket =
    ProtocolUtil.fromPacket Rpg.Protocol.Server.decode
