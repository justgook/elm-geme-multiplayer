module Server.System.Join exposing (system)

import Common.Component.Name as Name
import Common.Component.Position as Position
import Logic.Entity as Entity
import Random
import Server.Component.IdSource as ID
import Server.Component.Name as Name
import Server.Component.User as User exposing (User)
import Server.Contract
import Server.Port as Port
import Server.World exposing (Message, World)


system : String -> World -> ( World, Cmd Message )
system cnn world =
    let
        ( newId, newWorld ) =
            world
                |> ID.create
                |> Entity.with ( Position.spec, Position.spawn { x = 0, y = 0 } )
                |> (\( id, w ) -> ( id, User.spawn id cnn w ))
                |> (\( id, w ) ->
                        let
                            ( name, seed ) =
                                Name.spawn (Random.initialSeed id)
                        in
                        Entity.with ( Name.spec, name ) ( id, { w | seed = seed } )
                   )
    in
    ( newWorld
    , Port.send ( cnn, Server.Contract.outcome newWorld newId )
        :: Server.Contract.broadcastToClient (Server.Contract.outcome newWorld) world.user
        |> Cmd.batch
    )
