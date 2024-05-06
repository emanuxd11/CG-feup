import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyRandom } from '../utils/MyRandom.js';
import { MySphere } from '../shapes/MySphere.js';

export class MyBeeAbdomen extends CGFobject {

	constructor(scene, texture) {
		super(scene);
		this.texture = texture;

		this.stretchFactor = 1.6;
		this.radius = 0.25;

		this.stingerStretchFactor = 15;
		this.stingerRadius = 0.01;

		this.stingerColor = new CGFappearance(this.scene);
		this.stingerColor.setAmbient(0, 0, 0, 1);
		this.stingerColor.setDiffuse(0, 0, 0, 1);
		this.stingerColor.setSpecular(1, 1, 1, 1);
		this.stingerColor.setShininess(10);

		this.abdomen = new MySphere(scene, 60, 15, this.radius, true);	
		this.stinger = new MySphere(scene, 10, 3, this.stingerRadius, true);
	}

	display() {
		this.scene.pushMatrix();
		this.scene.scale(this.stretchFactor, 1, 1);
		this.scene.rotate(Math.PI / 2, 0, 0, 1); // for correct texture position
		this.scene.rotate(-Math.PI / 2, 0, 1, 0); // ^^^^^^^^^^^
		this.texture.bind();
		this.abdomen.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(this.radius * this.stretchFactor, 0, 0);
		this.scene.scale(this.stingerStretchFactor, 1, 1);
		this.stingerColor.apply();
		this.stinger.display();
		this.scene.popMatrix();
	}

}
