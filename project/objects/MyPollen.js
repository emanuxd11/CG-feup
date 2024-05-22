import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyRandom } from '../utils/MyRandom.js';
import { MySphere } from '../shapes/MySphere.js';


export class MyPollen extends CGFobject {

	constructor(scene, material) {
		super(scene);
		this.material = material;

		this.radius = 0.4;
		this.stretchFactor = 1.3;
		this.height = this.radius * this.stretchFactor;
		this.pollen = new MySphere(scene, 20, 5, this.radius, true);	
	}

	display() {
		this.scene.pushMatrix();
		// this.scene.scale(1, this.stretchFactor, 1);
		this.material.apply();
		this.pollen.display();
		this.scene.popMatrix();
	}

}
