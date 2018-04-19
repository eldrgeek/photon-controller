import React, { Component } from 'react';

import './App.css';

import RadioButtons from "./components/RadioButtons"


import RadioButton from "./components/AnotherRadioButton"
import Button from "./components/Button"
import PhotonSlider from "./components/Slider"
// class Button extends React.Component {


let colors = {
    sending: "pending",
    ready: "success",
    error: "error",
  };

let buttons = [
      {label:"Forward",value:"fwd"},
      {label:"Reverse", value: "reverse"}
    ];

    
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onPressed: "ready",
      offPresssed: "ready",
      direction: "fwd"
  };
    
    this.sendDcc("headlight","on");
    setTimeout ( (() => this.sendDcc("headlight","off")), 1000)
    
  }
  getColor(command){
    return colors[command] || "red"
  }
  sendDcc(operation, command) {
    return this.sendWithArgs("dcc", operation, command)
  }
  sendWithArgs(type, operation, command) {
    console.log("pressed", command);
    fetch(`https://api.particle.io/v1/devices/2d0028000b47353235303037/${type}Command`, {
            body: `arg=${operation},${command}&access_token=7272794e183736c5a14dce7ebd8ace2fb6fe5e56`,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
          }).then((myJson) => {
      console.log("Success")
      console.log(myJson);
      window.myJson = myJson
      if(!myJson.ok) {throw new Error("not OK")}
      this.setState({[command + "Pressed"]:"ready"})
    }).catch(error => {console.error(error)
    this.setState({[command + "Pressed"]:"error"})
      })
  }
  render() {
    let handleChange = (value) => {
      console.log("Change value to " + value )
      this.setState({direction:value})
    }
    return <div>
              <Button content="New Way" onClick={() => {
                  this.setState({onPressed:"sending"});this.sendDcc("headlight", "on")}
                  } 
                  variant={this.getColor(this.state.onPressed)} />
              <Button content="New Off" onClick={() => {
                    this.setState({onPressed:"sending"});this.sendDcc("headlight", "off")}
                    } 
                    variant={this.getColor(this.state.onPressed)} />
              <Button content="FWD 20" onClick={() => {
                    this.setState({onPressed:"sending"});this.sendDcc("fwd128", "14")}
                    } 
                    variant={this.getColor(this.state.onPressed)} />
              <Button content="REV 20" onClick={() => {
                    this.setState({onPressed:"sending"});this.sendDcc("rev128", "14")}
                    } 
                    variant={this.getColor(this.state.onPressed)} />
              <Button content="FWD 0" onClick={() => {
                    this.setState({onPressed:"sending"});this.sendDcc("fwd128", "0")}
                    } 
                    variant={this.getColor(this.state.onPressed)} />
              <Button content="REV 0" onClick={() => {
                    this.setState({onPressed:"sending"});this.sendDcc("rev128", "0")}
                    } 
                    variant={this.getColor(this.state.onPressed)} />

              <RadioButtons
                  buttons={buttons}
                  selectedValue={this.state.direction}
                  onChange={handleChange}
              />

              <PhotonSlider max={126} onAfterChange={(val) => {
                    console.log("PhotonSlider::onAfterChange() value=",val)
                    if (this.state.direction==="fwd") {
                      this.sendDcc("fwd128", val.toString()) 
                    }else{   
                      this.sendDcc("rev128", val.toString()) 
                    }}} />
        </div>
  }    

}

export default App;
