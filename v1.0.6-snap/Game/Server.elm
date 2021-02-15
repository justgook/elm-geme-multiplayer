module Game.Server exposing (GameServer, start)

import Game.Server.Model as Model exposing (Model)
import Game.Server.Port as Port
import Json.Decode as D exposing (Value)


type alias GameServer world =
    Program Value (Model world) Value


start :
    { init : Value -> (world -> Model world) -> ( Model world, Cmd Value )
    , update : Port.Message -> Model world -> ( Model world, Cmd Value )
    }
    -> GameServer world
start opt =
    Platform.worker
        { init = init opt.init
        , update = update opt.update
        , subscriptions = Port.subscriptions
        }


init initFn flags =
    let
        -- Just dirty fix to expose port
        _ =
            Port.output
    in
    initFn flags (\w -> Model.init w)


update update2 v model =
    case Port.parse v of
        Ok messages ->
            messages
                |> List.foldl
                    (\msg2 ( m, cmds ) -> update2 msg2 m |> Tuple.mapSecond (\a -> a :: cmds))
                    ( model, [] )
                |> Tuple.mapSecond Cmd.batch

        Err err ->
            --let
            --    _ =
            --        Debug.log "server error" err
            --in
            ( { model | error = D.errorToString err }, Cmd.none )
