import { CGFobject } from '../../lib/CGF.js';
import { MyStem } from "./MyStem.js";
import { MyPetal } from "./MyPetal.js";

export class MyFlower extends CGFobject {

  constructor(scene, externalRadius=null, petalQuant=null, petalSlantAngle=null, petalStretchFactor=null, petalColor=null, receptacleRadius=null, receptacleColor=null, stemRadius=null, stemSize=null, stemHeight=null, stemColor=null) {
    super(scene);
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
      scene,             // scene
      20,                // slices
      20,                // stacks
      this.stemHeight,   // height
      this.stemRadius,   // radius
      this.stemSize,     // size
      this.stemColor,    // color
    );

    // this.receptacle = new MyReceptacle();

    this.petals = Array.from({ length: this.petalQuant }, 
      () => new MyPetal(
        scene, 
        this.petalLength, 
        this.petalStretchFactor, 
        this.petalColor, 
        -((Math.random() * this.maximumPetalFlap) + this.minimumPetalFlap) * Math.PI / 180 
      )
    );
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  getRandomExternalRadius() {
    return this.getRandomInt(3, 7);
  }

  getRandomPetalQuantity() {
    return this.getRandomInt(8, 15);
  }

  getRandomPetalSlantAngle() {
    return this.getRandomInt(0, 35);
  }

  getRandomPetalStretchFactor() {
    return this.getRandomFloat(1.5, 3.5);
  }

  getRandomPetalColor() {
    return null;
  }

  getRandomReceptacleRadius() {
    // este valor não faz muito sentido com o external radius, uma vez que só podem ser valores entre 1 e 2, o que é muito pequeno
    return this.getRandomFloat(1, 2.5);
  }

  getRandomReceptacleColor() {
    return null;
  }

  getRandomStemRadius() {
    return this.getRandomFloat(0.2, 0.4);
  }

  getRandomStemSize() {
    return this.getRandomInt(0, 3);
  }

  getRandomStemHeight() {
    return this.getRandomFloat(8, 20);
  }

  getRandomStemColor() {
    return null;
  }

  display() {
    this.stem.display();

    // missing receptacle

    const angleDiff = 2 * Math.PI / this.petalQuant;
    let currentAngle = 0;
    for (let i = 0; i < this.petalQuant; i++) {
      this.scene.pushMatrix();
      this.scene.translate(0, this.stemHeight + this.receptacleRadius, 0);
      this.scene.translate(0, 0, 0);
      this.scene.rotate(this.petalSlantAngle * Math.PI / 180, 1, 0, 0);
      this.scene.rotate(currentAngle, 0, 1, 0);
      this.scene.translate(0, 0, -this.petalLength * Math.sqrt(2) - this.receptacleRadius);
      this.scene.rotate(-85 * Math.PI / 180, 1, 0, 0);
      this.petals[i].display();
      this.scene.popMatrix();

      currentAngle += angleDiff;
    }
  }

  initBuffers() { }
}
