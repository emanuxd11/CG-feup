import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyUnit Cube Quad
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyUnitCubeQuad extends CGFobject {
  constructor(scene, textureTop, textureFront, textureRight, textureBack, textureLeft, textureBottom) {
    super(scene);
    this.quad = new MyQuad(this.scene);
    this.textureTop = textureTop;
    this.textureFront = textureFront;
    this.textureRight = textureRight;
    this.textureBack = textureBack;
    this.textureLeft = textureLeft;
    this.textureBottom = textureBottom;
  }

  display() {

    //to rotate cube faces into angle
    const rightAngle = 90/180 * Math.PI

    //top face (positive Z axis)
    this.scene.pushMatrix()
    this.scene.translate(0,0.5,0)
    this.scene.rotate(3 * Math.PI/2 ,1, 0, 0)
    this.textureTop.bind();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    this.quad.display()
    this.scene.popMatrix()

    //bottom face (negative Z axis)
    this.scene.pushMatrix()
    this.scene.translate(0,-0.5,0)
    this.scene.rotate(Math.PI/2 ,1, 0, 0)
    this.textureBottom.bind();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    this.quad.display()
    this.scene.popMatrix()

    //forward face (positive X axis)
    this.scene.pushMatrix()
    this.scene.translate(0.5, 0, 0)
    this.scene.rotate(Math.PI / 2, 0, 1, 0)
    this.textureFront.bind();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    this.quad.display()
    this.scene.popMatrix()

    //back face (negative X axis)
    this.scene.pushMatrix()
    this.scene.translate(-0.5, 0, 0)
    this.scene.rotate(3 * Math.PI / 2, 0, 1, 0)
    this.textureBack.bind();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    this.quad.display()
    this.scene.popMatrix()

    //right face (positive Y axis)
    this.scene.pushMatrix()
    this.scene.translate(0,0,-0.5)
    this.scene.rotate(Math.PI,0, 1, 0)
    this.textureRight.bind();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    this.quad.display()
    this.scene.popMatrix()

    //left face (negative Y axis)
    this.scene.pushMatrix()
    this.scene.translate(0,0,0.5)
    this.textureLeft.bind();
    this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    this.quad.display()
    this.scene.popMatrix()
  }
}

