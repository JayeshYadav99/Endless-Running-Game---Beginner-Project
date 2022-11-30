class Particle{
    constructor(game)
    {
        this.game=game;
        this.markfordeletion=false;
    }
    update()
    {
        this.x-=this.speedx+this.game.speed;
        this.y-=this.speedy;
        this.size*=0.95;
        if(this.size<0.5)this.markfordeletion=true;
    }
}
export class Dust extends Particle{
    constructor(game,x,y)
    {
        super(game);
        this.size=Math.random()*10+10;
        this.x=x;
        this.y=y;
        this.speedx=Math.random();
        this.speedy=Math.random();
        this.color='rgba(0,0,0,0.2)';

    }
    draw(context)
    {
        context.beginPath();
        context.arc(this.x,this.y,this.size,0,Math.PI*2);
        context.fillStyle=this.color;
        context.fill();

    }
    
    }
    export class Fire extends Particle{
        constructor(game,x,y)
        {
            super(game);
            this.image=document.getElementById('fire');
            this.size=Math.random()*10+50;
            this.x=x;
            this.y=y;
            this.speedx=1;
            this.speedy=1;
            this.angle=0;
            this.va=Math.random()*0.2-0.1;
        }
        update()
        {
            super.update();
            this.angle+=this.va;
            this.x+=Math.sin(this.angle*4);
        }
        draw(context)
        {
            context.save();
            context.translate(this.x,this.y);
            context.rotate(this.angle);
            context.drawImage(this.image,
               - this.size*0.8
               ,
               - this.size*0.9,this.size,this.size);
            context.restore();
        }
    }
