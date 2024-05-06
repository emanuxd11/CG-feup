import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyRandom } from '../utils/MyRandom.js';
import { MySphere } from '../shapes/MySphere.js';

export class MyBeeHead extends CGFobject {

	constructor(scene, texture) {
		super(scene);
		this.texture = texture;

		this.zStretchFactor = 1.6;
		this.yStretchFactor = 1.8;
		this.radius = 0.125;
		this.eyeRadius = 0.1;

		this.eyeColor = new CGFappearance(this.scene);
		this.eyeColor.setAmbient(0, 0, 0, 1);
		this.eyeColor.setDiffuse(0, 0, 0, 1);
		this.eyeColor.setSpecular(1, 1, 1, 1);
		this.eyeColor.setShininess(10);

		this.head = new MySphere(scene, 60, 15, this.radius, true);	
		this.eye = new MySphere(scene, 20, 5, this.eyeRadius, true);
	}

	display() {
		this.scene.pushMatrix();
		this.scene.scale(1, this.yStretchFactor, this.zStretchFactor);
		this.texture.bind();
		this.head.display();
		this.scene.popMatrix();

		// left eye
		this.scene.pushMatrix();
		this.scene.scale(0.8, 1.1, 1);
		this.scene.rotate(55 * Math.PI / 180, 0, 1, 0);
		this.scene.translate(-this.radius, 0, 0);
		this.eyeColor.apply();
		this.eye.display();
		this.scene.popMatrix();
		
		// right eye
		this.scene.pushMatrix();
		this.scene.scale(0.8, 1.1, 1);
		this.scene.rotate(-55 * Math.PI / 180, 0, 1, 0);
		this.scene.translate(-this.radius, 0, 0);
		this.eyeColor.apply();
		this.eye.display();
		this.scene.popMatrix();
	}

}
