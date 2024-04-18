import { CGFobject } from '../../lib/CGF.js';

export class MySphere extends CGFobject {

  constructor(scene, slices, stacks, radius, outside=false) {
    super(scene);
    this.slices = slices;
    this.stacks = stacks;
    this.radius = radius;
    
    this.direction = -1;
    if (outside) this.direction = 1;
    
    this.initBuffers();
  }

  initBuffers() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    //generating vertices, normals and texCoords
    for (let slice = 0; slice<this.slices+1; slice++) {
      for (let stack = 0; stack<2*this.stacks+1; stack++) {

        //unit coords
        let x = Math.sin((Math.PI/2)*stack/this.stacks) * Math.sin(2*Math.PI*slice/this.slices);
        let y = -Math.cos((Math.PI/2)*stack/this.stacks);
        let z = Math.sin((Math.PI/2)*stack/this.stacks) * Math.cos(2*Math.PI*slice/this.slices) * this.direction;

        //generating new vertice
        this.vertices.push(this.radius*x, this.radius*y, this.radius*z);
        //generating new normal
        this.normals.push(x * this.direction, y * this.direction, z * this.direction);

        //generating new texCoord
        this.texCoords.push(slice/this.slices,1-stack/(2*this.stacks));
      }
    }

    //generating indices
    for (let slice = 0; slice<this.slices; slice++) {

      //triangles
      let botTriCornerA = slice*(2*this.stacks+1); //bottom triangle tip
      let botTriCornerB = (slice+1)*(2*this.stacks+1)+1;  //bottom triangle base right corner
      let botTricornerC = slice*(2*this.stacks+1)+1; //bottom triangle base left corner
      let topTriCornerA = slice*(2*this.stacks+1)+2*this.stacks; //top triangle tip
      let topTriCornerB = slice*(2*this.stacks+1)+2*this.stacks-1; //top triangle base left corner
      let topTriCornerC = (slice+1)*(2*this.stacks+1)+2*this.stacks-1; //top triangle base right corner
      this.indices.push(botTriCornerA,botTriCornerB,botTricornerC,topTriCornerA,topTriCornerB,topTriCornerC);

      for (let stack = 1; stack<2*this.stacks-1; stack++){

        //squares
        let sqCornerA = slice*(2*this.stacks+1)+stack; //bottom left corner
        let sqCornerB = (slice+1)*(2*this.stacks+1)+stack; //bottom right corner
        let sqCornerC = (slice+1)*(2*this.stacks+1)+stack+1; //top right corner
        let sqCornerD = slice*(2*this.stacks+1)+stack+1; //top left corner
        this.indices.push(sqCornerA,sqCornerB,sqCornerD,sqCornerB,sqCornerC,sqCornerD);
      }
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
