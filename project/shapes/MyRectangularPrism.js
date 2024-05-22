import { CGFobject } from '../../lib/CGF.js';

export class MyRectangularPrism extends CGFobject {
  constructor(scene, length, width, height) {
    super(scene);
    this.l = length;
    this.w = width;
    this.h = height;
    this.m = Math.max(length,width,height);
    this.initBuffers();
  }
  
  initBuffers() {
    this.vertices = [
      0,0,0, 0,this.h,0, 0,this.h,this.w, 0,0,this.w,                       // -x face
      0,0,0, this.l,0,0, this.l,this.h,0, 0,this.h,0,                       // -z face
      0,0,0, 0,0,this.w, this.l,0,this.w, this.l,0,0,                       // -y face
      this.l,0,0, this.l,0,this.w, this.l,this.h,this.w, this.l,this.h,0,   // +x face
      0,0,this.w, 0,this.h,this.w, this.l,this.h,this.w, this.l,0,this.w,   // +z face
      0,this.h,0, this.l,this.h,0, this.l,this.h,this.w, 0,this.h,this.w,   // +y face
    ];

    // Counter-clockwise reference of vertices
    this.indices = [
      0,2,1, 0,3,2,         //-x face
      4,6,5, 4,7,6,         //-z face
      8,10,9, 8,11,10,      //-y face
      12,14,13, 12,15,14,   //+x face
      16,18,17, 16,19,18,   //+z face
      20,22,21, 20,23,22,   //+y face
    ];

    this.normals = [
      -1,0,0, -1,0,0, -1,0,0, -1,0,0,   //-x face
      0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1,   //-z face
      0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0,   //-y face

      1,0,0, 1,0,0, 1,0,0, 1,0,0,       //+x face
      0,0,1, 0,0,1, 0,0,1, 0,0,1,       //+z face
      0,1,0, 0,1,0, 0,1,0, 0,1,0,       //+y face
    ];
    
    let mLen = this.l/this.m;
    let mHei = this.h/this.m;
    let mWid = this.w/this.m;

    this.texCoords = [
      0,0, 0,mHei, mWid,mHei, mWid,0,   //-x face
      0,0, mLen,0, mLen,mHei, 0,mHei,   //-z face
      0,0, 0,mWid, mLen,mWid, mLen,0,   //-y face
      0,0, mWid,0, mWid,mHei, 0,mHei,   //+x face
      0,0, 0,mHei, mLen,mHei, mLen,0,   //+z face
      0,0, mLen,0, mLen,mWid, 0,mWid,   //+y face
    ];

    // The defined indices (and corresponding vertices)
    // will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
  }
}

