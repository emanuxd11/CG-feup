import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyRandom } from '../utils/MyRandom.js';
import { MySphere } from '../shapes/MySphere.js';

export class MyBeeAbdomen extends CGFobject {

	constructor(scene, texture) {
		super(scene);
		this.texture = texture;

		this.stretchFactor = 1.6;
		this.radius = 0.25;
		this.abdomen = new MySphere(scene, 60, 15, this.radius, true);	
	}

	display() {
		this.scene.pushMatrix();
		this.scene.scale(this.stretchFactor, 1, 1);
		this.scene.rotate(Math.PI / 2, 0, 0, 1); // for correct texture position
		this.scene.rotate(-Math.PI / 2, 0, 1, 0); // ^^^^^^^^^^^
		this.texture.bind();
		this.abdomen.display();
		this.scene.popMatrix();
	}

}
