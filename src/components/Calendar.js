import React from "react";
import '../App.css';
import '../index.css';
import { storageService } from "fbase";
import { firebaseInstance } from "fbase";
import firebase, { firestore } from "firebase";
import App from "./App";
import { dbService } from "fbase";

function Square(props) {
    let colorlist = ["#74e887", "#74e89f", "#74e8cf", 
    "#74cfe8", "#74b4e8", "#748be8", "#7a74e8"]
    const emoscore = props.emodata.score
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
    const opacity = props.condition=='this'?1:0.2;

    return (
      <button className="square" style={{width:'8vw',height:'10vh', margin:'2px', textAlign:'top', backgroundColor:color, opacity:opacity}}>
          <div style={{width:'6.5vw',height:'8vh', textAlign:'right'}}>
            {props.value}
          </div>
      </button>
    );
}
  
class Calendar extends React.Component {
    
    renderSquare(i) {
        return (
            <Square value={this.props.datelist[i]} condition={this.props.conditionlist[i]} emodata={this.props.emodatalist[i]}/>      
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
        console.log("CONSTRUCTOR!!!!!!!!!!!!!");
        console.log("CCCCCCC", this.props.userData);


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
        console.log(typeof(this.state));
        this.prevpress=this.prevpress.bind(this)
        this.nextpress=this.nextpress.bind(this)
    };

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
        console.log("SETDATE!!!!!!!!!!!!!");
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
            const condition = i >= firstDateIndex && i < lastDateIndex + 1
                            ? 'this'
                            : 'other';
            this.state.datelist[i]=date
            console.log("datatlist" + typeof(date));
            this.state.conditionlist[i]=condition
            
            //임의로 값 넣는부분
            const score = 1-Math.random()*2
            this.state.emodatalist[i]={text:'hello',score:score, magnitude:1}
            
            /**console.log(userData.emodataList.findIndex
            (d=>d.year === this.state.year && d.month === this.state.month && d.day === i));
            */
            }
        )
    }
    render () {
        this.setDate()
        return (
            <div className = "calendar">
                <div style={{marginTop:'30px'}}>
                    <button onClick={this.prevpress} style={{width:'60px', height:'30px', marginRight:'30px', background:'#FFD36E', borderRadius:'10px',
                border:'0px', cursor: "pointer"}}>
                        Prev
                    </button>
                    {this.state.year}년 {this.state.month+1}월
                    <button onClick={this.nextpress} style={{width:'60px', height:'30px', marginLeft:'30px', background:'#FFD36E', borderRadius:'10px',
                border:'0px', cursor: "pointer"}}>
                        Next
                    </button>
                </div>
                <Calendar datelist={this.state.datelist} conditionlist={this.state.conditionlist} emodatalist={this.state.emodatalist}/>
            </div>
        )
    }
}