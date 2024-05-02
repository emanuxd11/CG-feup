import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyRandom } from '../utils/MyRandom.js';
import { MyBeeAbdomen } from './MyBeeAbdomen.js';
import { MyBeeThorax } from './MyBeeThorax.js';
import { MyBeeHead } from './MyBeeHead.js';
import { MyBeeWing } from './MyBeeWing.js';


export class MyBee extends CGFobject {

	constructor(scene) {
		super(scene);

		// this.headTexture = new CGFtexture(this.scene, '../images/bee/head.jpg');
		this.thoraxTexture = new CGFtexture(this.scene, '../images/bee/thorax.jpg');
		this.abdomenTexture = new CGFtexture(this.scene, '../images/bee/abdomen.jpg');
		this.thorax = new MyBeeThorax(this.scene, this.thoraxTexture);
		this.abdomen = new MyBeeAbdomen(this.scene, this.abdomenTexture);
		this.head = new MyBeeHead(this.scene);
		this.wing1 = new MyBeeWing(this.scene, 1, 0.2, 4);
		this.wing2 = new MyBeeWing(this.scene, 0.4, 0.15, 3);

		// util for less calculations during display
		this.cosPI3 = Math.cos(Math.PI / 3);
		this.sinPI3 = Math.sin(Math.PI / 3);
	}

	display() {
		let relAbdomenPosition = this.thorax.radius * this.thorax.stretchFactor + this.abdomen.radius * this.abdomen.stretchFactor;
		let relHeadPosition = this.thorax.radius * this.thorax.stretchFactor + this.head.radius;

		// temp var as in using this for now
		let wingMovAngle = 5 * Math.PI / 180;

		// display thorax
		this.thorax.display();

		// display abdomen
		this.scene.pushMatrix();
		this.scene.rotate(-25 * Math.PI / 180, 0, 0, 1);
		this.scene.translate(relAbdomenPosition - relAbdomenPosition * 0.05, 0, 0);
		this.abdomen.display();
		this.scene.popMatrix();

		// display head
		this.scene.pushMatrix();
		this.scene.rotate(-25 * Math.PI / 180, 0, 0, 1);
		this.scene.translate(-relHeadPosition + relHeadPosition * 0.1, -0.17, 0);
		this.head.display();
		this.scene.popMatrix();

		// big wing 1 (left side of bee)
		this.scene.pushMatrix();
		this.scene.rotate(-10 * Math.PI / 180, 0, 1, 0);
		this.scene.translate(0, this.thorax.radius * this.sinPI3, -this.thorax.radius * this.cosPI3); 
		this.scene.translate(0, 0, this.thorax.radius - 0.02);
		this.scene.rotate(-wingMovAngle, 1, 0, 0);
		this.scene.translate(0, 0, this.wing1.radius * this.wing1.zStretchFactor);
		this.wing1.display();
		this.scene.popMatrix();

		// big wing 2 (right side of bee)
		this.scene.pushMatrix();
		this.scene.rotate(10 * Math.PI / 180, 0, 1, 0);
		this.scene.translate(0, this.thorax.radius * this.sinPI3, this.thorax.radius * this.cosPI3); 
		this.scene.translate(0, 0, -this.thorax.radius + 0.02);
		this.scene.rotate(wingMovAngle, 1, 0, 0);
		this.scene.translate(0, 0, -this.wing1.radius * this.wing1.zStretchFactor);
		this.wing1.display();
		this.scene.popMatrix();

		// small wing 1 (left side of bee)
		this.scene.pushMatrix();
		this.scene.rotate(10 * Math.PI / 180, 0, 1, 0);
		this.scene.translate(0, this.thorax.radius * this.sinPI3, -this.thorax.radius * this.cosPI3); 
		this.scene.translate(0, 0, this.thorax.radius - 0.02);
		this.scene.rotate(-wingMovAngle, 1, 0, 0);
		this.scene.translate(0, 0, this.wing2.radius * this.wing2.zStretchFactor);
		this.wing2.display();
		this.scene.popMatrix();

		// small wing 2 (right side of bee)
		this.scene.pushMatrix();
		this.scene.rotate(-10 * Math.PI / 180, 0, 1, 0);
		this.scene.translate(0, this.thorax.radius * this.sinPI3, this.thorax.radius * this.cosPI3); 
		this.scene.translate(0, 0, -this.thorax.radius + 0.02);
		this.scene.rotate(wingMovAngle, 1, 0, 0);
		this.scene.translate(0, 0, -this.wing2.radius * this.wing2.zStretchFactor);
		this.wing2.display();
		this.scene.popMatrix();
	}

}
