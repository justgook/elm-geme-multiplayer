module Rpg.Client.RomDecode exposing (parse)

import Game.Client.Model as Model exposing (Message(..))
import Json.Decode exposing (Value)
import Set


parse : Model.Assets -> Value -> ( Model.Assets, Cmd Message )
parse textures flags =
    let
        data =
            [ ( "c1", "/asset/game/anim/base.png" )
            , ( "c2", "/asset/game/anim/shadow.png" )
            ]
    in
    data
        |> List.foldl
            (\( name, url ) ( txt, cmd ) ->
                ( { txt | loading = Set.insert name txt.loading }, getTexture name url :: cmd )
            )
            ( textures, [] )
        |> Tuple.mapSecond Cmd.batch


getTexture : String -> String -> Cmd Message
getTexture =
    Model.getTexture
