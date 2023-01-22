document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 700;
  class Game {
    constructor(ctx, width, height) {
      this.ctx = ctx;
      this.enemies = [];

      this.width = width;
      this.height = height;
      this.enemynterval = 250;
      this.enemytimer = 0;
      this.markfordeletion = false;
      this.enemytypes=['worm','ghost','spider'];
    }
    update(deltatime) {
      // this.#addnewenemy();(
      this.enemies = this.enemies.filter((object) => !object.markfordeletion);
      if (this.enemytimer > this.enemynterval) {
        this.#addnewenemy();
        this.enemytimer = 0;
      } else {
        this.enemytimer += deltatime;
      }
      this.enemies.forEach((object) => object.update(deltatime));
    }
    draw(ctx) {
      this.enemies.forEach((object) => object.draw(this.ctx));
    }
    #addnewenemy() {
        const randomenemy=this.enemytypes[Math.floor(Math.random()*this.enemytypes.length)];
        if(randomenemy=='worm') this.enemies.push(new Worm(this));
        else if(randomenemy=='spider') this.enemies.push(new Spider(this));
        else if(randomenemy=='ghost') this.enemies.push(new Ghost(this));
    //   this.enemies.sort(function(a,b){
    //     return a.y-b.y;
    //   });
    }
  }

  class Enemy {
    constructor(game) {
      this.game = game;
      this.markfordeletion=false;
     // this.x = this.game.width;
      this.y = Math.random() * this.game.height;
      
    this.height = 100;
    this.framex=0;
    this.maxfrane=5;
    this.frameinterval=100;
    this.frametimer=0;

      //console.log(this.game);
     }
    update(deltatime) {
      this.x-=this.vx*deltatime;
      if (this.x < 0 - this.width) this.markfordeletion = true;
    if(this.frametimer>this.frameinterval)
    {
      if(this.framex<this.maxfrane)this.framex++;
      else this.framex=0;
      this.frametimer=0
    }
    else{
      this.frametimer+=deltatime;
    }
    }
    draw(ctx) {
      //ctx.fillRect(this.x, this.y, this.width, this.height);
      
      ctx.drawImage(this.image,this.framex*this.spritewidth,0,this.spritewidth,this.spriteheight,this.x,this.y,this.width,this.height);
    }
  }
  class Worm extends Enemy {
    constructor(game) {
      super(game);
      this.spritewidth=229;
      this.spriteheight=173;
      this.x = this.game.width;
      this.y =  this.game.height-this.height;
      this.width = this.spritewidth/2;
      this.height =  this.spriteheight/2;
      this.image = worm;
      this.vx=Math.random()*0.1+0.1;
    }
  }
  class Ghost extends Enemy {
    constructor(game) {
      super(game);
      this.spritewidth=261;
      this.spriteheight=209;
      this.x = this.game.width;
      this.y = Math.random() * this.game.height;
      this.width = this.spritewidth/2;
      this.height =  this.spriteheight/2;
      this.image = ghost;
      this.vx=Math.random()*0.2+0.1;
      this.angle=0;
      this.curve=Math.random()*3;
    }
    update(deltatime)
    {
        super.update(deltatime);
        this.y+=Math.sin(this.angle)*this.curve;
        this.angle+=0.04;

    }
    draw(ctx)
    {
        ctx.save();
        ctx.globalAlpha=0.5;
        super.draw(ctx);
        ctx.restore();
        
    }
  }
  class Spider extends Enemy {
    constructor(game) {
      super(game);
      this.spritewidth=310;
      this.spriteheight=175;
      this.width = this.spritewidth/2;
      this.height =  this.spriteheight/2;
      this.x = Math.random()*this.game.width;
      this.y =  0-this.height;
     
      this.image = spider;
      this.vx=0;
      this.vy=Math.random()*0.1+0.1;
      this.maxlength=Math.random()*this.game.height;
      
    }

    update(deltatime)
    {
        super.update(deltatime);
         if (this.y < 0 - this.height*2) this.markfordeletion = true;
  
        this.y+=this.vy*deltatime;
        if(this.y>this.maxlength)this.vy*=-1;
    }
    draw(ctx)
    {
        ctx.beginPath();
        ctx.moveTo(this.x+this.width/2,0);
        ctx.lineTo(this.x+this.width/2,this.y);
        ctx.stroke();
        super.draw(ctx);


    }
  }
  const game = new Game(ctx, canvas.width, canvas.height);
  let lasttime = 1;
  function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltatime = timestamp - lasttime;
    lasttime = timestamp;
    game.update(deltatime);
    game.draw();
    requestAnimationFrame(animate);
  }
  animate(0);
});
