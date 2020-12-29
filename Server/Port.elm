port module Server.Port exposing (ConnectionId, error, join, leave, receive, send)

{-| Ports
-}


{-| Persistence
-}
port restore : (String -> msg) -> Sub msg


port persist : String -> Cmd msg


{-| Network
-}
port join : (ConnectionId -> msg) -> Sub msg


port leave : (ConnectionId -> msg) -> Sub msg


port receive : (( ConnectionId, Data ) -> msg) -> Sub msg


port error : (String -> msg) -> Sub msg


port send : ( ConnectionId, Data ) -> Cmd msg


type alias ConnectionId =
    String


type alias Data =
    String