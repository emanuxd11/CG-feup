import { CGFobject } from "../../lib/CGF.js";
import { MyHoneyHive } from "./MyHoneyHive.js";
import { MyPlank } from "./MyPlank.js";

export class MyHive extends CGFobject {
    constructor(scene) {
        super(scene);

        this.cornerPost = new MyPlank(this.scene, 5, 5, 45);
        this.wallPlank = new MyPlank(this.scene, 6, 3, 40);
        this.roof = new MyPlank(this.scene, 60, 60, 3);
        this.floor = new MyPlank(this.scene, 44, 44, 3);
        this.honeyHive = new MyHoneyHive(this.scene, 15);
    }

    display() {
        //-x-z post
        this.scene.pushMatrix();
        this.scene.translate(-25, 0, -25);
        this.cornerPost.display();
        this.scene.popMatrix();

        //-x+z post
        this.scene.pushMatrix();
        this.scene.translate(-25, 0, 20);
        this.cornerPost.display();
        this.scene.popMatrix();

        //+x-z post
        this.scene.pushMatrix();
        this.scene.translate(20, 0, -25);
        this.cornerPost.display();
        this.scene.popMatrix();
        
        //+x+z post
        this.scene.pushMatrix();
        this.scene.translate(20, 0, 20);
        this.cornerPost.display();
        this.scene.popMatrix();

        //roof
        this.scene.pushMatrix();
        this.scene.translate(-30, 45, -30);
        this.roof.display();
        this.scene.popMatrix();

        //floor
        this.scene.pushMatrix();
        this.scene.translate(-22, 7, -22);
        this.floor.display();
        this.scene.popMatrix();

        for (let i=0; i<5; i++) {
            //-z wall
            this.scene.pushMatrix();
            this.scene.translate(-20, 16+7*i, -24);
            this.scene.rotate(-Math.PI/2,0,0,1);
            this.wallPlank.display();
            this.scene.popMatrix();
            
            //+z wall
            this.scene.pushMatrix();
            this.scene.translate(-20, 16+7*i, 21);
            this.scene.rotate(-Math.PI/2,0,0,1);
            this.wallPlank.display();
            this.scene.popMatrix();
            
            //-x wall
            this.scene.pushMatrix();
            this.scene.translate(-24, 10+7*i, -20);
            this.scene.rotate(Math.PI/2,0,1,0);
            this.scene.rotate(Math.PI/2,0,0,1);
            this.wallPlank.display();
            this.scene.popMatrix();
        }

        //+x wall
        this.scene.pushMatrix();
        this.scene.translate(21, 10, -20);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.wallPlank.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(21, 17, -20);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.wallPlank.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(21, 31, -20);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.wallPlank.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(21, 38, -20);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.wallPlank.display();
        this.scene.popMatrix();

        //honeyHive
        this.scene.pushMatrix();
        this.scene.translate(0, 31, 0);
        this.honeyHive.display();
        this.scene.popMatrix();
    }
}