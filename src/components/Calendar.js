import React from "react";
import '../App.css'

function Square(props) {
    let colorlist = ["#74E887", "#74E89F", "#74E8CF", 
    "#74CFE8", "#74B4E8", "#748BE8", "#7A74E8"]
    const emoscore = props.emodata.score
    let color = ""
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
    return (
      <button className="square" style={{width:'100px',height:'80px', margin:'1px', textAlign:'top', backgroundColor:color}}>
          <div style={{width:'83px',height:'65px', textAlign:'right'}}>
            {props.value}
            <div>
                {props.emodata.text}
            </div>
          </div>
      </button>
    );
}
class Calendar extends React.Component {
    renderSquare(i) {
        console.log(this.props.emodatalist[i].score)
        return (
            <Square value={this.props.datelist[i]} color={this.props.colorlist[i]} emodata={this.props.emodatalist[i]}/>      
        );
    }
    render() {  
        return (
            <div>
                <div className="calendar" style={{marginTop:'20px'}}>
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
          colorlist : Array(42).fill(null),
          emodatalist : Array(42).fill(null), //원래는 props에서 받아와야한다.
          month : viewMonth,
          year : viewYear,
        }
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
            condition == 'this' ? this.state.colorlist[i]='#34EB98' : this.state.colorlist[i]='#34EB98'
            const score = 1-Math.random()*2
            this.state.emodatalist[i]={text:'hello',score:score, magnitude:1}
            }
        )
    }
    render () {
        this.setDate()
        return (
            <div>
                <div style={{marginTop:'30px'}}>
                    <button onClick={this.prevpress}>
                        Prev
                    </button>
                    {this.state.year}년 {this.state.month+1}월
                    <button onClick={this.nextpress}>
                        Next
                    </button>
                </div>
                <Calendar datelist={this.state.datelist} colorlist={this.state.colorlist} emodatalist={this.state.emodatalist}/>
            </div>
        )
    }
}