const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
};
class State {
  constructor(state) {
    this.state = state;
  }
}
export class Sitting extends State {
  constructor(player) {
    super("SITTING");
    this.player = player;
  }
  enter() {
    this.player.framex = 0; 
    this.player.maxframe = 4;
    this.player.framey = 5;
  }
  handleinput(input) {
    if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
      this.player.setState(states.RUNNING);
    }
  }
}
export class Running extends State {
  constructor(player) {
    super("RUNNNING");
    this.player = player;
  }
  enter() {
    this.player.framex = 0;
    this.player.maxframe = 6;
    this.player.framey = 3;
  }
  handleinput(input) {
    if (input.includes("ArrowDown")) {
      this.player.setState(states.SITTING);
    } else if (input.includes("ArrowUp")) {
      this.player.setState(states.JUMPING);
    }
  }
}
export class Jumping extends State {
  constructor(player) {
    super("JUMPING");
    this.player = player;
  }
  enter() {
    if (this.player.onground()) this.player.vy = -30;
    this.player.framex = 0;
    this.player.maxframe = 6;
    this.player.framey = 1;
  }
  handleinput(input) {
    if (this.player.vy > this.player.weight) {
      this.player.setState(states.FALLING);
    }
  }
}
export class Falling extends State {
  constructor(player) {
    super("FALLING");
    this.player = player;
  }
  enter() {
    this.player.framex = 0;
    this.player.maxframe = 6;
    this.player.framey = 2;
  }
  handleinput(input) {
    if (this.player.onground()) this.player.setState(states.RUNNING);
  }
}
