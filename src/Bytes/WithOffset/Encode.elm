module Bytes.WithOffset.Encode exposing (list, reverseList)

import Bytes exposing (Endianness(..))
import Bytes.Encode as E exposing (Encoder)


list : (a -> Encoder) -> List a -> Encoder
list fn l =
    E.sequence (E.unsignedInt32 BE (List.length l) :: List.map fn l)


reverseList : (a -> Encoder) -> List a -> Encoder
reverseList fn l =
    E.sequence (E.unsignedInt32 BE (List.length l) :: List.foldl (fn >> (::)) [] l)
