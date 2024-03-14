import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
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
    this.initMaterials();
  }

  initMaterials() {
    // green diamond
    this.diamondMaterial = new CGFappearance(this.scene);
    this.diamondMaterial.setAmbient(0, 1, 0, 1.0);
    this.diamondMaterial.setDiffuse(0, 1, 0, 0)
    this.diamondMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.diamondMaterial.setShininess(10.0);
    this.diamondMaterial.loadTexture('images/tangram.png');

    // pink triangle 
    this.pinkTriangleMaterial = new CGFappearance(this.scene);
    this.pinkTriangleMaterial.setAmbient(1, 153 / 255, 204 / 255, 1.0);
    this.pinkTriangleMaterial.setDiffuse(0, 1, 0, 0)
    this.pinkTriangleMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.pinkTriangleMaterial.setShininess(10.0);
    this.pinkTriangleMaterial.loadTexture('images/tangram.png');

    // big blue triangle
    this.bigBlueTriangleMaterial = new CGFappearance(this.scene);
    this.bigBlueTriangleMaterial.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.bigBlueTriangleMaterial.setDiffuse(0, 1, 0, 0)
    this.bigBlueTriangleMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.bigBlueTriangleMaterial.setShininess(10.0);
    this.bigBlueTriangleMaterial.loadTexture('images/tangram.png');

    // yello parallelogram
    this.yellowParallelogramMaterial = new CGFappearance(this.scene);
    this.yellowParallelogramMaterial.setAmbient(255/255, 255/255, 0, 1.0);
    this.yellowParallelogramMaterial.setDiffuse(0, 1, 0, 0)
    this.yellowParallelogramMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.yellowParallelogramMaterial.setShininess(10.0);
    this.yellowParallelogramMaterial.loadTexture('images/tangram.png');

    // big orange triangle
    this.bigOrangeTriangleMaterial = new CGFappearance(this.scene);
    this.bigOrangeTriangleMaterial.setAmbient(255 / 255, 128 / 255, 0 / 255, 1.0);
    this.bigOrangeTriangleMaterial.setDiffuse(0, 1, 0, 0)
    this.bigOrangeTriangleMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.bigOrangeTriangleMaterial.setShininess(10.0);
    this.bigOrangeTriangleMaterial.loadTexture('images/tangram.png');

    // small purple triangle
    this.smallPurpleTriangleMaterial = new CGFappearance(this.scene);
    this.smallPurpleTriangleMaterial.setAmbient(76 / 255, 0 / 255, 153 / 255, 1.0);
    this.smallPurpleTriangleMaterial.setDiffuse(0, 1, 0, 0)
    this.smallPurpleTriangleMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.smallPurpleTriangleMaterial.setShininess(10.0);
    this.smallPurpleTriangleMaterial.loadTexture('images/tangram.png');

    // small red triangle
    this.smallRedTriangleMaterial = new CGFappearance(this.scene);
    this.smallRedTriangleMaterial.setAmbient(255/255, 0, 0, 1.0);
    this.smallRedTriangleMaterial.setDiffuse(0, 1, 0, 0)
    this.smallRedTriangleMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.smallRedTriangleMaterial.setShininess(10.0);
    this.smallRedTriangleMaterial.loadTexture('images/tangram.png');
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

    // green diamond
    this.scene.pushMatrix();
    this.scene.multMatrix(transfMatrix);
    this.scene.multMatrix(rotationMatrix);
    this.diamondMaterial.apply();
    this.diamond.display();
    this.scene.popMatrix();
    
    // center pink triangle
    this.scene.pushMatrix();
    this.scene.rotate(45 * Math.PI / 180, 0, 0, 1);
    this.pinkTriangleMaterial.apply();
    this.triangle.display();
    this.scene.popMatrix();
    
    // big blue triangle on the right
    this.scene.pushMatrix();
    this.scene.translate(2.000, -1.415, 0);
    this.bigBlueTriangleMaterial.apply();
    this.triangleBig.display();
    this.scene.popMatrix();

    // yellow parallelogram on the right
    this.scene.pushMatrix();
    this.scene.translate(2.585, 0, 0);
    this.scene.scale(1, -1, 1);
    this.yellowParallelogramMaterial.apply();
    this.parallelogram.display();
    this.scene.popMatrix();

    // big orange triangle on the left
    this.scene.pushMatrix();
    this.scene.translate(-1.41, 0, 0);
    this.scene.rotate(-(90 + 90 + 45) * Math.PI / 180, 0, 0, 1);
    this.bigOrangeTriangleMaterial.apply();
    this.triangleBig.display();
    this.scene.popMatrix();

    // small purple triangle on the left
    this.scene.pushMatrix();
    this.scene.translate(-3.21, 1.8, 0);
    this.scene.rotate(-45 * Math.PI / 180, 0, 0, 1);
    this.smallPurpleTriangleMaterial.apply();
    this.triangleSmall.display();
    this.scene.popMatrix();

    // small red triangnle on the left
    this.scene.pushMatrix();
    this.scene.translate(-3.824, -0.5, 0);
    this.smallRedTriangleMaterial.apply();
    this.triangleSmall.display();
    this.scene.popMatrix();
  }

  enableNormalViz() {
    this.diamond.enableNormalViz();
    this.triangleSmall.enableNormalViz();
    this.triangleBig.enableNormalViz();
    this.triangle.enableNormalViz();
    this.parallelogram.enableNormalViz();
  }

  disableNormalViz() {
    this.diamond.disableNormalViz();
    this.triangleSmall.disableNormalViz();
    this.triangleBig.disableNormalViz();
    this.triangle.disableNormalViz();
    this.parallelogram.disableNormalViz();
  }
}

