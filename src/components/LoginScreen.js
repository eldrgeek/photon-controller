import React from 'react';

import ClickButton from "./ClickButton"

class LoginScreen extends React.Component{
  constructor(props){
    super(props)
    
    this.state= {
      loginError: false
    }
  }
  
  handleLogin(){
   var username = document.getElementById("username").value
   var password = document.getElementById("password").value
   var app = this.props.app
   var me = this
   var loginURL = `api.particle.io/v1/devices/`
   
   this.setState({loginError: false})
    
   fetch("https://api.particle.io/oauth/token", {
        body: `grant_type=password&username=${username}com&password=${password}`,
        headers: {
         Authorization: "Basic cGFydGljbGU6cGFydGljbGU=",
         "Content-Type": "application/x-www-form-urlencoded"
       },
      method: "POST"
    }).then(
    function(data){
      console.log('logged in data=', data);
      app.setState({loggedIn: true})
      app.setState({access: data.body.access_token})
    },
    function(err) {
      console.log('login error err=', err);
      app.setState({loggedIn: false})
      app.setState({access: ""})
      me.setState({loginError: true})
    }
  );
  }
  
  render () {
  	console.log("loginScreen::render()")
    
  	return <div>
    	User:<input id="username" type="text" name="username"></input><br/>
      Password:<input id="password" type="password" name="password"></input>
      <ClickButton class="loginBtn" fn={this.handleLogin.bind(this)}/>
      
     {this.state.loginError ?  <p>Login Error</p> : <p/>}
  	</div>
  }
  
}

export default LoginScreen 