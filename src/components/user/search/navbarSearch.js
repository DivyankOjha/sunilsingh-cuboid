import React, {Component} from "react";
import { Link } from "react-router-dom";

class NavbarSearch extends Component{

    constructor() {
		super()
		this.state = {
         toggle:false,
         	


		}
    }

    showMenu=e=>{
        if(this.state.toggle){
      
        
        this.setState({toggle:false})
        }

            else{
            this.setState({toggle:true})
            }

            
            
                        
        }

    render() {
     


     
        
        
       
        
        return (<div>

           <div className="navbar-search">
               <div className="container">
               <span className="toggle-menu" ><i className="zmdi zmdi-menu" onClick={this.showMenu}></i></span>
            {this.state.toggle?

               <ul className="menu-drawer">
                   <li ><Link to="/">Home</Link> </li>
               <li ><Link to="about">About Us</Link> </li>
            <li > <Link to="contact"> Contact Us </Link></li>
            <li > <a href="/#post-property-box">Post Property </a></li>
               </ul>
    :""}
               </div>
               </div> 
               
        </div>)
    }
}

export default (NavbarSearch);
