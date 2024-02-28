import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyUnit Cube Quad
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
      super(scene);
      this.quad = new MyQuad(scene);
    }

    display() {

        //to rotate cube faces into angle
        const rightAngle = 90/180 * Math.PI

        //top face (positive Z axis)
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        //bottom face (negative Z axis)
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(rightAngle*2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        //forward face (positive X axis)
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(rightAngle, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        //back face (negative X axis)
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-rightAngle, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        //right face (positive Y axis)
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(rightAngle, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        //left face (negative Y axis)
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(-rightAngle, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();
    }

}