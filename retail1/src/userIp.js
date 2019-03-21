import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'



class App extends Component {
	
	state={
		address:"",
		productName:"",
		quantity:0,
		products:[],
		req: {},
		resp:"no data",
		pricePref: 0,
		distancePref: 0
		}
		
	addProduct(e)
	{
		console.log(e.target,"target val")
		this.setState({products: [...this.state.products,{ productName: this.state.productName , quantity: this.state.quantity} ],productName: ""})
	}
	
	handleChange(e , index)
	{
		console.log(e.target,"target val")
	    if (e.target.name === "productId") {
		this.state.products[index].productName = e.target.value
		}
		if (e.target.name === "quantity") {
		this.state.products[index].quantity = e.target.value
		}
		this.setState({products: this.state.products})
	}
	
	handleOnChangeprice(e){
		console.log(e)
    this.setState({pricePref: e})
  }
  
  handleOnChangeDistance(e){
		console.log(e)
    this.setState({distancePref: e})
  }
	
	handleRemove(index)
	{
		this.state.products.splice(index,1)
		
		this.setState({products: this.state.products})
	}
	
	handleSubmit(e)
	{
		console.log(this.state,"Crrent State")
		 var ep = "/invoke"
		 this.state.req.address = this.state.address
		 this.state.req.pricePref = this.state.pricePref
		 this.state.req.distancePref = this.state.distancePref
		 this.state.req.productDetails = this.state.products
		 axios.post( ep ,  this.state.req).then(res => {
			 console.log("response received");
			 console.log(res.data);
             this.setState({resp: JSON.stringify(res.data)})
			 console.log(this.state.resp);
        
      })
	}
	
	handleAddressChange(e)
	{
		console.log(e.target,"target val")
		this.setState({address: e.target.value});
        
      
	}
	
  render() {
    return (
      <div className="App" align="left">
	  <div className="App-header"> 
       <h1>Grocery Shopping Suggestions</h1>
	   </div>
	   <hr/>
	   
	   <div align="left" className="address">
	   		<label for="address" >Enter Address: </label>
	   		<input  type="text" onChange={(e)=> this.handleAddressChange (e)} value={this.state.address} name="address" />
	   </div>

	   <hr/>
	   {
		   this.state.products.map((product,index)=>{
		   return (
		   
			   <div key={index} className="item" >

			   		<label for="productId">Enter Product: </label>
			   		<input onChange={(e)=> this.handleChange (e , index)} value={product.productName} name="productId" />
			   
			   		<label for="quantity">  Enter Quantity: </label>
			   		<input type="number" onChange={(e)=> this.handleChange (e , index)} value={product.quantity} name="quantity" />
			   
			 
			   		<button className="buttonRemove" onClick={()=> this.handleRemove(index)} >Remove</button>
			   
			   </div>
		   
			   
		   )})
		   
	   }
	   <hr/>
	   
	   <button className="buttonAdd" onClick={(e)=> this.addProduct(e)}>Add Products</button>
	   
	   <hr/>
	  
	   <div className="slider">
	   		<label for="Price">Enter Price Preference</label>
	   		<Slider name="Price" value={this.state.pricePref} orientation="horizontal" onChange={(e)=> this.handleOnChangeprice(e)} />
	   </div>
	   
	   <hr/>
	   
	   <div className="slider">
	   		<label for="Distance">Enter Distance Preference</label>
	   		<Slider name="Distance" value={this.state.distancePref} orientation="horizontal" onChange={(e)=> this.handleOnChangeDistance(e)} />
	   </div>
	   
	   <hr/>
	   
	   <button className="buttonSubmit" onClick={(e)=> this.handleSubmit(e)}>Submit</button>
	   <hr/>
	   
	   <form>
	      <textarea id="noter-text-area" name="Textarea" value={this.state.resp} />
	   </form>
	   
      </div>

      
    );
  }
}

export default App;

