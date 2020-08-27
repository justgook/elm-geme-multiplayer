module Common.Component.Schedule exposing
    ( Schedule(..)
    , add
    , apply
    , empty
    , fromList
    , spec
    , toList
    )


type Schedule e
    = Empty
    | Sequence
        { nextTick : Int
        , next : e
        , rest : List ( Int, e )
        }


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


apply spec_ f world =
    let
        events =
            spec_.get world
    in
    case events of
        Empty ->
            world

        Sequence info ->
            if world.frame >= info.nextTick then
                spec_.set (setNext info.rest) world
                    |> f info.next

            else
                world


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


spec =
    { get = .events
    , set = \comps world -> { world | events = comps }
    }
