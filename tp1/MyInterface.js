import {CGFinterface, dat} from '../lib/CGF.js';

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
        this.gui.add(this.scene, 'displayAxis').name('Axis');

        // Diamond checkbox element in GUI
        this.gui.add(this.scene, 'displayDiamond').name('Diamond');

        // Triangle checkbox element in GUI
        this.gui.add(this.scene, 'displayTriangle').name('Triangle');

        // Parallelogram checkbox element in GUI
        this.gui.add(this.scene, 'displayParallelogram').name('Parallelogram');

        // TriangleSmall checkbox element in GUI
        this.gui.add(this.scene, 'displayTriangleSmall').name('Small Triangle');

        // TriangleBig checkbox element in GUI
        this.gui.add(this.scene, 'displayTriangleBig').name('Big Triangle');

        // Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}

