module Server.System.Users exposing (join, leave)

import Server.Model exposing (Message, World)
import Server.Port as Port exposing (ConnectionId)


leave : ConnectionId -> World -> ( World, Cmd Message )
leave cnn was =
    ( was, Cmd.none )


join : ConnectionId -> World -> ( World, Cmd Message )
join cnn was =
    ( was, Port.send ( "ConnectionId", "Data" ) )
