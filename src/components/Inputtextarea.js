import React from 'react';
class Inputtextfield extends React.Component{
    constructor(props){
        super(props);
        this.state = {value : ''};
 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleSubmit(e){
        console.log('value - ' + this.state.value);
        e.preventDefault();
        let text;
        let score;
        let magnitude;
        fetch('http://172.10.18.54:80/api',{
            method: "POST",
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify({
              text: this.state.value,
            })
          }).then(res=>res.json()).then(res=>{
              text = res.text;
              score = res.score;
              magnitude = res.magnitude;
              console.log(text,score,magnitude);
          });
        
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