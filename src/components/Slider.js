import React, { createRef } from "react";
import { Component } from "react";
import { authService, dbService } from "fbase";

export default class Slider extends Component{
    constructor(props){
        super();
        this.sliderRef = createRef();
        this.innerSliderRef = createRef();
        this.clickedpageRef = createRef();
        this.slideritemRefArray = [];
        this.numofitem = 30;
        for(let i=0;i<30;i++){
            const val = createRef();
            this.slideritemRefArray.push(val)
        }
        this.pressed = false;
        this.startX=0;
        this.x=0;
        this.isdrag=false;
        this.state={clickedindex : 0}
        this.docRef = dbService.collection("Users").doc(props.userObj.uid);

    }
    
    componentDidMount(){
        this.docRef.get().then((doc) => {
            if (doc.exists) {
                this.userData = (doc.data());
                console.log("SLIDER", this.userData);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });       

        for(let i=0;i<this.slideritemRefArray.length;i++){
            const getleftgap = this.slideritemRefArray[i].current.getBoundingClientRect().left-this.sliderRef.current.getBoundingClientRect().left;
            const getrightgap = this.sliderRef.current.getBoundingClientRect().right-this.slideritemRefArray[i].current.getBoundingClientRect().right;

            if(getleftgap<=100){
                this.slideritemRefArray[i].current.style.marginTop = `${(100-getleftgap)}px`
                this.slideritemRefArray[i].current.style.opacity = `${(getleftgap)/100/2+0.5}`
            }
            else if(getrightgap<=100){
                this.slideritemRefArray[i].current.style.marginTop = `${(100-getrightgap)}px`
                this.slideritemRefArray[i].current.style.opacity = `${(getrightgap)/100/2+0.5}`
            }
            else{
                this.slideritemRefArray[i].current.style.marginTop = '0px'
                this.slideritemRefArray[i].current.style.opacity = '1'
            }
        }
        this.sliderRef.current.addEventListener("mousedown", (e)=>
        {
            this.pressed = true;
            this.startX = e.offsetX - this.innerSliderRef.current.offsetLeft;
        })

        window.addEventListener("mouseup", ()=>
        {
            this.pressed = false;
        })

        this.sliderRef.current.addEventListener("mousemove",(e)=>
        {
            if (!this.pressed) return;
            e.preventDefault();        
            this.x = e.offsetX;        
            this.innerSliderRef.current.style.left = `${this.x - this.startX}px`;        
            this.checkBoundry();
            this.isdrag=true;
            for(let i=0;i<this.slideritemRefArray.length;i++){
                const getleftgap = this.slideritemRefArray[i].current.getBoundingClientRect().left-this.sliderRef.current.getBoundingClientRect().left;
                const getrightgap = this.sliderRef.current.getBoundingClientRect().right-this.slideritemRefArray[i].current.getBoundingClientRect().right;

                if(getleftgap<=100){
                    this.slideritemRefArray[i].current.style.marginTop = `${(100-getleftgap)}px`
                    this.slideritemRefArray[i].current.style.opacity = `${(getleftgap)/100/2+0.5}`
                }
                else if(getrightgap<=100){
                    this.slideritemRefArray[i].current.style.marginTop = `${(100-getrightgap)}px`
                    this.slideritemRefArray[i].current.style.opacity = `${(getrightgap)/100/2+0.5}`
                }
                else{
                    this.slideritemRefArray[i].current.style.marginTop = '0px'
                    this.slideritemRefArray[i].current.style.opacity = '1'
                }
            }
        })

        this.sliderRef.current.addEventListener("click",(e)=>
        {
            if(!this.isdrag){
                const gap = this.slideritemRefArray[1].current.getBoundingClientRect().left-this.slideritemRefArray[0].current.getBoundingClientRect().left;
                const clickedgap = e.offsetX-this.innerSliderRef.current.getBoundingClientRect().left;
                this.setState({clickedindex:(Math.floor(clickedgap/gap)+2)});
                this.isshowed=true;
                this.clickedpageRef.current.style.marginTop='30vh'
            }            
            this.isdrag=false;
        })

        this.clickedpageRef.current.addEventListener("click", ()=>
        {
            if(this.isshowed){
                this.isshowed=false;
                this.clickedpageRef.current.style.marginTop='100vh'
            }
        })
    }
    checkBoundry() {
        let outer = this.sliderRef.current.getBoundingClientRect(),
          inner = this.innerSliderRef.current.getBoundingClientRect();
    
        if (parseInt(this.innerSliderRef.current.style.left) > 0) {
            this.innerSliderRef.current.style.left= "0px";
        } else if (inner.right < outer.right) {
            this.innerSliderRef.current.style.left = `-${inner.width - outer.width}px`;
        }
    };

    render() {
        const k = Array(this.numofitem).fill(1);
        return(
            <div>
                <div className="slider" ref={this.sliderRef}>
                    <div className="slider-inner" ref={this.innerSliderRef}>
                            {k.map((j, index) => {
                                return <div className="slide" ref={this.slideritemRefArray[index]}>{index}</div>
                            })}            
                    </div>
                </div>
                <div className = "clickpage" ref = {this.clickedpageRef}>
                    {this.state.clickedindex}
                </div>
            </div>            
        )
    }
}