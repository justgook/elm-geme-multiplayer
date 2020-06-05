port module Server.Port exposing (error, join, leave, receive, send)

{-| Ports
-}


{-| Persistence
-}
port restore : (String -> msg) -> Sub msg


port persist : String -> Cmd msg


{-| Network
-}
port join : (String -> msg) -> Sub msg


port leave : (String -> msg) -> Sub msg


port receive : (( String, String ) -> msg) -> Sub msg


port error : (String -> msg) -> Sub msg


port send : ( String, String ) -> Cmd msg
