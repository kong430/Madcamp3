import React from "react";
import '../App.css';
import '../index.css';
import Wavemaker from "./Wave";

import { storageService } from "fbase";
import { firebaseInstance } from "fbase";
import firebase, { auth, firestore } from "firebase";
import App from "./App";
import { authService, dbService } from "fbase";

var tmp_props;

function Square(props) {
    if (props.animecontrol!= null) tmp_props = props;
    let colorlist = ["#e8e874", "#83e874", "#74e8cf", 
    "#74cfe8", "#74b4e8", "#748be8", "#7a74e8"]
    const emoscore = props.emodata.score
    let color=""
    let anime
    if(emoscore==null){
        color = "rgba(180,180,180,0.3)";
        anime = tmp_props.animecontrol[0];
    }
    else if(emoscore<-1){
        color = colorlist[6];
        anime = tmp_props.animecontrol[1];
    } else if(emoscore<-0.7){
        color = colorlist[5];
        anime = tmp_props.animecontrol[1];
    } else if(emoscore<-0.4){
        color = colorlist[4];
        anime = tmp_props.animecontrol[1];
    } else if(emoscore<-0.0){
        color = colorlist[3];
        anime = tmp_props.animecontrol[1];
    } else if(emoscore<0.3){
        color = colorlist[2];
        anime = tmp_props.animecontrol[2];
    } else if(emoscore<0.7){
        color = colorlist[1];
        anime = tmp_props.animecontrol[2];
    } else {
        color = colorlist[0];
        anime = tmp_props.animecontrol[2];
    }
    const opacity = tmp_props.condition=='this'?1:0.2;

    return (
      <button onClick = {anime} className="square" style={{width:'8vw',height:'10vh', margin:'2px', textAlign:'top', backgroundColor:color, opacity:opacity}}>
          <div style={{width:'6.5vw',height:'8vh', textAlign:'right', fontFamily:"titlehandwrites", fontWeight:"bold"}}>
            {props.value}
          </div>
      </button>
    );
}
  
class Calendar extends React.Component{
        renderSquare(i) {
        return (
            <Square value={this.props.datelist[i]} condition={this.props.conditionlist[i]} emodata={this.props.emodatalist[i]} animecontrol={this.props.animecontrol}/>      
        );
    }

    render() { 
        return (
            <div>
                <div style={{marginTop:'20px'}}>
                {[0, 1, 2, 3, 4, 5].map((i) => {
                    return <div>{[0,1,2,3,4,5,6].map((j) => {
                        return this.renderSquare(i*7+j);
                    })}</div>;
                })}
                </div>    
            </div>
        );
    }
}

export default class Calendardraw extends React.Component{
    constructor(props) {
        super(props);
        const date = new Date();
        const viewYear = date.getFullYear();
        const viewMonth = date.getMonth();
        this.state = {
          datelist : Array(42).fill(null),
          conditionlist : Array(42).fill(null),
          emodatalist : Array(42).fill(null), //원래는 props에서 받아와야한다.
          month : viewMonth,
          year : viewYear,
        }
        this.prevpress=this.prevpress.bind(this)
        this.nextpress=this.nextpress.bind(this)
        this.textcolor = '#000000'
        this.docRef = dbService.collection("Users").doc(props.userObj.uid);
        this.setDate()
        
    };
    componentDidMount(){
        this.docRef.get().then((doc) => {
            if (doc.exists) {
                this.userData = (doc.data());
                this.setDate()
                this.setState({month:this.state.month})
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });        
    }

    settextcolor(color){
        this.textcolor = color
    }

    prevpress(){
        if(this.state.month!==0){
            this.setState({month:this.state.month-1})
        }
        else{
            this.setState({month:11, year:this.state.year-1})
        }
    }

    nextpress(){
        if(this.state.month!==11){
            this.setState({month:this.state.month+1})
        }
        else{
            this.setState({month:0, year:this.state.year+1})
        }
    }

    setDate() {
        const viewYear = this.state.year
        const viewMonth = this.state.month
        // 지난 달 마지막 Date, 이번 달 마지막 Date
        const prevLast = new Date(viewYear, viewMonth, 0);
        const thisLast = new Date(viewYear, viewMonth + 1, 0);
    
        const PLDate = prevLast.getDate();
        const PLDay = prevLast.getDay();
    
        const TLDate = thisLast.getDate();
        const TLDay = thisLast.getDay();
    
        // Dates 기본 배열들
        const prevDates = [];
        const thisDates = [...Array(TLDate + 1).keys()].slice(1);
        const nextDates = [];
    
        // prevDates 계산
        if (PLDay !== 6) {
            for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
            }
        }
    
        // nextDates 계산
        for (let i = 1; i < 14 - TLDay; i++) {
            nextDates.push(i)
        }
    
        // Dates 합치기
        const dates = prevDates.concat(thisDates, nextDates);
    
        // Dates 정리
        const firstDateIndex = dates.indexOf(1);
        const lastDateIndex = dates.lastIndexOf(TLDate);
        dates.forEach((date, i) => {
            //console.log("DATEEEEEEEEEEEEEEE", date);
            const condition = i >= firstDateIndex && i < lastDateIndex + 1
                            ? 'this'
                            : 'other';
            this.state.datelist[i]=date
            //console.log("datatlist" + typeof(date));
            this.state.conditionlist[i]=condition
            
            //임의로 값 넣는부분
            const score = 1-Math.random()*2
            this.state.emodatalist[i]={text:null,score:null, magnitude:null}

            if (this.userData != null && this.userData){
                var data = this.userData;        
                var idx = data.emodataList.findIndex
                (d=>d.year === this.state.year && d.month === (this.state.month+1) && d.date === date)
                if (idx != -1 && this.state.conditionlist[i] == 'this') {
                    this.state.emodatalist[i].score = this.userData.emodataList[idx].score;
                    this.state.emodatalist[i].text = this.userData.emodataList[idx].text;
                }
              }
            }
        )
    }
    render () {
        this.setDate();
        return (
            <div className = "calendar">
                <div style={{marginTop:'30px'}}>
                    <button onClick={this.prevpress} style={{color:`${this.textcolor}`, width:'80px', height:'30px', marginRight:'30px', background:'rgba(255,255,255,0)', borderRadius:'10px',
                border:'0px', cursor: "pointer", fontSize:"15pt", fontFamily:"titlehandwrites", fontWeight:"bold"}}>
                        지난달
                    </button>
                    <span style = {{color:`${this.textcolor}`, fontFamily:"titlehandwrites", fontSize:"20pt"}}>
                        {this.state.year}년 {this.state.month+1}월
                    </span>                
                    <button onClick={this.nextpress} style={{color:`${this.textcolor}`, width:'80px', height:'30px', marginLeft:'30px', background:'rgba(255,255,255,0)', borderRadius:'10px',
                border:'0px', cursor: "pointer", fontSize:"15pt", fontFamily:"titlehandwrites", fontWeight:"bold"}}>
                        다음달
                    </button>
                </div>
                <Calendar datelist={this.state.datelist} conditionlist={this.state.conditionlist} emodatalist={this.state.emodatalist} animecontrol={this.props.animecontrol}/>
            </div>
        )
    }
}