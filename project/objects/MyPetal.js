import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyTriangle } from '../shapes/MyTriangle.js';

export class MyPetal extends CGFobject {
  constructor(scene, length, stretchFactor, color, flap, texture) {
    super(scene);
    this.triangle1 = new MyTriangle(scene);
    this.triangle2 = new MyTriangle(scene);
    this.stretchFactor = stretchFactor;
    this.length = length;
    this.color = color;
    this.flap = flap;
    this.texture = texture;
  }

  initShapes() {
    this.flap = -((Math.random() * this.maximumFlap) + this.minimumFlap) * Math.PI / 180;
  }

  turnIsosceles() {
    this.scene.scale(this.length/this.stretchFactor, this.length, this.length/this.stretchFactor);
    this.scene.rotate(45 * Math.PI / 180, 0, 0, 1);
  }

  display() {

    // First part
    this.scene.pushMatrix();
    this.turnIsosceles();
    this.color.apply();
    this.texture.bind();
    this.triangle1.display();
    this.scene.popMatrix();

    // Second part (slightly tilted back)
    this.scene.pushMatrix();
    this.scene.rotate(this.flap, 1, 0, 0);
    this.turnIsosceles();    
    this.scene.rotate(180 * Math.PI / 180, 0, 0, 1);
    this.color.apply();
    this.texture.bind();
    this.triangle2.display();
    this.scene.popMatrix();
  }

  initBuffers() { }
}
