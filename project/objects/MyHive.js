import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MySphere } from '../shapes/MySphere.js'
import { MyPlane } from '../shapes/MyPlane.js'
import { MyTriangle } from '../shapes/MyTriangle.js'


export class MyHive extends CGFobject {

  constructor(scene) {
    super(scene);

    this.plane = new MyPlane(this.scene, 30);
    this.triangle = new MyTriangle(this.scene);
  }

  initTextures() {

  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(0, 5, 0);

    // left side
    this.scene.pushMatrix();
    this.scene.translate(-5, 0, 0);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.scale(10, 10, 10);
    this.plane.display();
    this.scene.popMatrix();

    // right side
    this.scene.pushMatrix();
    this.scene.translate(5, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.scale(10, 10, 10);
    this.plane.display();
    this.scene.popMatrix();

    // back 
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -5);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.scale(10, 10, 10);
    this.plane.display();
    this.scene.popMatrix();
    
    // bottom 
    this.scene.pushMatrix();
    this.scene.translate(0, -5, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.scale(10, 10, 10);
    this.plane.display();
    this.scene.popMatrix();

    // top
    this.scene.pushMatrix();
    this.scene.translate(0, 5, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.scale(12, 12, 12);
    this.plane.display();
    this.scene.popMatrix();

    // front side
    this.scene.pushMatrix();
    this.scene.translate(0, -2.5, 5);
    this.scene.scale(10, 5, 10);
    this.plane.display();
    this.scene.popMatrix();
    //
    this.scene.pushMatrix();
    this.scene.translate(0, 4, 5);
    this.scene.scale(10, 2, 10);
    this.plane.display();
    this.scene.popMatrix();
    //
    this.scene.pushMatrix();
    this.scene.translate(-4, 1.5, 5);
    this.scene.scale(2, 3, 3);
    this.plane.display();
    this.scene.popMatrix();
    //
    this.scene.pushMatrix();
    this.scene.translate(-2.5, 0.75, 5);
    this.scene.scale(0.75, 0.75, 0.75);
    this.triangle.display();
    this.scene.popMatrix();
    //
    this.scene.pushMatrix();
    this.scene.translate(-2.5, 2.25, 5);
    this.scene.scale(0.75, 0.75, 0.75);
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.triangle.display();
    this.scene.popMatrix();
    //
    this.scene.pushMatrix();
    this.scene.translate(4, 1.5, 5);
    this.scene.scale(2, 3, 3);
    this.plane.display();
    this.scene.popMatrix();
    //
    this.scene.pushMatrix();
    this.scene.translate(2.5, 0.75, 5);
    this.scene.scale(0.75, 0.75, 0.75);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.triangle.display();
    this.scene.popMatrix();
    //
    this.scene.pushMatrix();
    this.scene.translate(2.5, 2.25, 5);
    this.scene.scale(0.75, 0.75, 0.75);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.triangle.display();
    this.scene.popMatrix();

    // inside
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 2.5);
    this.scene.scale(10, 10, 5);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.plane.display();
    this.scene.popMatrix();
    //
    this.scene.pushMatrix();
    this.scene.translate(0, 2.5, 0);
    this.scene.scale(10, 5, 5);
    this.plane.display();
    this.scene.popMatrix();
    //
    this.scene.pushMatrix();
    this.scene.translate(-4.5, 2.5, 2.5);
    this.scene.scale(5, 5, 5);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.plane.display();
    this.scene.popMatrix();
    //
    this.scene.pushMatrix();
    this.scene.translate(4.5, 2.5, 2.5);
    this.scene.scale(5, 5, 5);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.plane.display();
    this.scene.popMatrix();

    // roof
    this.scene.pushMatrix();
    this.scene.translate(0, 5, 0);
    this.scene.scale(4.25, 2.5, 1);
    this.scene.translate(0, -5, 0);
    this.scene.pushMatrix();
    this.scene.translate(0, 5, 6);
    this.scene.rotate(-135 * Math.PI / 180, 0, 0, 1);
    this.triangle.display();
    this.scene.popMatrix();
    //
    this.scene.pushMatrix();
    this.scene.translate(0, 5, -6);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.rotate(-135 * Math.PI / 180, 0, 0, 1);
    this.triangle.display();
    this.scene.popMatrix();
    //
    this.scene.pushMatrix();
    this.scene.translate(Math.SQRT2 / 2, 5 + Math.SQRT2 / 2, 0);
    this.scene.rotate(-45 * Math.PI / 180, 0, 0, 1);
    this.scene.scale(2, 1, 13);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.plane.display();
    this.scene.popMatrix();
    //
    this.scene.pushMatrix();
    this.scene.translate(Math.SQRT2 / 2, 5 + Math.SQRT2 / 2, 0);
    this.scene.rotate(135 * Math.PI / 180, 0, 0, 1);
    this.scene.scale(2, 1, 13);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.plane.display();
    this.scene.popMatrix();
    //
    this.scene.pushMatrix();
    this.scene.translate(-Math.SQRT2 / 2, 5 + Math.SQRT2 / 2, 0);
    this.scene.rotate(45 * Math.PI / 180, 0, 0, 1);
    this.scene.scale(2, 1, 13);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.plane.display();
    this.scene.popMatrix();
    //
    this.scene.pushMatrix();
    this.scene.translate(-Math.SQRT2 / 2, 5 + Math.SQRT2 / 2, 0);
    this.scene.rotate(-135 * Math.PI / 180, 0, 0, 1);
    this.scene.scale(2, 1, 13);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.plane.display();
    this.scene.popMatrix();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }
}
