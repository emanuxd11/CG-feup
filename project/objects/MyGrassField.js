import { CGFobject, CGFappearance, CGFshader } from '../../lib/CGF.js';
import { MyRandom } from '../utils/MyRandom.js';
import { MyGrassLeaf } from './MyGrassLeaf.js';

export class MyGrassField extends CGFobject {

  constructor(scene, rows=50, columns=50) {
    super(scene);

    this.rows = rows;
    this.columns = columns;

    this.grassLeaves = Array.from({ length: this.rows * this.columns }, gl => new MyGrassLeaf(this.scene, 9));
    this.yaw = Array.from({length: this.rows * this.columns}, yaw => MyRandom.getRandomFloat(0, 30 * Math.PI / 180));
    this.strength = Array.from({length: this.rows * this.columns}, strength => MyRandom.getRandomFloat(0.05, 0.35));

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
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.scene.pushMatrix();
        this.scene.translate(
          i * 0.25, 
          0, 
          j * 0.25,
        );
        this.scene.rotate(this.yaw[i * this.columns + j], 0, 1, 0);
        this.grassMaterial.apply();
        this.grassShader.setUniformsValues({ uTime: Math.sin(this.time), strength: this.strength[i * this.columns + j] });
        this.grassLeaves[i * this.columns + j].display();
        this.scene.popMatrix();
      }
    }
  }

  update(time) {
    this.time = time;
  }

}
