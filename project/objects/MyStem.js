import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyCylinder } from '../shapes/MyCylinder.js';
import { MyRandom } from '../utils/MyRandom.js';
import { MyLeaf } from './MyLeaf.js';

export class MyStem extends CGFobject {
  constructor(scene, height, radius, size, color, texture, leafQuant, leafColor, leafTexture) {
    super(scene);
    this.height = height;
    this.radius = radius;
    this.size = size;
    this.color = color;
    this.texture = texture;
    this.leafQuant = leafQuant;
    this.leafColor = leafColor;
    this.leafTexture = leafTexture;
    this.leaves = Array.from({ length: this.leafQuant }, 
      () => new MyLeaf(
        this.scene, 
        this.leafColor, 
        this.color,
        this.leafTexture, 
        this.texture,
      )
    );

    this.cylinders = [];
    this.cylinderAngles = [];
    this.totalAngle = 0; // this angle is in degrees, conversion to radians is necessary

    // for translating each part of the stem to the proper place
    // first index is null since we don't use this (we don't need to calculate 
    // placings for the first cylinder since that's just the origin)
    this.zCoords = [0];
    this.yCoords = [0];

    this.leafPlacements = [];
    for (let i = 0; i < this.leafQuant; i++) {
      let val;
      do {
        val = MyRandom.getRandomInt(5, this.size - 5);
      } while(this.leafPlacements.includes(val));
      this.leafPlacements.push(val);
    }
    this.leafZ = [];
    this.leafY = [];

    for (let i = 0; i < this.size; i++) {
      let currentHeight = this.getRandomCylinderHeight();
      this.cylinders.push(new MyCylinder(
        this.scene, 
        6,
        6,
        this.radius,
        currentHeight,
      ));

      let angle = MyRandom.getRandomFloat(0, 1);
      this.cylinderAngles.push(angle);
      this.totalAngle += angle;

      // let prevZ = this.zCoords[i] != null ? this.zCoords[i] : 0;
      // let prevY = this.yCoords[i] != null ? this.yCoords[i] : 0;
      let prevZ = this.zCoords[i];
      let prevY = this.yCoords[i] ;
      this.zCoords.push(prevZ + Math.sin(this.totalAngle * Math.PI / 180) * currentHeight);
      this.yCoords.push(prevY + Math.cos(this.totalAngle * Math.PI / 180) * currentHeight);

      if (i == this.leafPlacements[this.leafZ.length]) {
        this.leafZ.push(this.zCoords[i]);
        this.leafY.push(this.yCoords[i]);
      }
    }
    this.finalZ = this.zCoords[this.zCoords.length - 1];
    this.finalY = this.yCoords[this.yCoords.length - 1];


    this.initColors();
  }

  getRandomCylinderHeight() {
    if (this.size > 1) {
      return MyRandom.getRandomFloat(0.5, 1.5);
    } else {
      return MyRandom.getRandomFloat(0.2, 0.4);
    }
  }

  initColors() {
    if (this.color != null) {
      return;
    }

    this.color = new CGFappearance(this.scene);
    this.color.setAmbient(0.1, 0.5, 0.1, 1.0);
    this.color.setDiffuse(0.1, 0.6, 0.1, 1.0);
    this.color.setSpecular(0.1, 0.1, 0.1, 1.0);
    this.color.setShininess(10);
  }

  display() {
    let testColor = new CGFappearance(this.scene);
    testColor.setAmbient(1, 1, 1, 1);
    testColor.setDiffuse(1, 1, 1, 1);
    testColor.setSpecular(1, 1, 1, 1);
    testColor.setShininess(99999);

    let currentAngle = 0;
    for (let i = 0; i < this.cylinders.length; i++) {
      currentAngle += this.cylinderAngles[i];

      this.scene.pushMatrix();

      this.color.apply();

      if (i > 0) {
        this.scene.translate(0, this.yCoords[i], this.zCoords[i]);
      }
      this.scene.rotate((currentAngle - 90) * Math.PI / 180, 1, 0, 0);
      this.texture.bind();
      this.cylinders[i].display();

      this.scene.popMatrix();
      // console.log("displayed a cylinder, i = " + i + " number of cylinders is " + this.cylinders.length);

      if (i < this.leafZ.length) {
        this.scene.pushMatrix();
        this.scene.translate(0, this.leafY[i], this.leafZ[i]);
        this.scene.rotate(this.leaves[i].slant, 0, 0, 1);
        this.scene.rotate(this.leaves[i].yRotation, 0, 1, 0);
        this.leaves[i].display();
        this.scene.popMatrix();
      }
    }
  }

  initBuffers() { }
}
