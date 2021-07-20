import React, { createRef} from "react";
import { Component } from "react";
import Happyanime from "./Happyanime";
import Calendardraw from "./Calendar";
import Nightanime from "./Nightanime";
import Wavemaker from "./Wave";
import { storageService } from "fbase";
import { firebaseInstance } from "fbase";
import firebase, { auth, firestore } from "firebase";
import App from "./App";
import { authService, dbService } from "fbase";

export default class Canvasdrawer extends Component{
    constructor(props){
        super(props);
        this.canvas = createRef();
        this.Wave = createRef();
        this.Happy = createRef();
        this.Calendarinform = createRef();
        this.Wavecanvasonclick = this.Wavecanvasonclick.bind(this);
        this.Initcanvasonclick = this.Initcanvasonclick.bind(this);
        this.Happyanimeonclick = this.Happyanimeonclick.bind(this);
        this.firstchange = true;
        this.state = {whatanime:null}
        this.userObj = props.userObj
    }
    Initcanvasonclick = () => {
        if(this.state.whatanime!=null){
            this.setState({whatanime:null})
            this.Calendarinform.current.settextcolor('#000000');
        }
        else{

        }
    }

    Wavecanvasonclick = () => {
        if(this.state.whatanime!='wave'){
            this.setState({whatanime:'wave'})
            this.Calendarinform.current.settextcolor('#000000');
        }
        else{
            this.Wave.current.stopanime();
        }
    }

    Happyanimeonclick = () => {
        if(this.state.whatanime!='happy'){
            this.setState({whatanime:'happy'})
            this.Calendarinform.current.settextcolor('#000000');
        }
        else if(this.state.whatanime=='happy'){
            this.setState({whatanime:'nighthappy'})
            this.Calendarinform.current.settextcolor('#ffffff');
        }
    }

    onclicklist = [this.Initcanvasonclick, this.Wavecanvasonclick, this.Happyanimeonclick]

    render(){
        if(this.state.whatanime == null){
            return(
                <div>
                    <Blankcanvas/>
                    <Calendardraw userObj = {this.userObj} animecontrol={this.onclicklist} ref = {this.Calendarinform}/>   
                </div>            
            )     
        }
        else if(this.state.whatanime == 'wave'){
            return(
                <div>
                    <Wavemaker ref = {this.Wave} canvasref = {this.canvas}/>
                    <Calendardraw userObj = {this.userObj} animecontrol={this.onclicklist} ref = {this.Calendarinform}/>   
                </div>            
            )
        }
        else if(this.state.whatanime == 'happy'){
            return(
                <div>
                    <Happyanime canvasref = {this.canvas}/>
                    <Calendardraw userObj = {this.userObj} animecontrol={this.onclicklist} ref = {this.Calendarinform}/>   
                </div>            
            )            
        }
        else if(this.state.whatanime == 'nighthappy'){
            return(
                <div>
                    <Nightanime canvasref = {this.canvas}/>
                    <Calendardraw userObj = {this.userObj} animecontrol={this.onclicklist} ref = {this.Calendarinform}/>   
                </div>            
            )            
        }
    } 
}

class Blankcanvas extends Component{
    constructor(){
        super();
        this.canvasRef = createRef();
    }

    componentDidMount(){
        this.canvas = this.canvasRef.current
        this.ctx = this.canvasRef.current.getContext("2d")
    }

    render(){
        return(
            <canvas ref={this.canvasRef} />
        )
    }
}