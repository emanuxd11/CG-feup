import { CGFobject } from '../lib/CGF.js';

export class MyParallelogram extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initBuffers();
  }
  
  initBuffers() {
    this.vertices = [
      0, 0, 0,    // 0
      1, 1, 0,    // 1
      2, 0, 0,    // 2
      3, 1, 0,    // 3

      0, 0, 0,    // 4 / 0
      1, 1, 0,    // 5 / 1
      2, 0, 0,    // 6 / 2
      3, 1, 0,    // 7 / 3
    ];

    // Counter-clockwise reference of vertices
    this.indices = [
      0, 1, 2, // First triangle
      1, 3, 2, // Second triangle

      // for viewing from behind
      2, 1, 0,
      2, 3, 1,

      // for normals
      4, 5, 6,
      5, 7, 6,
    ];

    this.normals = [
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,

      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
      0, 0, -1,
    ];

    // The defined indices (and corresponding vertices)
    // will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  }

  setTexCoords(texCoords) {
    this.texCoords = texCoords;

    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  }
}

