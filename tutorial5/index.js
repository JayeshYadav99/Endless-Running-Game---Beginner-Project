const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
//ctx.font = "100px Arial";


canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const collisioncanvas=document.getElementById('collisioncanvas');
const collisionctx=collisioncanvas.getContext('2d');
//ctx.font = "100px Arial";


collisioncanvas.width=window.innerWidth;
collisioncanvas.height=window.innerHeight;
let ravens=[];
let timetonextraven=0;
let raveninterval=500;
let lasttime=0;
let score=0;
let gameover=0;
class Raven{
    constructor()
    {
        this.spritewisth=271;
        this.spriteheight=194;
        this.sizemodifer=Math.random()*0.6+0.4; 
        this.width=this.spritewisth*this.sizemodifer;
        this.height=this.spriteheight*this.sizemodifer;
        this.x=canvas.width;
        this.y=Math.random()*(canvas.height-this.height);
        this.directionx=Math.random()*5+3;
        this.directiony=Math.random()*5-2.5;
        this.markfordeletion=false;
        this.image=new Image();
        this.image.src="raven.png";
        this.frame=0;
        this.maxframe=4;
        this.timesinceflap=0;
        this.flapinterval=Math.random()*50+50;  
        this.randomcolors=[Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)];
        this.color='rgb('+this.randomcolors[0]+','+this.randomcolors[1]+','+this.randomcolors[2]+')';
        this.hashtrail=Math.random()>0.5;
    }
    update(deltatime)
    {
        if(this.y<0 || this.y>canvas.height-this.height)
        {
            this.directiony=-this.directiony;
        }
        this.x-=this.directionx;
        this.y+=this.directiony;
        if(this.x<0-this.width)
        {
            this.markfordeletion=true;
            
        }
        this.timesinceflap+=deltatime;
       if(this.timesinceflap>this.flapinterval)
       {
        if(this.frame>this.maxframe)this.frame=0;
        else this.frame++;
        this.timesinceflap=0;
        if(this.hashtrail)
        {for(let i=0;i<5;i++)
            {
                particles.push(new Particle(this.x,this.y,this.width,this.color));
                console.log(particles);
            }
            
        }
       
        
        
    }
    if(this.x<0-this.width)gameover=true;
}
    draw()
    {
      
        collisionctx.fillStyle=this.color;
        collisionctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image,this.frame*this.spritewisth,0,this.spritewisth,this.spriteheight,this.x,this.y,this.width,this.height);
    }

}
let explosions=[];
class Explosion{
    constructor(x,y,size)
    {
        this.image=new Image();
        this.image.src="boom.png";
        this.spritewidth=200;
        this.spriteheight=179;
        this.size=size;
        this.x=x;
        this.y=y;
        this.frame=0;
        this.sound=new Audio();
        this.sound.src="Ice attack 2.wav";
        this.sincelastframe=0;
        this.frameinterval=200;
        this.markfordeletion=false;
    }
    update(deltatime)
    {
      if(  this.frame==0)this.sound.play();
      this.sincelastframe+=deltatime;
      if(this.sincelastframe>this.frameinterval)
      {
        this.frame++;
        this.sincelastframe=0;
        if(this.frame>5)
        this.markfordeletion=true;
      }
    }
    draw()
    {
        ctx.drawImage(this.image,this.frame*this.spritewidth,0,this.spritewidth,this.spriteheight,this.x,this.y-this.size/4,this.size,this.size);
    }
}

let particles=[];
class Particle{
    constructor(x,y,size,color)
    {
        this.size=size;
        this.x=x+this.size/2+Math.random()*10;
        this.y=y+this.size/3+Math.random()*10;
        
        this.radius=Math.random()*this.size/10;
        this.maxRadius=Math.random()*20+35;
        this.markfordeletion=false;
        this.speedx=Math.random()*1+0.5;
        this.color=color;

    }
    update()
    {
        this.x+=this.speedx;
        this.radius+=0.5;
        if(this.radius>this.maxRadius-5)this.markfordeletion=true;

    }
    draw()
    {
        ctx.save();
        ctx.globalAlpha=1-this.radius/this.maxRadius;
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();
        ctx.restore();

    }
}
function drawscore()
{
ctx.font="100px Impact";
  ctx.fillStyle = "black";
   ctx.fillText('score '+ score,50,75);
ctx.fillStyle = "white";
  ctx.fillText('score '+ score,55,80);
}
function drawgameover()
{
    ctx.textAlign='center';
    ctx.fillStyle='black';
    ctx.fillText('GAME OVER ,your score is'+score,canvas.width/2,canvas.height/2);
    ctx.fillStyle='white';
    ctx.fillText('GAME OVER ,your score is'+score,canvas.width/2,canvas.height/2+5);
}
window.addEventListener('click',function(e)
{
    const detectPixelColor=collisionctx.getImageData(e.x,e.y,1,1);
    console.log(detectPixelColor);
    const pc=detectPixelColor.data;
    ravens.forEach(object=>
        {
            if(object.randomcolors[0]===pc[0]&&object.randomcolors[1]===pc[1]
                && object.randomcolors[2]===pc[2]){
                    object.markfordeletion=true;
                    console.log(score);
                    score++;(new Explosion())
                    explosions.push(new Explosion(object.x,object.y,object.width));
                    
                
                }
        });
})
function animate(timestamp)
{

    ctx.clearRect(0,0,canvas.width,canvas.height);
    collisionctx.clearRect(0,0,collisioncanvas.width,collisioncanvas.height);
    let deltatime=timestamp-lasttime;
    lasttime=timestamp;
    timetonextraven+=deltatime;
    if(timetonextraven>raveninterval)
    {
        ravens.push(new Raven());
        timetonextraven=0;
        ravens.sort(function(a,b){
            return a.width-b.width;
        });

    };
    drawscore();
    [...particles,...ravens,...explosions].forEach(object=>object.update(deltatime));
[...particles,...ravens,...explosions].forEach(object=>object.draw());
ravens=ravens.filter(object=>!object.markfordeletion);
explosions=explosions.filter(object=>!object.markfordeletion);

particles=particles.filter(object=>!object.markfordeletion);
    
  if(!gameover)  requestAnimationFrame(animate);
  else drawgameover();
}
animate(0);