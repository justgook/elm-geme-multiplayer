module Game.Generic.System.User exposing (join, leave)

import Game.Generic.Component.IdSource as ID exposing (IdSource)
import Game.Generic.Component.User as User exposing (User)
import Game.Server.Port as Port
import Logic.System exposing (System)


type alias World a =
    { a
        | id : IdSource
        , user : User
    }


leave : Port.ConnectionId -> System (World a)
leave cnn =
    User.remove cnn
        >> (\( e, w ) -> ID.remove e w)
        >> Tuple.second


join : Port.ConnectionId -> System (World a)
join cnn w_ =
    if User.entityId cnn w_ > 0 then
        w_

    else
        w_
            |> (ID.create
                    >> (\( id, w ) -> ( id, User.spawn id cnn w ))
                    >> Tuple.second
               )
