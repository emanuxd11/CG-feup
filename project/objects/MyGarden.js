import { CGFobject } from '../../lib/CGF.js';
import { MyFlower } from './MyFlower.js'
import { MyRandom } from '../utils/MyRandom.js'

export class MyGarden extends CGFobject {
  constructor(scene, rows=5, columns=5, spacing=0) {
    super(scene);

    this.rows = rows;
    this.columns = columns;
    this.spacing = spacing;

    this.flowers = [];
		this.rotationAngles = [];
		this.xDisplacement = [];
		this.yDisplacement = [];
    for (let i = 0; i < this.rows; i++) {
      let row = [];
			let rowAngles = [];
			let rowXDisplacement = [];
			let rowYDisplacement = [];
      for (let j = 0; j < this.columns; j++) {
        row.push(new MyFlower(scene));
				rowAngles.push(MyRandom.getRandomFloat(0, Math.PI * 2));
				rowXDisplacement.push(MyRandom.getRandomInt(-2, 2));
				rowYDisplacement.push(MyRandom.getRandomInt(-2, 2));
      }
      this.flowers.push(row);
			this.rotationAngles.push(rowAngles);
			this.xDisplacement.push(rowXDisplacement);
			this.yDisplacement.push(rowYDisplacement);
    }
  }

  display() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.scene.pushMatrix();
        this.scene.translate(
					i * MyFlower.maximumExternalRadius * 4 + this.xDisplacement[i][j], 
					0, 
					j * MyFlower.maximumExternalRadius * 4 + this.yDisplacement[i][j],
				);
				this.scene.rotate(this.rotationAngles[i][j], 0, 1, 0);
        this.flowers[i][j].display();
				this.scene.popMatrix();
      }
    }
  }

  initBuffers() {}
}