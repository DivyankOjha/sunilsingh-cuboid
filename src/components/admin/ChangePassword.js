import React, {Component} from "react";
import Axios from "axios";
import NavbarAdmin from "./NavbarAdmin";

class ChangePassword extends Component{

    constructor() {
		super()
		this.state = {
			


		}
    }

    save=(e)=>{
        this.setState({
          isSubmit:true
      })
        var that = this;
        
         
           const data={
          
              "passwordCurrent" : this.state.currentPassword,
              "password": this.state.newPassword,
              "passwordConfirm": this.state.confirmPassword
          
              
          }
          if(  this.state.validatenewpass && this.state.validateconfirmpass ){
            this.setState({
              loader:true
          })
          var config = {
              method: 'patch',
              url: 'https://cuboidtechnologies.com/api/users/updateMyPassword',
              headers: {
               Accept: 'application/json',
               Authorization: "Bearer " + localStorage.getItem("token"),
              'content-type': 'application/json',
              
             
          },
              data : data,
              
              
            };
          
            Axios(config)
            .then(function (response) {
              console.log(response.data);
              localStorage.setItem("token",response.data.token);
              that.setState({passValidation:response.data.status})
              this.setState({
              loader:false
            })
              alert("Successfullly updated")
              
            })
            .catch(function (error) {
              console.log(error);
            });
        
  
      }}
  
    render() {

        if(this.state.passValidation=="success"){
            this.state.validatecurrentpass=true
          }
          else{
          this.state.validatecurrentpass=false
          }
          if( this.state.newPassword!==""){
            this.state.validatenewpass=true
    
        }
        else{
    
          this.state.validatenewpass=false
    
        }
    
        if( this.state.confirmPassword!==""){
          this.state.validateconfirmpass=true
    
      }
      else{
    
        this.state.validateconfirmpass=false
    
      }
     


     
        
        
       
        
        return (<div>

<NavbarAdmin class="zmdi zmdi-settings" name="Manage Admin Setting "/>



<div className="general-setting">
<h3>Change Password</h3>
<div className="general-settingbox">
  <div className="row">
    <div className="col-md-6">
<div className="form-group">
            <input type="text" placeholder="Current Password" name="currentPassword"  className="form-control"
             value={this.state.currentPassword}
            onChange={e => this.setState({currentPassword: e.target.value})
           
          }
            />
            {!this.state.validatecurrentpass && this.state.isSubmit?(<div className='warning'> Incorrect password </div> ):null}
            
</div>
</div>

<div className="col-md-6">
<div className="form-group">
            <input type="password" placeholder="New Password" className="form-control"
            value={this.state.newPassword}
            onChange={e => this.setState({newPassword: e.target.value})}
            />
            {!this.state.validatenewpass && this.state.isSubmit?(<div className='warning'>Password is Required</div> ):null}
            </div>
</div>

<div className="col-md-6">
<div className="form-group">
            <input type="password" placeholder="Confirm New Password" className="form-control"
            value={this.state.confirmPassword}
            onChange={e => this.setState({confirmPassword: e.target.value})}
            />
            {!this.state.validateconfirmpass && this.state.isSubmit?(<div className='warning'> Confirm Password is Required</div> ):null}
            </div>
</div>

<div className="col-md-12">
    <div className="form-group text-right"><button className="step-next" onClick={this.save}>Update</button></div>
    </div>
</div>
            

           


  


   
</div>

</div>

        </div>)
    }
}

export default (ChangePassword);