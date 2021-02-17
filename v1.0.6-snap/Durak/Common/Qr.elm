module Durak.Common.Qr exposing (render)

import Playground
import QRCode


render : String -> Playground.Shape
render =
    QRCode.fromString
        >> Result.map
            (QRCode.toMatrix
                >> List.map
                    (List.map
                        (\a ->
                            if a then
                                '█'

                            else
                                ' '
                        )
                        >> String.fromList
                    )
                >> String.join "\n"
            )
        >> Result.withDefault ""
        >> Playground.words Playground.black
        >> Playground.scale 0.125
