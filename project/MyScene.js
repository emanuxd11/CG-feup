import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
<<<<<<< HEAD
import { MyPlane } from "./shapes/MyPlane.js";
import { MySphere } from "./shapes/MySphere.js";
import { MyFlower } from "./objects/MyFlower.js";
=======
import { MyPlane } from "./MyPlane.js";
>>>>>>> 0017bb0385597053aeae9b586c639ebf88eabce8

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
<<<<<<< HEAD

  constructor() {
    super();
  }

  init(application) {
    super.init(application);

=======
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
>>>>>>> 0017bb0385597053aeae9b586c639ebf88eabce8
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

<<<<<<< HEAD
    // Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    
    // Test sphere
    // this.sphere = new MySphere(this, 10, 10, 10, false);

    // Test flower stuff 
    // this.stem = new MyStem(this, 20, 20);
    // this.petal = new MyPetal(this);
    this.flower = new MyFlower(this);
=======
    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
>>>>>>> 0017bb0385597053aeae9b586c639ebf88eabce8

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;

    this.enableTextures(true);

<<<<<<< HEAD
    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

  }

=======
this.texture = new CGFtexture(this, "images/terrain.jpg");
this.appearance = new CGFappearance(this);
this.appearance.setTexture(this.texture);
this.appearance.setTextureWrap('REPEAT', 'REPEAT');

  }
>>>>>>> 0017bb0385597053aeae9b586c639ebf88eabce8
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
<<<<<<< HEAD

=======
>>>>>>> 0017bb0385597053aeae9b586c639ebf88eabce8
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
<<<<<<< HEAD

=======
>>>>>>> 0017bb0385597053aeae9b586c639ebf88eabce8
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
<<<<<<< HEAD

=======
>>>>>>> 0017bb0385597053aeae9b586c639ebf88eabce8
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

<<<<<<< HEAD
    // this.stem.display();
    // this.sphere.display();
    // this.petal.display();
    this.flower.display();

=======
>>>>>>> 0017bb0385597053aeae9b586c639ebf88eabce8
    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    // ---- END Primitive drawing section
  }
}
