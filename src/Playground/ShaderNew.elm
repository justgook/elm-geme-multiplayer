module Playground.ShaderNew exposing (fragColor, fragFxCircle, fragGreyscale, fragInvert, fragTint, vertFullscreenInvert)

{- VERTEX SHADER -}

import Math.Vector2 exposing (Vec2)
import Math.Vector4 exposing (Vec4)
import WebGL exposing (Shader)
import WebGL.Texture exposing (Texture)


vertFullscreenInvert =
    [glsl|
precision mediump float;
attribute vec2 aP;
uniform vec4 uT;
uniform vec2 uP;
varying vec2 uv;
uniform float z;
vec2 edgeFix = vec2(0.0000001, -0.0000001);
mat2 inverse(mat2 m) {
  return mat2(m[1][1],-m[0][1], -m[1][0], m[0][0]) / (m[0][0]*m[1][1] - m[0][1]*m[1][0]);
}
void main () {
    uv = vec2(aP * inverse(mat2(uT)) + uP);
    gl_Position = vec4(aP, z  * -1.19209304e-7, 1.0);
}
        |]



{- FRAGMENT SHADER -}


{-| -}
fragFxCircle : Shader a { b | uC : Vec4 } { uv : Vec2 }
fragFxCircle =
    [glsl|
precision mediump float;
uniform vec4 uC;
varying vec2 uv;
void main () {
    gl_FragColor = uC;
    gl_FragColor.a *= step(1.0, length(uv));
    if(gl_FragColor.a <= 0.025) discard;
}
    |]



{- EFFECTS -}


fragInvert : Shader a { b | uImg : Texture, uImgSize : Vec2, uA : Float } { uv : Vec2 }
fragInvert =
    --(2i + 1)/(2N) Pixel perfect center
    [glsl|
precision mediump float;
varying vec2 uv;
uniform vec2 uImgSize;
uniform sampler2D uImg;
uniform float uA;
void main () {
    vec2 pixel = (floor(uv * uImgSize) + 0.5) / uImgSize;
    gl_FragColor = texture2D(uImg, pixel);
    gl_FragColor.rgb = vec3(1.0) - gl_FragColor.rgb;
    gl_FragColor.a *= uA;
    if(gl_FragColor.a <= 0.025) discard;
}
    |]


fragColor =
    [glsl|
precision mediump float;
varying vec2 uv;
uniform vec2 uImgSize;
uniform sampler2D uImg;
uniform vec3 uC;
uniform float uA;
void main () {
    vec2 pixel = ((floor(uv * uImgSize) + 0.5) * 2.0 ) / uImgSize / 2.0;
    gl_FragColor = vec4(color, uA);
    gl_FragColor.a *= texture2D(uImg, pixel).a;
    if(gl_FragColor.a <= 0.025) discard;
}
        |]


fragGreyscale =
    [glsl|
precision mediump float;
varying vec2 uv;
uniform vec2 uImgSize;
uniform sampler2D uImg;
uniform float uA;
void main () {
    vec2 pixel = ((floor(uv * uImgSize) + 0.5) * 2.0 ) / uImgSize / 2.0;
    vec4 color = texture2D(uImg, pixel);
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    gl_FragColor = vec4(vec3(gray), color.a * uA);
    if(gl_FragColor.a <= 0.025) discard;
}
        |]


fragTint =
    [glsl|
precision mediump float;
varying vec2 uv;
uniform vec2 uImgSize;
uniform sampler2D uImg;
uniform vec3 uC;
uniform float uA;
void main () {
    vec2 pixel = ((floor(uv * uImgSize) + 0.5) * 2.0 ) / uImgSize / 2.0;
    vec4 color = texture2D(uImg, pixel);
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    gl_FragColor = vec4(vec3(gray) * uC, color.a * uA);
    if(gl_FragColor.a <= 0.025) discard;
}
    |]
