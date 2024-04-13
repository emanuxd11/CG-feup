import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyTriangle } from '../shapes/MyTriangle.js';

export class MyPetal extends CGFobject {
  constructor(scene) {
    super(scene);
    this.triangle1 = new MyTriangle(scene);
    this.triangle2 = new MyTriangle(scene);
    this.minimumFlap = 5;
    this.maximumFlap = 20;
    this.initColors();
    this.initShapes();
  }

  initColors() {
    this.petalMaterial = new CGFappearance(this.scene);
    this.petalMaterial.setAmbient(0.9, 0.9, 0.8, 1.0);
    this.petalMaterial.setDiffuse(0.95, 0.95, 0.9, 1.0);
    this.petalMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);
    this.petalMaterial.setShininess(2);
  }

  initShapes() {
    this.flap = -((Math.random() * this.maximumFlap) + this.minimumFlap) * Math.PI / 180;
  }

  turnIsosceles() {
    this.scene.scale(1, 3, 1);
    this.scene.rotate(45 * Math.PI / 180, 0, 0, 1);
  }

  display() {
    // First part
    this.scene.pushMatrix();
    this.turnIsosceles();
    this.petalMaterial.apply();
    this.triangle1.display();
    this.scene.popMatrix();

    // Second part (slightly tilted back)
    this.scene.pushMatrix();
    this.scene.rotate(this.flap, 1, 0, 0);
    this.turnIsosceles();    
    this.scene.rotate(180 * Math.PI / 180, 0, 0, 1);
    this.petalMaterial.apply();
    this.triangle2.display();
    this.scene.popMatrix();
  }

  initBuffers() { }
}
