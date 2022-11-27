export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.vy = 0;
    this.speed = 6;
    this.weight=1;
    this.maxspeed = 10;
    this.image = document.getElementById("player");
  }
  update(input) {
    console.log(this.game.width);
    if (input.indexOf("ArrowRight") > -1) {
      this.x++;
    } else if (input.indexOf("ArrowLeft") > -1) {
      this.x--;
      //console.log(onground());
    } else this.speed = 0;
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
    
      this.x = this.game.width - this.width;
    //vertical movement
    this.y += this.vy;
    if(!this.onground()) this.vy+=this.weight;
    if (input.indexOf("ArrowUp") > -1 && this.onground()) {
      this.vy -= 2;
    }
  }

  draw(context) {
    context.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  onground() {
    let k = this.game.height - this.height;
    console.log(this.gameheight);
    return this.y <= k;
  }
}
