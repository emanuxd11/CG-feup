import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MySphere } from '../shapes/MySphere.js';

export class MyReceptacle extends CGFobject {

  constructor(scene, radius, color=null) {
    super(scene);
    this.scene = scene;
    this.radius = radius; 
    this.color = color;

    this.sphere = new MySphere(this.scene, 60, 15, radius, true);
    this.initColors();
  }

  initColors() {
    if (this.color != null) {
      return;
    }

    this.color = new CGFappearance(this.scene);
    this.color.setAmbient(1.0, 1.0, 1.0, 1.0);
    this.color.setDiffuse(1.0, 0.9, 0.2, 1.0);
    this.color.setSpecular(1.0, 0.9, 0.6, 1.0);
    this.color.setShininess(100);
  }

  display() {
    this.color.apply();
    this.sphere.display();
  }

  initBuffers() { }
}
