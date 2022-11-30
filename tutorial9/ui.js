export class UI{
    constructor(game)
    {
        this.game=game;
        this.fontsize=100;
        this.fontfamily='Helvetica';
    }
    draw(context)
    {
        context.save();
        context.shadowOffsetX=2;
        context.shadowOffsetY=2;
        context.shadowColor='white';
        context.shadowBlur=0;
        context.textAlign='left';
        context.fillStyle=this.game.fontcolor;
        context.font=this.fontsize+'px'+this.fontfamily;
        context.fillText('score: ' +this.game.score,20,50);
        context.font=this.fontsize*0.7+'px'+this.fontfamily;
        context.fillText('Time:'+(this.game.time*0.001).toFixed(1),20,80);
        if(this.game.gameover)
        {
            context.textAlign='center';
            context.font=this.fontsize*2+'px'+this.fontfamily;
        if(this.game.score>5)
        {
            context.fillText('BOOYAH',this.game.width*0.5,this.game.height*0.5-20);
            context.font=this.fontsize*0.7+'px'+this.fontfamily;
   
            context.fillText('whooo',this.game.width*0.5,this.game.height*0.5);
        }
        else {
            context.fillText('kya hua',this.game.width*0.5,this.game.height*0.5-20);
            context.font=this.fontsize*0.7+'px'+this.fontfamily;
            
        }
            
   
           
        }
        context.restore();
    }
}