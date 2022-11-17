const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
const CANVAS_WIDTH=canvas.width=800;
const CANVAS_HEIGHT=canvas.height=800;
let gamespeed=5;
//let gameframe=0;
const backgroundlayer1=new Image();
backgroundlayer1.src="layer-1.png";
const backgroundlayer2=new Image();
backgroundlayer2.src="layer-2.png";
const backgroundlayer3=new Image();
backgroundlayer3.src="layer-3.png";
const backgroundlayer4=new Image();
backgroundlayer4.src="layer-4.png";
const backgroundlayer5=new Image();
backgroundlayer5.src="layer-5.png";
window.addEventListener('load',function(){
    const slider=document.getElementById('slider');
    slider.value=gamespeed;
    const showgamespeed=document.getElementById('showgamespeed');
    showgamespeed.innerHTML=gamespeed;
    slider.addEventListener('change',function(e){
    gamespeed=e.target.value;
    showgamespeed.innerHTML=e.target.value;
    
    });
    class Layer{
    constructor(image,speedmodifier)
    {
        this.x=0;
        this.y=0;
        this.width=2400;
        this.height=700;
        //this.x2=this.width;
        this.image=image;
        this.speedmodifier=speedmodifier;
        this.speed=gamespeed*this.speedmodifier;
    
    }
    update()
    {
    this.speed=gamespeed*this.speedmodifier;
    if(this.x <= -this.width)
    {
        this.x=0;
    }
    //this.x=gameframe%this.width;
    this.x=Math.floor(this.x-this.speed);
    //this.x=gameframe*this.speed%this.width;
    }
    draw()
    {
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    ctx.drawImage(this.image,this.x+this.width,this.y,this.width,this.height);
    }
    }
    const layer4=new Layer( backgroundlayer4,0.8);
    const layer5=new Layer( backgroundlayer5,1);
    const layer1=new Layer( backgroundlayer1,0.2);
    const layer2=new Layer( backgroundlayer2,0.4);
    const layer3=new Layer( backgroundlayer3,0,6);
    const gameobjects=[layer1,layer2,layer3,layer4,layer5];
    function animate()
    {
        ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    gameobjects.forEach(object=>
        {
            object.update();
            object.draw();
        });
    ////gameframe--;
        requestAnimationFrame(animate);
    };
    animate();
});
