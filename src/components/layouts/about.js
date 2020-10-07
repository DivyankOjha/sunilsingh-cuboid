import React, {Component} from "react";

import MainNavbar from './mainNavBar';
import Footer from './footer';




class AboutUs extends Component {

    componentDidMount(){
        window.scrollTo(0, 0)
    }

   
    render() {
       
        
        return (<div>

            <MainNavbar/>
<div className="main-user-content">
    <img src={require('../../img/edit-profile.jpg')}  alt=""/>
    
</div>

<div className="inner-content">
  <div className="container">
      <div className="col-md-6">
          <div className="text-about">
          <h2>About Us</h2>
          <p>Cuboid company was formed with the main aim “to assist property buyers to get their dream
properties at the best possible price”. That is why we do not believe in brokerage or in any
intermediary that goes between the buyers and property owners. We uphold highest values and
ethical standards. We do not go behind the buyer and mark up prices for properties so that we
can get a commission.
</p>

</div>

      </div>
<div className="col-md-6">
 <div className="about-img">
     <img src={require('../../img/about.jpg')} alt="" />
     </div> 
</div>


<div className="col-md-12">
<div className="text-about spacetext">
<p>We act for the buyer; we negotiate and go and extra mile for the buyer. We protect the interest
of the buyer by ensuring that we verify all the details of items listed in our platforms as much as
possible. We bring every detail we believe is pertinent to the buying decision and offer free
support and partnership.</p>
<p>Cuboid is registered in Kenya and headquarter offices are in Nairobi <br />
Our values are Integrity| innovation| simple| exceptional <br />
(For the values you can use different colors)</p>
<h2>Vision</h2>
<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt utlabore et dolore magna
aliquyam erat, sed diam voluptua.At vero eos et accusam etjusto duo dolores et ea rebum. Stet clita kasd gubergren, no sea
takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
 consetetur sadipscing elitr, sed diam nonumy eirmod</p>
 <h2>Mission</h2>
 <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt utlabore et dolore magna
aliquyam erat, sed diam voluptua.At vero eos et accusam etjusto duo dolores et ea rebum. Stet clita kasd gubergren, no sea
takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, 
consetetur sadipscing elitr, sed diam nonumy eirmod
</p>
<h2>Goal</h2>
<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt utlabore et dolore magna
aliquyam erat, sed diam voluptua.At vero eos et accusam etjusto duo dolores et ea rebum. Stet clita kasd gubergren, no sea
takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, 
consetetur sadipscing elitr, sed diam nonumy eirmod</p>

</div>
</div>
      </div>  
</div>
           

        
            <Footer/>
        </div>
        )
    }
}




export default (AboutUs);
