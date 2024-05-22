import { CGFappearance, CGFobject, CGFtexture } from "../../lib/CGF.js";
import { MyRectangularPrism } from "../shapes/MyRectangularPrism.js";

export class MyPlank extends CGFobject {
    constructor(scene, length, width, height) {
        super(scene);
        this.l = length;
        this.w = width;
        this.h = height;

        this.rectangularPrism = new MyRectangularPrism(this.scene, length, width, height);

        this.woodTexture = new CGFtexture(this.scene, '../images/wood/woodTexture.jpg');
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.woodTexture);
    }

    display() {
        this.scene.pushMatrix();
        this.appearance.apply();
        this.rectangularPrism.display();
        this.scene.popMatrix();
    }
}