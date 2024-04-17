import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./shapes/MySphere.js";
import { MyPlane } from "./shapes/MyPlane.js";
import { MyFlower } from "./objects/MyFlower.js";
import { MyGarden } from "./objects/MyGarden.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {

  constructor() {
    super();
  }

  init(application) {
    super.init(application);

    this.initCameras();
    this.initLights();

    // Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    // Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    
    // Test sphere
    this.sphere = new MySphere(this, 360, 90, 20, true);

    // Test flower stuff 
    // null for random parameter
    // this.flower = new MyFlower(
    //   this,   // scene
    //   null,   // externalRadius
    //   null,   // petalQuant
    //   null,   // petalSlantAngle
    //   null,   // petalStretchFactor
    //   null,   // petalColor
    //   null,   // receptacleRadius
    //   null,   // receptacleColor
    //   null,   // stemRadius
    //   null,   // stemSize
    //   null,   // stemHeight
    //   null,   // stemColor
    // );

    // Garden parameters
    this.gardenRows = 5;
    this.gardenCols = 5;
    this.garden = new MyGarden(this, this.gardenRows, this.gardenCols, 1);

    // Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0),
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  display() {

    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation)
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    // display sphere above and to the left of 
    // flowers just so they don't interfere with each other
    this.pushMatrix();
    this.translate(-50, 50, 0);
    this.setDefaultAppearance();
    this.sphere.display();
    this.popMatrix();

    // this.stem.display();
    // this.petal.display();
    // this.flower.display();
    this.garden.display(this.gardenRows, this.gardenCols);

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0, -100, 0);
    this.scale(400, 400, 400);
    this.rotate(-Math.PI/2.0, 1, 0, 0);
    this.plane.display();
    this.popMatrix();

    // ---- END Primitive drawing section
  }
}
