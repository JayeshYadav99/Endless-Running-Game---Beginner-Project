export default class Inputhandler {
  constructor() {
    this.lastkey = "";
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.lastkey = "PRESS LEFT";
          break;
        case "ArrowRight":
          this.lastkey = "PRESS RIGHT";
          break;
        case "ArrowDown":
          this.lastkey = "PRESS DOWN";
          break;
        case "ArrowUp":
          this.lastkey = "PRESS UP";
          break;
      }
    });
    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.lastkey = "RELEASE  LEFT";
          break;
        case "ArrowRight":
          this.lastkey = "RELEASE RIGHT";
          break;
        case "ArrowDown":
          this.lastkey = "RELEASE  DOWN";
          break;
        case "ArrowUp":
          this.lastkey = "RELEASE UP";
          break;
      }
    });
  }
}
