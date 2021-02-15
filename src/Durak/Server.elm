module Durak.Server exposing (main)

import Durak.Protocol.Message exposing (ToClient(..), ToServer)
import Durak.Protocol.Server
import Durak.Server.System.Data as Data
import Durak.Server.World as World exposing (World)
import Game.Generic.Component.User as User
import Game.Generic.System.User as User
import Game.Protocol.Util as ProtocolUtil
import Game.Server as Server exposing (GameServer)
import Game.Server.Model exposing (Model)
import Game.Server.Port as Port exposing (ConnectionId, Message(..))
import Json.Decode exposing (Value)
import Logic.Component as Component
import Logic.System as System


main : GameServer World
main =
    Server.start { init = init, update = update }


update : Message -> Model World -> ( Model World, Cmd msg )
update msg model =
    let
        newModel =
            case msg of
                --Tick time ->
                --    model
                NetworkJoin cnn ->
                    { model | world = model.world |> User.join cnn }

                NetworkLeave cnn ->
                    --{ model | world = User.leave cnn model.world }
                    model

                NetworkData cnn data ->
                    fromPacket data
                        |> List.foldl (Data.system cnn) model.world
                        |> (\w -> { model | world = w })

                _ ->
                    model

        world =
            newModel.world
    in
    ( { newModel | world = { world | out = Component.empty } }
    , System.indexedFoldl
        (\i a ->
            (::) (output (User.connectionId i world) a)
        )
        world.out
        []
        |> Cmd.batch
    )


init : Value -> (World -> Model World) -> ( Model World, Cmd msg )
init flags initModel =
    ( initModel World.empty, Cmd.none )


output : ConnectionId -> List ToClient -> Cmd msg
output cnn out =
    if out == [] then
        Cmd.none

    else
        ProtocolUtil.toPacket Durak.Protocol.Server.encode out |> Tuple.pair cnn |> Port.output


fromPacket : String -> List ToServer
fromPacket =
    ProtocolUtil.fromPacket Durak.Protocol.Server.decode
