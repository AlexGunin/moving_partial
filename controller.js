import { getAlpha, getStartIndex } from "./utility/utility.js";

export class Controller {
  constructor({ canvas, ctx, field, mouse }) {
    this.canvas = canvas;
    this.canvasW = this.canvas.width;
    this.canvasH = this.canvas.height;
    this.ctx = ctx;
    this.field = field;
    this.mouse = mouse;
  }

  generateParticles(quantity) {
    return this.field.createRandomParticles(quantity);
  }

  fillField(particles) {
    this.field.particles = particles;
  }

  startAnimate() {
    this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    this.field.animate(this.ctx, this.mouse);
    requestAnimationFrame(() => this.startAnimate());
  }

  createText(x, y, text, font, style) {
    this.ctx.fillStyle = style;
    this.ctx.font = font;
    this.ctx.fillText(text, x, y);
    return this.ctx.getImageData(0, 0, this.canvasW, this.canvasH);
  }

  createTextParticles(
    x = 0,
    y = 0,
    text = "Alexey",
    font = "30px Verdana",
    style = "white",
    density
  ) {
    const textData = this.createText(x, y, text, font, style);
    return this.transformTextToParticles(textData, density);
  }

  transformTextToParticles({ height, width, data }, density = 10) {
    const particles = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const alphaIndex = getAlpha(x, y, width);
        if (data[alphaIndex] < 128) continue;

        const positionX = x * density;
        const positionY = y * density;

        const particle = this.field.createParticle({
          x: positionX,
          y: positionY,
        });
        particles.push(particle);
      }
    }
    return particles;
  }
}
