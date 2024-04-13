import {CGFobject} from '../../lib/CGF.js';
import { MyCylinder } from '../shapes/MyCylinder.js';

export class MyStem extends CGFobject {
  constructor(scene, slices, stacks, height=15, radius=0.3) {
    super(scene);
    this.height = height;
    this.radius = radius;
    this.cylinder = new MyCylinder(scene, slices, stacks, this.radius, this.height);
    this.initBuffers();
  }

  initBuffers() {
    
  }

  display() {
    this.scene.pushMatrix();
    this.scene.rotate(-90 * Math.PI / 180, 1, 0, 0);
    this.cylinder.display();
    this.scene.popMatrix();
  }
}
