import React, { createRef } from "react";
import { Component } from "react";
import Fireworks2 from "./Fireworks2";

export default class Nightanime extends React.Component{
    constructor(props){
        super(props)
        this.canvasRef = props.canvasref
        this.canvas = null;
        this.ctx = null;
        this.moon = new Moon(20);
        this.hills = [
            new hill('#001205',0.8,10,0.6),
            new hill('#133832',0.8,8,0.7),
            new hill('#192917',0.8,6,0.8)
            
        ]
        this.fireworks = new Fireworks2();
    }

    componentDidMount() {
        this.canvas = this.canvasRef.current
        this.ctx = this.canvasRef.current.getContext("2d")
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
        requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        this.stageWidth = window.innerWidth;
        this.stageHeight = window.innerHeight;

        this.canvas.width = this.stageWidth*2;
        this.canvas.height = this.stageHeight*2;
        this.ctx.scale(2,2);

        this.fireworks.resize(this.stageWidth, this.stageHeight);

        for(let i=0;i<this.hills.length;i++){
            this.hills[i].resize(this.stageWidth, this.stageHeight);
        }

        this.moon.resize(this.stageWidth,this.stageHeight);
    }

    animate(t){
        requestAnimationFrame(this.animate.bind(this));
        this.ctx.fillStyle='#000000'
        this.ctx.fillRect(0,0, this.stageWidth, this.stageHeight);
        this.fireworks.draw(this.ctx);
        for(let i=0;i<this.hills.length;i++){
            this.hills[i].draw(this.ctx);
        }
        this.moon.draw(this.ctx,1);
    }

    render () {
        return (
            <canvas ref={this.canvasRef} />
        )
    }
}

class hill {
    constructor(color, speed, total, max){
        this.color = color;
        this.speed = speed;
        this.total = total;
        this.max = max;
        this.goup = true;
    }

    resize(stageWidth, stageHeight){
        this.stageWidth = stageWidth
        this.stageHeight = stageHeight

        this.points = [];
        this.gap = Math.ceil(this.stageWidth/(this.total-2));

        for(let i = 0;i<this.total;i++){
            this.points[i]={
                x:i*this.gap,
                y:this.initgetY()
            }
        }
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.beginPath();

        let cur = this.points[0];
        let prev = cur;

        let dots = [];

        cur.x+=this.speed;
        if(this.goup) cur.y-=this.speed*10;
        if(cur.x>-this.gap){
            this.points.unshift({
                x:-(this.gap*2),
                y:this.getY()
            })
        } else if (cur.x>this.stageWidth+this.gap){
            this.points.splice(-1);        
        }
        ctx.moveTo(cur.x, cur.y);
        
        let prevCx = cur.x;
        let prevCy =  cur.y;
        
        for(let i=1;i<this.points.length;i++){
            cur = this.points[i];
            cur.x+=this.speed;
            if(this.goup) cur.y-=this.speed*10;
            if(cur.y<this.stageHeight*(this.max)) this.goup=false;
            const cx = (prev.x + cur.x)/2;
            const cy = (prev.y + cur.y)/2;
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

            dots.push({
                x1:prevCx,
                y1:prevCy,
                x2:prev.x,
                y2:prev.y,
                x3:cx,
                y3:cy
            });

            prev = cur;
            prevCx = cx;
            prevCy = cy;
        }

        ctx.lineTo(prev.x,prev.y);
        ctx.lineTo(this.stageWidth,this.stageHeight);
        ctx.lineTo(0,this.stageHeight)
        ctx.lineTo(this.points[0].x, this.points[0].y);
        ctx.fill();
    }

    initgetY(){
        const min = this.stageHeight*(this.max);
        const max = this.stageHeight-min;
        
        return (min + Math.random()*max)+150;
    }
    getY(){
        const min = this.stageHeight*(this.max);
        const max = this.stageHeight-min;
        return (min + Math.random()*max);
    }
}

class Moon {
    constructor(number){
        this.radius = 100;
        this.number = number;
    }

    resize(stageWidth, stageHeight){
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.x = Math.floor(this.stageWidth-this.radius/4);
        this.y = Math.floor(this.radius/4);
        this.theta = Math.PI*2/this.number;
        this.start = Math.PI/2
    }

    draw(ctx, t){
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = '#e4eb26'
        ctx.shadowColor = '#f6ff00'
        ctx.shadowBlur = 100;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y)
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.shadowBlur = 0;
        ctx.globalAlpha=1;
    }
}