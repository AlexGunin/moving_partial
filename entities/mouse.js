export class Mouse {
  constructor({ x = null, y = null, radius = 150 }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    window.addEventListener("mousemove", this.handleMove.bind(this));
  }

  handleMove(event) {
    this.x = event.x;
    this.y = event.y;
  }
}
