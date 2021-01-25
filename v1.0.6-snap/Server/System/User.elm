module Server.System.User exposing (join, leave)

import Common.Port as Port
import Logic.System exposing (System)
import Server.Component.IdSource as ID
import Server.Component.User as User
import Server.Model exposing (World)


leave : Port.ConnectionId -> System World
leave cnn =
    User.remove cnn
        >> (\( e, w ) -> ID.remove e w)
        >> Tuple.second


join : Port.ConnectionId -> System World
join cnn =
    ID.create
        >> (\( id, w ) -> ( id, User.spawn id cnn w ))
        >> Tuple.second
