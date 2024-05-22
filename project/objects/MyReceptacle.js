import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyConcaveCircle } from '../shapes/MyConcaveCircle.js';


export class MyReceptacle extends CGFobject {

  constructor(scene, radius, color, texture, stemColor, stemTexture, angle) {
    super(scene);
    this.scene = scene;
    this.radius = radius; 
    this.color = color;
    this.texture = texture;
    this.stemColor = stemColor;
    this.stemTexture = stemTexture;
    this.angle = angle;

    this.concaveCircle = new MyConcaveCircle(this.scene, 20, this.angle, this.radius, true);
    this.flatCircle = new MyConcaveCircle(this.scene, 20, 1, this.radius, true);
  }

  display() {
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 1, 0, 0);
    this.stemColor.apply();
    this.stemTexture.bind();
    this.flatCircle.display();
    this.scene.popMatrix();

    this.color.apply();
    this.texture.bind();
    this.concaveCircle.display();
  }

  initBuffers() { }
}
