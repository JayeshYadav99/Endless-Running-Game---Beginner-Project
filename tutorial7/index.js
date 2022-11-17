// Pages Opens after all content is loaded
window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 600;
  let enemies = [];
  let score = 0;
  let gameOver = false;
   const fullscreen=this.document.getElementById('fullscreenbutton');
  class Inputhandler {
    constructor() {
      this.keys = [];
      this.touchY='';
      this.touchtreshold=30;
      window.addEventListener("keydown", (e) => {
        if (
          (e.key == "ArrowDown" ||
            e.key == "ArrowUp" ||
            e.key == "ArrowLeft" ||
            e.key == "ArrowRight") &&
          this.keys.indexOf(e.key) == -1
        ) {
          this.keys.push(e.key);
        } else if (e.key == "Enter" && gameOver) restartgame();
      });
      window.addEventListener("keyup", (e) => {
        if (
          e.key == "ArrowDown" ||
          e.key == "ArrowUp" ||
          e.key == "ArrowLeft" ||
          e.key == "ArrowRight"
        ) {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
      });
      window.addEventListener('touchstart',e=>{
        
        this.touchY=e.changedTouches[0].pageY;
      });
      window.addEventListener('touchmove',e=>{
        const swipedistance=e.changedTouches[0].pageY-this.touchY;
        if(swipedistance<-this.touchtreshold && this.keys.indexOf('swipe up')===-1)
        this.keys.push('swipe up');
        else if(swipedistance>this.touchtreshold&& this.keys.indexOf('swipe down')===-1)
        {
          this.keys.push('swipe down');
          if(gameOver) restartgame();
        }
      });
      window.addEventListener('touchend',e=>{
      this.keys.splice(this.keys.indexOf('swipe up'),1);
      this.keys.splice(this.keys.indexOf('swipe down'),1);
      });
    }
  }
  class Player {
    constructor(gamewidth, gameheight) {
      this.gamewidth = gamewidth;
      this.gameheight = gameheight;
      this.width = 200;
      this.height = 200;
      this.x = 0;
      this.y = this.gameheight - this.height;
      this.image = player;
      this.framex = 0;
      this.frameY = 0;
      this.maxframe = 8;
      this.speed = 0;
      this.vy = 0;
      this.weight = 1;
      this.fps = 20;
      this.frametimer = 0;
      this.frameinterval = 1000 / this.fps;
    }
    restart() {
      this.x = 100;

      this.y = this.gameheight - this.height;
      this.maxframe = 8;
      this.frameY = 0;
    }

    draw(context) {
      // context.strokeStyle = "white";
      // context.strokeRect(this.x, this.y, this.width, this.height);
      // context.beginPath();
      // context.arc(
      //   this.x + this.width / 2,
      //   this.y + this.height / 2,
      //   this.width / 2,
      //   0,
      //   Math.PI * 2
      // );
      // context.stroke();
      // context.strokeStyle = "blue";
      // context.beginPath();
      // context.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
      // context.stroke();
      // context.linewidth=5;
      // context.strokeStyle='white';
      // context.beginPath();
      // context.arc(
      //   this.x + this.width / 2,
      //   this.y + this.height /2+20,
      //   this.width / 3,
      //   0,
      //   Math.PI * 2
      // );
      // context.stroke();


      context.drawImage(
        this.image,
        this.framex * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    update(input, deltatime, enemies) {
      enemies.forEach((obj) => {
        const dx = (obj.x + obj.width / 2-20) - (this.x + this.width / 2);
        const dy = obj.y + obj.height / 2 - (this.y + this.height / 2+20);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < obj.width / 3 + this.width / 3) {
          gameOver = true;
        }
      });
      if (this.frametimer > this.frameinterval) {
        if (this.framex >= this.maxframe) this.framex = 0;
        else this.framex++;
        this.frametimer = 0;
      } else {
        this.frametimer += deltatime;
      }
      if (input.keys.indexOf("ArrowRight") > -1) {
        this.speed = 5;
      } else if (input.keys.indexOf("ArrowLeft") > -1) {
        this.speed = -5;
      } else if ((input.keys.indexOf("ArrowUp")>-1||input.keys.indexOf('swipe up') > -1 )&& this.onground()) {
        
        this.vy -= 32;
      } else {
        this.speed = 0;
      }
      this.x += this.speed;
      if (this.x < 0) this.x = 0;
      else if (this.x > this.gamewidth - this.width)
        this.x = this.gamewidth - this.width;
      this.y += this.vy;
      if (!this.onground()) {
        this.vy += this.weight;
        this.maxframe = 5;
        this.frameY = 1;
      } else {
        this.vy = 0;
        this.frameY = 0;
        this.maxframe = 8;
      }
      if (this.y > this.gameheight - this.height)
        this.y = this.gameheight - this.height;
    }
    onground() {
      return this.y >= this.gameheight - this.height;
    }
  }
  class Background {
    constructor(gamewidth, gameheight) {
      this.gamewidth = gamewidth;
      this.gameheight = gameheight;
      this.image = background;
      this.x = 0;
      this.y = 0;
      this.width = 2000;
      this.height = 700;
      this.speed = 7;
    }
    update() {
      this.x -= this.speed;
      if (this.x < 0 - this.width) this.x = 0;
    }

    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        this.x + this.width - this.speed,
        this.y,
        this.width,
        this.height
      );
    }
    restart() {
      this.x = 0;
    }
  }
  class Enemy {
    constructor(gamewidth, gameheight) {
      this.gamewidth = gamewidth;
      this.gameheight = gameheight;
      this.width = 160;
      this.height = 119;
      this.image = enemy;
      this.x = this.gamewidth;
      this.y = this.gameheight - this.height;
      this.framex = 0;
      this.maxframe = 5;
      this.fps = 20;
      this.frametimer = 0;
      this.frameinterval = 1000 / this.fps;
      this.speed = 8;
      this.markfordeletion = false;
    }
    draw(context) {
      // context.strokeStyle = "white";
      // context.strokeRect(this.x, this.y, this.width, this.height);
      // context.beginPath();
      // context.arc(
      //   this.x + this.width / 2,
      //   this.y + this.height / 2,
      //   this.width / 2,
      //   0,
      //   Math.PI * 2
      // );
      // context.stroke();
      // context.strokeStyle = "blue";
      // context.beginPath();
      // context.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
      // context.stroke();
      // context.linewidth=5;
      // context.strokeStyle='white';
      // context.beginPath();
      // context.arc(
      //   this.x + this.width / 2-20,
      //   this.y + this.height / 2,
      //   this.width / 3,
      //   0,
      //   Math.PI * 2
      // );
      // context.stroke();
      context.drawImage(
        this.image,
        this.framex * this.width,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    update(deltatime) {
      if (this.frametimer > this.frameinterval) {
        if (this.framex >= this.maxframe) this.framex = 0;
        else this.framex++;
        this.frametimer = 0;
      } else {
        this.frametimer += deltatime;
      }

      this.x -= this.speed;
      if (this.x < 0 - this.width) {
        this.markfordeletion = true;
        score++;
      }
    }
  }
  //
  function handleenemies(deltatime) {
    if (enemytimer > enemyinterval + randomenemyinterval) {
      randomenemyinterval = Math.random() * 3000 + 500;
      enemies.push(new Enemy(canvas.width, canvas.height));
      enemytimer = 0;
    } else {
      enemytimer += deltatime;
    }

    enemies.forEach((Object) => {
      Object.draw(ctx);
      Object.update(deltatime);
    });
    enemies = enemies.filter((obj) => !obj.markfordeletion);
  }
  function displaystatusText(context) {
    context.textAlign = "left";
    context.fillStyle = "black";
    context.font = "40px Helvetica";
    context.fillText("SCore:" + score, 20, 50);
    context.fillStyle = "white";
    context.font = "40px Helvetica";
    context.fillText("SCore:" + score, 22, 52);
    if (gameOver) {
      context.textAlign = "center";
      context.fillStyle = "black";
      context.fillText("GAME OVER,press Enter", canvas.width / 2, 200);
      context.fillStyle = "white";
      context.fillText("GAME OVER ,press Enter", canvas.width / 2, 202);
    }
  }
  function restartgame() {
    player1.restart();
    background1.restart();
    enemies = [];
    score = 0;
    gameOver = false;
    animate(0);
  }
  function togglefullscreen()
  {
    if(!document.fullscreenElement)
    {
      canvas.requestFullscreen().catch(err=>
        {
          alert(" Error,cant enable full screen:$(err.message)");

        });
        
    }
    else{
      document.exitFullscreen();
    }
    
  }
  fullscreen.addEventListener('click',togglefullscreen);
  togglefullscreen();
  const input = new Inputhandler();
  const player1 = new Player(canvas.width, canvas.height);
  const background1 = new Background(canvas.width, canvas.height);
  // const enemy1=new Enemy(canvas.width,canvas.height);
  let lasttime = 0;
  let enemytimer = 0;
  let enemyinterval = 2000;
  let randomenemyinterval = Math.random() * 1000 + 500;
  function animate(timeStamp) {
    const deltatime = timeStamp - lasttime;
    lasttime = timeStamp;
    //console.log(deltatime);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background1.draw(ctx);
    background1.update();

    player1.draw(ctx);
    player1.update(input, deltatime, enemies);

    handleenemies(deltatime);
    displaystatusText(ctx);
    if (!gameOver) requestAnimationFrame(animate);
  }
  animate(0);
});
