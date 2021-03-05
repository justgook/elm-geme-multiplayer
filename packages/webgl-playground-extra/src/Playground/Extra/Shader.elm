module Playground.Extra.Shader exposing
    ( vertSprite, vertTile, vertImage
    , fragImage
    , mesh
    , fragColor, fragFxCircle, fragTileFullscreen, fragTileXFullscreen, vertFullscreen, vertFullscreenInvert
    )

{-|


# Vertex Shaders

@docs vertSprite, vertTile, vertImage

#Fragment Shaders

@docs fragImage


# Mesh

@docs mesh

-}

import Math.Vector2 exposing (Vec2, vec2)
import Math.Vector4 exposing (Vec4)
import WebGL exposing (Mesh, Shader)
import WebGL.Texture exposing (Texture)



-- Vertex Shaders


{-| -}
vertFullscreenInvert =
    [glsl|
precision highp float;
attribute vec2 aP;
uniform vec4 uT;
uniform vec2 uP;
varying vec2 uv;
uniform float z;
vec2 edgeFix = vec2(0.0000001, -0.0000001);
mat2 inv(mat2 m) {
  return mat2(m[1][1],-m[0][1], -m[1][0], m[0][0]) / (m[0][0]*m[1][1] - m[0][1]*m[1][0]);
}
void main () {
    mat2 uTinv = inv(mat2(uT));
    uv = vec2(aP * uTinv) - uP * uTinv;
    gl_Position = vec4(aP, z  * -1.19209304e-7, 1.0);
}
        |]


{-| -}
vertFullscreen =
    [glsl|
precision highp float;
attribute vec2 aP;
varying vec2 uv;
uniform float z;
void main () {
    uv = aP;
    gl_Position = vec4(aP, z  * -1.19209304e-7, 1.0);
}
|]


{-| -}
vertImage : Shader { a | aP : Vec2 } { b | uP : Vec2, uT : Vec4, z : Float } { uv : Vec2 }
vertImage =
    [glsl|
            precision highp float;
            attribute vec2 aP;
            uniform vec4 uT;
            uniform vec2 uP;
            uniform float z;
            varying vec2 uv;
            vec2 edgeFix = vec2(0.0000001, -0.0000001);
            void main () {
                uv = aP * .5 + 0.5 + edgeFix;
                gl_Position = vec4(aP * mat2(uT) + uP, z  * -1.19209304e-7, 1.0);
            }
    |]


{-| -}
vertSprite : Shader { a | aP : Vec2 } { b | uP : Vec2, uT : Vec4, uUV : Vec4, z : Float } { uv : Vec2 }
vertSprite =
    [glsl|
            precision highp float;
            attribute vec2 aP;
            uniform vec4 uT;
            uniform vec2 uP;
            varying vec2 uv;
            uniform vec4 uUV;
            uniform float z;
            vec2 edgeFix = vec2(0.0000001, -0.0000001);
            void main () {
                vec2 aP_ = aP * .5 + 0.5;
                uv = uUV.xy + (aP_ * uUV.zw) + edgeFix;
                gl_Position = vec4(aP * mat2(uT) + uP, z  * -1.19209304e-7, 1.0);
            }
        |]


{-| -}
vertTile :
    Shader
        { a | aP : Vec2 }
        { b
            | uImgSize : Vec2
            , index : Float
            , spriteSize : Vec2
            , uP : Vec2
            , uT : Vec4
            , z : Float
        }
        { uv : Vec2 }
vertTile =
    [glsl|
            precision highp float;
            attribute vec2 aP;
            uniform vec4 uT;
            uniform vec2 uP;
            uniform float z;
            uniform float index;
            uniform vec2 spriteSize;
            uniform vec2 uImgSize;
            varying vec2 uv;
            vec2 edgeFix = vec2(0.0000001, -0.0000001);
            void main () {
                vec2 ratio = spriteSize / uImgSize;
                float row = (uImgSize.y / spriteSize.y - 1.0) - floor((index + 0.5) * ratio.x);
                float column = floor(mod((index + 0.5), uImgSize.x / spriteSize.x));
                vec2 offset = vec2(column, row) * ratio;
                uv = (aP * 0.5 + 0.5) * ratio + offset + edgeFix;
                gl_Position = vec4(aP * mat2(uT) + uP, z  * -1.19209304e-7, 1.0);
            }
        |]



--Fragment Shaders


fragColor =
    [glsl|
precision highp float;
uniform vec4 uC;
varying vec2 uv;
void main () {
    gl_FragColor = uC;
}
|]


{-| -}
fragTileFullscreen =
    [glsl|
precision highp float;
varying vec2 uv;
uniform vec4 uT;
uniform float z;
uniform float uI;
uniform float uA;
uniform vec2 spriteSize;
uniform vec2 uImgSize;
uniform sampler2D uImg;
void main () {
    vec2 ratio = spriteSize / uImgSize;
    float row = (uImgSize.y / spriteSize.y - 1.0) - floor((uI + 0.5) * ratio.x);
    float column = floor(mod((uI + 0.5), uImgSize.x / spriteSize.x));
    vec2 offset = vec2(column, row) * ratio;
    vec2 uv2 = fract(uv * 0.5 + 0.5) * ratio + offset;
    vec2 pixel = (floor(uv2 * uImgSize) + 0.5) / uImgSize;
    gl_FragColor = texture2D(uImg, pixel);
    gl_FragColor.a *= uA;
    if(gl_FragColor.a <= 0.025) discard;
}
    |]


{-| -}
fragTileXFullscreen =
    [glsl|
precision highp float;
varying vec2 uv;
uniform vec4 uT;
uniform float z;
uniform float uI;
uniform float uA;
uniform vec2 spriteSize;
uniform vec2 uImgSize;
uniform sampler2D uImg;
void main () {
    if (uv.y >= 1.0) discard;
    if (uv.y < -1.0) discard;
    vec2 ratio = spriteSize / uImgSize;
    float row = (uImgSize.y / spriteSize.y - 1.0) - floor((uI + 0.5) * ratio.x);
    float column = floor(mod((uI + 0.5), uImgSize.x / spriteSize.x));
    vec2 offset = vec2(column, row) * ratio;
    vec2 uv2 = fract(uv * 0.5 + 0.5) * ratio + offset;
    vec2 pixel = (floor(uv2 * uImgSize) + 0.5) / uImgSize;
    gl_FragColor = texture2D(uImg, pixel);
    gl_FragColor.a *= uA;
    if(gl_FragColor.a <= 0.025) discard;
}
    |]


{-| -}
fragFxCircle : Shader a { b | uC : Vec4 } { uv : Vec2 }
fragFxCircle =
    [glsl|
precision highp float;
uniform vec4 uC;
varying vec2 uv;
void main () {
    gl_FragColor = uC;
    gl_FragColor.a *= step(1.0, length(uv));
    if(gl_FragColor.a <= 0.025) discard;
}
    |]


{-| -}
fragImage : Shader a { b | uImg : Texture, uImgSize : Vec2, uA : Float } { uv : Vec2 }
fragImage =
    --(2i + 1)/(2N) Pixel perfect center
    [glsl|
        precision highp float;
        varying vec2 uv;
        uniform vec2 uImgSize;
        uniform sampler2D uImg;
        uniform float uA;
        void main () {
            vec2 pixel = (floor(uv * uImgSize) + 0.5) / uImgSize;
            gl_FragColor = texture2D(uImg, pixel);
            gl_FragColor.a *= uA;
            if(gl_FragColor.a <= 0.025) discard;
        }
    |]



--- COPY FROM PLAYGROUND


{-| -}
mesh : Mesh { aP : Vec2 }
mesh =
    WebGL.triangleStrip
        [ { aP = vec2 -1 -1 }
        , { aP = vec2 -1 1 }
        , { aP = vec2 1 -1 }
        , { aP = vec2 1 1 }
        ]
