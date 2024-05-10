import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyRandom } from '../utils/MyRandom.js';
import { MyBeeAbdomen } from './MyBeeAbdomen.js';
import { MyBeeThorax } from './MyBeeThorax.js';
import { MyBeeHead } from './MyBeeHead.js';
import { MyBeeWing } from './MyBeeWing.js';
import { MyBeeLeg } from './MyBeeLeg.js';


export class MyBee extends CGFobject {

	constructor(scene, position={ x: 0, y: 0, z: 0 }, orientation, velocity={ x: 0, y: 0, z: 0 }) {
		super(scene);

		this.position = position;
		this.velocity = velocity;
		this.orientation = orientation;

		// for fine tuning of movement sensitivity
		this.turnFactor = 10;
		this.speedFactor = 1/1000;

		this.wingMovAngle = 0;

		this.thoraxTexture = new CGFtexture(this.scene, '../images/bee/thorax.jpg');
		this.abdomenTexture = new CGFtexture(this.scene, '../images/bee/abdomen.jpg');
		this.wingMaterial = new CGFappearance(this.scene);
		this.wingMaterial.setColor(0.4, 0.4, 0.4, 0.35);
		this.wingMaterial.setAmbient(0.4, 0.4, 0.4, 0.35);
		this.wingMaterial.setDiffuse(0.4, 0.4, 0.4, 0.35);
		this.wingMaterial.setEmission(0, 0, 0, 0);

		this.thorax = new MyBeeThorax(this.scene, this.thoraxTexture);
		this.abdomen = new MyBeeAbdomen(this.scene, this.abdomenTexture);
		this.head = new MyBeeHead(this.scene);
		this.wing1 = new MyBeeWing(this.scene, 1.5, 0.2, 5, this.wingMaterial);
		this.wing2 = new MyBeeWing(this.scene, 0.9, 0.15, 3.6, this.wingMaterial);

		this.smallerLeg = new MyBeeLeg(this.scene, null); // add textures !!
		this.longerLeg = new MyBeeLeg(this.scene, null, 6);

		// util for less calculations during display
		this.cosPI3 = Math.cos(Math.PI / 3);
		this.sinPI3 = Math.sin(Math.PI / 3);
	}

	display() {

		let relAbdomenPosition = this.thorax.radius * this.thorax.stretchFactor + this.abdomen.radius * this.abdomen.stretchFactor;
		let relHeadPosition = this.thorax.radius * this.thorax.stretchFactor + this.head.radius;
		let relLegPosition = this.thorax.radius + this.smallerLeg.radius * this.smallerLeg.stretchFactor;


		/* POSITIONING */

		this.scene.pushMatrix();
		this.scene.translate(this.position.x, this.position.y, this.position.z);
		this.scene.rotate(this.orientation * Math.PI / 180, 0, 1, 0);


		/* THORAX */

		this.thorax.display();


		/* ABDOMEN */

		this.scene.pushMatrix();
		this.scene.rotate(-25 * Math.PI / 180, 0, 0, 1);
		this.scene.translate(relAbdomenPosition - relAbdomenPosition * 0.05, 0, 0);
		this.abdomen.display();
		this.scene.popMatrix();


		/* HEAD */

		this.scene.pushMatrix();
		this.scene.rotate(-25 * Math.PI / 180, 0, 0, 1);
		this.scene.translate(-relHeadPosition + relHeadPosition * 0.1, -0.17, 0);
		this.head.display();
		this.scene.popMatrix();


		/* LEGS */

		// left side, middle
		this.scene.pushMatrix();
		this.scene.rotate(15 * Math.PI / 180, 1, 0, 0);
		this.scene.translate(0, 0, relLegPosition * 0.95);
		this.smallerLeg.display();
		this.scene.popMatrix();
		
		// left side, front
		this.scene.pushMatrix();
		this.scene.rotate(15 * Math.PI / 180, 1, 0, 0);
		this.scene.rotate(-30 * Math.PI / 180, 0, 1, 0);
		this.scene.translate(0, 0, relLegPosition * 0.98);
		this.smallerLeg.display();
		this.scene.popMatrix();

		// left side, rear 
		this.scene.pushMatrix();
		this.scene.rotate(20 * Math.PI / 180, 1, 0, 0);
		this.scene.rotate(40 * Math.PI / 180, 0, 1, 0);
		this.scene.translate(0, 0, relLegPosition);
		this.longerLeg.display();
		this.scene.popMatrix();

		// right side, middle
		this.scene.pushMatrix();
		this.scene.rotate(-15 * Math.PI / 180, 1, 0, 0);
		this.scene.rotate(180 * Math.PI / 180, 0, 1, 0);
		this.scene.translate(0, 0, relLegPosition * 0.95);
		this.smallerLeg.display();
		this.scene.popMatrix();

		// right side, front
		this.scene.pushMatrix();
		this.scene.rotate(-15 * Math.PI / 180, 1, 0, 0);
		this.scene.rotate(210 * Math.PI / 180, 0, 1, 0);
		this.scene.translate(0, 0, relLegPosition * 0.98);
		this.smallerLeg.display();
		this.scene.popMatrix();

		// right side, rear 
		this.scene.pushMatrix();
		this.scene.rotate(-20 * Math.PI / 180, 1, 0, 0);
		this.scene.rotate(140 * Math.PI / 180, 0, 1, 0);
		this.scene.translate(0, 0, relLegPosition);
		this.longerLeg.display();
		this.scene.popMatrix();


		/* WINGS */
		
		// big wing 1 (left side of bee)
		this.scene.pushMatrix();
		this.scene.rotate(-10 * Math.PI / 180, 0, 1, 0);
		this.scene.translate(0, this.thorax.radius * this.sinPI3, -this.thorax.radius * this.cosPI3); 
		this.scene.translate(0, 0, this.thorax.radius - 0.02);
		this.scene.rotate(-this.wingMovAngle, 1, 0, 0);
		this.scene.translate(0, 0, this.wing1.radius * this.wing1.zStretchFactor);
		this.wing1.display();
		this.scene.popMatrix();

		// big wing 2 (right side of bee)
		this.scene.pushMatrix();
		this.scene.rotate(10 * Math.PI / 180, 0, 1, 0);
		this.scene.translate(0, this.thorax.radius * this.sinPI3, this.thorax.radius * this.cosPI3); 
		this.scene.translate(0, 0, -this.thorax.radius + 0.02);
		this.scene.rotate(this.wingMovAngle, 1, 0, 0);
		this.scene.translate(0, 0, -this.wing1.radius * this.wing1.zStretchFactor);
		this.wing1.display();
		this.scene.popMatrix();

		// small wing 1 (left side of bee)
		this.scene.pushMatrix();
		this.scene.rotate(10 * Math.PI / 180, 0, 1, 0);
		this.scene.translate(0, this.thorax.radius * this.sinPI3, -this.thorax.radius * this.cosPI3); 
		this.scene.translate(0, 0, this.thorax.radius - 0.02);
		this.scene.rotate(-this.wingMovAngle, 1, 0, 0);
		this.scene.translate(0, 0, this.wing2.radius * this.wing2.zStretchFactor);
		this.wing2.display();
		this.scene.popMatrix();

		// small wing 2 (right side of bee)
		this.scene.pushMatrix();
		this.scene.rotate(-10 * Math.PI / 180, 0, 1, 0);
		this.scene.translate(0, this.thorax.radius * this.sinPI3, this.thorax.radius * this.cosPI3); 
		this.scene.translate(0, 0, -this.thorax.radius + 0.02);
		this.scene.rotate(this.wingMovAngle, 1, 0, 0);
		this.scene.translate(0, 0, -this.wing2.radius * this.wing2.zStretchFactor);
		this.wing2.display();
		this.scene.popMatrix();


		/* END OF POSITIONING */

		this.scene.popMatrix();
	}

	update(time) {
    this.updatePosition(time);
    this.updateWings(time);
	}

	updatePosition(time) {
		this.position.y = Math.sin(time * 2 * Math.PI) / 4;

		this.position.x += this.velocity.x * this.speedFactor;
		this.position.z += this.velocity.z * this.speedFactor;
	}

	updateWings(time) {
		this.wingMovAngle = (30 * Math.PI / 180) * Math.sin(time * 14 * Math.PI) + 0 * Math.PI / 180;
	}

	turn(v) {
		const magnitude = Math.sqrt(this.velocity.x ** 2 + this.velocity.z ** 2);

		this.orientation += v * this.turnFactor;

		this.velocity.x = magnitude * (-Math.cos(this.orientation * Math.PI / 180));
		this.velocity.z = magnitude * Math.sin(this.orientation * Math.PI / 180);
	}

	accelerate(v) {
		this.velocity.x += v * (-Math.cos(this.orientation * Math.PI / 180));
		this.velocity.z += v * (Math.sin(this.orientation * Math.PI / 180));
	}

	resetMovement() {
		this.position.x = 0;
		this.position.y = 0;
		this.position.z = 0;

		this.velocity.x = 0;
		this.velocity.y = 0;
		this.velocity.z = 0;

		this.orientation = 0;
	}

}

