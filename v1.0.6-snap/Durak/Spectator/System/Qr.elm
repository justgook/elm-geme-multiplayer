module Durak.Spectator.System.Qr exposing (draw)

import Playground
import QRCode


draw : String -> Playground.Shape
draw =
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
