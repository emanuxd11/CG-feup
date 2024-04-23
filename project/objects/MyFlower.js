import { CGFappearance, CGFobject, CGFtexture } from '../../lib/CGF.js';
import { MyRandom } from '../utils/MyRandom.js';
import { MyStem } from "./MyStem.js";
import { MyPetal } from "./MyPetal.js";
import { MyReceptacle } from "./MyReceptacle.js";

export class MyFlower extends CGFobject {
  static maximumExternalRadius = 7;

  static petalColors = [
    { ambient: [1.0, 0.4, 0.4, 1.0], diffuse: [1.0, 0.2, 0.2, 1.0], specular: [1.0, 0.6, 0.6, 1.0], shininess: 10 },   // Red
    { ambient: [0.7, 0.4, 0.8, 1.0], diffuse: [0.7, 0.3, 0.7, 1.0], specular: [0.7, 0.5, 0.9, 1.0], shininess: 10 },   // Violet
    { ambient: [1.0, 0.9, 0.2, 1.0], diffuse: [1.0, 0.9, 0.2, 1.0], specular: [1.0, 0.9, 0.6, 1.0], shininess: 10 },   // Yellow
    { ambient: [1.0, 0.6, 1.0, 1.0], diffuse: [1.0, 0.4, 1.0, 1.0], specular: [1.0, 0.8, 1.0, 1.0], shininess: 10 },   // Magenta
    { ambient: [0.2, 0.5, 1.0, 1.0], diffuse: [0.3, 0.6, 1.0, 1.0], specular: [0.5, 0.8, 1.0, 1.0], shininess: 15 },   // Light Blue
    { ambient: [0.9, 0.9, 0.8, 1.0], diffuse: [0.95, 0.95, 0.9, 1.0], specular: [0.2, 0.2, 0.2, 1.0], shininess: 2 },  // White
  ];

  static receptacleColors = [
    { ambient: [0.2, 0.5, 1.0, 1.0], diffuse: [0.3, 0.6, 1.0, 1.0], specular: [0.5, 0.8, 1.0, 1.0], shininess: 5 },   // Blue
    { ambient: [1.0, 1.0, 0.0, 1.0], diffuse: [1.0, 1.0, 0.0, 1.0], specular: [0.8, 0.8, 0.8, 1.0], shininess: 5 },   // Yellow
    { ambient: [0.8, 0.4, 0.2, 1.0], diffuse: [0.8, 0.4, 0.2, 1.0], specular: [0.8, 0.8, 0.8, 1.0], shininess: 5 },   // Brown
    { ambient: [1.0, 1.0, 1.0, 1.0], diffuse: [1.0, 0.9, 0.2, 1.0], specular: [1.0, 0.9, 0.6, 1.0], shininess: 5 },   // Yellow
  ];

  static stemColors = [
    { ambient: [0.2, 0.8, 0.2, 1.0], diffuse: [0.2, 0.8, 0.2, 1.0], specular: [0.2, 0.8, 0.2, 1.0], shininess: 10 },   // Green
    { ambient: [0.4, 0.6, 0.4, 1.0], diffuse: [0.4, 0.6, 0.4, 1.0], specular: [0.4, 0.6, 0.4, 1.0], shininess: 10 },   // Light green
  ];

  static petalTextures = [
    '../images/flower/petal1.png',
    '../images/flower/petal2.png',
  ];

  static leafTextures = [
    '../images/flower/leaf1.png',
    '../images/flower/leaf2.png',
  ];

  static stemTextures = [
    '../images/flower/stem1.png',
    '../images/flower/stem2.png',
  ];

  static receptacleTextures = [
    '../images/flower/receptacle1.png',
  ];

  constructor(scene, externalRadius=null, petalQuant=null, petalSlantAngle=null, 
    petalStretchFactor=null, petalColor=null, petalTexture=null, 
    receptacleRadius=null, receptacleAngle=null, receptacleColor=null, receptacleTexture=null, stemRadius=null,
    stemSize=null, stemColor=null, stemTexture=null, leafQuant=null, leafColor=null, leafTexture=null) {

    super(scene);
    this.scene = scene;
    this.externalRadius = (externalRadius == null) ? this.getRandomExternalRadius() : externalRadius;
    this.petalQuant = (petalQuant == null) ? this.getRandomPetalQuantity() : petalQuant;
    this.petalSlantAngle = (petalSlantAngle == null) ? this.getRandomPetalSlantAngle() : petalSlantAngle;
    this.petalStretchFactor = (petalStretchFactor == null) ? this.getRandomPetalStretchFactor() : petalStretchFactor;
    this.petalColor = (petalColor == null) ? this.getRandomPetalColor() : petalColor;
    this.petalTexture = (petalTexture == null) ? this.getRandomPetalTexture() : petalTexture;
    this.receptacleRadius = (receptacleRadius == null) ? this.getRandomReceptacleRadius() : receptacleRadius;
    this.receptacleAngle = (receptacleAngle == null) ? this.getRandomReceptacleAngle() : receptacleAngle;
    this.receptacleColor = (receptacleColor == null) ? this.getRandomReceptacleColor() : receptacleColor;
    this.receptacleTexture = (receptacleTexture == null) ? this.getRandomReceptacleTexture() : receptacleTexture;
    this.stemRadius = (stemRadius == null) ? this.getRandomStemRadius() : stemRadius;
    this.stemSize = (stemSize == null) ? this.getRandomStemSize() : stemSize;
    this.stemColor = (stemColor == null) ? this.getRandomStemColor() : stemColor;
    this.stemTexture = (stemTexture == null) ? this.getRandomStemTexture() : stemTexture;
    this.leafQuant = (leafQuant == null) ? this.getRandomLeafQuant() : leafQuant;
    this.leafColor = (leafColor == null) ? this.getRandomLeafColor() : leafColor;
    this.leafTexture = (leafTexture == null) ? this.getRandomLeafTexture() : leafTexture;

    this.petalLength = this.externalRadius - this.receptacleRadius;
    this.minimumPetalFlap = 5;
    this.maximumPetalFlap = 20;

    this.stem = new MyStem(
      this.scene,        // scene
      this.stemHeight,   // height
      this.stemRadius,   // radius
      this.stemSize,     // size
      this.stemColor,    // color
      this.stemTexture,  // texture
      this.leafQuant,    // leaf quantity
      this.leafColor,    // leaf color
      this.leafTexture,  // leaf texture
    );

    this.receptacle = new MyReceptacle(
      this.scene, 
      this.receptacleRadius, 
      this.receptacleColor,
      this.receptacleTexture,
      this.stemColor,
      this.stemTexture,
      this.receptacleAngle,
    );

    this.petals = Array.from({ length: this.petalQuant }, 
      () => new MyPetal(
        this.scene, 
        this.petalLength, 
        this.petalStretchFactor, 
        this.petalColor, 
        -((Math.random() * this.maximumPetalFlap) + this.minimumPetalFlap) * Math.PI / 180, 
        this.petalTexture,
      )
    );
  }

  getRandomExternalRadius() {
    return MyRandom.getRandomInt(3, 7);
  }

  getRandomPetalQuantity() {
    return MyRandom.getRandomInt(11, 15);
  }

  getRandomPetalSlantAngle() {
    return MyRandom.getRandomInt(0, 35);
  }

  getRandomPetalStretchFactor() {
    return MyRandom.getRandomFloat(1.5, 3.5);
  }

  getRandomPetalColor() {
    const colorChoice = MyFlower.petalColors[MyRandom.getRandomInt(0, MyFlower.petalColors.length - 1)];

    const color = new CGFappearance(this.scene);
    color.setAmbient(...colorChoice.ambient);
    color.setDiffuse(...colorChoice.diffuse);
    color.setSpecular(...colorChoice.specular);
    color.setShininess(colorChoice.shininess);

    return color;
  }

  getRandomPetalTexture() {
    const texturePath = MyFlower.petalTextures[MyRandom.getRandomInt(0, MyFlower.petalTextures.length - 1)];

    const texture = new CGFtexture(this.scene, texturePath);
    return texture;
  }

  getRandomReceptacleRadius() {
    return MyRandom.getRandomFloat(1, this.externalRadius - 2.5);
  }

  getRandomReceptacleAngle() {
    return MyRandom.getRandomFloat(25, 35);
  }

  getRandomReceptacleColor() {
    const colorChoice = MyFlower.receptacleColors[MyRandom.getRandomInt(0, MyFlower.receptacleColors.length - 1)];

    const color = new CGFappearance(this.scene);
    color.setAmbient(...colorChoice.ambient);
    color.setDiffuse(...colorChoice.diffuse);
    color.setSpecular(...colorChoice.specular);
    color.setShininess(colorChoice.shininess);

    return color;
  }

  getRandomReceptacleTexture() {
    const texturePath = MyFlower.receptacleTextures[MyRandom.getRandomInt(0, MyFlower.receptacleTextures.length - 1)];

    const texture = new CGFtexture(this.scene, texturePath);
    return texture;
  }

  getRandomStemRadius() {
    return MyRandom.getRandomFloat(0.2, 0.3);
  }

  getRandomStemSize() {
    return MyRandom.getRandomInt(15, 30);
  }

  getRandomLeafQuant() {
    return MyRandom.getRandomInt(1, 3);
  }

  getRandomLeafColor() {
    return this.getRandomStemColor(); // using the same colors as stem
  }

  getRandomStemColor() {
    const colorChoice = MyFlower.stemColors[MyRandom.getRandomInt(0, MyFlower.stemColors.length - 1)];

    const color = new CGFappearance(this.scene);
    color.setAmbient(...colorChoice.ambient);
    color.setDiffuse(...colorChoice.diffuse);
    color.setSpecular(...colorChoice.specular);
    color.setShininess(colorChoice.shininess);

    return color;
  }

  getRandomStemTexture() {
    const texturePath = MyFlower.stemTextures[MyRandom.getRandomInt(0, MyFlower.stemTextures.length - 1)];

    const texture = new CGFtexture(this.scene, texturePath);
    return texture;
  }

  getRandomLeafTexture() {
    const texturePath = MyFlower.leafTextures[MyRandom.getRandomInt(0, MyFlower.leafTextures.length - 1)];

    const texture = new CGFtexture(this.scene, texturePath);
    return texture;
  }

  display() {
    this.stem.display();

    this.scene.pushMatrix();
    this.scene.translate(0, this.stem.finalY, this.stem.finalZ);
    this.scene.rotate(this.stem.totalAngle * Math.PI / 180, 1, 0, 0);
    this.receptacle.display();
    this.scene.popMatrix();

    const angleDiff = 2 * Math.PI / this.petalQuant;
    let currentAngle = 0;
    for (let i = 0; i < this.petalQuant; i++) {
      this.scene.pushMatrix();
      this.scene.translate(0, this.stem.finalY + Math.sin(8 * Math.PI / 180) * this.petalLength, this.stem.finalZ);
      // this.scene.translate(0, this.stemHeight, 0);
      // this.scene.rotate(this.petalSlantAngle * Math.PI / 180, 1, 0, 0);
      this.scene.rotate(this.stem.totalAngle * Math.PI / 180, 1, 0, 0);
      this.scene.rotate(currentAngle, 0, 1, 0);
      this.scene.translate(0, 0, -this.petalLength * Math.sqrt(2) - this.receptacleRadius);
      this.scene.rotate(-85 * Math.PI / 180, 1, 0, 0);
      this.petals[i].display();
      this.scene.popMatrix();

      currentAngle += angleDiff;
    }
  }

  // for debug
  toString() {
    return `MyFlower:
      External Radius: ${this.externalRadius},
      Petal Quantity: ${this.petalQuant},
      Petal Slant Angle: ${this.petalSlantAngle},
      Petal Stretch Factor: ${this.petalStretchFactor},
      Petal Color: ${this.petalColor},
      Receptacle Radius: ${this.receptacleRadius},
      Receptacle Color: ${this.receptacleColor},
      Stem Radius: ${this.stemRadius},
      Stem Size: ${this.stemSize},
      Stem Height: ${this.stemHeight},
      Stem Color: ${this.stemColor}
    `;
  }

  initBuffers() {}
}
