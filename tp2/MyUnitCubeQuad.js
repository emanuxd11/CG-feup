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
      this.Cube1 = new MyQuad(scene);
      this.Cube2 = new MyQuad(scene);
      this.Cube3 = new MyQuad(scene);
      this.Cube4 = new MyQuad(scene);
      this.Cube5 = new MyQuad(scene);
      this.Cube6 = new MyQuad(scene);
    }

    display() {

        //to move object (MyQuad) 0.5 units up in the Z axis
        const transfMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0.5, 1,
        ];

        //to rotate cube faces into angle
        const rightAngle = 90/180 * Math.PI

        //top face (positive Z axis)
        this.scene.pushMatrix();
        this.scene.multMatrix(transfMatrix);
        this.scene.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.scene.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.scene.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.diamond.display();
        this.scene.popMatrix();

        //bottom face (negative Z axis)
        this.scene.pushMatrix();
        this.scene.multMatrix(transfMatrix);
        this.scene.rotate(rightAngle*2, 1, 0, 0);
        this.scene.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.scene.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.scene.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.diamond.display();
        this.scene.popMatrix();

        //forward face (positive X axis)
        this.scene.pushMatrix();
        this.scene.multMatrix(transfMatrix);
        this.scene.rotate(rightAngle, 0, 1, 0);
        this.scene.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.scene.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.scene.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.diamond.display();
        this.scene.popMatrix();

        //back face (negative X axis)
        this.scene.pushMatrix();
        this.scene.multMatrix(transfMatrix);
        this.scene.rotate(rightAngle, 0, 1, 0);
        this.scene.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.scene.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.scene.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.diamond.display();
        this.scene.popMatrix();

        //right face (positive Y axis)
        this.scene.pushMatrix();
        this.scene.multMatrix(transfMatrix);
        this.scene.rotate(rightAngle, 1, 0, 0);
        this.scene.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.scene.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.scene.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.diamond.display();
        this.scene.popMatrix();

        //left face (negative Y axis)
        this.scene.pushMatrix();
        this.scene.multMatrix(transfMatrix);
        this.scene.rotate(rightAngle, 1, 0, 0);
        this.scene.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.scene.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.scene.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.diamond.display();
        this.scene.popMatrix();
    }

}