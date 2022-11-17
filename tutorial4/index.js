const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
canvas.width=500;
canvas.height=700;
const explosions=[];
let canvasPosition=canvas.getBoundingClientRect();
console.log(canvasPosition);
class Explosion{
    constructor(x,y)
    {
       
        this.spritewidth=200;
        this.spriteheight=179;
        this.width=this.spritewidth*0.7;
        this.height=this.spriteheight*0.7;
        this.x=x;
        this.y=y;
        this.image=new Image();
        this.image.src="boom.png";
        this.frame=0;
        this.timer=0;
        this.angle=Math.random()*6.2;
        this.sound=new Audio();
        this.sound.src="Ice attack 2.wav";
    }
    update()
    {
        if(this.frame==0)this.sound.play();
        this.timer++;
        if(this.timer%10==0)
        {
this.frame++;
        }

    }
    draw()
    {
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image,this.spritewidth*this.frame,0,this.spritewidth,this.spriteheight,0-this.width/2,0-this.height/2,this.width,this.height);
         ctx.restore();
    }
   
}
window.addEventListener('click',function(e){
    createanimation(e);

});
//  window.addEventListener('mousemove',function(e){
//     createanimation(e);
    
//     });

function createanimation(e)
{
    let positionx=e.x-canvasPosition.left;
    let positiony=e.y-canvasPosition.top;
    
    explosions.push(new Explosion(positionx,positiony));
        
    
};
function animate()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<explosions.length;i++)
    {
        explosions[i].update();
        explosions[i].draw();
        if(explosions[i].frame>5)
        {
           explosions.splice(i,1);
           i--;
        }
    }
    requestAnimationFrame(animate);
};
animate();