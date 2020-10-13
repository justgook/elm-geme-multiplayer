module Server.System.Users exposing (join, leave)

import Common.Component.Body as Body
import Common.Component.Desire as Desire
import Common.Component.Name as Name
import Common.Component.Position as Position
import Common.Component.Velocity as Velocity
import Common.Sync
import Dict
import Logic.Component as Component
import Logic.Entity as Entity
import Random
import Server.Component.IdSource as ID
import Server.Component.Name as Name
import Server.Component.Users as User exposing (Users)
import Server.Sync
import Server.World as World exposing (Message, World)


leave cnn was =
    let
        ( _, now ) =
            was
                |> User.remove cnn
                |> clear

        toAll =
            Server.Sync.pack was now
                |> Common.Sync.compose
                |> Server.Sync.send
    in
    ( now, Dict.foldl (\k _ -> (::) (toAll k)) [] now.users |> Cmd.batch )


join : String -> World -> ( World, Cmd Message )
join cnn was =
    let
        ( _, now ) =
            spawn cnn was

        cmd =
            Server.Sync.pack World.empty now
                |> Common.Sync.compose
                |> Server.Sync.send

        toAll =
            Server.Sync.pack was now
                |> Common.Sync.compose
                |> Server.Sync.send
    in
    ( now, cmd cnn :: Dict.foldl (\k _ -> (::) (toAll k)) [] was.users |> Cmd.batch )


spawn cnn world =
    world
        |> ID.create
        |> Entity.with ( Velocity.spec, Velocity.spawn { x = 0, y = 0 } )
        |> Entity.with ( Desire.spec, Desire.spawn )
        |> (\( id, w ) -> ( id, { w | p = Component.spawn id { x = 0, y = 0 } w.p } ))
        |> Entity.with ( Body.spec, 1 )
        |> (\( id, w ) -> ( id, User.spawn id cnn w ))
        |> (\( id, w ) ->
                let
                    ( name, seed ) =
                        Name.spawn (Random.initialSeed id)
                in
                Entity.with ( Name.spec, name ) ( id, { w | seed = seed } )
           )


clear ( id, world ) =
    ID.remove id world
        |> Entity.remove Position.spec
