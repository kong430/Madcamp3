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
        for(let i=0;i<30;i++){
            const val = createRef();
            this.slideritemRefArray.push(val)
        }
        this.pressed = false;
        this.startX=0;
        this.x=0;
        this.isdrag=false;
        this.state={clickedindex : 0, numofitem : 0}
        this.datelist = [];
        this.textlist = [];
        const date = new Date();
        this.viewYear = date.getFullYear();
        this.viewMonth = date.getMonth();
        this.scorelist = [];
        this.docRef = dbService.collection("Users").doc(props.userObj.uid);
    }
    
    componentDidMount(){
        this.docRef.get().then((doc) => {
            if (doc.exists) {
                this.userData = (doc.data());
                this.setsliders();
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        this.sliderRef.current.addEventListener("mousedown", (e)=>
        {
            this.pressed = true;
            this.startX = e.offsetX - this.innerSliderRef.current.offsetLeft;
        })

        window.addEventListener("resize", ()=>{
            for(let i=0;i<this.state.numofitem;i++){
                const getleftgap = this.slideritemRefArray[i].current.getBoundingClientRect().left-this.sliderRef.current.getBoundingClientRect().left;
                const getrightgap = this.sliderRef.current.getBoundingClientRect().right-this.slideritemRefArray[i].current.getBoundingClientRect().right;

                if(getleftgap<=-15){
                    this.slideritemRefArray[i].current.style.marginTop = `${(100-getleftgap)/2}px`
                    this.slideritemRefArray[i].current.style.opacity = `${(getleftgap)/100/2+0.5}`
                }
                else if(getrightgap<=200){
                    this.slideritemRefArray[i].current.style.marginTop = `${(200-getrightgap)/2}px`
                    this.slideritemRefArray[i].current.style.opacity = `${(getrightgap)/200/2+0.5}`
                }
                else{
                    this.slideritemRefArray[i].current.style.marginTop = '0px'
                    this.slideritemRefArray[i].current.style.opacity = '1'
                }
            }
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
            for(let i=0;i<this.state.numofitem;i++){
                const getleftgap = this.slideritemRefArray[i].current.getBoundingClientRect().left-this.sliderRef.current.getBoundingClientRect().left;
                const getrightgap = this.sliderRef.current.getBoundingClientRect().right-this.slideritemRefArray[i].current.getBoundingClientRect().right;

                if(getleftgap<=-15){
                    this.slideritemRefArray[i].current.style.marginTop = `${(100-getleftgap)/2}px`
                    this.slideritemRefArray[i].current.style.opacity = `${(getleftgap)/100/2+0.5}`
                }
                else if(getrightgap<=200){
                    this.slideritemRefArray[i].current.style.marginTop = `${(200-getrightgap)/2}px`
                    this.slideritemRefArray[i].current.style.opacity = `${(getrightgap)/200/2+0.5}`
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
                if(this.state.clickedindex<this.state.numofitem){
                    this.isshowed=true;
                    this.clickedpageRef.current.style.marginTop='10vh'
                    const emoscore = this.scorelist[this.state.clickedindex];
                    let color=""
                    let colorlist = ["#e8e874", "#83e874", "#74e8cf", 
                    "#74cfe8", "#74b4e8", "#748be8", "#7a74e8"];
                    if(emoscore<-1){
                        color = colorlist[6];
                    } else if(emoscore<-0.7){
                        color = colorlist[5];
                    } else if(emoscore<-0.4){
                        color = colorlist[4];
                    } else if(emoscore<-0.0){
                        color = colorlist[3];
                    } else if(emoscore<0.3){
                        color = colorlist[2];
                    } else if(emoscore<0.7){
                        color = colorlist[1];
                    } else {
                        color = colorlist[0];
                    }
                    this.clickedpageRef.current.style.background = color
                }
            }
            this.isdrag=false;
        })

        this.clickedpageRef.current.addEventListener("click", ()=>
        {
            if(this.isshowed){
                this.isshowed=false;
                this.clickedpageRef.current.style.marginTop='150vh'
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

    setsliders(){
        let colorlist = ["#e8e874", "#83e874", "#74e8cf", 
        "#74cfe8", "#74b4e8", "#748be8", "#7a74e8"];
        let emodatalist = [];
        for(let i=1;i<=31;i++){
            let idx = this.userData.emodataList.findIndex
                (d=>d.year === this.viewYear && d.month === (this.viewMonth+1) && d.date === i);
            if(idx!=-1){
                emodatalist.push(this.userData.emodataList[idx]);
            }
        }
        
        emodatalist.sort((a,b)=>
        {
            return b.score-a.score;
        })
        this.setState({numofitem:emodatalist.length})
        
        for(let i=0;i<emodatalist.length;i++){
            const getleftgap = this.slideritemRefArray[i].current.getBoundingClientRect().left-this.sliderRef.current.getBoundingClientRect().left;
            const getrightgap = this.sliderRef.current.getBoundingClientRect().right-this.slideritemRefArray[i].current.getBoundingClientRect().right;
            this.datelist.push(emodatalist[i].date);
            this.textlist.push(emodatalist[i].text);
            this.scorelist.push(emodatalist[i].score);
            const emoscore = emodatalist[i].score
            let color=""
            if(emoscore<-1){
                color = colorlist[6];
            } else if(emoscore<-0.7){
                color = colorlist[5];
            } else if(emoscore<-0.4){
                color = colorlist[4];
            } else if(emoscore<-0.0){
                color = colorlist[3];
            } else if(emoscore<0.3){
                color = colorlist[2];
            } else if(emoscore<0.7){
                color = colorlist[1];
            } else {
                color = colorlist[0];
            }
            this.slideritemRefArray[i].current.style.background = color
            this.clickedpageRef.current.style.background = color
            if(getleftgap<=-15){
                this.slideritemRefArray[i].current.style.marginTop = `${(100-getleftgap)/2}px`
                this.slideritemRefArray[i].current.style.opacity = `${(getleftgap)/100/2+0.5}`
            }
            else if(getrightgap<=200){
                this.slideritemRefArray[i].current.style.marginTop = `${(200-getrightgap)/2}px`
                this.slideritemRefArray[i].current.style.opacity = `${(getrightgap)/200/2+0.5}`
            }
            else{
                this.slideritemRefArray[i].current.style.marginTop = '0px'
                this.slideritemRefArray[i].current.style.opacity = '1'
            }
        }
        this.setState({numofitem:emodatalist.length})
    }

    render() {
        const k = Array(this.state.numofitem).fill(1);
        return(
            <div>
                <div style={{marginTop:"15vh", textAlign:"center", fontFamily:"titlehandwrites", fontSize:"20pt", fontWeight:"bold"}}>
                    {this.viewYear}년 {this.viewMonth+1}월의 기록
                </div>
                <div className="slider" ref={this.sliderRef}>
                    <div className="slider-inner" ref={this.innerSliderRef}>
                            {k.map((j, index) => {
                                return <div className="slide" ref={this.slideritemRefArray[index]}><div style={{marginTop:'1vh', marginLeft:'1vw', marginRight:'1vw'}}>{this.datelist[index]}일</div></div>
                            })}            
                    </div>
                </div>
                <div className = "clickpage" ref = {this.clickedpageRef}>
                    <div style={{marginTop:'1vh' ,marginLeft:'1vw', marginRight:'1vw'}}>{this.textlist[this.state.clickedindex]}</div>
                </div>
            </div>            
        )
    }
}