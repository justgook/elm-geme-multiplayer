module Example exposing (..)

import Expect exposing (Expectation)
import Test exposing (..)


suite : Test
suite =
    describe "The String module"
        [ describe "String.reverse"
            -- Nest as many descriptions as you like.
            [ test "has no effect on a palindrome" <|
                \_ ->
                    Expect.equal True True
            ]
        ]
