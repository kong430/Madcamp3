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
        this.Canvasinform = createRef();
        this.state = {
            whatanime : null
        }
        this.Wavecanvasonclick = this.Wavecanvasonclick.bind(this);
        this.Initcanvasonclick = this.Initcanvasonclick.bind(this);
        this.Happyanimeonclick = this.Happyanimeonclick.bind(this);
    }

    Initcanvasonclick(){

    }

    Wavecanvasonclick(){
        this.Wave.current.stopanime();
        this.setState({whatanime:'wave'});
    }

    Happyanimeonclick(){

    }
    render(){
        console.log(this.state);
        if(this.whatanime == null){
            return <Calendardraw animecontrol={this.Initcanvasonclick} ref = {this.Canvasinform}/>
        }
        else if(this.whatanime == 'wave'){
            return(
                <div>
                    <Wavemaker ref = {this.Wave} canvasref = {this.Wavecanvas}/>
                    <Calendardraw animecontrol={this.Wavecanvasonclick} ref = {this.Canvasinform}/>
                </div>
            )            
        }
        else if(this.whatanime == 'happy'){
            return (
                <div>
                    <Happyanime canvasref = {this.Happycanvas}/>
                    <Calendardraw animecontrol={this.Happyanimeonclick} ref = {this.Canvasinform}/>
                </div> 
            )                       
        }
    } 
}