import { CGFobject } from '../../lib/CGF.js';
import { MyStem } from "./MyStem.js";
import { MyPetal } from "./MyPetal.js";

export class MyFlower extends CGFobject {

  constructor(scene, externalRadius=10, petalQuant=9, petalSlantAngle=30, petalStretchFactor=3, petalColor=null, receptacleRadius=5, receptacleColor=null, stemRadius=0.3, stemSize=18) {
    // not sure how to do externalRadius and stemSize unless stem size is actually just height?
    super(scene);
    this.externalRadius = externalRadius;
    this.petalQuant = petalQuant;
    this.petalSlantAngle = petalSlantAngle;
    this.petalStretchFactor = petalStretchFactor;
    this.petalColor = petalColor;
    this.receptacleRadius = receptacleRadius;
    this.receptacleColor = receptacleColor;
    this.stemRadius = stemRadius;
    this.stemSize = stemSize;

    this.petalLength = this.externalRadius - this.receptacleRadius;

    this.stem = new MyStem(scene, 20, 20, 18, this.stemRadius);
    // this.receptacle = new MyReceptacle();
    this.petals = Array.from({ length: this.petalQuant }, () => new MyPetal(scene, this.petalLength, this.petalStretchFactor, this.petalColor));
  }

  display() {
    this.stem.display();

    // missing receptacle

    const angleDiff = 2 * Math.PI / this.petalQuant;
    let currentAngle = 0;
    for (let i = 0; i < this.petalQuant; i++) {
      this.scene.pushMatrix();
      this.scene.translate(0, this.stem.height + 2, 0);
      this.scene.rotate(this.petalSlantAngle * Math.PI / 180, 1, 0, 0);
      this.scene.rotate(currentAngle, 0, 1, 0);
      this.scene.translate(0, 0, -this.receptacleRadius - this.petalLength);
      this.scene.rotate(-85 * Math.PI / 180, 1, 0, 0);
      this.petals[i].display();
      this.scene.popMatrix();

      currentAngle += angleDiff;
    }
  }

  initBuffers() { }
}
