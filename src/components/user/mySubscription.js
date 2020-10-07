import React, {Component} from "react";
import Axios from "axios";
import Spinner from "../common/Spinner";



class MySubscription extends Component {

    state = {
      notSub:false,
      loader:true
        
    }

    componentDidMount(){

        var config = {
          method: 'get',
          url: 'https://cuboidtechnologies.com/api/subscription/get-user-subscription-details/'+localStorage.getItem('userId'),
          headers: {
           Accept: 'application/json',
           Authorization: "Bearer " + localStorage.getItem("token"),
          'content-type': 'application/json',
          
         
      },
          
          
          
        };
        
        Axios(config)
        .then( (response)=> {
          console.log(response);
          this.setState({
              type:response.data.data.subscription[0].subscriptionType ,
              usedPoints:response.data.data.subscription[0].usedPoints,
              totalPoints:response.data.data.subscription[0].totalpoints,
            loader:false,notSub:true})
         
          
        })
        .catch( (error)=> {
          console.log(error.response.status);
          if(error.response.status=="403"){
            this.setState({notSub:false})
          }
        });
      
  
        
  
      }
    

   

    
    render() {
        console.log(this.state)
       
        
        return (<div>
          {this.state.loader?
          <Spinner/>
          :
          <div>


          {this.state.notSub?  
<div className="my-subscription">
<div className="total-point">
        <span>Total Points :<b>{this.state.totalPoints}</b></span>

<span>Used Points :<b>{this.state.usedPoints}</b></span>

</div>

<div className="sub-peicing">
<div className="pricing-left right-pricing ">
<img src={require('../../img/p1.jpg')} alt=""/>
<div className="buy opcity-box">
<span>BUY</span>
<h2><sup>$</sup>450</h2>
<p><small>Per Month</small></p>

</div>
</div>


<div className="pricing-left">
<img src={require('../../img/p2.jpg')} alt=""/>
<div className="buy">
<span>RENT</span>
<h2><sup>$</sup>750</h2>
<p><small>Per Month</small></p>
<ul>
    <li>1 domain</li>
    <li>Unlimited Storage</li>
    <li>No free Domain</li>
</ul>

<a  className="righ-btn"><i className="zmdi zmdi-check"></i></a>
</div>
</div>

</div>




</div>
:

<div>Not Subscribed</div>}
</div>}




        
        
        </div>
        )
    }
}




export default (MySubscription);
