import React, {Component} from "react";
import { NavLink, Route, HashRouter, Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import ManageMember from "./ManageMember";
import ManageProperty from "./ManageProperty";
import AddProperty from "./AddProperty";
import CreateFlipbook from "./CreateFlipbook";
import ManageSubscription from "./ManageSubscription";
import ManagePropertyAttributes from "./ManagePropertyAttributes";
import ManageReviews from "./ManageReviews";

import CustomerInquiry from "./CustomerInquiry";
import PropertyInquiry from "./PropertyInquiry";
import ContactusInquiry from "./ContactusInquiry";
import GeneralSetting from "./GeneralSetting";
import ChangePassword from "./ChangePassword";
import EmailSetting from "./EmailSetting";
import EditFlipbook from "./EditFlipbook";
import EditProperty from "./EditProperty";

class AdminMain extends Component{

    constructor() {
		super()
		this.state = {
			


		}
    }
    


    render() {
     


     
        
        
       
        
        return (<div>




<div className="mainsection-admin">

    <div className="">
            <HashRouter>
                <div className="col-md-3 padding-left">
                    <div className="sidebar-box">
                    <div className="admin-logo">
                    <img src={require('../../img/cuboid.png')} alt=""/>
                    <span>CUBOID</span>

                    </div>
                    <ul className="sidebar-menu">
                <li  ><NavLink to="/dashboard" activeClassName="selected"><i className="zmdi zmdi-equalizer active"></i> Dashboard</NavLink></li>
                <li><NavLink to="/manage-member"><i className="zmdi zmdi-account-circle"></i> Manage Member</NavLink></li>
                <li><NavLink to="/manage-property"><i className="zmdi zmdi-city"></i> Manage Property</NavLink></li>
                
                <li><NavLink to="/add-property"><i className="zmdi zmdi-city-alt"></i> Add Property</NavLink></li>
                <li><NavLink to="/create-flipbook"><i className="zmdi zmdi-map"></i> Create Flipbook</NavLink></li>
                <li><NavLink to="/manage-subscription"><i className="zmdi zmdi-comments"></i> Manage Subscription</NavLink></li>
             {/* Collapse start*/}    
       <li className="treeview"><a><i className="zmdi zmdi-calendar-alt"></i> Manage Inquiry <i className="fa fa-angle-left pull-right"></i></a>
       <ul className="treeview-menu">
      
<li><NavLink to="/property-inquiry"><i className="zmdi zmdi-calendar-account"></i> Property Inquiry</NavLink></li>
<li><NavLink to="/contactus-inquiry"><i className="zmdi zmdi-calendar-note"></i> Contact us Inquiry</NavLink></li>
<li><NavLink to="/customer-inquiry"><i className="zmdi zmdi-calendar-alt"></i> Customer Inquiry</NavLink></li>

       </ul>
       
       </li>
               
                
                {/* collapse end */}

                <li><NavLink to="/manage-property-attributes"><i className="zmdi zmdi-globe-alt"></i> Manage Property Attributes</NavLink></li>
                <li><NavLink to="/manage-reviews"><i className="zmdi zmdi-settings"></i> Manage Reviews</NavLink></li>
                {/* collapse start */}
     <li className="treeview"><a><i className="zmdi zmdi-settings"></i> Manage Admin Setting<i className="fa fa-angle-left pull-right"></i></a>
     <ul className="treeview-menu">
     <li><NavLink to="/general-setting"><i className="zmdi zmdi-settings"></i> General Setting</NavLink></li>
                <li><NavLink to="/change-password"><i className="zmdi zmdi-settings"></i> Change Password</NavLink></li>
                <li><NavLink to="/email-setting"><i className="zmdi zmdi-settings"></i> Email Setting</NavLink></li>

     </ul>
     
     </li>
                

                
                {/* collapse end */}
                
                
                </ul>
                </div>
                </div>
                <div className="col-md-9 padding-right">
                <div className="content">
                <Redirect exact from="/" to="/dashboard" component={Dashboard} />

                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/manage-member" component={ManageMember} />
                <Route exact path="/manage-property" component={ManageProperty} />
                <Route exact path="/add-property" component={AddProperty} />
                <Route exact path="/edit-property/:id" component={EditProperty} />
                <Route exact path="/create-flipbook" component={CreateFlipbook} />
                <Route exact path="/edit-flipbook/:id" component={EditFlipbook} />
                <Route exact path="/manage-subscription" component={ManageSubscription} />
                <Route exact path="/manage-property-attributes" component={ManagePropertyAttributes} />
                <Route exact path="/manage-reviews" component={ManageReviews} />
                
                <Route exact path="/customer-inquiry" component={CustomerInquiry} />
                <Route exact path="/property-inquiry" component={PropertyInquiry} />
                <Route exact path="/contactus-inquiry" component={ContactusInquiry} />

                <Route exact path="/general-setting" component={GeneralSetting} />
                <Route exact path="/change-password" component={ChangePassword} />
                <Route exact path="/email-setting" component={EmailSetting} />
                
                </div>
                </div>


            </HashRouter>
            </div>
            </div>







        </div>)

}


}




export default (AdminMain);
