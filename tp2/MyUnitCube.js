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
		];

		// Counter-clockwise reference of vertices
		this.indices = [
      // front face
      0, 1, 2,
      2, 3, 0,

      // back face
      4, 5, 6,
      6, 7, 4,

      // top face
      4, 7, 6,
      6, 5, 4,

      // bottom face
      0, 3, 2,
      2, 1, 0,

      // right face error here I think
      3, 7, 6,
      6, 2, 3,

      // left face error also here I think
      0, 4, 5,
      5, 1, 0,
		];

		// The defined indices (and corresponding vertices)
		// will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

    // Disable backface culling
    this.scene.gl.disable(this.scene.gl.CULL_FACE);

		this.initGLBuffers();
	}
}

