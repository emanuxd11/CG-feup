import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MySphere } from '../shapes/MySphere.js'

export class MyPanorama extends CGFobject {

  constructor(scene, texture) {
    super(scene);
    this.sphere = new MySphere(scene, 360, 90, 200, false);
    this.appearance = new CGFappearance(scene);
    // this.appearance.setEmission(0.0, 0.0, 0.3);
    this.appearance.setTexture(texture);
  }

  display() {
    this.appearance.apply();
    this.sphere.display();
  }

}
