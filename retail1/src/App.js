import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'
import {BrowserRouter , Route} from "react-router-dom"
import { Redirect } from 'react-router'
import UserIp from './userIp'


		
		
class App extends Component {
	
		state={
		userName:"",
		passWord:"",
		req:{},
		redirectFlag: "false"
		} 
		
handleChange(e)
	{
		console.log(e.target,"target val")
	    if (e.target.name === "userName") {
		this.state.userName = e.target.value
		this.setState({userName: this.state.userName})
		}
		if (e.target.name === "passWord") {
		this.state.passWord = e.target.value
		this.setState({passWord: this.state.passWord})
		}
		
	}
	
handleSubmit(e)
	{
		console.log(this.state,"Crrent State")
		 var ep = "/validateUser"
		 this.state.req.userName = this.state.userName
		 this.state.req.passWord = this.state.passWord
		 
		 axios.post( ep ,  this.state.req).then(res => {
			 console.log("response received");
			 console.log(res.data.status);
             this.setState({resp: JSON.stringify(res.data)})
			 
			 console.log(this.state.resp);
			 if(res.data.status = 'success') {
				this.state.redirectFlag = "true"
				this.setState({redirectFlag: this.state.redirectFlag})
			     }
				 
        
      })
	}
  

  render() {
	 if(this.state.redirectFlag == "false")
		 
		 {
			 		  return (
							<div className="App" align="left">
								<div className="App-header"> 
									<h1>Grocery Shopping Suggestions</h1>
								</div>
							<hr/>
							<div> 
								<label for="userName">Enter User Name: </label>
								<input  onChange={(e)=> this.handleChange (e)} value={this.state.userName} name="userName" />
							</div>
							<hr/>
							<div> 
								<label for="passWord">Enter Password: </label>
								<input  onChange={(e)=> this.handleChange (e)} value={this.state.passWord} name="passWord" />
							</div>
							<hr/>
							<button className="buttonSubmit" onClick={(e)=> this.handleSubmit(e)}>Submit</button>
							<hr/>
							</div>
							)
			 
		 }
	  else
			{
					return (
					
							<div>
							  <UserIp />
							</div>
					
					
							)
	  
	  
			}
	  
	  
  
	  
  
  } 
}

export default App;
