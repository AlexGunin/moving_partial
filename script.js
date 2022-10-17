import { Controller } from "./controller.js";
import { ParticlesField } from "./entities/field.js";
import { Mouse } from "./entities/mouse.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = new Mouse({ radius: 100 });
const field = new ParticlesField({
  width: canvas.width,
  height: canvas.height,
});

const controller = new Controller({ canvas, ctx, field, mouse });

const particles = controller.createTextParticles(20, 50);
controller.fillField(particles);
controller.startAnimate();
