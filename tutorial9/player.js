import { Sitting } from "./playerstate.js";
export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.vy = 0;
    this.framex=0;
    this.framey=0;
    this.speed = 0;
    this.weight = 1;
    this.maxspeed = 10;
    this.image = document.getElementById("player");
    this.states=[new Sitting(this),new Running(this) ] ;
    this.currentstate=this.states[0];
    this.currentstate.enter();
  }
  update(input) {
    this.currentstate.handleinput(input);
    
    this.x +=this.speed;
    if (input.indexOf("ArrowRight") > -1) {
      this.speed = this.maxspeed;
    } else if (input.indexOf("ArrowLeft") > -1) {
      this.speed -= this.maxspeed;
      
    } 
    else this.speed = 0;
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
    //vertical movement

    // if (input.indexOf("ArrowUp") > -1 && this.onground()) {
    //   this.vy -= 30;
    // }
      this.y += this.vy;
    console.log(this.onground());
    if (!this.onground()) this.vy += this.weight;
    else this.vy = 0;
  }

  draw(context) {
    context.drawImage(
      this.image,
      0,
      0,
      this.framex*this.width,
      this.framey*this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  onground() {
    return this.y >= this.game.height - this.height;
  }
  setstate(state)
  {
    this.currentstate=this.states[state];
    this.currentstate.enter();
  }
}
