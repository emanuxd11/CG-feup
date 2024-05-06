import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyRandom } from '../utils/MyRandom.js';
import { MySphere } from '../shapes/MySphere.js';

export class MyBeeWing extends CGFobject {

	constructor(scene, xStretchFactor, yStretchFactor, zStretchFactor, material) {
		super(scene);
		this.material = material;

		this.radius = 0.1;
		this.xStretchFactor = xStretchFactor;
		this.yStretchFactor = yStretchFactor;
		this.zStretchFactor = zStretchFactor;
		this.wing = new MySphere(scene, 60, 15, this.radius, true);	
	}

	display() {
    // activate alpha (transparency)
    this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);
    this.scene.gl.enable(this.scene.gl.BLEND);

		this.scene.pushMatrix();
		this.scene.scale(this.xStretchFactor, this.yStretchFactor, this.zStretchFactor);
		this.material.apply();
		this.wing.display();
		this.scene.popMatrix();

    this.scene.gl.enable(this.scene.gl.BLEND);
	}

}

