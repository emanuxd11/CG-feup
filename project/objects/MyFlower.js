import { CGFappearance, CGFobject } from '../../lib/CGF.js';
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

  constructor(scene, externalRadius=null, petalQuant=null, petalSlantAngle=null, petalStretchFactor=null, petalColor=null, receptacleRadius=null, receptacleColor=null, stemRadius=null, stemSize=null, stemHeight=null, stemColor=null) {
    super(scene);
    this.scene = scene;
    this.externalRadius = (externalRadius === null) ? this.getRandomExternalRadius() : externalRadius;
    this.petalQuant = (petalQuant === null) ? this.getRandomPetalQuantity() : petalQuant;
    this.petalSlantAngle = (petalSlantAngle === null) ? this.getRandomPetalSlantAngle() : petalSlantAngle;
    this.petalStretchFactor = (petalStretchFactor === null) ? this.getRandomPetalStretchFactor() : petalStretchFactor;
    this.petalColor = (petalColor === null) ? this.getRandomPetalColor() : petalColor;
    this.receptacleRadius = (receptacleRadius === null) ? this.getRandomReceptacleRadius() : receptacleRadius;
    this.receptacleColor = (receptacleColor === null) ? this.getRandomReceptacleColor() : receptacleColor;
    this.stemRadius = (stemRadius === null) ? this.getRandomStemRadius() : stemRadius;
    this.stemSize = (stemSize === null) ? this.getRandomStemSize() : stemSize;
    this.stemHeight = (stemHeight === null) ? this.getRandomStemHeight() : stemHeight;
    this.stemColor = (stemColor === null) ? this.getRandomStemColor() : stemColor;

    this.petalLength = this.externalRadius - this.receptacleRadius;
    this.minimumPetalFlap = 5;
    this.maximumPetalFlap = 20;
    // this.minimum
    // O mesmo raciocínio deve aplicar-se na junção das pétalas ao coração/receptáculo da flor. 
    // Cada pétala poderá ter um ângulo de união distinto, aleatório e com limites (máximo e mínimo) parametrizáveis.
    // ?? ângulo em que sentido? verificar isto

    // os "cilindros que constituem o caule"... isto seriam ramos?

    this.stem = new MyStem(
      this.scene,        // scene
      20,                // slices
      20,                // stacks
      this.stemHeight,   // height
      this.stemRadius,   // radius
      this.stemSize,     // size
      this.stemColor,    // color
    );

    this.receptacle = new MyReceptacle(
      this.scene, 
      this.receptacleRadius, 
      this.receptacleColor,
    );

    this.petals = Array.from({ length: this.petalQuant }, 
      () => new MyPetal(
        this.scene, 
        this.petalLength, 
        this.petalStretchFactor, 
        this.petalColor, 
        -((Math.random() * this.maximumPetalFlap) + this.minimumPetalFlap) * Math.PI / 180 
      )
    );
  }

  getRandomExternalRadius() {
    return MyRandom.getRandomInt(3, 7);
  }

  getRandomPetalQuantity() {
    return MyRandom.getRandomInt(8, 15);
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

  getRandomReceptacleRadius() {
    // este valor não faz muito sentido com o external radius, uma vez que só podem ser valores entre 1 e 2, o que é muito pequeno
    return MyRandom.getRandomFloat(1, 2.5);
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

  getRandomStemRadius() {
    return MyRandom.getRandomFloat(0.2, 0.4);
  }

  getRandomStemSize() {
    return MyRandom.getRandomInt(0, 3);
  }

  getRandomStemHeight() {
    return MyRandom.getRandomFloat(8, 20);
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

  display() {
    this.stem.display();

    this.scene.pushMatrix();
    this.scene.translate(0, this.stemHeight + this.receptacleRadius, 0);
    this.receptacle.display();
    this.scene.popMatrix();

    const angleDiff = 2 * Math.PI / this.petalQuant;
    let currentAngle = 0;
    for (let i = 0; i < this.petalQuant; i++) {
      this.scene.pushMatrix();
      this.scene.translate(0, this.stemHeight + this.receptacleRadius, 0);
      this.scene.rotate(this.petalSlantAngle * Math.PI / 180, 1, 0, 0);
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
