import { Player } from "./player.js";
import { Inputhandler } from "./input.js";
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
      this.player = new Player(this);
      this.input = new Inputhandler();
    }
    update() {
      this.player.update(this.input.keys);
    }
    draw(context) {
      this.player.draw(context);
    }
  }
  const game = new Game(canvas.width, canvas.height);
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);

    requestAnimationFrame(animate);
  }
  animate();
});
