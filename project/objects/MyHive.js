import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MyRandom } from '../utils/MyRandom.js';
import { MyHoneyHive } from './MyHoneyHive.js';
import { MyPlank } from './MyPlank.js';
import { MyPollen } from './MyPollen.js';


export class MyHive extends CGFobject {
  constructor(scene) {
    super(scene);

    this.cornerPost = new MyPlank(this.scene, 5, 5, 45);
    this.wallPlank = new MyPlank(this.scene, 6, 3, 40);
    this.roof = new MyPlank(this.scene, 60, 60, 3);
    this.floor = new MyPlank(this.scene, 44, 44, 3);
    this.honeyHive = new MyHoneyHive(this.scene, 15);

		this.pollenMaterial = new CGFappearance(this.scene);
    this.pollenMaterial.setAmbient(1, 1, 1, 1.0);
    this.pollenMaterial.setDiffuse(1, 1, 1, 1.0);
    this.pollenMaterial.setSpecular(1, 1, 1, 1.0);
    this.pollenMaterial.setShininess(1.0);
    this.pollenMaterial.setTexture(new CGFtexture(this.scene, "images/bee/pollen.png"));
    this.pollenMaterial.setTextureWrap('REPEAT', 'REPEAT');
		this.pollen = new MyPollen(this.scene, this.pollenMaterial);
    this.pollenCount = 0;
    this.pollenPositionsX = [];
    this.pollenPositionsY = [];
  }

  addPollen() {
    this.pollenCount++;
    this.pollenPositionsX.push(MyRandom.getRandomFloat(-15 * Math.PI / 180, 15 * Math.PI / 180));
    this.pollenPositionsY.push(MyRandom.getRandomFloat(-15 * Math.PI / 180, 15 * Math.PI / 180));
  }

  display() {
    //-x-z post
    this.scene.pushMatrix();
    this.scene.translate(-25, 0, -25);
    this.cornerPost.display();
    this.scene.popMatrix();

    //-x+z post
    this.scene.pushMatrix();
    this.scene.translate(-25, 0, 20);
    this.cornerPost.display();
    this.scene.popMatrix();

    //+x-z post
    this.scene.pushMatrix();
    this.scene.translate(20, 0, -25);
    this.cornerPost.display();
    this.scene.popMatrix();

    //+x+z post
    this.scene.pushMatrix();
    this.scene.translate(20, 0, 20);
    this.cornerPost.display();
    this.scene.popMatrix();

    // roof
    this.scene.pushMatrix();
    this.scene.translate(-30, 45, -30);
    this.roof.display();
    this.scene.popMatrix();

    // floor
    this.scene.pushMatrix();
    this.scene.translate(-22, 7, -22);
    this.floor.display();
    this.scene.popMatrix();

    for (let i = 0; i < 5; i++) {
      //-z wall
      this.scene.pushMatrix();
      this.scene.translate(-20, 16 + 7 * i, -24);
      this.scene.rotate(-Math.PI / 2, 0, 0, 1);
      this.wallPlank.display();
      this.scene.popMatrix();

      //+z wall
      this.scene.pushMatrix();
      this.scene.translate(-20, 16 + 7 * i, 21);
      this.scene.rotate(-Math.PI / 2, 0, 0, 1);
      this.wallPlank.display();
      this.scene.popMatrix();

      //-x wall
      this.scene.pushMatrix();
      this.scene.translate(-24, 10 + 7 * i, -20);
      this.scene.rotate(Math.PI / 2, 0, 1, 0);
      this.scene.rotate(Math.PI / 2, 0, 0, 1);
      this.wallPlank.display();
      this.scene.popMatrix();
    }

    //+x wall
    this.scene.pushMatrix();
    this.scene.translate(21, 10, -20);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.wallPlank.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(21, 17, -20);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.wallPlank.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(21, 31, -20);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.wallPlank.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(21, 38, -20);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.wallPlank.display();
    this.scene.popMatrix();

    // honeyHive
    this.scene.pushMatrix();
    this.scene.translate(0, 31, 0);
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    for (let i = 0; i < this.pollenCount; i++) {
      this.scene.pushMatrix();
      this.scene.rotate(this.pollenPositionsY[i], 1, 0, 0);
      this.scene.rotate(this.pollenPositionsX[i], 0, 1, 0);
      this.scene.translate(0, 0, this.honeyHive.radius);
      this.scene.scale(3, 3, 3);
      this.pollen.display();
      this.scene.popMatrix();
    }
    this.honeyHive.display();
    this.scene.popMatrix();
    this.scene.popMatrix();
  }
}
