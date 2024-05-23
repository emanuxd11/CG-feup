import { CGFinterface, dat } from '../lib/CGF.js';

/**
 * MyInterface
 * @constructor
 */
export class MyInterface extends CGFinterface {
  constructor() {
    super();
  }

  init(application) {
    // call CGFinterface init
    super.init(application);

    // init GUI. For more information on the methods, check:
    // https://github.com/dataarts/dat.gui/blob/master/API.md
    this.gui = new dat.GUI();

    // Checkbox element in GUI
    this.gui.add(this.scene, 'displayAxis').name('Display Axis');

    // Checkbox element in GUI for Earth Globe
    this.gui.add(this.scene, 'displayEarthGlobe').name('Display Earth Globe');

    // Checkbox element in GUI for Toggling Panorama
    this.gui.add(this.scene, 'displayPanorama').name('Panorama');

    // Checkbox element in GUI for Infinity Panorama
    this.gui.add(this.scene, 'infinityPanorama').name('Infinity Panorama');

    // Checkbox element in GUI for Plane 
    this.gui.add(this.scene, 'displayPlane').name('Display Plane');

    // Checkboc element in GUI for Rockset
    this.gui.add(this.scene, 'displayRockSet').name('Display Rocks');

    // Slider element in GUI
    // this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

    // Checkbox element in GUI for Garden
    this.gui.add(this.scene, 'displayGarden').name('Display Garden');

    // Checkbox element in GUI for Hive
    this.gui.add(this.scene, 'displayHive').name('Display Hive');

    // Checkbox element in GUI for Grass
    this.gui.add(this.scene, 'displayGrass').name('Display Grass');

    // Slider for garden rows and columns in GUI
    this.gui.add(this.scene, 'gardenRows', 0, 20).step(1).name('Garden Rows');
    this.gui.add(this.scene, 'gardenCols', 0, 20).step(1).name('Garden Columns');

    // Slider for FOV
    this.gui.add(this.scene, 'cameraFOV', 30, 170).step(1).name('FOV');

    // Slider for bee movement sensitivity 
    this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');

    // Slider for bee scale
    this.gui.add(this.scene, 'beeScaleFactor', 0.5, 3).name('Bee Scale Factor');

    // Init Keys
    this.initKeys();

    return true;
  }

  initKeys() {
    // create reference from the scene to the GUI
    this.scene.gui = this;

    // disable the processKeyboard function
    this.processKeyboard = function() {};

    // create a named array to store which keys are being pressed
    this.activeKeys = {};
  }

  processKeyDown(event) {
    // called when a key is pressed down
    // mark it as active in the array
    this.activeKeys[event.code] = true;
  }

  processKeyUp(event) {
    // called when a key is released, mark it as inactive in the array
    this.activeKeys[event.code] = false;
  }

  isKeyPressed(keyCode) {
    // returns true if a key is marked as pressed, false otherwise
    return this.activeKeys[keyCode] || false;
  }

}
