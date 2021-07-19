import React, { createRef } from "react";

export default class Happyanime extends React.Component{
    constructor(props){
        super(props)
        this.canvasRef = props.canvasref
        this.canvas = null;
        this.ctx = null;
        this.sun = new Sun(20);
        this.hills = [
            new hill('#007a47',0.8,10,0.6),
            new hill('#2c9139',0.8,8,0.7),
            new hill('#98db60',0.8,6,0.8)
        ]
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

        for(let i=0;i<this.hills.length;i++){
            this.hills[i].resize(this.stageWidth, this.stageHeight);
        }

        this.sun.resize(this.stageWidth,this.stageHeight);
    }

    animate(t){
        requestAnimationFrame(this.animate.bind(this));
        this.ctx.clearRect(0,0, this.stageWidth, this.stageHeight);
        for(let i=0;i<this.hills.length;i++){
            this.hills[i].draw(this.ctx);
        }
        this.sun.draw(this.ctx,1);
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

class Sun {
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
        ctx.fillStyle = '#ff9900'
        ctx.shadowColor = '#ff0000'
        ctx.shadowBlur = 100;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y)
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
        const widthdiv = 2;
        let dots = [];
        this.start += Math.PI/300;
        for(let i=0;i<this.number;i++){
            const randwid = this.number+(Math.random()*2-4)
            dots.push({
                x11:this.x+this.radius*1.1*Math.cos(this.theta*i+this.start-Math.PI/widthdiv/randwid),
                y11:this.y+this.radius*1.1*Math.sin(this.theta*i+this.start-Math.PI/widthdiv/randwid),
                x12:this.x+this.radius*1.1*Math.cos(this.theta*i+this.start+Math.PI/widthdiv/randwid),
                y12:this.y+this.radius*1.1*Math.sin(this.theta*i+this.start+Math.PI/widthdiv/randwid),
                x21:this.x+this.radius*1.6*Math.cos(this.theta*i+this.start-Math.PI/widthdiv/randwid),
                y21:this.y+this.radius*1.6*Math.sin(this.theta*i+this.start-Math.PI/widthdiv/randwid),
                x22:this.x+this.radius*1.6*Math.cos(this.theta*i+this.start+Math.PI/widthdiv/randwid),
                y22:this.y+this.radius*1.6*Math.sin(this.theta*i+this.start+Math.PI/widthdiv/randwid),
            })
        }
        for(let i=0;i<dots.length;i++){
            ctx.beginPath();
            ctx.globalAlpha=0.2;
            ctx.fillStyle='#ff5500'
            ctx.moveTo(dots[i].x11, dots[i].y11)
            const topmidx = (dots[i].x21+dots[i].x22)/2
            const topmidy = (dots[i].y21+dots[i].y22)/2
            const bottommidx = (dots[i].x11+dots[i].x12)/2
            const bottommidy = (dots[i].y11+dots[i].y12)/2
            ctx.quadraticCurveTo((bottommidx*30+topmidx)/31, (bottommidy*30+topmidy)/31, dots[i].x12, dots[i].y12);
            ctx.lineTo(dots[i].x22, dots[i].y22)
            ctx.quadraticCurveTo((-bottommidx+topmidx*20)/19, (-bottommidy+topmidy*20)/19, dots[i].x21, dots[i].y21); 
            ctx.lineTo(dots[i].x11, dots[i].y11) 
            ctx.fill();  
            ctx.closePath();
        }
        ctx.shadowBlur = 0;
        ctx.globalAlpha=1;
    }
}

