import { MovingParticle } from "./particle.js";
import {
  calculateForceDirection,
  getRandomNumInRange,
} from "../utility/utility.js";
import { Cache } from "../utility/cache.js";

export class Field {
  constructor({ width, height }) {
    this.height = height;
    this.width = width;
  }
}

export class ParticlesField extends Field {
  constructor({ width, height, particles = [] }) {
    super({ width, height });
    this.particles = particles;
    this.cacheStore = new Cache();
  }

  animate(ctx, mouse) {
    for (let i = 0; i < this.particles.length; i++) {
      const currentParticle = this.particles[i];
      this.update(currentParticle, mouse, 10);
      currentParticle.draw(ctx);
    }
  }

  update(currentParticle, mouse, newSize) {
    const { distance, dx, dy } =
      currentParticle.calculateSquaredDistanceTo(mouse);
    const isCloser = distance <= mouse.radius;

    if (!isCloser) return currentParticle.backToInitialPosition();

    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;

    const { forceDirectionX, forceDirectionY } = calculateForceDirection(
      dx,
      dy,
      distance
    );

    let directionX = forceDirectionX * force * currentParticle.density;
    let directionY = forceDirectionY * force * currentParticle.density;

    this.gravitationParticle(currentParticle, directionX, directionY);
  }

  changeParticleSize(particle, isCloser, newSize) {
    if (isCloser) {
      particle.size = newSize;
    } else {
      particle.size = particle.baseSize;
    }
  }

  gravitationParticle(particle, forceX, forceY) {
    particle.x -= forceX / particle.gravitationDensity;
    particle.y -= forceY / particle.gravitationDensity;
  }

  createParticle({ x, y, size = 3 }) {
    return new MovingParticle({
      field: this,
      x,
      y,
      size,
      cacheStore: this.cacheStore,
    });
  }

  clearParticles() {
    this.particles = [];
  }

  createRandomParticles(quantity) {
    for (let i = 0; i < quantity; i++) {
      const x = getRandomNumInRange(this.width);
      const y = getRandomNumInRange(this.height);
      this.particles.push(
        new MovingParticle({ field: this, x, y, cacheStore: this.cacheStore })
      );
    }
  }
}
