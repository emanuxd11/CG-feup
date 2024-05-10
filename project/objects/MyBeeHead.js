import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyRandom } from '../utils/MyRandom.js';
import { MySphere } from '../shapes/MySphere.js';

export class MyBeeHead extends CGFobject {

	constructor(scene) {
		super(scene);

		this.zStretchFactor = 1.6;
		this.yStretchFactor = 1.8;
		this.radius = 0.125;
		this.eyeRadius = 0.1;
		this.antennaRadius = 0.005;
		this.antennaStretchFactor = 10;
		this.mouthRadius = 0.01;
		this.mouthStretchFactor = 5;

		this.defaultColor = new CGFappearance(this.scene);
		this.defaultColor.setAmbient(1, 1, 1, 1);
		this.defaultColor.setDiffuse(1, 1, 1, 1);
		this.defaultColor.setSpecular(1, 1, 1, 1);
		this.defaultColor.setEmission(1, 1, 1, 1);
		this.defaultColor.setShininess(1);

		this.eyeColor = new CGFappearance(this.scene);
		this.eyeColor.setAmbient(0.3, 0.3, 0.3, 1);
		this.eyeColor.setDiffuse(0.3, 0.3, 0.3, 1);
		this.eyeColor.setSpecular(1, 1, 1, 1);
		this.eyeColor.setShininess(10);

		this.black = new CGFappearance(this.scene);
		this.black.setAmbient(0, 0, 0, 1);
		this.black.setDiffuse(0, 0, 0, 0);
		this.black.setSpecular(1, 1, 1, 1);
		this.black.setShininess(10);

		this.eyeTexture = new CGFtexture(this.scene, '../images/bee/eye.jpg');
		this.headTexture = new CGFtexture(this.scene, '../images/bee/head.jpg');

		this.head = new MySphere(scene, 60, 15, this.radius, true);	
		this.eye = new MySphere(scene, 20, 5, this.eyeRadius, true);
		this.antenna = new MySphere(scene, 10, 3, this.antennaRadius, true);
		this.mouth = new MySphere(scene, 10, 3, this.mouthRadius, true);
	}

	displayAntenna(side) { // side = 1 or -1
		this.scene.pushMatrix();
		this.scene.scale(1, this.antennaStretchFactor * 2, 1);
		this.antenna.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0, this.antennaRadius * this.antennaStretchFactor * 2 * 0.95, 0);
		this.scene.rotate(20 * side * Math.PI / 180, 0, 1, 0);
		this.scene.rotate(70 * Math.PI / 180, 0, 0, 1);
		this.scene.translate(0, this.antennaRadius * this.antennaStretchFactor, 0);
		this.scene.scale(1, this.antennaStretchFactor, 1);
		this.antenna.display();
		this.scene.popMatrix();
	}

	display() {

		/* HEAD */

		this.defaultColor.apply();
		this.scene.pushMatrix();
		this.scene.scale(1, this.yStretchFactor, this.zStretchFactor);
		this.headTexture.bind();
		this.head.display();
		this.scene.popMatrix();


		/* EYES */


		// left eye
		this.scene.pushMatrix();
		this.scene.scale(0.8, 1.1, 1);
		this.scene.rotate(55 * Math.PI / 180, 0, 1, 0);
		this.scene.translate(-this.radius, 0, 0);
		this.eyeColor.apply();
		this.eyeTexture.bind();
		this.eye.display();
		this.scene.popMatrix();
		
		// right eye
		this.scene.pushMatrix();
		this.scene.scale(0.8, 1.1, 1);
		this.scene.rotate(-55 * Math.PI / 180, 0, 1, 0);
		this.scene.translate(-this.radius, 0, 0);
		this.eyeColor.apply();
		this.eyeTexture.bind();
		this.eye.display();
		this.scene.popMatrix();

		this.eyeTexture.unbind();
		this.black.apply();

		/* ANTENNAE */

		// right antenna
		this.scene.pushMatrix();
		this.scene.rotate(10 * Math.PI / 180, 1, 0, 0);
		this.scene.translate(0, this.radius * this.yStretchFactor, 0);
		this.scene.rotate(25 * Math.PI / 180, 0, 0, 1);
		this.displayAntenna(1);
		this.scene.popMatrix();

		// left antenna
		this.scene.pushMatrix();
		this.scene.rotate(-10 * Math.PI / 180, 1, 0, 0);
		this.scene.translate(0, this.radius * this.yStretchFactor, 0);
		this.scene.rotate(25 * Math.PI / 180, 0, 0, 1);
		this.displayAntenna(-1);
		this.scene.popMatrix();


		/* MOUTH */

		// right side
		this.scene.pushMatrix();
		this.scene.rotate(-10 * Math.PI / 180, 1, 0, 0);
		this.scene.translate(0, -this.radius * this.yStretchFactor, 0);
		this.scene.rotate(40 * Math.PI / 180, 1, 0, 0);
		this.scene.scale(1, this.mouthStretchFactor, 1);
		this.mouth.display();
		this.scene.popMatrix();

		// left side
		this.scene.pushMatrix();
		this.scene.rotate(10 * Math.PI / 180, 1, 0, 0);
		this.scene.translate(0, -this.radius * this.yStretchFactor, 0);
		this.scene.rotate(-40 * Math.PI / 180, 1, 0, 0);
		this.scene.scale(1, this.mouthStretchFactor, 1);
		this.mouth.display();
		this.scene.popMatrix();
	}

}
