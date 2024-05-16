attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
varying vec2 vTextureCoord;

uniform float strength;
uniform float uTime;

void main() {
  vTextureCoord = aTextureCoord;

  vec3 offset = vec3(
    0.0,
    0.0, 
    sin(uTime*0.3) * aVertexPosition.y * aVertexPosition.y * strength
  );

  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}
