module Game.Ui.Internal.AnsiText exposing (parse)


type ParseStep
    = CodeStart
    | CodeRead Int
    | Text


parse : (Char -> acc -> acc) -> (Int -> acc -> acc) -> acc -> String -> acc
parse fn1 fn2 acc_ str =
    --    https://misc.flogisoft.com/bash/tip_colors_and_formatting#terminals_compatibility
    str
        |> String.foldl
            (\c ({ code, result } as acc) ->
                case code of
                    Text ->
                        case c of
                            '\u{001B}' ->
                                { acc | code = CodeStart }

                            _ ->
                                { acc | result = fn1 c result }

                    CodeStart ->
                        case c of
                            '[' ->
                                { acc | code = CodeRead 0 }

                            _ ->
                                { acc | code = Text, result = fn1 c result }

                    CodeRead ii ->
                        case c of
                            'm' ->
                                { acc | code = Text, result = fn2 ii result }

                            a ->
                                a
                                    |> String.fromChar
                                    |> String.toInt
                                    |> Maybe.map (\i -> { acc | code = CodeRead (ii * 10 + i) })
                                    |> Maybe.withDefault { acc | code = Text }
            )
            { code = Text
            , result = acc_
            }
        |> .result
