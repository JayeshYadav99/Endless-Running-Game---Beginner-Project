// import { Sitting } from "./playerstate.js";
//import { Jumping } from "./playerstate.js";
import { Running } from "./playerstate.js";
// import { Falling } from "./playerstate.js";
export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height - this.game.groundmargin;
    this.vy = 0;
    this.framex = 0;
    this.framey = 3;
    this.maxframe=4;
    this.fps = 20;
    this.frameinterval = 1000 / this.fps;
    this.frametimer = 0;
    this.speed = 0;
    this.weight = 1;
    this.maxspeed = 10;
    this.image = document.getElementById("player");
    this.states = [
      new Running(this)
      // new Sitting(this),
      // new Running(this),
      // new Jumping(this),
      // new Falling(this),
    ];
    this.currentstate = this.states[0];
    this.currentstate.enter();
  }
  update(input, deltatime) {
    this.framex+=0.02 ;
    // this.currentstate.handleinput(input);

    // this.x += this.speed;
    // if (input.indexOf("ArrowRight") > -1) {
    //   this.speed = this.maxspeed;
    // } else if (input.indexOf("ArrowLeft") > -1) {
    //   this.speed -= this.maxspeed;
    // } else this.speed = 0;
    // if (this.x < 0) this.x = 0;
    // if (this.x > this.game.width - this.width)
    //   this.x = this.game.width - this.width;
    // //vertical movement

    // // if (input.indexOf("ArrowUp") > -1 && this.onground()) {
    // //   this.vy -= 30;
    // // }
    // this.y += this.vy;
    // console.log(this.onground());
    // if (!this.onground()) this.vy += this.weight;
    // else this.vy = 0;
    // //sprite animations

    // if (this.frametimer > this.frameinterval) {
    //   this.frametimer = 0;
    //   if (this.framex < this.maxframe) this.framex++;
    //   else this.framex = 0;
    // } else this.frametimer += deltatime;
  }

  draw(context) {
    context.strokeStyle="blue";
    context.drawImage(
      this.image,
      this.framex * this.width+3,
      this.framey * this.height,
      this.height,
      this.width,
      this.x +200,
      this.y,
      this.width,
      this.height
    );
    context.strokeRect(
      
      this.x+200,
      this.y,
      this.width,
      this.height);
  }
  // onground() {
  //   return this.y >= this.game.height - this.height - this.game.groundmargin;
  // }
  // setState(state) {
  //   this.currentstate = this.states[0];
  //   this.currentstate.enter();
  // }
}
