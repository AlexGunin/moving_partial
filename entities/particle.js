export class Particle {
  constructor({ field, x, y, size = 3 }) {
    this.field = field;
    this.size = size;
    this.x = x;
    this.y = y;
  }

  update() {}

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export class MovingParticle extends Particle {
  constructor({ field, x, y, size, cacheStore }) {
    super({ field, x, y, size });
    this.baseSize = this.size;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 20 + 10;
    this.gravitationDensity = Math.random() + 1;
    this.cache = cacheStore;
  }

  calculateSquaredDistanceTo({ x, y }) {
    const dx = x - this.x;
    const dy = y - this.y;

    const squaredDx = this.getSquare(dx);
    const squaredDy = this.getSquare(dy);

    const distance = Math.sqrt(squaredDx + squaredDy);

    return { distance, dx, dy };
  }

  getSquare(value) {
    return (
      this.cache.getItem("square", value) ??
      this.cache.setItem("square", value, value * value)
    );
  }

  backToInitialPosition() {
    if (this.x !== this.baseX) {
      this.x -= (this.x - this.baseX) / this.density;
    }
    if (this.y !== this.baseY) {
      this.y -= (this.y - this.baseY) / this.density;
    }
  }
}
