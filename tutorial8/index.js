import Player from "./player.js";
import Inputhandler from "./input.js";
import { drawstatustext } from "./utility.js";
window.addEventListener("load", function () {
  const loading = document.getElementById("loading");
  loading.style.display = "none";
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const player = new Player(canvas.width, canvas.height);
  console.log(player);

  const input = new Inputhandler();
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // console.log(input.lastkey);
    player.update(input.lastkey);
    player.draw(ctx);
    drawstatustext(ctx, input, player);
    requestAnimationFrame(animate);
  }
  animate();
});
