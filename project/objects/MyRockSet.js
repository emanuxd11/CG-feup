import { CGFobject, CGFappearance, CGFtexture } from "../../lib/CGF";
import { MyRock } from "./MyRock";
import { MyRandom } from "../utils/MyRandom";

export class MyRockSet extends CGFobject {
    constructor(scene, height=3, radius=1, space=2) {
        super(scene)

        this.height = height;
        this.radius = radius;
        this.space = space;

        this.rockTexture = MyRock.rockTextures[MyRandom.getRandomInt(0, this.MyRock.rockTextures.length-1)];
        this.rock = new MyRock(this.scene, 12, 3, this.radius, true);
    }

    display() {
        for (let h=0; h<this.height; h++) {
            let x0=h*this.space*0.5;
            let y0=h*this.space*Math.sqrt(2/3);
            let z0=h*this.space*Math.sqrt(3/4)/2;
            for (let i=0; i<this.height; i++) {
                for (let j=i; j<this.height; j++) {
                    this.scene.pushMatrix();
                    this.scene.translate(
                        x0 + i*this.space + j*this.space/2,
                        y0,
                        z0 + j*this.space*Math.sin(Math.PI/3)
                    )
                    this.rockTexture.bind();
                    this.rock.display();
                    this.scene.popMatrix();
                }
            }
        }
    }
}