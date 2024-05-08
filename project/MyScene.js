import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./shapes/MySphere.js";
import { MyConcaveCircle } from "./shapes/MyConcaveCircle.js";
import { MyPlane } from "./shapes/MyPlane.js";
import { MyFlower } from "./objects/MyFlower.js";
import { MyGarden } from "./objects/MyGarden.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MyLeaf } from "./objects/MyLeaf.js";

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

    // test
    this.leaf = new MyLeaf(this, null, null);

    // Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);

    // Initialize Panorama
    this.panoramaTexture = new CGFtexture(this, './images/panorama4.jpg');
    this.panorama = new MyPanorama(this, this.panoramaTexture);

    // Earth texture
    this.earthTexture = new CGFtexture(this, './images/earth.jpg');
    this.earthSurface = new CGFappearance(this);
    this.earthSurface.setEmission(0.3, 0.3, 0.3, 0.3);
    this.earthSurface.setTexture(this.earthTexture);
    
    // Test sphere
    this.sphere = new MySphere(this, 360, 90, 20, true);

    // Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    // Earth Globe
    this.displayEarthGlobe = false;
    // Set camera fov
    this.cameraFOV = 75;
    // Toggle Panorama
    this.displayPanorama = true;
    // Infinity Panorama
    this.infinityPanorama = true;
    // Plane
    this.displayPlane = false;
    // Garden parameters
    this.displayGarden = true;
    this.gardenRows = 3;
    this.gardenCols = 3;
    this.garden = new MyGarden(this, this.gardenRows, this.gardenCols, 1);

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
    this.camera.fov = this.cameraFOV * Math.PI/180;

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

    // display panorama
    if (this.displayPanorama) {
      this.panorama.display(this.infinityPanorama);
    }

    // display earth
    if (this.displayEarthGlobe) {
      this.pushMatrix();
      this.earthSurface.apply();
      this.sphere.display();
      this.popMatrix();
    }

    if (this.displayGarden) {
      this.garden.display(this.gardenRows, this.gardenCols);
    }

    // this.leaf.display();

    if (this.displayPlane) {
      this.pushMatrix();
      this.appearance.apply();
      this.translate(0, -100, 0);
      this.scale(400, 400, 400);
      this.rotate(-Math.PI/2.0, 1, 0, 0);
      this.plane.display();
      this.popMatrix();
    }


    // ---- END Primitive drawing section
  }
}
