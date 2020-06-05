module Server.System.Join exposing (system)

import Common.Component.Name as Name
import Logic.Entity as Entity
import Random
import Server.Component.IdSource as ID
import Server.Component.Name as Name


system cnn world =
    let
        newWorld =
            world
                |> ID.create
                |> (\( id, w ) ->
                        Entity.with
                            ( Name.spec
                            , Name.spawn (Random.initialSeed id)
                                |> Tuple.first
                            )
                            ( id, w )
                   )
                |> Tuple.second
    in
    ( newWorld, Cmd.none )
