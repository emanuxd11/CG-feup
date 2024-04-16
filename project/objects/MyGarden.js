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
    this.populateGarden();
  }

  populateGarden() {
    for (let i = this.getCalculatedRows(); i < this.rows; i++) {
      let row = [];
			let rowAngles = [];
			let rowXDisplacement = [];
			let rowZDisplacement = [];

      for (let j = 0; j < this.columns; j++) {
        row.push(new MyFlower(this.scene));
				rowAngles.push(MyRandom.getRandomFloat(0, Math.PI * 2));
				rowXDisplacement.push(MyRandom.getRandomFloat(-2, 2));
				rowZDisplacement.push(MyRandom.getRandomFloat(-2, 2));
      }
      this.flowers.push(row);
			this.rotationAngles.push(rowAngles);
			this.xDisplacement.push(rowXDisplacement);
			this.zDisplacement.push(rowZDisplacement);
    }
  }

  addColumns() {
    // go to every row and add x columns of new flowers
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.flowers[i][j]) continue;
        this.flowers[i].push(new MyFlower(this.scene));
				this.rotationAngles[i].push(MyRandom.getRandomFloat(0, Math.PI * 2));
				this.xDisplacement[i].push(MyRandom.getRandomFloat(-2, 2));
				this.zDisplacement[i].push(MyRandom.getRandomFloat(-2, 2));
      }
    }
  }

  getCalculatedRows() {
    return this.flowers.length;  
  }

  getCalculatedCols() {
    return this.flowers[0] ? this.flowers[0].length : 0;
  }

  updateSize(rows, columns) {
    if (rows != this.rows && columns == this.columns) {
      this.rows = rows;
      this.populateGarden();
    } else if (rows == this.rows && columns != this.columns) {
      this.columns = columns;
      this.addColumns(columns);
    } 
  }

  display(rows=this.rows, columns=this.columns) {
    this.updateSize(rows, columns);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (!this.flowers[i][j]) {
          console.log(`
            flowers[${i}][${j}] is ${this.flowers[i][j]}
            Current number of rows: ${this.rows}
            Current number of columns: ${this.columns}
            Current number of calculated rows: ${this.getCalculatedRows()}
            Current number of calculated columns: ${this.getCalculatedCols()}
            
            Current flower matrix: ${this.flowers}
            `
          );

          return; // don't display if this is the case
        }
        this.scene.pushMatrix();
        this.scene.translate(
					i * MyFlower.maximumExternalRadius * 4 + this.xDisplacement[i][j], 
					0, 
					j * MyFlower.maximumExternalRadius * 4 + this.zDisplacement[i][j],
				);
				this.scene.rotate(this.rotationAngles[i][j], 0, 1, 0);
        this.flowers[i][j].display();
				this.scene.popMatrix();
      }
    }
  }

  initBuffers() {}
}
