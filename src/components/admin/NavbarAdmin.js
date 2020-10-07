import React, {Component} from "react";
import Axios from "axios";

import PropTypes from 'prop-types';

class NavbarAdmin extends Component{

    constructor() {
		super()
		this.state = {
			


		}
    }
    logout=e=>{
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("firstName");
      window.location.href='/admin';

    }
    


    render() {

return(

<div className="dashboard-heading">
<h1><i className={this.props.class}></i> {this.props.name} <div className="dropdown rightbox">
  <span className="dropdown-toggle" type="button" data-toggle="dropdown">Admin
  <i className="caret"></i></span>
  <ul className="dropdown-menu">
    <li><a  onClick={this.logout}>Log Out</a></li>
    
  </ul>
</div></h1>

</div>
)
    }

}
NavbarAdmin.propTypes = {
    name: PropTypes.any
  };

export default (NavbarAdmin);