import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyTriangle } from '../shapes/MyTriangle.js';
import { MyCylinder } from '../shapes/MyCylinder.js';
import { MyRandom } from '../utils/MyRandom.js';

export class MyLeaf extends CGFobject {
  constructor(scene, leafColor, stemColor, texture, stemTexture) {
    super(scene);
    this.stretchFactor = MyRandom.getRandomFloat(1.5, 3);
    this.length = MyRandom.getRandomFloat(0.8, 1.5);
    this.stemLength = 2 * this.length * Math.SQRT2 + MyRandom.getRandomFloat(0.7, 0.9);
    this.triangle1 = new MyTriangle(scene);
    this.triangle2 = new MyTriangle(scene);
    this.stem = new MyCylinder(scene, 5, 5, 0.05, this.stemLength);
    this.leafColor = leafColor;
    this.stemColor = stemColor;
    this.stemTexture = stemTexture;
    this.texture = texture;

    this.slant = MyRandom.getRandomFloat(-Math.PI/3, Math.PI/3);
    this.yRotation = MyRandom.getRandomFloat(0, Math.PI*2);

    this.initShapes();
  }

  initShapes() {
    this.flap = -((Math.random() * this.maximumFlap) + this.minimumFlap) * Math.PI / 180;
  }

  turnIsosceles() {
    this.scene.scale(this.length, this.length / this.stretchFactor, this.length);
    this.scene.rotate(45 * Math.PI / 180, 0, 0, 1);
  }

  display() {

    this.scene.pushMatrix();
    this.scene.translate(this.stemLength - this.length * Math.SQRT2, 0, 0);

    // First part
    this.scene.pushMatrix();
    this.turnIsosceles();
    this.leafColor.apply();
    this.texture.bind();
    this.triangle1.display();
    this.scene.popMatrix();

    // Second part (slightly tilted back)
    this.scene.pushMatrix();
    // this.scene.rotate(this.flap, 1, 0, 0);
    this.turnIsosceles();
    this.scene.rotate(180 * Math.PI / 180, 0, 0, 1);
    this.leafColor.apply();
    this.texture.bind();
    this.triangle2.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(this.length * Math.SQRT2, 0, 0);
    this.scene.rotate(-Math.PI/2, 0, 1, 0);
    this.stemColor.apply();
    this.stemTexture.bind();
    this.stem.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }

  initBuffers() { }
}
