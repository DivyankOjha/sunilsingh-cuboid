import React, {Component} from "react";

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import { Redirect, Link } from "react-router-dom";




class UserRegister extends Component {

    state = {
        
        email: "",
        password: "",
        confirmPassword: "",
        firstName:"",
        lastName:"",
        phoneNumber:"",
        log:false,

        googleFirstName:"",
        googleLastName:"",
        googleEmail:"",
        googleImagePath:"",

        facebookName:"",
        
        facebookEmail:"",
        facebookImagePath:"",
        firstError:"* Firstname is Required",
        lastError:"* Lastname is Required",
        mobileError:"* Mobile Number is Required",
        emailError:"* Email is Required",
        passError:"* Password is Required",
        ConfPassError:"* Confirm Password is Required",
        firstEB:false,
        lastEB:false,
        phoneEB:false,
        emailEB:false,
        passEB:false,
        confPassEB:false,
       
    }
    

   

    onSubmit = (e) => { 
         e.preventDefault();
         console.log(this.state);

         if(
             this.state.email!=''
             &&
             this.state.password
             &&
             this.state.confirmPassword
             &&
             this.state.phoneNumber
             &&
             this.state.firstName
             &&
             this.state.lastName
             )

             {

                if( this.state.password == this.state.confirmPassword){
                    this.setState({
                        emailEB:false,
                        firstEB:false,
                        lastEB:false,
                        passEB:false,
                        confPassEB:false,
                        phoneEB:false
                    })

         const data={
            "firstname": this.state.firstName,
            "lastname":this.state.lastName,
            "email": this.state.email,
            "mobilenumber":this.state.phoneNumber,
           
            "password": this.state.password,
            "passwordConfirm": this.state.confirmPassword,
           
        }
        if(!this.state.firstEB && !this.state.lastEB && !this.state.emailEB &&
            !this.state.passEB && !this.state.phoneEB && !this.state.confPassEB ){
        var config = {
            method: 'post',
            url: 'https://cuboidtechnologies.com/api/users/signup',
            headers: {
             Accept: 'application/json',
            'content-type': 'application/json',
            
           
        },
            data : data,
            
            
          };}
           
          axios(config)
          .then(function (response) {
            console.log(response.data);

            alert("verify your email, Check your inbox")
          })
          .catch(function (error) {
            console.log(error);
          });

        }
        else{
            this.setState({confPassEB:true,ConfPassError:" *Confirm password Not match with password",
        
            
                emailEB:false,
                firstEB:false,
                lastEB:false,
                passEB:false,
               
                phoneEB:false
            
        })
        }

        }

        else{

            if(this.state.firstName==""){
                this.setState({firstEB:true})

            }
            else{
                this.setState({firstEB:false})

            }

            if(this.state.lastName==""){
                this.setState({lastEB:true})

            }
            else{
                this.setState({lastEB:false})

            }
            let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            let validEmail= pattern.test(this.state.email)
            if(this.state.email=="" || !validEmail){
            
                this.setState({emailEB:true})
                
            }
            else{

                this.setState({emailEB:false})
            }
            

            if( this.state.password.length<8  ){
                this.setState({passEB:true})

            }
            else{

                this.setState({passEB:false})

            }
            
            if(this.state.confirmPassword!==this.state.password){
                this.setState({confPassEB:true,ConfPassError:"* Confirm Password is Required",})

            }
            else{
                this.setState({confPassEB:false})

            }
            
            if( this.state.phoneNumber.length>15 && this.state.phoneNumber.length<9){
                this.setState({phoneEB:true})

            }
            else{
                this.setState({phoneEB:false})

            }
            
          
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
            url: 'https://cuboidtechnologies.com/api/users/google-facebook-signup',
            headers: {
             Accept: 'application/json',
            'content-type': 'application/json',
            
           
        },
            data : data,
            
            
          };
          
          axios(config)
          .then(function (response) {
            console.log(response.data);
            that.setState({log:true});

            alert("You Are Registered")
          })
          .catch(function (error) {
            console.log(error);
            alert("Already registerd with us");
          });
            
        }
        
       
               

    }

    render() {

        if(this.state.log){
            return <Redirect to="/login" />
        }


        
    const responseGoogle = (response) => {
        console.log(response);
        var that = this;
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
            url: 'https://cuboidtechnologies.com/api/users/google-facebook-signup',
            headers: {
             Accept: 'application/json',
            'content-type': 'application/json',
            
           
        },
            data : data,
            
            
          };
          
          axios(config)
          .then(function (response) {
            console.log(response.data);
            
            that.setState({log:true});
            alert("You Are Registered")
          })
          .catch(function (error) {
            console.log(error);
            alert("Already registerd with us")
          });
            
        
       
    

        
        
      }

      const responseErrorGoogle = (response) => {
        console.log("google login has some error to load");
        // alert("google login has some error to load");

       
      }
        
        
       
        
        return (<div>


            <div className="register_form">
            <div className="container">
                <div className="overlay-login">
                <div className="login-close">
                <Link to="/"> <img src={require('../../img/close-login.png')} alt=""/></Link>
                  </div>
            <p className="user-register-head text-center">Register with us</p>
            <form  onSubmit={this.onSubmit}>
                
              <div class="row d-flex">      

            <div className="col-md-5">
                    <div className="form-group social-login">
                    <span className="facebokicon"><img src={require('../../img/facebook.png')}/></span>

                    <FacebookLogin
                appId="954154038357109"
                autoLoad={false}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook}
                />
                    </div>

                    <div className="form-group btn-google">
                    <span className="facebokicon"><img src={require('../../img/google-icon.png')}/></span>
                    <GoogleLogin
    clientId="599301796427-i60imf1ud24r1qdg5oai0b8cv9v3mqgn.apps.googleusercontent.com"
    buttonText="REGISTER WITH GMAIL"
    onSuccess={responseGoogle}
    onFailure={responseErrorGoogle}
    cookiePolicy={'single_host_origin'}
  />
                
                    </div>

                    </div>

<div className="col-md-1 hidden-xs">
<div className="or">
<span>OR</span>

</div>


</div>

                    <div className="col-md-6">

                    <div class="form-group">
                        <input
                            type="text" id="firstName" placeholder=" First Name"
                            onChange={e => this.setState({firstName: e.target.value})} />
                    </div>
                    <div className="validation-red">
                        {
                        this.state.firstEB?this.state.firstError:""}
                    </div>

                    <div class="form-group">
                        
                        <input
                            type="text" id="lastName" placeholder=" Last Name"
                            onChange={e => this.setState({lastName: e.target.value})} />
                    </div>

                    <div className="validation-red">
                        {
                        this.state.lastEB?this.state.lastError:""}
                    </div>

                    <div class="form-group">
                        
                        <input
                            type="number" id="phoneNumber" placeholder=" Phone Number"
                            onChange={e => this.setState({phoneNumber: e.target.value})} />
                    </div>
                  
                    <div className="validation-red">
                        {
                        this.state.phoneEB?this.state.mobileError:""}
                    </div>
                    
                    <div class="form-group">
                       
                        <input
                            type="email" id="email" placeholder=" Email"
                            onChange={e => this.setState({email: e.target.value})} />
                    </div>

                    <div className="validation-red">
                        {
                        this.state.emailEB?this.state.emailError:""}
                    </div>

                    <div class="form-group">
                       
                        <input
                            type="password" id="password" placeholder=" Password"
                            onChange={e => this.setState({password: e.target.value})} />
                    </div>

                    <div className="validation-red">
                        {
                        this.state.passEB?this.state.passError:""}
                    </div>

                    <div class="form-group">
                        
                        <input
                            type="password" id="confirmPassword" placeholder="Confirm Password"
                            onChange={e => this.setState({confirmPassword: e.target.value})} />
                    </div>

                    <div className="validation-red">
                        {
                        this.state.confPassEB?this.state.ConfPassError:""}
                    </div>

                    <div class="form-group text-center">
                    {/* <button type="submit" ><Link to="/yelp">Login</Link></button> */}
                        <button className="btn btn-signup" type="submit">SIGN UP</button>
                        
                    </div>
                    <div class="form-group text-center">
                        <div className="already">Already have an account? <Link to="/login">LOG IN NOW</Link></div>
                    </div>
                    </div>

                    </div>  
               
            </form>
            </div>
            </div>
            </div>

        
        
        </div>
        )
    }
}




export default (UserRegister);
