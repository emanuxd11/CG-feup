import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyRandom } from '../utils/MyRandom.js';
import { MySphere } from '../shapes/MySphere.js';

export class MyBeeHead extends CGFobject {

	constructor(scene, texture) {
		super(scene);
		this.zStretchFactor = 1.6;
		this.yStretchFactor = 1.8;
		this.radius = 0.125;
		this.head = new MySphere(scene, 60, 15, this.radius, true);	
	}

	display() {
		this.scene.pushMatrix();
		this.scene.scale(1, this.yStretchFactor, this.zStretchFactor);
		this.head.display();
		this.scene.popMatrix();
	}

}
