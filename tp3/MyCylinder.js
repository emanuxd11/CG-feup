import { CGFobject } from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices=slices;
        this.stacks=stacks;
        this.initBuffers();
    }
  
    initBuffers() {

        this.vertices = [];
        this.indices = [];
        this.normals = [];

        let vtcCounter = 0

        for(let stack=0; stack<this.stacks; stack++) {
            for(let slice=0; slice<this.slices; slice++) {

                //vertice x+0
                this.vertices.push(Math.cos(2*Math.PI*slice/this.slices));
                this.vertices.push(Math.sin(2*Math.PI*slice/this.slices));
                this.vertices.push(stack / this.stacks);

                //vertice x+1
                this.vertices.push(Math.cos(2*Math.PI*(slice+1)/this.slices));
                this.vertices.push(Math.sin(2*Math.PI*(slice+1)/this.slices));
                this.vertices.push(stack / this.stacks);

                //vertice x+2
                this.vertices.push(Math.cos(2*Math.PI*(slice+1)/this.slices));
                this.vertices.push(Math.sin(2*Math.PI*(slice+1)/this.slices));
                this.vertices.push((stack + 1) / this.stacks);

                //vertice x+3
                this.vertices.push(Math.cos(2*Math.PI*slice/this.slices));
                this.vertices.push(Math.sin(2*Math.PI*slice/this.slices));
                this.vertices.push((stack + 1) / this.stacks);

                //normal x+0
                this.normals.push(Math.cos(2*Math.PI*(slice)/this.slices));
                this.normals.push(Math.sin(2*Math.PI*(slice)/this.slices));
                this.normals.push(0);

                //normal x+1
                this.normals.push(Math.cos(2*Math.PI*(slice + 1)/this.slices));
                this.normals.push(Math.sin(2*Math.PI*(slice + 1)/this.slices));
                this.normals.push(0);

                //normal x+2
                this.normals.push(Math.cos(2*Math.PI*(slice + 1)/this.slices));
                this.normals.push(Math.sin(2*Math.PI*(slice + 1)/this.slices));
                this.normals.push(0);

                //normal x+3
                this.normals.push(Math.cos(2*Math.PI*(slice)/this.slices));
                this.normals.push(Math.sin(2*Math.PI*(slice)/this.slices));
                this.normals.push(0);

                //triangle indeces 0
                this.indices.push(vtcCounter+0);
                this.indices.push(vtcCounter+1);
                this.indices.push(vtcCounter+2);
                this.indices.push(vtcCounter+0);
                this.indices.push(vtcCounter+2);
                this.indices.push(vtcCounter+3);

                vtcCounter+=4;
            }
        }

        // The defined indices (and corresponding vertices)
        // will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    updateBuffers() {}
}
