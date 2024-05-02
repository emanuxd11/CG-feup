import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyRandom } from '../utils/MyRandom.js';
import { MySphere } from '../shapes/MySphere.js';

export class MyBeeThorax extends CGFobject {

	constructor(scene, texture) {
		super(scene);
		this.texture = texture;

		this.radius = 0.2;
		this.stretchFactor = 1.2;
		this.thorax = new MySphere(scene, 60, 15, this.radius, true);	
	}

	display() {
		this.scene.pushMatrix();
		this.scene.scale(this.stretchFactor, 1, 1);
		this.texture.bind();
		this.thorax.display();
		this.scene.popMatrix();
	}

}
