import React, {Component} from "react";


import axios from 'axios';
import { Redirect } from "react-router-dom";


class AdminLogin extends Component {

    constructor() {
		super()
		this.state = {
			email: "",
        password: "",
        rememberMe:false,
        log:false,
        confirmUser:false,


		}
	}

       
    
    

   

    onSubmit = (e) => { 
         e.preventDefault();
         console.log(this.state);
         var that = this;
      
       
         const data={
           
            "email": this.state.email,
           
            "password": this.state.password
            
        }
        
        var config = {
            method: 'post',
            url: 'https://cuboidtechnologies.com/api/users/login',
            headers: {
             Accept: 'application/json',
            'content-type': 'application/json',
            
           
        },
            data : data,
            
            
          };
          
          axios(config)
          .then(function (response) {
            console.log(response.data);
            if(response.data.data.user.role=="admin"){
                localStorage.setItem("token",response.data.token);
               
                localStorage.setItem("userId",response.data.data.user._id);
                localStorage.setItem("firstName",response.data.data.user.firstname);
            that.setState({log:true})

            }
            else{
                alert("You are not admin");
            }
            
          })
          .catch(function (error) {
            console.log(error);
          });
            
        
       
    }


    render() {
     

        if(this.state.log){
            return <Redirect to="/admin/dashboard" />
        }


     
        
        
       
        
        return (<div>

              
            <div className="register_form d-flex full-div">
            
                <div className="user-login-highlight">
                <div className="">
            <form  onSubmit={this.onSubmit}>
                <fieldset className="login_fieldset">
                    <p className="user-register-head text-center">Admin Login</p>


                   
               


                   
                    

                      
<div className="formloginbox">
<div className="form-group">
<input
                           type="email" id="email" placeholder="Email"
                           onChange={e => this.setState({email: e.target.value})} />

</div>
<div className="form-group">
<input
                            type="password" id="password" placeholder="Password"
                            onChange={e => this.setState({password: e.target.value})} />

</div>

</div>
                    

<div className="form-group text-center">
 {/* <button type="submit" ><Link to="/yelp">Login</Link></button> */}
 <button  className="btn btn-login btn-block text-uppercase" type="submit">Login</button>

</div>
                   
{/* <div className="form-group text-center"> <a href="/forgot-password" className="forgot-pass">Forget password</a></div>
                    */}

                  

                

                   

                   
                  
                    
                   
      
                   

                    
                </fieldset>
            </form>
            
            </div>
            </div>
            </div>
            

        
        
        </div>
        )
    }
}




export default (AdminLogin);
