import {CGFobject} from '../lib/CGF.js';

/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0.5, -0.5, 0.5,	  // 0
			-0.5, -0.5, 0.5,	// 1
			-0.5, -0.5, -0.5,	// 2
			0.5, -0.5, -0.5,	// 3
			0.5, 0.5, 0.5,	  // 4
			-0.5, 0.5, 0.5,	  // 5
			-0.5, 0.5, -0.5,	// 6
			0.5, 0.5, -0.5,	  // 7

      // repeating the vertices because each normal needs one vertex and we need 3 normals per vertex

			0.5, -0.5, 0.5,	  // 0
			-0.5, -0.5, 0.5,	// 1
			-0.5, -0.5, -0.5,	// 2
			0.5, -0.5, -0.5,	// 3
			0.5, 0.5, 0.5,	  // 4
			-0.5, 0.5, 0.5,	  // 5
			-0.5, 0.5, -0.5,	// 6
			0.5, 0.5, -0.5,	  // 7

			0.5, -0.5, 0.5,	  // 0
			-0.5, -0.5, 0.5,	// 1
			-0.5, -0.5, -0.5,	// 2
			0.5, -0.5, -0.5,	// 3
			0.5, 0.5, 0.5,	  // 4
			-0.5, 0.5, 0.5,	  // 5
			-0.5, 0.5, -0.5,	// 6
			0.5, 0.5, -0.5,	  // 7
		];

		// Counter-clockwise reference of vertices
		this.indices = [
      // front face
      0, 3, 7,
      7, 4, 0,

      // back face
      1, 2, 6,
      6, 5, 1,

      // top face
      4, 7, 6,
      6, 5, 4,

      // bottom face
      0, 3, 2,
      2, 1, 0,

      // right face
      0, 1, 5,
      5, 4, 0,

      // left face
      3, 2, 6,
      6, 7, 3,

      // front face view from behind
      7, 3, 0,
      0, 4, 7,

      // back face view from behind
      6, 2, 1,
      1, 5, 6,

      // top face view from behind
      6, 7, 3,
      4, 5, 6,

      // bottom face view from behind
      2, 3, 0,
      0, 1, 2,

      // right face view from behind
      5, 1, 0,
      0, 4, 5,

      // left face view from behind
      6, 2, 3,
      3, 7, 6,
		];

    this.normals = [
      // Y
      1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      -1, 0, 0,
      -1, 0, 0,
      1, 0, 0,

      // X
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, -1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,
      0, 1, 0,

      // Z
      0, 0, 1,
      0, 0, 1,
      0, 0, -1,
      0, 0, -1,
      0, 0, 1,
      0, 0, 1,
      0, 0, -1,
      0, 0, -1,
    ];

		// The defined indices (and corresponding vertices)
		// will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

