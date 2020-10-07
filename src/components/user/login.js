import React, {Component} from "react";

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { Redirect, Link } from "react-router-dom";


class UserLogin extends Component {

    constructor() {
		super()
		this.state = {
			email: "",
        password: "",
        rememberMe:false,
        log:false,
        confirmUser:false,
        validateemail:false,
        validatepassword:false,
        isLogin:false,
        passValidation:'',
        passInvalid:false,
        googleFirstName:"",
        googleLastName:"",
        googleEmail:"",
        googleImagePath:"",

        facebookName:"",
        
        facebookEmail:"",
        facebookImagePath:""
		}
	}

        componentDidMount(){
           console.log( this.props.match.params.id);
                var that=this;
           var id=this.props.match.params.id;


            if(this.props.match.params.id){
           var config = {
            method: 'get',
            url: 'https://cuboidtechnologies.com/api/users/confirmation/'+id,
            headers: {
             Accept: 'application/json',
            'content-type': 'application/json',
            
           
        },
            
            
            
          };
          
          axios(config)
          .then(function (response) {
            console.log(response.data);
            

            that.setState({confirmUser:true});
            alert("You are "+ response.data.message)
          })
          .catch(function (error) {
            console.log(error);
            if(error.response.status=="401"){
              alert("Already verified")
            }
          });
            
        
       
        }

        }
    
    
   

    onSubmit = (e) => { 
         e.preventDefault();
         console.log(this.state);
         var that = this;
      
         this.setState({
          isLogin:true
      })
      
         const data={
           
            "email": this.state.email,
           
            "password": this.state.password
            
        }
        if(this.state.validateemail && this.state.validatepassword){
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
            that.setState({passValidation:response.data.status})
            
            
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("userId",response.data.data.user._id);
            localStorage.setItem("firstName",response.data.data.user.firstname);
           
            that.setState({log:true})
          })
          .catch(function (error) {
            console.log(error);
            if(error.response){
              if(error.response.status=='401')
              console.log("true");
              console.log(error.response.data.message)
              alert(error.response.data.message)
            }
            else{
            that.setState({passInvalid:true})
            }
          });
            
        
        }
    }


    componentClicked=(e)=>{
        console.log('clicked')
        // e.preventDefault();

    }
    responseFacebook=(response)=>{
        console.log(response);
      var that = this;
      if(response.status!="unknown"){

        this.setState({facebookName:response.name,
          facebookEmail:response.email,
          facebookImagePath:response.picture.data.url
          
      })

      var first=this.state.facebookName.split(" ")[0];
      
      var last=this.state.facebookName.split(" ")[1];

      const data={
          "firstname": first,
          "lastname":last,
          "email": this.state.facebookEmail,
          "imagepath":this.state.facebookImagePath

          
         
      }
      
      var config = {
          method: 'post',
          url: 'https://cuboidtechnologies.com/api/users/google-facebook-auth',
          headers: {
           Accept: 'application/json',
          'content-type': 'application/json',
          
         
      },
          data : data,
          
          
        };
        
        axios(config)
        .then(function (response) {
          console.log(response.data);
          localStorage.setItem("token",response.data.token);
          console.log(response.data.data.user._id)
          localStorage.setItem("userId",response.data.data.user._id);
         
          localStorage.setItem("firstName",response.data.data.user.firstname);

          that.setState({log:true})
        })
        .catch(function (error) {
          console.log(error);
          alert("your facebook is not providing some fileds")
        });
          
      
      }
        

    }

    render() {
      var that = this;

        if(this.state.log){
            // return <Redirect to="/" />

            window.location.href="/";
        }


        
    const responseGoogle = (response) => {
        console.log(response);

        this.setState({googleFirstName:response.profileObj.givenName, 
          googleLastName:response.profileObj.familyName,
          googleEmail:response.profileObj.email,
          googleImagePath:response.profileObj.imageUrl
          
      })

      const data={
          "firstname": this.state.googleFirstName,
          "lastname":this.state.googleLastName,
          "email": this.state.googleEmail,
          "imagepath":this.state.googleImagePath

          
         
      }
      
      var config = {
          method: 'post',
          url: `/api/users/google-facebook-auth`,
          headers: {
           Accept: 'application/json',
          'content-type': 'application/json',
          
         
      },
          data : data,
          
          
        };
        
        axios(config)
        .then( (response)=> {
          console.log(response);

           console.log(this.state);
          localStorage.setItem("token",response.data.token);
          console.log(response.data.data.user._id)
          localStorage.setItem("userId",response.data.data.user._id);
         
          localStorage.setItem("firstName",response.data.data.user.firstname);
          this.setState({log:true})
        })
        .catch( (error)=> {
          console.log(error);
          console.log(this.state);
          alert("your google is not providing some fileds")
        });
          

        
      }

      const responseErrorGoogle = (response) => {
        console.log(response);
        // alert("google login has some error to load");

       
      }
        
      let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      let validEmail= pattern.test(this.state.email)
      if (this.state.email!=='' && validEmail){
      this.state.validateemail=true
      }
      else{
      this.state.validateemail=false
      }
       if(this.state.password!==""){
        this.state.validatepassword=true
      }
      else{
      this.state.validatepassword=false
      }
        return (<div>

              
            <div className="register_form d-flex full-div">
            
                <div className="user-login-highlight">
                <div className="login-close">
                    <Link to="/"> <img src={require('../../img/close-login.png')} alt=""/></Link>
                  </div>
                <div className="">
            <form  onSubmit={this.onSubmit}>
                <fieldset className="login_fieldset">
                  
                    <p className="user-register-head text-center">Login with us</p>


                   
                        <div className="form-group text-center">

                        
                    <FacebookLogin
                appId="954154038357109"
                autoLoad={false}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook}
                />
                    

                        </div>
                   


                   
                        <div className="form-group btn-google text-center login-w">

                        
                    <GoogleLogin
    clientId="599301796427-i60imf1ud24r1qdg5oai0b8cv9v3mqgn.apps.googleusercontent.com"
    buttonText="LOGIN WITH GMAIL"
    onSuccess={responseGoogle}
    onFailure={responseErrorGoogle}
    cookiePolicy={'single_host_origin'}
  />
                
                    

                        </div>

                        <div className="form-group text-center">
                        <div className="form-or"><span>OR</span></div>

                        </div>
                    
<div className="formloginbox">
<div className="form-group">
<input
                           type="email" id="email" placeholder="Email"
                           onChange={e => this.setState({email: e.target.value})} />
                            {!this.state.validateemail && this.state.isLogin?(<div className='warning'> Enter a valid email </div> ):null}

</div>
<div className="form-group">
<input
                            type="password" id="password" placeholder="Password"
                            onChange={e => this.setState({password: e.target.value})} />
                            {!this.state.validatepassword && this.state.isLogin?(<div className='warning'> Enter a valid password </div> ):null}
                            {this.state.passInvalid?(<div className='warning'> Invalid password </div> ):null}
</div>  

</div>
                    
<div className="form-group">
<label className="remember-me">
                        <input type="checkbox"/> Remember Me
                    </label>

</div>
<div className="form-group text-center">
 {/* <button type="submit" ><Link to="/yelp">Login</Link></button> */}
 <button  className="btn btn-login btn-block text-uppercase" type="submit" >Login</button>

</div>
                   
<div className="form-group text-center"> <a href="/forgot-password" className="forgot-pass">Forget password</a></div>
                   

                  

                

                   

                   
                  
                    
                   
      
                   

                    
                </fieldset>
            </form>
            
            </div>
            </div>
            </div>
            

        
        
        </div>
        )
    }
}




export default (UserLogin);
