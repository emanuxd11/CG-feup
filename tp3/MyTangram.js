import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
  constructor(scene) {
    super(scene);
    this.diamond = new MyDiamond(scene);
    this.triangle = new MyTriangle(scene);
    this.parallelogram = new MyParallelogram(scene);
    this.triangleSmall = new MyTriangleSmall(scene);
    this.triangleBig = new MyTriangleBig(scene);
  }

  display() {
    const transfMatrix = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      2.2, 1.263, 0, 1,
    ];

    const diamondAngle = -30 * Math.PI / 180;
    const cosTheta = Math.cos(diamondAngle);
    const sinTheta = Math.sin(diamondAngle);

    const rotationMatrix = [
        cosTheta, -sinTheta, 0, 0,
        sinTheta, cosTheta,  0, 0,
        0,        0,         1, 0,
        0,        0,         0, 1
    ];

    // first diamond
    this.scene.pushMatrix();
    this.scene.multMatrix(transfMatrix);
    this.scene.multMatrix(rotationMatrix);
    this.scene.setAmbient(0, 255 / 255, 0, 1.0);
    this.scene.setDiffuse(0, 255 / 255, 0, 1.0);
    this.scene.setSpecular(0, 255 / 255, 0, 1.0);
    this.diamond.display();
    this.scene.popMatrix();
    
    // center triangle
    this.scene.pushMatrix();
    this.scene.rotate(45 * Math.PI / 180, 0, 0, 1);
    this.scene.setAmbient(255 / 255, 153 / 255, 204 / 255, 1.0);
    this.scene.setDiffuse(255 / 255, 153 / 255, 204 / 255, 1.0);
    this.scene.setSpecular(255 / 255, 153 / 255, 204 / 255, 1.0);
    this.triangle.display();
    this.scene.popMatrix();
    
    // big triangle on the right
    this.scene.pushMatrix();
    this.scene.translate(2.000, -1.415, 0);
    this.scene.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.scene.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.scene.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.triangleBig.display();
    this.scene.popMatrix();

    // yellow parallelogram on the right
    this.scene.pushMatrix();
    this.scene.translate(2.585, 0, 0);
    this.scene.scale(1, -1, 1);
    this.scene.setAmbient(255/255, 255/255, 0, 1.0);
    this.scene.setDiffuse(255/255, 255/255, 0, 1.0);
    this.scene.setSpecular(255/255, 255/255, 0, 1.0);
    this.parallelogram.display();
    this.scene.popMatrix();

    // big orange triangle on the left
    this.scene.pushMatrix();
    this.scene.translate(-1.41, 0, 0);
    this.scene.rotate(-(90 + 90 + 45) * Math.PI / 180, 0, 0, 1);
    this.scene.setAmbient(255 / 255, 128 / 255, 0 / 255, 1.0);
    this.scene.setDiffuse(255 / 255, 128 / 255, 0 / 255, 1.0);
    this.scene.setSpecular(255 / 255, 128 / 255, 0 / 255, 1.0);
    this.triangleBig.display();
    this.scene.popMatrix();

    // small purple triangle on the left
    this.scene.pushMatrix();
    this.scene.translate(-3.21, 1.8, 0);
    this.scene.rotate(-45 * Math.PI / 180, 0, 0, 1);
    this.scene.setAmbient(76 / 255, 0 / 255, 153 / 255, 1.0);
    this.scene.setDiffuse(76 / 255, 0 / 255, 153 / 255, 1.0);
    this.scene.setSpecular(76 / 255, 0 / 255, 153 / 255, 1.0);
    this.triangleSmall.display();
    this.scene.popMatrix();

    // small red triangnle on the left
    this.scene.pushMatrix();
    this.scene.translate(-3.824, -0.5, 0);
    this.scene.setAmbient(255/255, 0, 0, 1.0);
    this.scene.setDiffuse(255/255, 0, 0, 1.0);
    this.scene.setSpecular(255/255, 0, 0, 1.0);
    this.triangleSmall.display();
    this.scene.popMatrix();
  }
}

