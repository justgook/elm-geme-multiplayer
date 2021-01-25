module Client.RomDecode exposing (parse)

import Client.Model exposing (Message(..))
import Client.Util as Util
import Json.Decode exposing (Value)
import Set


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
    Util.getTexture Texture TextureFail
