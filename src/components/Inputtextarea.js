import React from 'react';
import { dbService, authService, firebaseInstance } from 'fbase';
import { auth } from 'firebase';
class Inputtextfield extends React.Component{
    constructor(props){
        super(props);
        this.state = {value : ''};
 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    
    async handleSubmit(e){
        console.log('value - ' + this.state.value);
        e.preventDefault();
        let text;
        let score;
        let magnitude;
        await fetch('http://172.10.18.54:80/api',{
            method: "POST",
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify({
              text: this.state.value,
            })
          }).then(res=>res.json()).then(res=>{
              text = res.text;
              score = parseFloat(res.score);
              magnitude = parseFloat(res.magnitude);
              console.log(text,score,magnitude);
          });

        var docRef = dbService.collection("Users").doc(authService.currentUser.uid);
        var userData = null;

        await docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data().emodataList);
                userData = doc.data().emodataList;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let date = today.getDate();
        console.log(year, month + 1, date);
 
        userData.push({year: year, month: month, date: date, score:score, manitude:magnitude, text:text});
        console.log(userData);
        dbService.collection("Users").doc(authService.currentUser.uid).set({
            emodataList: userData
        }).then(() => {
            console.log("success");
        })
    }
 
    handleChange(e){
        this.setState({value: e.target.value});
        console.log(e.target.value)
    }
 
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea value={this.state.value} onChange={this.handleChange} className="textbox"/>
                <div className = "submitDiv">
                <button className = "submit">완      료</button>
                </div>
            </form>
        );
    };
};

export default Inputtextfield;