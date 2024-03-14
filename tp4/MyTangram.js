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
    this.diamondTexture = new CGFtexture(this.scene, 'images/tangram.png');
  }

  initMaterials() {
    // diamond
    this.diamondMaterial = new CGFappearance(this.scene);
    this.diamondMaterial.setAmbient(0, 1, 0, 1.0);
    this.diamondMaterial.setDiffuse(0, 1, 0, 0)
    this.diamondMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.diamondMaterial.setShininess(10.0);
    // this.diamondMaterial.loadTexture('images/tangram.png');
    // this.diamondMaterial.setTextureWrap('REPEAT', 'REPEAT');

    // triangle 
    this.triangleMaterial = new CGFappearance(this.scene);
    this.triangleMaterial.setAmbient(1, 153 / 255, 204 / 255, 1.0);
    this.triangleMaterial.setDiffuse(0, 1, 0, 0)
    this.triangleMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.triangleMaterial.setShininess(10.0);

    // big triangle
    this.bigTriangleMaterial = new CGFappearance(this.scene);
    this.bigTriangleMaterial.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.bigTriangleMaterial.setDiffuse(0, 1, 0, 0)
    this.bigTriangleMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.bigTriangleMaterial.setShininess(10.0);

    // parallelogram
    this.parallelogramMaterial = new CGFappearance(this.scene);
    this.parallelogramMaterial.setAmbient(255/255, 255/255, 0, 1.0);
    this.parallelogramMaterial.setDiffuse(0, 1, 0, 0)
    this.parallelogramMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.parallelogramMaterial.setShininess(10.0);

    // big triangle 2
    this.triangleBig2Material = new CGFappearance(this.scene);
    this.triangleBig2Material.setAmbient(255 / 255, 128 / 255, 0 / 255, 1.0);
    this.triangleBig2Material.setDiffuse(0, 1, 0, 0)
    this.triangleBig2Material.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.triangleBig2Material.setShininess(10.0);

    // small triangle 1
    this.smallTriangle1Material = new CGFappearance(this.scene);
    this.smallTriangle1Material.setAmbient(76 / 255, 0 / 255, 153 / 255, 1.0);
    this.smallTriangle1Material.setDiffuse(0, 1, 0, 0)
    this.smallTriangle1Material.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.smallTriangle1Material.setShininess(10.0);

    // small triangle 2
    this.smallTriangle2Material = new CGFappearance(this.scene);
    this.smallTriangle2Material.setAmbient(255/255, 0, 0, 1.0);
    this.smallTriangle2Material.setDiffuse(0, 1, 0, 0)
    this.smallTriangle2Material.setSpecular(0.9, 0.9, 0.9, 1.0);
    this.smallTriangle2Material.setShininess(10.0);
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
    // this.scene.customMaterial.apply();
    this.diamondMaterial.apply();
    this.diamondTexture.bind();
    this.diamond.display();
    this.scene.popMatrix();
    
    // center triangle
    this.scene.pushMatrix();
    this.scene.rotate(45 * Math.PI / 180, 0, 0, 1);
    this.triangleMaterial.apply();
    this.triangle.display();
    this.scene.popMatrix();
    
    // big triangle on the right
    this.scene.pushMatrix();
    this.scene.translate(2.000, -1.415, 0);
    this.bigTriangleMaterial.apply();
    this.triangleBig.display();
    this.scene.popMatrix();

    // yellow parallelogram on the right
    this.scene.pushMatrix();
    this.scene.translate(2.585, 0, 0);
    this.scene.scale(1, -1, 1);
    this.parallelogramMaterial.apply();
    this.parallelogram.display();
    this.scene.popMatrix();

    // big orange triangle on the left
    this.scene.pushMatrix();
    this.scene.translate(-1.41, 0, 0);
    this.scene.rotate(-(90 + 90 + 45) * Math.PI / 180, 0, 0, 1);
    this.triangleBig2Material.apply();
    this.triangleBig.display();
    this.scene.popMatrix();

    // small purple triangle on the left
    this.scene.pushMatrix();
    this.scene.translate(-3.21, 1.8, 0);
    this.scene.rotate(-45 * Math.PI / 180, 0, 0, 1);
    this.smallTriangle1Material.apply();
    this.triangleSmall.display();
    this.scene.popMatrix();

    // small red triangnle on the left
    this.scene.pushMatrix();
    this.scene.translate(-3.824, -0.5, 0);
    this.smallTriangle2Material.apply();
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

