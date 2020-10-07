import React, {Component} from "react";
import MainNavBar from "../layouts/mainNavBar";
import Footer from "../layouts/footer";
import Axios from "axios";
import { Redirect } from "react-router-dom";

class SubscriptionPlanDetails extends Component {

    constructor() {
          super()
          this.state = {
        Type:'',
     
          }
    }

    componentDidMount(){
      this.setState({Type:this.props.location.state.Type}
        )
    }

    addSub=e=>{

      

      
        
  
        const data={
          
         
      "userID":localStorage.getItem("userId"),
      "subscriptionType":this.state.Type=="Buy"?"buy":"rent",
      "subscriptionAmount":this.state.Type=="Buy"?1500:700,   
      "usedPoints":0,
      "totalpoints":this.state.Type=="Buy"?1500:700
       
           
       }
      
       var config = {
           method: 'post',
           url: 'https://cuboidtechnologies.com/api/subscription/add-sub',
           headers: {
            Accept: 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token"),
           'content-type': 'application/json',
           
          
       },
           data : data,
           
           
         };
   
         console.log(data)
       
         Axios(config)
         .then( (response)=> {
           console.log(response);
           alert("you are subscribed")
           window.location.href="/";
          
           
         })
         .catch(function (error) {
           console.log(error);
         });
        }  

    
    render() {
        console.log(this.state)
         console.log(this.props.location)
          
          return (<div>

              <MainNavBar/>
             
             
              <div className="best-plan">
                  <div className="container">
                      <div className="plan-sub">
                   <h1>BEST SUBSCRIPTION PLAN FOR YOU</h1>
                   <p>"Dear customer we charge a small fee for the cost we incur to verify items we list.
After paying this amount you shall get the property you are looking for directly from
the seller without further charges.We don't charge any brokerage fee. Most of our</p>
</div>   
<div className="rent-package">
  <h2> {this.state.Type=="Buy" ? "Buy": "Rent"} Package</h2> 
  <ul>
      <li>The points you will getin this package - {this.state.Type=="Buy" ? 1500: 700}</li>
      <li>Use of points : you can use points for searching the properties</li>
      <li>The value of points : 1 point per minute</li>
      </ul> 
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nullam ut scelerisque felis, at aliquam
libero.In elementum orci eu iaculis vehicula.Nullam ante est, porttitor vel arcu sed,
sollicitudin dapibus dui.Maecenas finibus est nunc...</p>
<div className="text-center top-25">
<button className="pay-btn" onClick={this.addSub}>Pay ${this.state.Type=="Buy" ? "1500": "700"} </button>

</div>
</div>
                  </div>
              </div>

              <Footer/>
                        </div>)}  
}  

export default (SubscriptionPlanDetails);