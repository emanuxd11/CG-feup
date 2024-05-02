import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyRandom } from '../utils/MyRandom.js';
import { MySphere } from '../shapes/MySphere.js';

export class MyBeeWing extends CGFobject {

	constructor(scene, xStretchFactor, yStretchFactor, zStretchFactor, material) {
		super(scene);
		this.radius = 0.1;
    this.xStretchFactor = xStretchFactor;
    this.yStretchFactor = yStretchFactor;
		this.zStretchFactor = zStretchFactor;
		this.wing = new MySphere(scene, 60, 15, this.radius, true);	
	}

	display() {
		this.scene.pushMatrix();
		this.scene.scale(this.xStretchFactor, this.yStretchFactor, this.zStretchFactor);
		this.wing.display();
		this.scene.popMatrix();
	}

}

