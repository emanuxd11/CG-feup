#ifdef GL_ES
precision highp float;
#endif

varying vec4 visualCoords;

void main() {
    if (visualCoords.y > 0.5) {
		gl_FragColor = vec4(0.9, 0.9, 0.1, 1.0);
    }
    else {
        gl_FragColor = vec4(0.4, 0.4, 0.9, 1.0);
    }

}