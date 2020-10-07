import React, {Component} from "react";
import { Link } from "react-router-dom";




class Footer extends Component {

    state = {
        
    }
    

   

    
    render() {
       
        
        return (
        
        <div className="foot">
<div className="container">
    <div className="row foot-first">
        <div className="col-md-4">
        <div className="footer-logo">
        <img src={require('../../img/cuboid.png') } alt=""/>
        <p className="foot-first-head">Cuboid</p>

        

        </div>
        <ul className="footer-list">
<li><a href="tel:+0000000000"><i className="zmdi zmdi-phone"></i> +XX XXXXXXXXXX</a></li>
<li><a href="mailto:XYZ@gmail.com"><i className="zmdi zmdi-email"></i> XYZ@gmail.com</a></li>

        </ul>

        </div>

        <div className="col-md-6">

<div className="footer-menu">
<h4>Quick Links</h4>
<ul>
<li><Link to="/">Home</Link></li>
<li><Link to="/contact">Contact Us</Link></li>
<li><Link to="/about">About Us</Link></li>
<li><Link to="/faq">FAQ</Link></li>
<li><Link to="/privacy-policy">Privacy Policy</Link></li>
<li><Link to="/terms-and-condition">Terms and Condition</Link></li>
</ul>

</div>

       

            


        </div>

        <div className="col-md-2">
<div className="footer-so">
        <h4>Connect with us</h4>
        <ul className="social-icon">
<li><a href="#"><img src={require('../../img/so-1.jpg')} alt=""/></a></li>
<li><a href="#"><img src={require('../../img/so-2.jpg')} alt=""/></a></li>
<li><a href="#"><img src={require('../../img/so-3.jpg')} alt=""/></a></li>
<li><a href="#"><img src={require('../../img/so-4.jpg')} alt=""/></a></li>
<li><a href="#"><img src={require('../../img/so-5.jpg')} alt=""/></a></li>

        </ul>
        </div>

  


        </div>
    </div>
</div>
    

    <div className="foot-last">
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <p>All rights reserved to <a href="#" className="cobiod-text">CUBOID</a> </p> 
            </div>
            </div>
    </div>
</div>
        
        
        </div>
        )
    }
}




export default (Footer);
