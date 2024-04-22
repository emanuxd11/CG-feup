import {CGFobject} from '../../lib/CGF.js';

export class MyConcaveCircle extends CGFobject {
  constructor(scene, slices, angle, radius, outside = false) {
    super(scene);
    this.slices = slices;
    this.angle = Math.PI * angle / 180;
    this.radius = radius;

    this.direction = 1;
    if (outside) this.direction = -1;

    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    for (let slice = 0; slice < this.slices + 1; slice++) {
      // center
      let x0 = 0;
      let y0 = 1;
      let z0 = 0;

      // 1st circle
      let x1 = Math.sin(slice / this.slices) * Math.sin(this.angle / 2);
      let y1 = Math.cos(this.angle / 2);
      let z1 = Math.cos(slice / this.slices) * Math.sin(this.angle / 2) * this.direction;

      // 2nd circle
      let x2 = Math.sin(slice / this.slices) * Math.sin(this.angle);
      let y2 = Math.cos(this.angle);
      let z2 = Math.cos(slice / this.slices) * Math.sin(this.angle) * this.direction;

      // generating vertices
      this.vertices.push(x0 * this.radius, y0 * this.radius, z0 * this.radius);
      this.vertices.push(x1 * this.radius, y1 * this.radius, z1 * this.radius);
      this.vertices.push(x2 * this.radius, y2 * this.radius, z2 * this.radius);

      // generating normals
      this.normals.push(x0 * this.direction, y0 * this.direction, z0 * this.direction);
      this.normals.push(x1 * this.direction, y1 * this.direction, z1 * this.direction);
      this.normals.push(x2 * this.direction, y2 * this.direction, z2 * this.direction);

      // generating texCoords
      this.texCoords.push(0.5,0.5);
      this.texCoords.push((Math.sin(slice/this.slices)+1)/4,(Math.cos(slice/this.slices)+1)/4);
      this.texCoords.push((Math.sin(slice/this.slices)+1)/2,(Math.cos(slice/this.slices)+1)/2);
    }

    // generating indices
    for (let slice = 0; slice < this.slices; slice++) {

      //inner triangle
      this.indices.push(3*slice, 3*(slice+1)+1, 3*slice+1);

      //outer quad
      this.indices.push(3*slice+1, 3*(slice+1)+1, 3*slice+2);
      this.indices.push(3*slice+2, 3*(slice+1)+1, 3*(slice+1)+2);
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
