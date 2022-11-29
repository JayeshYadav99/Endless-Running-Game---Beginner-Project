export class UI{
    constructor(game)
    {
        this.game=game;
        this.fontsize=100;
        this.fontfamily='Helvetica';
    }
    draw(context)
    {
        
        context.textAlign='left';
        context.fillStyle=this.game.fontcolor;
        context.font=this.fontsize+'px'+this.fontfamily;
        context.fillText('score: ' +this.game.score,20,50);
    }
}