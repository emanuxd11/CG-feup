import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./shapes/MySphere.js";
import { MyPlane } from "./shapes/MyPlane.js";
import { MyGarden } from "./objects/MyGarden.js";
import { MyPanorama } from "./objects/MyPanorama.js";
import { MyBee } from "./objects/MyBee.js";
import { MyGrassField } from "./objects/MyGrassField.js";
import { MyRockSet } from "./objects/MyRockSet.js";
import { MyHive } from "./objects/MyHive.js";


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

    this.startTime = Date.now();
    this.speedFactor = 1;

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

    // Initialize Panorama
    this.panoramaTexture = new CGFtexture(this, './images/panorama/panorama.jpg');
    this.panorama = new MyPanorama(this, this.panoramaTexture);

    // Earth texture
    this.earthTexture = new CGFtexture(this, './images/earth.jpg');
    this.earthSurface = new CGFappearance(this);
    this.earthSurface.setEmission(0.3, 0.3, 0.3, 0.3);
    this.earthSurface.setTexture(this.earthTexture);

    // RockSet
    this.rocks = new MyRockSet(this, 3, 5, 10);
    
    // Earth sphere
    // Test sphere
    this.sphere = new MySphere(this, 360, 90, 20, true);

    // Objects connected to MyInterface
    this.displayAxis = false;
    this.beeScaleFactor = 1;
    // Earth Globe
    this.displayEarthGlobe = false;
    // Set camera fov
    this.cameraFOV = 75;
    // Toggle Panorama
    this.displayPanorama = true;
    // Infinity Panorama
    this.infinityPanorama = true;
    // Plane
    this.displayPlane = true;
    // Rocks
    this.displayRockSet = true;
    // Garden parameters
    this.displayGarden = false;
    this.gardenRows = 3;
    this.gardenCols = 3;
    this.garden = new MyGarden(this, this.gardenRows, this.gardenCols, 2);
    // Hive
    this.displayHive = false;

    // Hive
    this.hive = new MyHive(this);

    // bee
    this.bee = new MyBee(this, { x: 0, y: 40, z: 0 }, 0, { x: 0, y: 0, z: 0 });
    this.bee.setHive(37, 46, -27);

    // Hive Rocks
    this.rockPile1 = new MyRockSet(this, 3, 20, 25);
    this.rockPile2 = new MyRockSet(this, 2, 10, 15);
    this.rockPile3 = new MyRockSet(this, 1, 30, 10);
    this.rockPile4 = new MyRockSet(this, 2, 5, 9);

    // grass
    this.grassField = new MyGrassField(this, 50, 50, 2);
    this.displayGrass = false;

    this.enableTextures(true);

    this.planeMaterial = new CGFappearance(this);
    this.planeMaterial.setAmbient(1, 1, 1, 1.0);
    this.planeMaterial.setDiffuse(1, 1, 1, 1.0);
    this.planeMaterial.setSpecular(1, 1, 1, 1.0);
    this.planeMaterial.setShininess(1.0);
    this.planeMaterial.setTexture(new CGFtexture(this, "images/grass/base.png"));
    this.planeMaterial.setTextureWrap('REPEAT', 'REPEAT');

    this.setUpdatePeriod(16.6);
  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();

    this.lights[0].setPosition(50, 100, 0, 1);
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

  checkKeys() {
    if (this.gui.isKeyPressed('KeyW')) {
      this.bee.accelerate(this.speedFactor);
    }

    if (this.gui.isKeyPressed('KeyA')) {
      this.bee.turn(this.speedFactor);
    }

    if (this.gui.isKeyPressed('KeyS')) {
      this.bee.accelerate(-this.speedFactor);
    }

    if (this.gui.isKeyPressed('KeyD')) {
      this.bee.turn(-this.speedFactor);
    }

    if (this.gui.isKeyPressed('KeyR')) {
      this.bee.resetMovement();
    }

    if (this.gui.isKeyPressed('KeyF')) {
      this.bee.grabPollen();
    }

    if (this.gui.isKeyPressed('KeyP')) {
      this.bee.flyBackUp();
    }

    if (this.gui.isKeyPressed('KeyO')) {
      this.bee.transportToHive();
    }
  }

  display() {
    this.camera.fov = this.cameraFOV * Math.PI / 180;

    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation)
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to
    // the origin
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

    /* PUT EVERYTHING AT THE SAME HEIGHT IN THE Y AXIS */
    this.pushMatrix();
    this.translate(0, -25, 0);

    // display bee
    this.pushMatrix();
    this.translate(0, 3, 0);
    this.translate(this.bee.position.x, this.bee.position.y, this.bee.position.z);
    this.scale(2.5 * this.beeScaleFactor, 2.5 * this.beeScaleFactor, 2.5 * this.beeScaleFactor);
    this.translate(-this.bee.position.x, -this.bee.position.y, -this.bee.position.z);
    this.bee.display();
    this.popMatrix();

    if (this.displayGarden) {
      this.garden.display(this.gardenRows, this.gardenCols);
    }

    if (this.displayGrass) {
      //grass
      this.setActiveShader(this.grassField.grassShader);
      this.grassField.display();
      this.setActiveShader(this.defaultShader);
    }

    if (this.displayPlane) {
      this.pushMatrix();
      this.planeMaterial.apply();
      this.scale(400, 1, 400);
      this.rotate(-Math.PI / 2.0, 1, 0, 0);
      this.plane.display();
      this.popMatrix();
    }

    if (this.displayRockSet) {
      this.pushMatrix();
      this.translate(-50, 0, 40);
      this.rocks.display();
      this.popMatrix();
    }

    if (this.displayHive) {
      //hive
      this.pushMatrix();
      this.rotate(Math.PI/2, 0, -1, 0);
      this.translate(-50, 15, -40);
      this.hive.display();
      this.popMatrix();

      //hive rocks
      this.pushMatrix();
      this.rotate(Math.PI/2, 0.4, -1, 0.3);
      this.translate(-80, -10, -15);
      this.rockPile1.display();
      this.popMatrix();

      this.pushMatrix();
      this.rotate(Math.PI, 0, 0, 0);
      this.translate(55, 0, -80);
      this.rockPile2.display();
      this.popMatrix();

      this.pushMatrix();
      this.rotate(Math.PI, 0, 0, 0);
      this.translate(60, -10, -30);
      this.rockPile3.display();
      this.popMatrix();

      this.pushMatrix();
      this.rotate(Math.PI, 0, 0, 0);
      this.translate(20, 65, -65);
      this.rockPile4.display();
      this.popMatrix();
    }

    /* POP MATRIX USED TO PUT EVERYRTHING AT SAME Y AXIS */
    this.popMatrix();

    // ---- END Primitive drawing section
  }

  update(time) {
    const elapsed = (time - this.startTime) / 1000;
    this.checkKeys();
    this.bee.update(elapsed, this.garden.getPollenPositions());
    this.grassField.update(elapsed);
  }
}
