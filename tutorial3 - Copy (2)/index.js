
// /**
//  @type (HTMLCanvasSElement)
//  */
const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
CANVAS_HEIGHT=canvas.height=500;
CANVAS_WIDTH=canvas.width=700;
const numberofenemies=200;
const enemiesarray=[];

let gameframe=1000;

class Enemy{
    constructor()
    {
       
    
        this.image=new Image();
        this.image.src='enemy3.png';
        this.speed=Math.random()*4+1;
        this.spritwidth=218;
        this.spriteheight=177;
        this.height=this.spritwidth/2.5;
        this.width=this.spriteheight/2.5;
        this.x=Math.random()*(canvas.width-this.width);
        this.y=Math.random()*(canvas.height-this.height);
        this.frame=50;
        this.flapspeed=Math.floor(Math.random()*3+1);
        this.angle=Math.random()*500;
        this.anglespeed=Math.random()*1.52+0.5;
        this.curve=Math.random()*200+50;
    }
    update()
{
        this.x=canvas.width/2*Math.sin(this.angle*Math.PI/200)+(CANVAS_WIDTH/2-(this.width/2));
        this.y=canvas.height/2*Math.cos(this.angle*Math.PI/180)+(CANVAS_HEIGHT/2-(this.height/2));
        //this.y+=this.curve*Math.sin(this.angle);
        this.angle+=this.anglespeed;
         if(this.x+this.width<0)this.x=canvas.width;
        if(gameframe%this.flapspeed==0)
        {
        this.frame>4?this.frame=0:this.frame++;
        }
    }
    draw()
    {
        //ctx.strokeRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image,this.frame*this.spritwidth,0,this.spritwidth,this.spriteheight,this.x,this.y,this.width,this.height);
    }

};
for(let i=0;i<numberofenemies;i++)
{
    enemiesarray.push(new Enemy());
}
function animate()
{
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
   enemiesarray.forEach(enemy=>{
    enemy.update();
    enemy.draw();
   });
   gameframe++;
    requestAnimationFrame(animate);
}
animate();