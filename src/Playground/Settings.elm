module Playground.Settings exposing (..)

---JUST COPY

import Math.Vector2 exposing (vec2)
import Math.Vector3 exposing (Vec3)
import Math.Vector4 exposing (Vec4)
import WebGL.Settings as WebGL exposing (Setting)
import WebGL.Settings.Blend as Blend
import WebGL.Settings.DepthTest as DepthTest
import WebGL.Texture


size : WebGL.Texture.Texture -> Math.Vector2.Vec2
size t =
    WebGL.Texture.size t |> (\( w, h ) -> vec2 (toFloat w) (toFloat h))


{-| -}
defaultEntitySettings : List Setting
defaultEntitySettings =
    [ Blend.add Blend.srcAlpha Blend.oneMinusSrcAlpha
    , WebGL.colorMask True True True False
    , DepthTest.lessOrEqual { write = True, near = 0, far = 1 }
    ]


setAlpha : Vec3 -> Float -> Vec4
setAlpha =
    Math.Vector3.toRecord >> (\a -> Math.Vector4.vec4 a.x a.y a.z)
