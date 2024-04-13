import { CGFobject } from '../../lib/CGF.js';

export class MySphere extends CGFobject {

  constructor(scene, slices, stacks) {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.initBuffers();
  }

  initBuffers() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
