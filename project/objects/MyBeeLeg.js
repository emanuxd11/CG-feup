import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyRandom } from '../utils/MyRandom.js';
import { MySphere } from '../shapes/MySphere.js';

export class MyBeeLeg extends CGFobject {

	constructor(scene, texture) {
		super(scene);
		this.texture = texture;

		this.stretchFactor = 6;
		this.radius = 0.02;
		this.sphere = new MySphere(scene, 30, 15, this.radius, true);	
	}

  displayFoot(side) { // side = 1 or -1
		this.scene.pushMatrix();
    this.scene.translate(0, 0, this.radius * this.stretchFactor * 0.95);
    this.scene.rotate(-10 * Math.PI / 180, 1, 0, 0);
    this.scene.rotate(side * 35 * Math.PI / 180, 0, 1, 0);
    this.scene.translate(0, 0, this.radius * this.stretchFactor / 3.5);
    this.scene.scale(0.6, 0.6, this.stretchFactor / 3.5);
    this.sphere.display();
		this.scene.popMatrix();
  }

  displayLowerLeg() {
		this.scene.pushMatrix();
    this.scene.scale(1, 1, this.stretchFactor);
    this.sphere.display();
		this.scene.popMatrix();

    this.scene.pushMatrix();
    this.displayFoot(1);
    this.displayFoot(-1);
    this.scene.popMatrix();
  }

	display() {
    // upper part
		this.scene.pushMatrix();
    this.scene.scale(1, 1, this.stretchFactor);
    this.sphere.display();
		this.scene.popMatrix();

    // lower part
    this.scene.pushMatrix();
    this.scene.translate(0, 0, this.radius * this.stretchFactor * 0.85);
    this.scene.rotate(20 * Math.PI / 180, 1, 0, 0);
    this.scene.translate(0, 0, this.radius * this.stretchFactor);
    this.displayLowerLeg();
    this.scene.popMatrix();
	}

}

