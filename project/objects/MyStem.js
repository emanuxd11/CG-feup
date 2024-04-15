import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyCylinder } from '../shapes/MyCylinder.js';

export class MyStem extends CGFobject {
  constructor(scene, slices, stacks, height, radius, size, color) {
    super(scene);
    this.height = height;
    this.radius = radius;
    this.size = size;
    this.color = color;
    this.cylinder = new MyCylinder(scene, slices, stacks, this.radius, this.height);
    this.initColors();
  }

  initColors() {
    if (this.color != null) {
      return;
    }

    this.color = new CGFappearance(this.scene);
    this.color.setAmbient(0.1, 0.5, 0.1, 1.0);
    this.color.setDiffuse(0.1, 0.6, 0.1, 1.0);
    this.color.setSpecular(0.1, 0.1, 0.1, 1.0);
    this.color.setShininess(10);
  }

  display() {
    this.scene.pushMatrix();
    this.scene.rotate(-90 * Math.PI / 180, 1, 0, 0);
    this.color.apply();
    this.cylinder.display();
    this.scene.popMatrix();
  }

  initBuffers() { }
}
