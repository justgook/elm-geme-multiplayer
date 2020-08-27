module WebGL.Ui.AutoLayout.Solver exposing (solve, test2)

{-|

[1]: https://gss.github.io/guides/layout "Position and dimension"
[2]: https://gss.github.io/guides/ccss "Constraint CSS"
[3]: https://gss.github.io/guides/ifelse "Conditionals"
[REPLICATE]: https://github.com/IjzerenHein/kiwi.js/ "kiwi - Most clean solution"
[4]: https://github.com/google/kiwi-solver "Google Java implementation"
[5]: http://mathieunls.github.io/cours/Introduction-to-operations-research-js/ "Just deep explanation"
[6]: https://github.com/MathieuNls/simplex.js "Simplex from Introduction-to-operations-research-js "
[7]: http://www.badros.com/greg/cassowary/js/quaddemo.html "Quadrilateral demo - Cassowary Javascript"

-}


test =
    """p[line-height] >= 16;
p[line-height] <= ::window[height] / 12;"""


test2 : List Constraint
test2 =
    [ EQ Medium (Prop "block1" W) (Const 300)
    , EQ Medium (Prop "block2" W) (Prop "block1" W)
    , EQ Medium (Prop "block3" W) (Arithmetic (Sum (Prop "block1" W) (Prop "block2" W)))

    --, EQ Medium (Prop "block3" "top") (Prop "block1" "bottom")
    , EQ Medium (Arithmetic (Sum (Prop "block1" H) (Prop "block3" H))) (Prop "::window" H)
    ]


{-| /\* you can also use the condense syntax: \*/


## --#someElm[cx] == 100;

/\* center-x will expand in the following constraints \*/
#someElm[left] + #someElm[width] / 2 == 100;

-}
solve : Int -> Int -> List Constraint -> List Output
solve w h constraints =
    []



----------------- Position and dimension -----------------


{-| id most probably will be string, as key in dict - to what element look for
---Still need to think about it
-}



--type VarConst id
--    = Prop Prop
--    | Const Int
--    | Arithmetic Arithmetic ( id, VarConst id ) ( id, VarConst id )


type PropConst
    = Prop String Prop
    | Const Int
    | Arithmetic Arithmetic


type Prop
    = W
    | H
    | Y
    | X
    | Custom String


type alias Output =
    { key : String
    , width : Int
    , height : Int
    , y : Int
    , x : Int
    }


type Strength
    = Weak
    | Medium -- (default)
    | Strong
    | Require


type Constraint
    = EQ Strength PropConst PropConst
    | NE Strength PropConst PropConst
    | LT Strength PropConst PropConst
    | LE Strength PropConst PropConst
    | GE Strength PropConst PropConst
    | GT Strength PropConst PropConst


{-| Cassowary, which is the constraints solving algorithm used by GSS, can only compute “Linear Arithmetic” constraints. Simple math operations like +, -, \* and / are all supported, but the expressions must be linear (of the form y = mx + b). Basically, you can do everything except division and multiplication of two constrained variables.

this is not linear & will throw an error

       #box1[width] / #box2[height] == varX;

-}
type Arithmetic
    = Sum PropConst PropConst
    | SUB PropConst PropConst
    | MUL PropConst PropConst
    | DIV PropConst PropConst
      --- Advanced stuff (can be used instead of IF/IfElse)
    | OR (List Constraint) (List Constraint)
    | AND (List Constraint) (List Constraint)
    | IF Constraint (List Constraint)
    | IfElse Constraint (List Constraint) (List Constraint)
