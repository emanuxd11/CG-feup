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
		this.zDisplacement = [];
    this.pollenPositions = [];
    this.populateGarden();
  }

  populateGarden() {
    for (let i = this.getCalculatedRows(); i < this.rows; i++) {
      let row = [];
			let rowAngles = [];
			let rowXDisplacement = [];
			let rowZDisplacement = [];
      let rowPollenPositions = [];

      for (let j = 0; j < this.columns; j++) {
        row.push(new MyFlower(this.scene));
				rowAngles.push(MyRandom.getRandomFloat(0, Math.PI * 2));
				rowXDisplacement.push(MyRandom.getRandomFloat(-MyFlower.maximumExternalRadius, MyFlower.maximumExternalRadius));
				rowZDisplacement.push(MyRandom.getRandomFloat(-MyFlower.maximumExternalRadius, MyFlower.maximumExternalRadius));
        rowPollenPositions.push({
          x: row[j].pollenPosition.x + i * MyFlower.maximumExternalRadius * 3 + rowXDisplacement[j],
          y: row[j].pollenPosition.y,
          z: row[j].pollenPosition.z + j * MyFlower.maximumExternalRadius * 3 + rowZDisplacement[j],
        });
      }
      this.flowers.push(row);
			this.rotationAngles.push(rowAngles);
			this.xDisplacement.push(rowXDisplacement);
			this.zDisplacement.push(rowZDisplacement);
      this.pollenPositions.push(rowPollenPositions);
    }
  }

  display(rows=this.rows, columns=this.columns) {
    this.rows = rows;
    this.columns = columns;

    for (let i = 0; i < this.rows; i++) {

      if (i == this.getCalculatedRows()) {
        this.populateGarden(); // calculate more rows if they're not defined
      }

      for (let j = 0; j < this.columns; j++) {

        if (!this.flowers[i][j]) { // add more flowers if the current position doesn't have one
          this.flowers[i].push(new MyFlower(this.scene));
          this.rotationAngles[i].push(MyRandom.getRandomFloat(0, Math.PI * 2));
          this.xDisplacement[i].push(MyRandom.getRandomFloat(-2, 2));
          this.zDisplacement[i].push(MyRandom.getRandomFloat(-2, 2));
          this.pollenPositions[i].push({
            x: this.flowers[i][j].pollenPosition.x + i * MyFlower.maximumExternalRadius * 3 + this.xDisplacement[i][j],
            y: this.flowers[i][j].pollenPosition.y,
            z: this.flowers[i][j].pollenPosition.z + j * MyFlower.maximumExternalRadius * 3 + this.zDisplacement[i][j],
          });
        }

        this.scene.pushMatrix();
        this.scene.translate(
					i * MyFlower.maximumExternalRadius * 3 + this.xDisplacement[i][j], 
					0, 
					j * MyFlower.maximumExternalRadius * 3 + this.zDisplacement[i][j],
				);
				this.scene.rotate(this.rotationAngles[i][j], 0, 1, 0);
        this.flowers[i][j].display();
				this.scene.popMatrix();
      }
    }
  }

  getCalculatedRows() {
    return this.flowers.length;  
  }

  getCalculatedCols() {
    // get minimum number of calculated colums
    return this.flowers.map(row => row.length)
      .reduce((minSize, currentSize) => Math.min(minSize, currentSize), Infinity)
      || 0;
  }

  getPollenPositions() {
    return this.pollenPositions;
  }

  initBuffers() {}
}
