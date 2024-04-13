import { CGFobject } from '../lib/CGF.js';

/**
 * MySphere
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Int16Array} slices - Number of meridians in the sphere
 * @param {Int16Array} stacks - Number of paralels in each hemisphere
 */

export class MySphere extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);
    this.initBuffers();
  }

  initBuffers() {
    this.vertices=[];
    this.indices=[];
    this.normals=[];

    /*
    for (let slice=0; slice<this.slices; slice++) {
    }
    */
  }
}

