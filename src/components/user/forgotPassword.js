import React, {Component} from "react";

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { Redirect } from "react-router-dom";


class ForgotPassword extends Component {

    constructor() {
		super()
		this.state = {
			email: "",
        
        log:false,
		}
	}

    
    

   

    onSubmit = (e) => { 
         e.preventDefault();
         console.log(this.state);
         var that = this;
      
       
         const data={
           
            "email": this.state.email,
        
            
        }
        
        var config = {
            method: 'post',
            url: 'https://cuboidtechnologies.com/api/users/forgotPassword',
            headers: {
             Accept: 'application/json',
            'content-type': 'application/json',
            
           
        },
            data : data,
            
            
          };
          
          axios(config)
          .then(function (response) {
            console.log(response.data);
            

            alert("reset password link has been sent to your mail.");
          })
          .catch(function (error) {
            console.log(error);
          });
            
        
       
    }



    render() {

        if(this.state.log){
            return <Redirect to="/" />
        }


        
    
        
       
        
        return (<div>

              
            <div className="register_form d-flex full-div">
            
                <div className="user-login-highlight">
                <div className="">
            <form  onSubmit={this.onSubmit}>
                <fieldset className="login_fieldset">
                    <p className="user-register-head text-center">Forgot Password</p>


                   
                    
<div className="formloginbox">
<div className="form-group">
<input
                           type="email" id="email" placeholder="Email"
                           onChange={e => this.setState({email: e.target.value})} />

</div>


</div>
                    

<div className="form-group text-center">
 {/* <button type="submit" ><Link to="/yelp">Login</Link></button> */}
 <button  className="btn btn-login btn-block text-uppercase" type="submit">Reset Password</button>

</div>
                   
{/* <div className="form-group text-center"> <a href="#" className="forgot-pass">Forget password</a></div> */}
                   

                  

                

                   

                   
                  
                    
                   
      
                   

                    
                </fieldset>
            </form>
            
            </div>
            </div>
            </div>
            

        
        
        </div>
        )
    }
}




export default (ForgotPassword);
