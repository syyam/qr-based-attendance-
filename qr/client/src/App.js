import React, { Component } from 'react';
import logo from './logo.svg';
import QRCode from "qrcode-react";
import './App.css';
import axios from "axios";

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      counter: 0,
      title:"Computer Graphics"
    }
  }
  componentDidMount() {

 }
 updateCount(){
   axios.post("/count",{"title":this.state.title}).then((response)=>{
     console.log(response.data.count);
     this.setState({counter:response.data.count});
   });
 }
  submit = () =>{
    axios.post("/create",{"title":this.state.title}).then((response)=>{
      console.log("created");
    });

  }
  render() {
  // {setInterval(() =>this.updateCount(), 10000)}
    console.log(this.state.title);
    return (
      <div className="App">
        <QRCode value={this.state.title}/>
        <h1>Counter:{this.state.counter}</h1>
        <div>
        <input value={this.state.title} onChange={(e)=> this.setState({title:e.target.value})} />
        <button onClick={this.submit}>Submit</button>
        </div>
      </div>
    );
  }
}

export default App;
