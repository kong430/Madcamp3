import React, { createRef } from "react";
import { Component } from "react";
import Happyanime from "./Happyanime";
import Wavemaker from "./Wave";
import Calendardraw from "./Calendar";

export default class Canvasdrawer extends Component{
    constructor(){
        super();
        this.Wavecanvas = createRef();
        this.Wave = createRef();
        this.Happycanvas = createRef();
        this.Happy = createRef();
        this.Calendarinform = createRef();
        this.state = {
            whatanime : null
        }
        this.Wavecanvasonclick = this.Wavecanvasonclick.bind(this);
        this.Initcanvasonclick = this.Initcanvasonclick.bind(this);
        this.Happyanimeonclick = this.Happyanimeonclick.bind(this);
        this.firstchange = true;
    }

    Initcanvasonclick = () => {
        if(this.state.whatanime!=null){
            this.setState({whatanime:null})
        }
        else{

        }
    }

    Wavecanvasonclick = () => {
        if(this.state.whatanime!='wave'){
            this.setState({whatanime:'wave'})
        }
        else{
            this.Wave.current.stopanime();
        }
    }

    Happyanimeonclick = () => {
        if(this.state.whatanime!='happy'){
            this.setState({whatanime:'happy'})
        }
        else{
            
        }
    }

    onclicklist = [this.Initcanvasonclick, this.Wavecanvasonclick, this.Happyanimeonclick]

    render(){
        if(this.state.whatanime == null){
            return(
                <div>
                    <Calendardraw animecontrol={this.onclicklist} ref = {this.Calendarinform}/>
                </div> 
            )            
        }
        else if(this.state.whatanime == 'wave'){
            return(
                <div>
                    <Wavemaker ref = {this.Wave} canvasref = {this.Wavecanvas}/>
                    <Calendardraw animecontrol={this.onclicklist} ref = {this.Calendarinform}/>
                </div>
            )            
        }
        else if(this.state.whatanime == 'happy'){
            return (
                <div>
                    <Happyanime canvasref = {this.Happycanvas}/>
                    <Calendardraw animecontrol={this.onclicklist} ref = {this.Calendarinform}/>
                </div> 
            )                       
        }
    } 
}