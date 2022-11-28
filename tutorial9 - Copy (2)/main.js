import { Player } from "./player.js";
import { Inputhandler } from "./input.js";
import { Background } from "./background.js";
window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 600;
  class Game {
    constructor(width, height) {
      this.width = width;
      //console.log("d",this.width);
      this.height = height;
      this.groundmargin = 175;
      this.speed = 3;
      this.background = new Background(this);
      console.log(this.background);

      this.player = new Player(this);
      console.log(this.player);
      this.input = new Inputhandler();
    }
    update(deltatime) {
      this.background.update();
      this.player.update(this.input.keys, deltatime);
    }
    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
    }
  }
  const game = new Game(canvas.width, canvas.height);
  let lasttime = 0;
  function animate(timeStamp) {
    const deltatime = timeStamp - lasttime;
    lasttime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltatime);
    game.draw(ctx);

    requestAnimationFrame(animate);
  }
  animate(0);
});
