import { CGFobject } from '../../lib/CGF.js';

export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks, radius=1, height=1) {
      super(scene);
      this.slices = slices;
      this.stacks = stacks;
      this.radius = radius;
      this.height = height;
      this.initBuffers();
    }
  
  initBuffers() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    // this.texCoords = [];

    let vtcCounter = 0

    for(let stack=0; stack<this.stacks; stack++) {
      for(let slice=0; slice<this.slices; slice++) { // slice means "side" for whatever reason
        // vertice x + 0
        this.vertices.push(this.radius * Math.cos(2*Math.PI*slice/this.slices));
        this.vertices.push(this.radius * Math.sin(2*Math.PI*slice/this.slices));
        this.vertices.push(this.height * (stack / this.stacks));

        // vertice x + 1
        this.vertices.push(this.radius * Math.cos(2*Math.PI*slice/this.slices));
        this.vertices.push(this.radius * Math.sin(2*Math.PI*slice/this.slices));
        this.vertices.push(this.height * ((stack + 1) / this.stacks));

        // normal x + 0
        this.normals.push(Math.cos(2*Math.PI*(slice)/this.slices));
        this.normals.push(Math.sin(2*Math.PI*(slice)/this.slices));
        this.normals.push(0);

        // normal x + 1
        this.normals.push(Math.cos(2*Math.PI*(slice)/this.slices));
        this.normals.push(Math.sin(2*Math.PI*(slice)/this.slices));
        this.normals.push(0);

        // triangle indices 0
        // these comments make sense for a prism with 4 sides
        if (vtcCounter === 0) {
          this.indices.push(vtcCounter + 1); // 1
          this.indices.push(vtcCounter + 0); // 0
          this.indices.push(vtcCounter + 2); // 2
        } else if (vtcCounter > 0) {
          this.indices.push(vtcCounter + 0); // 4
          this.indices.push(vtcCounter + 1); // 5
          this.indices.push(vtcCounter - 1); // 3

          if (vtcCounter > 2) {
            this.indices.push(vtcCounter - 1); // 3
            this.indices.push(vtcCounter - 2); // 2
            this.indices.push(vtcCounter + 0); // 4
          }
        }

        vtcCounter+=2;
      }
      
      // final side
      this.indices.push(vtcCounter - 1) // 7
      this.indices.push(vtcCounter - 2) // 6
      this.indices.push(vtcCounter - vtcCounter / (stack + 1)) // 0
      this.indices.push(vtcCounter - vtcCounter / (stack + 1)) // 0
      this.indices.push(vtcCounter - vtcCounter / (stack + 1) + 1) // 1
      this.indices.push(vtcCounter - 1) // 7
    }

    this.texCoords = [];

    for (let stack = 0; stack <= this.stacks; stack++) {
      for (let slice = 0; slice < this.slices; slice++) {
        // Calculate texture coordinates
        let s = slice / this.slices;  // s-coordinate (circumference)
        let t = stack / this.stacks;  // t-coordinate (height)

        // Add texture coordinates for two vertices of the current slice
        this.texCoords.push(s, 1 - t);                      // Vertex 0 (top)
        this.texCoords.push(s, 1 - (t + 1 / this.stacks));  // Vertex 1 (bottom)
      }
    }

    for (let slice = 0; slice < this.slices; slice++) {
      let s = slice / this.slices;
      this.texCoords.push(s, 0);  // Vertex 0
      this.texCoords.push(s, 1);  // Vertex 1
    }

    // The defined indices (and corresponding vertices)
    // will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  }

  updateBuffers() {}
}
