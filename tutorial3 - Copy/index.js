
// /**
//  @type (HTMLCanvasSElement)
//  */
const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
CANVAS_HEIGHT=canvas.height=500;
CANVAS_WIDTH=canvas.width=700;
const numberofenemies=10;
const enemiesarray=[];

let gameframe=0;

class Enemy{
    constructor()
    {
       
    
        this.image=new Image();
        this.image.src='enemy1.png';
        this.speed=Math.random()*4-2;
        this.spritwidth=293;
        this.spriteheight=155;
        this.height=this.spritwidth/2.5;
        this.width=this.spriteheight/2.5;
        this.x=Math.random()*(canvas.width-this.width);
        this.y=Math.random()*(canvas.height-this.height);
        this.frame=0;
        this.flapspeed=Math.floor(Math.random()*3+1);
    }
    update()
{
        this.x+=Math.random()*15-7.5;
        this.y+=Math.random()*10-5;
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