import React, { Component } from 'react';

import './App.css';


import Button from "./components/Button"
import PhotonSlider from "./components/Slider"
// class Button extends React.Component {

//   render() {
//     const { 
//       variant,
//       content,
//       ...others
//     } = this.props;
    
//     return (
//       <button className={variant} {...others}>
//         {content}
//       </button>
//     )
//   }
// }


const sendCommand = () => {
    console.log("pressed")
     fetch("https://api.particle.io/v1/devices/2d0028000b47353235303037/dccCommand", {
          body: "arg=headlight,on&access_token=7272794e183736c5a14dce7ebd8ace2fb6fe5e56",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST"
        }).then((myJson) => {
    console.log("Success")
    console.log(myJson);
  }).catch(error => console.error(error))

}
class App extends Component {
  render() {
    
    return <div>
      <Button content="Send it!" onClick={sendCommand} variant="green" />
        <Button content="Reverse It" onClick={sendCommand} variant="red" />
          <PhotonSlider />
        </div>
  }    

}

export default App;
