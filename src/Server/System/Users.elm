module Server.System.Users exposing (leave, join)

import Server.World as World exposing (Message, World)
import Server.Port exposing (ConnectionId)
import Server.Port as Port

leave : ConnectionId -> World -> ( World, Cmd Message )
leave cnn was =
    ( was, Cmd.none )


join : ConnectionId -> World -> ( World, Cmd Message )
join cnn was =
    ( was, Port.send ("ConnectionId", "Data")  )
