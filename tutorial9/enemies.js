class Enemy{
    constructor()
    {
        this.framex=0;
        this.framey=0;
        this.fps=20;
        this.frameinterval=1000/this.fps;
        this.frametimer=0;
    }
    update()
    {

    }
    draw()
    {

    }
}
class FlyingEnemy extends Enemy{
    
}
class GroundEnemy extends Enemy{

}
class ClimbingEnemy extends Enemy{
    
}