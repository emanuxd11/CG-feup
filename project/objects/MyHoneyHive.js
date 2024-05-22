import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MySphere } from '../shapes/MySphere.js'

export class MyHoneyHive extends CGFobject {

  constructor(scene, radius) {
    super(scene);
    this.sphere = new MySphere(scene, 60, 15, radius, true);
    this.honeyHivetexture = new CGFtexture(this.scene, '../images/honey/honeyHive.png')
    this.appearance = new CGFappearance(scene);
    this.appearance.setEmission(0.2, 0.2, 0.2, 0.2);
    this.appearance.setTexture(this.honeyHivetexture);
  }

  display() {
    this.scene.pushMatrix();
    this.appearance.apply();
    this.sphere.display();
    this.scene.popMatrix();
  }

}
