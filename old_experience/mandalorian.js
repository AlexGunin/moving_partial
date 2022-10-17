const IMAGE_SRC = "./public/assets/mandalorian.webp";
const WIDTH = 500;
const HEIGHT = 706;
const AMOUNT_PARTICLES = 5000;

const createColor = (red, green, blue) => `rgb(${red},${green},${blue})`;
const calculateRelativeBrigthness = (red, green, blue) => {
  return (
    Math.sqrt(red * red * 0.299 + green * green * 0.587 + blue * blue * 0.114) /
    100
  );
};
const getMappedImage = (data, width, height) => {
  const result = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      const startIndex = (y * width + x) << 2;
      const red = data[startIndex];
      const green = data[startIndex + 1];
      const blue = data[startIndex + 2];
      const brightness = calculateRelativeBrigthness(red, green, blue);
      row.push([brightness, createColor(red, green, blue)]);
    }
    result.push(row);
  }
  return result;
};

const getDefaultDrawImage = (ctx, width, height) => (image) =>
  ctx.drawImage(image, 0, 0, width, height);

const start = async () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const drawImage = getDefaultDrawImage(ctx, WIDTH, HEIGHT);

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  const image1 = new Image();
  image1.src = IMAGE_SRC;

  image1.addEventListener("load", () => {
    drawImage(image1);
    const pixels = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    const mappedImage = getMappedImage(pixels.data, WIDTH, HEIGHT);
    const field = new Field(mappedImage);

    const particlesArray = Array(AMOUNT_PARTICLES)
      .fill(null)
      .map(() => new Particle(ctx, field));

    const animate = (particles) => {
      // drawImage(image1);
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = "rgb(0,0,0)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      // ctx.globalAlpha = 0.2;
      for (let i = 0; i < particles.length; i++) {
        particlesArray[i].update();
        ctx.globalAlpha = particlesArray[i].speed * 0.5;
        particles[i].draw();
      }
      requestAnimationFrame(() => animate(particlesArray));
    };

    animate(particlesArray);
  });
};

start();

class Particle {
  constructor(ctx, field) {
    this.field = field;
    this.size = Math.random() * 1.5 + 1;
    this.ctx = ctx;
    this.positionY = Math.floor(this.y);
    this.positionX = Math.floor(this.x);
    this.init();
  }

  init() {
    this.angle = 0;
    this.y = 0;
    this.x = Math.random() * WIDTH;
    this.speed = 0;
    this.velocity = Math.random() * 0.5;
  }

  update() {
    this.positionY = Math.floor(this.y);
    this.positionX = Math.floor(this.x);

    this.speed = this.field.mappedImage[this.positionY][this.positionX][0];
    let movement = 2.5 - this.speed + this.velocity;
    this.angle += this.speed / 20;
    this.size = this.speed;
    this.y += (movement + Math.sin(this.angle)) / 2;
    this.x += (movement + Math.cos(this.angle)) / 2;

    if (this.y > HEIGHT || this.y <= 0) {
      this.y = 0;
      this.x = Math.random() * WIDTH;
    }
    if (this.x > WIDTH || this.x <= 0) {
      this.y = Math.random() * HEIGHT;
      this.x = 0;
    }
  }

  draw() {
    this.update();

    this.ctx.beginPath();
    this.ctx.fillStyle =
      this.field.mappedImage[this.positionY][this.positionX][1];
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

class Field {
  constructor(mappedImage) {
    this.mappedImage = mappedImage;
  }
}
