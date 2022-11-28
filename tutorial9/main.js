import { Player } from "./player.js";
import { Inputhandler } from "./input.js";
import { Background } from "./background.js";
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from "./enemies.js";
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
      this.groundmargin = 90;
      this.speed = 0;
      this.maxspeed=3;
      this.background = new Background(this);
      console.log(this.background);

      this.player = new Player(this);
      console.log(this.player);
      this.input = new Inputhandler();
      this.enemies=[];
      this.enemytimer=0;
      this.enemyinterval=600;
    }
    update(deltatime) {
      
      this.background.update();
      this.player.update(this.input.keys, deltatime);
      //handleenemies
      if(this.enemytimer>this.enemyinterval)
      {
          this.addEnemy();
          this.enemytimer=0;
      }
      else{
        this.enemytimer+=deltatime;
      }
      this.enemies.forEach(enemy=>{
        enemy.update(deltatime);
        if(enemy.markfordeletion)this.enemies.splice(this.enemies.indexOf(enemy),1);
      });
      
    }
    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach(enemy=>{
        enemy.draw(context);
      })
    }
    addEnemy()
    {
      if(this.speed >0 && Math.random()<0.5)this.enemies.push(new GroundEnemy(this));
      else if(this.speed>0) this.enemies.push(new ClimbingEnemy(this) );
      this.enemies.push(new FlyingEnemy(this));
      console.log(this.enemies);
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
