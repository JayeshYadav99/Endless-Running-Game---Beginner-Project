export class InputHandler {
  constructor() {
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" && this.keys.indexOf(e.key) === -1)
       {
        
      }
    });
  }
}
