import React, {Component} from "react";

import MainNavbar from '../layouts/mainNavBar';

import Footer from '../layouts/footer';
import { Route,HashRouter, NavLink, Redirect } from 'react-router-dom';

import ChangePassword from './changePassword';
import EditProfile from './editProfile';
import MySavedFlipbooks from './mySavedFlipbooks';
import MySubscription from './mySubscription';
import Axios from "axios";

import Spinner from '../common/Spinner'
class UserProfileMain extends Component {
    constructor() {
		super()
		this.state = {
      firstName:"",
      lastName:"",
      email:"",
      ProfilePic:"",
      uploadMsg:"",
      loader:true
		}
	}


    onUploadLogo = event => {
        let files = event.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = e => {
            console.log(e.target.result);

            var that=this;
            var data={
              "image": e.target.result
            }

            this.setState({uploadMsg:"Uploading Image... Wait"})

    var config = {
      method: 'post',
      url: 'https://cuboidtechnologies.com/api/users/upload',
      headers: {
       Accept: 'application/json',
       Authorization: "Bearer " + localStorage.getItem("token"),
      'content-type': 'application/json',
      
     
  },

  data:data
      
      
      
    };
    
    Axios(config)
    .then(function (response) {
      console.log(response.data);
      that.setState({ ProfilePic: e.target.result,uploadMsg:"" });
      
     
      
    })
    .catch(function (error) {
      console.log(error);
    });


            
         
        };
      };

    componentDidMount(){

      var that=this;

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
      console.log(response);
      that.setState({
        firstName:response.data.data.user.firstname,
        lastName:response.data.data.user.lastname,
        email:response.data.data.user.email,
        ProfilePic:response.data.data.user.imagepath,
        loader:false
       
        

      })
     
      
    })
    .catch(function (error) {
      console.log(error);
    });



    }
    


    logout(){

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("firstName");
        window.location.href='/';
        
    }
    

   

    
    render() {
        console.log(this.state.ProfilePic)
       
        
        return (<div>

            <MainNavbar/>

            {
    this.state.loader
    ?
     <Spinner/>
     :<div>
            <div className="main-user-content">
    <div className="edit-profile">
<img src={require('../../img/edit-profile.jpg')} alt="" />

    </div>

   

  <div className="user-box">
  <div className="edit-profile-pic">
      {this.state.ProfilePic?
      <img src={this.state.ProfilePic} alt="profile pic" />:
      <img src={require('../../img/user-profile-img.png')} alt="" />
      }
   
    <span><i className="zmdi zmdi-edit"></i>
    <input type="file" onChange={this.onUploadLogo}/>
    </span>  <div style={{color:"green"}}>{this.state.uploadMsg}  {
      this.state.uploadMsg!=''?
      <i class="fa fa-spinner" aria-hidden="true"></i>:""}
    
    </div>
    </div>
    <div className="user-text">
        <h2>{this.state.firstName} {this.state.lastName}</h2>
        <p><i className="zmdi zmdi-email"></i> <a href={"mailto:"+this.state.email}>{this.state.email}</a></p>

    </div>

    </div>  


</div>
    
<div className="edit-profile-main">
<div className="container">
    <div className="row">
            <HashRouter>
                <div className="col-md-3">
                    <ul className="edit-menu">
                <li><NavLink to="/edit-profile" ><i className="zmdi zmdi-account-circle"></i> Edit Profile</NavLink></li>
                <li><NavLink to="/change-password"  ><i className="zmdi zmdi-lock"></i> Change Password</NavLink></li>
                <li><NavLink to="/my-saved-flipbooks" ><i className="zmdi zmdi-book"></i> My-Saved-Flipbooks</NavLink></li>
                
                <li><NavLink to="/my-subscription"  ><i className="zmdi zmdi-vibration"></i> My Subscription</NavLink></li>
                <li><a onClick={this.logout}><i className="zmdi zmdi-sign-in"></i> Log Out</a></li>
                
                
                </ul>
                </div>
                <div className="col-md-9">
                <div className="content">
                <Redirect exact from="/" to="/edit-profile" component={EditProfile} />

                <Route exact path="/edit-profile" component={EditProfile} />
                <Route exact path="/change-password" component={ChangePassword} />
                <Route exact path="/my-saved-flipbooks" component={MySavedFlipbooks} />
                <Route exact path="/my-subscription" component={MySubscription} />
                </div>
                </div>


            </HashRouter>
            </div>
            </div>
            </div>

<Footer/></div>}



        
        
        </div>
        )
    }
}




export default (UserProfileMain);
