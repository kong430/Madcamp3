import React, { createRef } from "react";
import '../index.css';
import Calendardraw from "./Calendar";

export default class Wavemaker extends React.Component{
    constructor(props){
        super(props)
        this.canvasRef = props.canvasref;
        this.canvas = null;
        this.ctx = null;
        this.wavegroup = new Wavegroup();
        this.state = {
            anime : false
        };
        this.stopanime=this.stopanime.bind(this)
    }

    componentDidMount() {
        this.canvas = this.canvasRef.current
        this.ctx = this.canvasRef.current.getContext("2d")
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();
        requestAnimationFrame(this.animate.bind(this));
    }

    stopanime(){
        if(this.state.anime==true){
            this.state.anime=false
        }
        else{
            this.state.anime=true
        }
    }

    resize(){
        this.stageWidth = window.innerWidth;
        this.stageHeight = window.innerHeight;

        this.canvas.width = this.stageWidth*2;
        this.canvas.height = this.stageHeight*2;
        this.ctx.scale(2,2);
        this.wavegroup.resize(this.stageWidth,this.stageHeight);
    }

    animate(t){
        this.ctx.clearRect(0,0, this.stageWidth, this.stageHeight);
        this.wavegroup.draw(this.ctx, this.state.anime);
        requestAnimationFrame(this.animate.bind(this));
    }

    render () {
        return (
            <div>
                <canvas ref={this.canvasRef}/>                
            </div>            
        )
    }
}

class Point{
    constructor(index,x,y){
        this.x=x;
        this.y=y;
        this.fixedY = y;
        this.speed = 0.1;
        this.cur = index;
        this.max = Math.random()*100;
    }

    update(){
        this.cur += this.speed;
        this.y = this.fixedY+(Math.sin(this.cur)*this.max);
    }
}

class Wave{
    constructor(index, totalPoints, color){
        this.index = index;
        this.totalPoints = totalPoints;
        this.color = color;
        this.points = [];
    }
    resize(stageWidth, stageHeight){
        this.stageWidth=stageWidth;
        this.stageHeight=stageHeight;

        this.centerX = stageWidth/2;
        this.centerY = stageHeight/2

        this.pointGap = this.stageWidth/(this.totalPoints-1);

        this.init();
    }

    init(){
        this.points = [];

        for(let i=0;i<this.totalPoints;i++){
            const point = new Point(
                this.index+i,
                this.pointGap*i,
                this.centerY*2 
            );
            this.points[i]=point;
        }

    }

    draw(ctx, isdraw){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        
        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX,prevY);
        for(let i=1;i<this.totalPoints;i++){
            if(i<this.totalPoints-1){
                this.points[i].update();
                if(isdraw){
                    this.points[0].y-= this.points[0].y<-66 ?  0 : 0.15;
                    this.points[this.totalPoints-1].y-= this.points[this.totalPoints-1].y<-66 ?  0 : 0.15;
                    this.points[i].fixedY-= this.points[i].fixedY<-66 ? 0 : 3;
                }
                else{
                    this.points[0].y+= this.points[0].y>this.stageHeight ?  0 : 0.15;
                    this.points[this.totalPoints-1].y+= this.points[this.totalPoints-1].y > this.stageHeight ?  0 : 0.15;
                    this.points[i].fixedY+= this.points[i].fixedY > this.stageHeight ? 0 : 3;
                }
                
            }

            const cx = (prevX+this.points[i].x)/2;
            const cy = (prevY+this.points[i].y)/2;

            ctx.quadraticCurveTo(prevX, prevY, cx,cy);

            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }
        ctx.lineTo(prevX,prevY);
        ctx.lineTo(this.stageWidth,this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight)
        ctx.fill();
        ctx.closePath();
    }
}

class Wavegroup{
    constructor(){
        this.totalWaves = 4;
        this.totalPoints = 20;
        this.color = ['rgba(15,100,166,0.1)', 'rgba(0,202,209,0.1)','rgba(16,16,112,0.1)','rgba(22,22,240,0.1',]

        this.waves = [];

        for(let i = 0; i<this.totalWaves; i++){
            const wave = new Wave(
                i,
                this.totalPoints,
                this.color[i]
            );
            this.waves[i]=wave;
        }
    }

    resize(stageWidth, stageHeight){
        for(let i= 0 ; i<this.totalWaves ; i++){
            const wave = this.waves[i];
            wave.resize(stageWidth, stageHeight);
        }
    }

    draw(ctx, isdraw){
        for(let i= 0 ; i<this.totalWaves ; i++){
            const wave = this.waves[i];
            wave.draw(ctx, isdraw);
        }        
    }
}