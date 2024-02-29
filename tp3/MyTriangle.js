import { CGFobject } from '../lib/CGF.js';

export class MyTriangle extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initBuffers();
  }
  
  initBuffers() {
    this.vertices = [
      -1, -1, 0,   // 0
      1, -1, 0,    // 1
      -1, 1, 0     // 2
    ];

    // Counter-clockwise reference of vertices
    this.indices = [
      0, 1, 2
    ];

    // The defined indices (and corresponding vertices)
    // will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;

    // Disable backface culling
    this.scene.gl.disable(this.scene.gl.CULL_FACE);

    this.initGLBuffers();
  }
}

