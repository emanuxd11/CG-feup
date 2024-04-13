import { CGFobject } from '../../lib/CGF.js';
import { MyStem } from "./MyStem.js";
import { MyPetal } from "./MyPetal.js";

export class MyFlower extends CGFobject {

  constructor(scene, externalRadius=10, petalQuant=9, petalColor=null, receptacleRadius=5, receptacleColor=null, stemRadius=0.3, stemSize=18) {
    // not sure how to do externalRadius and stemSize unless stem size is actually just height?
    super(scene);
    this.receptacleRadius = 5; // later change usage to this.receptacle.radius like in stem
    this.petalSlantAngle = 30;
    this.stem = new MyStem(scene, 20, 20, 18);
    this.petalQuant = petalQuant;
    this.petals = Array.from({ length: this.petalQuant }, () => new MyPetal(scene));
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
      this.scene.translate(0, 0, -this.receptacleRadius);
      this.scene.rotate(-85 * Math.PI / 180, 1, 0, 0);
      this.petals[i].display();
      this.scene.popMatrix();

      currentAngle += angleDiff;
    }
  }

  initBuffers() { }
}
