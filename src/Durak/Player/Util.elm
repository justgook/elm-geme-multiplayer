module Durak.Player.Util exposing (send)


send : a -> { b | out : List a } -> { b | out : List a }
send msg w =
    { w | out = msg :: w.out }
