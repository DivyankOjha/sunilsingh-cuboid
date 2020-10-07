import React, {Component} from "react";

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { Redirect } from "react-router-dom";


class ResetPassword extends Component {

    constructor() {
		super()
		this.state = {
			
        password: "",
       passwordConfirm:"",
        log:false,
        
		}
	}

        
    

   

    onSubmit = (e) => { 
         e.preventDefault();
         console.log(this.state);
         console.log( this.props.match.params.id);
                var that=this;
           var id=this.props.match.params.id;
           const data={
            "password" : this.state.password,
            "passwordConfirm": this.state.passwordConfirm
        }
        
           var config = {
            method: 'patch',
            url: 'https://cuboidtechnologies.com/api/users/resetPassword/'+id,
            headers: {
             Accept: 'application/json',
            'content-type': 'application/json',
            
           
        },

        data:data
            
            
            
          };
          
          axios(config)
          .then(function (response) {
            console.log(response.data);
            

            that.setState({log:true});
            alert("Successfully reset password")
          })
          .catch(function (error) {
            console.log(error);
          });
            
        
       
    

            
        
       
    }



    render() {

        if(this.state.log){
            return <Redirect to="/login" />
        }


    
        
       
        
        return (<div>

              
            <div className="register_form d-flex full-div">
            
                <div className="user-login-highlight">
                <div className="">
            <form  onSubmit={this.onSubmit}>
                <fieldset className="login_fieldset">
                    <p className="user-register-head text-center">Reset Password</p>


                   
                        

                        
                    
<div className="formloginbox">
<div className="form-group">
<input
                           type="password" id="password" placeholder="Enter New password"
                           onChange={e => this.setState({password: e.target.value})} />

</div>
<div className="form-group">
<input
                            type="password" id="passwordconfirm" placeholder="Confirm Your Password"
                            onChange={e => this.setState({passwordConfirm: e.target.value})} />

</div>

</div>
                    

<div className="form-group text-center">
 {/* <button type="submit" ><Link to="/yelp">Login</Link></button> */}
 <button  className="btn btn-login btn-block text-uppercase" type="submit">Reset</button>

</div>
    
                  

                

                   

                   
                  
                    
                   
      
                   

                    
                </fieldset>
            </form>
            
            </div>
            </div>
            </div>
            

        
        
        </div>
        )
    }
}




export default (ResetPassword);
