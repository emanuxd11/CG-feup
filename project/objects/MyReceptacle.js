import { CGFobject } from '../../lib/CGF.js';

export class MyReceptacle extends CGFobject {

  constructor(scene) {
    super(scene);
    this.initBuffers();
  }

  initBuffers() {

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
