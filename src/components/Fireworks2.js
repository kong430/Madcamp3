import React, { createRef } from "react";
import { Component } from "react";


export default class Fireworks2 extends Component{
	constructor(){
		super();
		this.fireworks = [];
		this.particles = [];
		this.circles = [];
		this.fireworksMax = 40;
		this.fireworksChance = 1;
		this.hue = 0;
	}
	resize(stageWidth, stageHeight) {
		this.w = stageWidth;
		this.h = stageHeight;
	}

	draw(ctx) {
		if (this.fireworks.length < this.fireworksMax && Math.random() < this.fireworksChance) {
			this.fireworks.push(new Firework({w:this.w, h:this.h, hue:this.hue}));
			this.hue += 10;
		}
		this.drawScene(ctx);
		this.arrayCleanup();
	}

	drawScene(ctx) {
		this.fireworks.map((firework) => {
			firework.update();
			firework.draw(ctx);
		});
		this.particles.map((particle) => {
			particle.update();
			particle.draw(ctx);
		});
		this.circles.map((circle) => {
			circle.update();
			circle.draw(ctx);
		});
	}

	arrayCleanup() {
		let dump1 = [], dump2 = [], dump3 = [];
	
		this.fireworks.map((firework) => {
			if (firework.alpha > 0) {
				dump1.push(firework);
			} else {
				this.createFireworks(firework.x, firework.y, firework.hue);
			}
		});
		this.fireworks = dump1;
	
		this.particles.map((particle) => {
			if (particle.size > 0) dump2.push(particle);
		});
		this.particles = dump2;
	
		this.circles.map((circle) => {
			if (circle.size < circle.endSize) dump3.push(circle);
		});
		this.circles = dump3;
	}

	createFireworks(x, y, hue) {
		for (let i = 0; i < 20; i++) {
			this.particles.push(new Particle(x, y, hue, i));
		}
		this.circles.push(new Circle(x, y, hue));
	}

	
	
}
class Firework {
	constructor(props) {
		this.x = this.getRandomInt(props.w * 0.1, props.w * 0.9);
		this.y = props.h;
		this.targetY = this.getRandomInt(props.h * 0.2, props.h * 0.4);
		this.hue = props.hue;
		this.alpha = 1;
		this.tick = 0;
		this.ttl = this.getRandomInt(120, 180);
		this.h=props.h
	}
	draw(ctx) {
		if (this.tick <= this.ttl) {
			ctx.beginPath();
			ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
			ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${this.alpha})`;
			ctx.fill();
			ctx.closePath();
		}
	}
	update() {
		let progress = 1 - (this.ttl - this.tick) / this.ttl;

		this.y = this.h - (this.h - this.targetY) * this.easeOutQuart(progress);
		this.alpha = 1 - this.easeOutQuart(progress);

		this.tick++;
	}
	getRandomInt(min, max) {
		return Math.round(Math.random() * (max - min)) + min;
	}

	easeOutQuart(x) {
		return 1 - Math.pow(1 - x, 4);
	}
}

class Particle {
	constructor(x, y, hue, i) {
		this.x = x;
		this.y = y;
		this.hue = hue;
		this.size = this.getRandomInt(2, 3);
		this.speed = this.getRandomInt(30, 40) / 10;
		this.angle = this.getRandomInt(0, 36) + 36 * i;
	}
	draw(ctx) {
		if (this.size > 0) {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, 1)`;
			ctx.fill();
			ctx.closePath();
		}
	}
	update() {
		this.radian = (Math.PI / 180) * this.angle;
		this.x += this.speed * Math.sin(this.radian);
		this.y += this.speed * Math.cos(this.radian);
		this.size -= 0.05;
	}

	getRandomInt(min, max) {
		return Math.round(Math.random() * (max - min)) + min;
	}

	easeOutQuart(x) {
		return 1 - Math.pow(1 - x, 4);
	}
}

class Circle {
	constructor(x, y, hue) {
		this.x = x;
		this.y = y;
		this.hue = hue;
		this.size = 0;
		this.endSize = this.getRandomInt(100, 130);
	}
	draw(ctx) {
		if (this.size < this.endSize) {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, .2)`;
			ctx.fill();
			ctx.closePath();
		}
	}
	update() {
		this.size += 15;
	}
	getRandomInt(min, max) {
		return Math.round(Math.random() * (max - min)) + min;
	}
}

