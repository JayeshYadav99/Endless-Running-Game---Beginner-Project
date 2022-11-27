export class Inputhandler {
  constructor() {
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      if (
        (e.key == "ArrowDown" ||
          e.key == "ArrowUp" ||
          e.key == "ArrowLeft" ||
          e.key == "ArrowRight") &&
        this.keys.indexOf(e.key) == -1
      ) {
        this.keys.push(e.key);console.log(this.keys);

      } //else if (e.key == "Enter" && gameOver) restartgame();
    });
    window.addEventListener("keyup", (e) => {
      if (
        e.key == "ArrowDown" ||
        e.key == "ArrowUp" ||
        e.key == "ArrowLeft" ||
        e.key == "ArrowRight"
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
