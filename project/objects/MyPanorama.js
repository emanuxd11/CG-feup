import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MySphere } from '../shapes/MySphere.js'

export class MyPanorama extends CGFobject {

  constructor(scene, texture) {
    super(scene);
    this.sphere = new MySphere(scene, 360, 90, 200, false);
    this.appearance = new CGFappearance(scene);
    this.appearance.setEmission(1.0, 1.0, 1.0, 1.0);
    this.appearance.setTexture(texture);
  }

  display(infinity=true) {
    this.scene.pushMatrix();
    if (infinity) {
      this.scene.translate(this.scene.camera.position[0], this.scene.camera.position[1], this.scene.camera.position[2]);
    }
    this.appearance.apply();
    this.sphere.display();
    this.scene.popMatrix();
  }

}
