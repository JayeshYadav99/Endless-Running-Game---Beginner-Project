import { Standingleft, StandingRight,SittingLeft,SittingRight } from "./state.js";
export default class Player {
  constructor(gamewidth, gameheight) {
    this.gamewidth = gamewidth;
    this.gameheight = gameheight;
    this.states = [new Standingleft(this), new StandingRight(this),new SittingLeft(this),new SittingRight(this)];
    this.currentstate = this.states[1];
    this.image = document.getElementById("dogimage");
    this.width = 200;
    this.height = 181.03;
    this.x = this.gamewidth / 2 - this.width / 2;
    this.y = this.gameheight - this.height;
    this.framex = 0;
    this.framey = 0;
  }
  draw(context) {
    
    context.drawImage(
      this.image,
      this.width * this.framex,
      this.height * this.framey,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update(input) {
    this.currentstate.handleinput(input);
  }
  setState(state) {
    this.currentstate = this.states[state];
    this.currentstate.enter();
  }
}
