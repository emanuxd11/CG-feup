import { CGFobject, CGFappearance, CGFshader } from '../../lib/CGF.js';
import { MyRandom } from '../utils/MyRandom.js';
import { MyGrassLeaf } from './MyGrassLeaf.js';

export class MyGrassField extends CGFobject {

  constructor(scene, rows=50, columns=50, perSquareDensity=2) {
    super(scene);

    this.rows = rows;
    this.columns = columns;
    this.perSquareDensity = perSquareDensity;

    this.grassLeaf = new MyGrassLeaf(this.scene, 7);
    this.transforms = [];

    // Generate transformations for each grass blade
    for (let i = 0; i < this.rows * this.perSquareDensity; i++) {
      for (let j = 0; j < this.columns * this.perSquareDensity; j++) {
        const yaw = MyRandom.getRandomFloat(0, 30 * Math.PI / 180);
        const strength = MyRandom.getRandomFloat(1.5, 3);
        const xScale = MyRandom.getRandomFloat(0.7, 1.1);
        const yScale = MyRandom.getRandomFloat(2, 4);
        const x = i / this.perSquareDensity + MyRandom.getRandomFloat(-1 / this.perSquareDensity, 1 / this.perSquareDensity);
        const z = j / this.perSquareDensity + MyRandom.getRandomFloat(-1 / this.perSquareDensity, 1 / this.perSquareDensity);
        this.transforms.push({ x, z, yaw, strength, xScale, yScale });
      }
    }

    this.time = 0;

    this.initShaders();
    this.initMaterials();
  }

  initShaders() {
    this.grassShader = new CGFshader(this.scene.gl, "shaders/grass.vert", "shaders/grass.frag");
  }

  initMaterials() {
    this.grassMaterial = new CGFappearance(this.scene);
    this.grassMaterial.setAmbient(0.0, 0.5, 0.0, 1);
    this.grassMaterial.setDiffuse(0.0, 0.8, 0.0, 1);
    this.grassMaterial.setSpecular(0.1, 0.1, 0.1, 1);
    this.grassMaterial.setEmission(0.5, 0.5, 0.5, 1);
    this.grassMaterial.setShininess(1.0);
    this.grassMaterial.loadTexture('images/grass/leaf.jpg');
    this.grassMaterial.setTextureWrap('REPEAT', 'REPEAT');
  }

  display() {
    this.grassMaterial.apply();

    for (const { x, z, yaw, strength, xScale, yScale } of this.transforms) {
      this.scene.pushMatrix();
      this.scene.translate(x, 0, z);
      this.scene.rotate(yaw, 0, 1, 0);
      this.grassShader.setUniformsValues({ uTime: Math.sin(this.time), strength: strength });
      this.scene.scale(xScale, yScale, 1);
      this.grassLeaf.display();
      this.scene.popMatrix();
    }
  }

  update(time) {
    this.time = time;
  }
}
