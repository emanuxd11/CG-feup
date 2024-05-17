import { CGFobject } from '../../lib/CGF.js';
import { MyRandom } from '../utils/MyRandom.js';

export class MyGrassLeaf extends CGFobject {

  constructor(scene, levels=10) {
    super(scene);
    this.levels = levels;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.texCoords = [];
    this.normals = [];

    const baseWidth = 1;
    const height = 1 / this.levels
    const numVerticesPerLevel = 2;

    for (let i = 0; i <= this.levels; i++) {
      const width = baseWidth * (1 - i / this.levels);
      const y = i * height;
      const t = i / this.levels;

      this.vertices.push(-width / 2, y, 0);
      this.vertices.push(width / 2, y, 0);

      this.texCoords.push(0, t);
      this.texCoords.push(1, t);

      this.normals.push(0, 0, 1);
      this.normals.push(0, 0, 1);

      if (i > 0) {
        const currentBaseIndex = i * numVerticesPerLevel;
        const previousBaseIndex = (i - 1) * numVerticesPerLevel;

        this.indices.push(previousBaseIndex, previousBaseIndex + 1, currentBaseIndex);
        this.indices.push(currentBaseIndex, previousBaseIndex + 1, currentBaseIndex + 1);
      }
    }

    this.vertices.push(0, (this.levels + 1) * height, 0);
    this.texCoords.push(0.5, 1);
    this.normals.push(0, 0, 1);

    const tipIndex = this.vertices.length / 3 - 1;
    const lastBaseIndex = this.levels * numVerticesPerLevel;

    this.indices.push(lastBaseIndex, lastBaseIndex + 1, tipIndex);

    const numOriginalVertices = this.vertices.length / 3;
    for (let i = 0; i < numOriginalVertices; i++) {
      this.vertices.push(...this.vertices.slice(i * 3, i * 3 + 3));
      this.texCoords.push(...this.texCoords.slice(i * 2, i * 2 + 2));
      this.normals.push(0, 0, -1);
    }

    const numOriginalIndices = this.indices.length;
    for (let i = 0; i < numOriginalIndices; i += 3) {
      this.indices.push(
        this.indices[i] + numOriginalVertices,
        this.indices[i + 2] + numOriginalVertices,
        this.indices[i + 1] + numOriginalVertices
      );
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
