/*import { CGFobject } from "../../lib/CGF";
import { MyRock } from "./MyRock";
import { MyRandom } from "../utils/MyRandom";

export class MyRockSet extends CGFobject {
    constructor(scene, sides=4, height=3, radius=1, space=2) {
        super(scene)

        this.sides = sides;
        this.height = height;
        this.radius = radius;
        this.space = space;

        this.rockTexture = MyRock.rockTextures[MyRandom.getRandomInt(0, this.MyRock.rockTextures.length-1)];
    }

    triangleDisplay(side=2, x0=0, y0=0, z0=0) {
        for (let i=0; i<side; i++) {
            for (let j=i; j<side; j++) {
                this.scene.pushMatrix();
                this.scene.translate(
                    x0 + i*this.space + j*this.space/2,
                    y0,
                    z0 + j*this.space*Math.sin(Math.PI/3)
                )
            }
        }
    }
}*/