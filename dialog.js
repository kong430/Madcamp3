import {Point} from './point.js';

const FOLLOW_SPEED = 0.08;
const ROTATE_SPEED = 0.12;
const SPEED_REDUCE = 0.8;
const MAX_ANGLE = 30;
const FPS = 1000 / 60;
var WIDTH = 400;
var HEIGHT = 150;
var is_click = true;

export class Dialog{
    constructor(){
        this.pos = new Point();
        this.target = new Point();
        this.prevPos = new Point();
        this.downPos = new Point();
        this.speedPos = new Point();
        this.startPos = new Point();
        this.mousePos = new Point();
        this.centerPos = new Point();
        this.origin = new Point();
        this.rotation = 0;
        this.sideValue = 0;
        this.isDown = false;
    }

    resize(stageWidth, stageHeight){
        console.log("resize");
        console.log(stageWidth);
        console.log(stageHeight);
        this.pos.x = (1300 /2 - WIDTH);
        this.pos.y = (1000/2 - HEIGHT);
        this.target = this.pos.clone();
        this.prevPos = this.pos.clone();
    }
    
    animate(ctx){   
        if (is_click == false){
            const move = this.target.clone().subtract(this.pos).reduce(FOLLOW_SPEED);
            this.pos.add(move);
                                    
            this.centerPos = this.pos.clone().add(this.mousePos);
        
            this.swingDrag(ctx);
            this.prevPos = this.pos.clone();
        }

        ctx.beginPath();
        ctx.fillStyle = '#f4e55a';
        ctx.fillRect(this.pos.x, this.pos.y, WIDTH, HEIGHT);

    }

    swingDrag(ctx){
        const dx = this.pos.x - this.prevPos.x;
        const speedX = Math.abs(dx) - FPS;
        const speed = Math.min(Math.max(speedX, 0), 1);

        let rotation = (MAX_ANGLE / 1) * speed;
        rotation = rotation * (dx > 0 ? 1 : -1) - this.sideValue;

        this.rotation += (rotation - this.rotation) * ROTATE_SPEED;

        const tmpPos = this.pos.clone().add(this.origin);
        ctx.save();
        ctx.translate(tmpPos.x, tmpPos.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.beginPath();
        ctx.fillStyle = '#f4e55a';
        ctx.fillRect(-this.origin.x, -this.origin.y, WIDTH, HEIGHT);
        ctx.restore();
    }


    down(point){
        is_click = true;
        console.log("maybe center", this.pos.x + WIDTH /2);
        console.log("maybe center y", this.pos.y + HEIGHT/2);
        console.log("down");
        if (point.collide(this.pos, WIDTH, HEIGHT)){
            console.log("collide");
            this.isDown = true;
            this.startPos = this.pos.clone();
            this.downPos = point.clone();
            console.log("down", this.downPos);
            this.mousePos = point.clone().subtract(this.pos);

            const xRatioValue =  this.mousePos.x / WIDTH;
            this.origin.x = WIDTH * xRatioValue;
            this.origin.y = HEIGHT * this.mousePos.y / HEIGHT;

            this.sideValue = xRatioValue - 0.5;
            return this;
        }else{
            return null;
        }
    }

    move(point){
        console.log("move");
        if (this.isDown) {
            is_click = false;
            this.target = this.startPos.clone().add(point).subtract(this.downPos);
        }
    }

    up(){
        console.log("up");
        console.log(is_click);
        this.isDown = false;
        console.log("before", this.pos);
        if (is_click == true){
            if (WIDTH != 600 && HEIGHT !== 600){
                WIDTH = 600;
                HEIGHT = 600;
                this.pos.x = this.pos.x - (WIDTH / 2) + 200;
                this.pos.y = this.pos.y - (HEIGHT / 2) + 75;
                console.log("after", this.pos);
            }
            else{
                WIDTH = 400;
                HEIGHT = 150;
                this.pos.x = this.pos.x - (WIDTH / 2) + 300;
                this.pos.y = this.pos.y - (HEIGHT / 2) + 300
            }
        }
    }
}