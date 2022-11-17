export const states = {
  STANDING_LEFT: 0,
  STANDING_RIGHT: 1,
  SITTING_LEFT:2,
  SITTING_RIGHT:3
};
class State {
  constructor(state) {
    this.state = state;
  }
}
export class Standingleft extends State {
  constructor(player) {
    super("STANDING LEFT");
    this.player = player;
  }

  enter() {
    this.player.framey = 1;
  }
  handleinput(input) {
    if (input === "PRESS RIGHT") this.player.setState(states.STANDING_RIGHT);
    else if(input=="PRESS DOWN") this.player.setState(states.SITTING_LEFT);
 
  }
}
export class StandingRight extends State {
  constructor(player) {
    super("STANDING RIGHT");
    this.player = player;
  }

  enter() {
    this.player.framey = 0;
  }
  handleinput(input) {
    if (input === "PRESS LEFT") this.player.setState(states.STANDING_LEFT);
    else if(input=="PRESS DOWN") this.player.setState(states.SITTING_RIGHT);
  }
}
export class SittingLeft extends State {
    constructor(player) {
      super("SITTING LEFT");
      this.player = player;
    }
  
    enter() {
      this.player.framey = 9;
    }
    handleinput(input) {
      if (input === "PRESS RIGHT") this.player.setState(states.SITTING_RIGHT);
      else if(input=="PRESS UP") this.player.setState(states.STANDING_LEFT);
    }
  }
  export class SittingRight extends State {
    constructor(player) {
      super("SITTING LEFT");
      this.player = player;
    }
  
    enter() {
      this.player.framey = 8;
    }
    handleinput(input) {
      if (input === "PRESS LEFT") this.player.setState(states.SITTING_LEFT);
      else if(input=="PRESS UP") this.player.setState(states.STANDING_RIGHT);
    }
  }
