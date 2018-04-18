import React, { Component } from 'react';

import './App.css';


import Button from "./components/Button"
import PhotonSlider from "./components/Slider"
// class Button extends React.Component {


let colors = {
    sending: "yellow",
    ready: "green",
    error: "red"
  };
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onPressed: "ready",
      offPresssed: "ready"
    };
    this.sendDcc("on");
    setTimeout ( (() => this.sendDcc("off")), 1000)
    
  }
  getColor(command){
    return colors[command] || "red"
  }
  sendDcc(command) {
    return this.sendWithArgs("dcc", command)
  }
  sendWithArgs(type, command) {
    console.log("pressed", command);
    fetch(`https://api.particle.io/v1/devices/2d0028000b47353235303037/${type}Command`, {
            body: `arg=headlight,${command}&access_token=7272794e183736c5a14dce7ebd8ace2fb6fe5e56`,
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
    
    return <div>
      <Button content="New Way" onClick={() => {
      this.setState({onPressed:"sending"});this.sendDcc("on")}
      } 
      variant={this.getColor(this.state.onPressed)} />
<Button content="New Off" onClick={() => {
      this.setState({onPressed:"sending"});this.sendDcc("off")}
      } 
      variant={this.getColor(this.state.onPressed)} />

          <PhotonSlider />
        </div>
  }    

}

export default App;
