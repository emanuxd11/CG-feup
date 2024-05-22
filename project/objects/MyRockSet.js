import { CGFobject, CGFappearance, CGFtexture } from "../../lib/CGF.js";
import { MyRock } from "./MyRock.js";
import { MyRandom } from "../utils/MyRandom.js";

export class MyRockSet extends CGFobject {
    constructor(scene, height=3, radius=1, space=2) {
        super(scene)

        this.height = height;
        this.radius = radius;
        this.space = space;

        this.rockTexture = new CGFtexture(this.scene, MyRock.rockTextures[MyRandom.getRandomInt(0, MyRock.rockTextures.length-1)]);
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.rockTexture);

        this.rockArray = [];
        for (let n=0; n<this.height*(this.height+1)*(this.height+2)/6; n++) {
            this.rockArray.push(new MyRock(this.scene, 12, 3, this.radius, true));
        }
    }

    display() {
        let n = 0;
        for (let h=0; h<this.height; h++) {
            let x0=h*this.space*0.5;
            let y0=h*this.space*Math.sqrt(2/3);
            let z0=h*this.space*Math.sqrt(3/4)/2;
            for (let i=0; i<(this.height-h); i++) {
                for (let j=i; j<(this.height-h); j++) {
                    this.scene.pushMatrix();
                    this.scene.translate(
                        x0 + (j-i)*this.space + i*this.space/2,
                        y0,
                        z0 + i*this.space*Math.sin(Math.PI/3)
                    )
                    this.appearance.apply();
                    this.rockArray[n].display();
                    this.scene.popMatrix();
                    n++;
                }
            }
        }
    }
}