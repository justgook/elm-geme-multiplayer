module Common.Component.Schedule exposing
    ( Schedule(..)
    , add
    , apply
    , empty
    , fromList
    , system
    , toList
    )


type Schedule e
    = Empty
    | Sequence
        { nextTick : Int
        , next : e
        , rest : List ( Int, e )
        }


system frame data =
    data
        |> Debug.log "Common.Component.Schedule"


toList : Schedule e -> List ( Int, e )
toList sequence =
    case sequence of
        Empty ->
            []

        Sequence e ->
            ( e.nextTick, e.next ) :: e.rest


fromList : List ( Int, e ) -> Schedule e
fromList l =
    case l of
        ( frame, item ) :: rest ->
            Sequence
                { nextTick = frame
                , next = item
                , rest = rest
                }

        [] ->
            Empty


add : ( Int, e ) -> Schedule e -> Schedule e
add ( nextFireFrame_, next_ ) eventSequence =
    case eventSequence of
        Empty ->
            Sequence
                { nextTick = nextFireFrame_
                , next = next_
                , rest = []
                }

        Sequence { rest, nextTick, next } ->
            List.sortBy Tuple.first (( nextFireFrame_, next_ ) :: ( nextTick, next ) :: rest)
                |> setNext


apply : (e -> world -> world) -> Int -> ( Schedule e, world ) -> ( Schedule e, world )
apply f frame ( events, world ) =
    case events of
        Empty ->
            ( events, world )

        Sequence info ->
            if frame >= info.nextTick then
                ( setNext info.rest, f info.next world )

            else
                ( events, world )


setNext : List ( Int, e ) -> Schedule e
setNext l =
    case l of
        ( nextFireFrame, next ) :: rest ->
            Sequence
                { nextTick = nextFireFrame
                , next = next
                , rest = rest
                }

        [] ->
            Empty


empty : Schedule e
empty =
    Empty
