import React, {Component} from "react";
import logo from '../../img/cuboid.png'
import Axios from "axios";
import { Link } from "react-router-dom";





class MainNavBar extends Component {
 
 
  constructor() {
		super()
		this.state = {
      firstName:"",
      lastName:""
		}
	}


    componentDidMount(){

      var that=this;

      if(localStorage.getItem("token"))
{
    var config = {
      method: 'get',
      url: 'https://cuboidtechnologies.com/api/users/userprofile',
      headers: {
       Accept: 'application/json',
       Authorization: "Bearer " + localStorage.getItem("token"),
      'content-type': 'application/json',
      
     
  },
      
      
      
    };
    
    Axios(config)
    .then(function (response) {
      console.log(response.data.data.user);
      that.setState({
        firstName:response.data.data.user.firstname,
        lastName:response.data.data.user.lastname,
       
        

      })
     
      
    })
    .catch(function (error) {
      console.log(error);
    });

  }

    }
    

   

    
    render() {

      var isAuth=localStorage.getItem("token")?true:false;
       
        
        return (<div className="main-navbar">

<nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/"><img src={logo}/></Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            
            <ul className="nav navbar-nav navbar-right">
            <li >  <Link to="about">About Us</Link> </li>
            <li > <Link to="contact"> Subscription  </Link></li>
            <li > <Link to="contact"> Contact Us </Link></li>
            <li > <a href="/#post-property-box">Post Property </a></li>
            {isAuth? 
            
            <li ><Link to="/user-profile">{localStorage.getItem("firstName")}  &nbsp; <i className="fa fa-chevron-down" aria-hidden="true"></i></Link> </li>
            
            :
            
            <li ><Link to="login">Sign in</Link> / <Link to="register">Sign up</Link></li>
            
            }
            
            </ul>
          </div>
        </div>
      </nav>



            
</div>
        )
    }
}




export default (MainNavBar);
