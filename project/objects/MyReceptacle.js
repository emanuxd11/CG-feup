import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyConcaveCircle } from '../shapes/MyConcaveCircle.js';
import { MySphere } from '../shapes/MySphere.js';

export class MyReceptacle extends CGFobject {

  constructor(scene, radius, color=null) {
    super(scene);
    this.scene = scene;
    this.radius = radius; 
    this.color = color;

    // provisional values to emulate concave circle while that isn't finished yet
    // this.sphere = new MySphere(this.scene, 180, 360, radius, true);  
    this.concaveCircle = new MyConcaveCircle(this.scene, 12, 30, this.radius, true);
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
    // this.scene.pushMatrix(); // this part is provisional while the concave circle isn't finished
    // this.scene.rotate(Math.PI/2, 0, 0, 1); // provisional
    // this.sphere.display();
    this.concaveCircle.display();
    // this.scene.popMatrix();
  }

  initBuffers() { }
}
