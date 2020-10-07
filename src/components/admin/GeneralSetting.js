import React, {Component} from "react";
import Axios from "axios";
import Spinner from "../common/Spinner";
import NavbarAdmin from "./NavbarAdmin";

class GeneralSetting extends Component{

    constructor() {
		super()
		this.state = {
			


		}
    }
    
    componentDidMount(){

       
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
          .then( (response)=> {
            console.log(response);
            this.setState({

            firstName:response.data.data.user.firstname,
        lastName:response.data.data.user.lastname,
        phoneNumber:response.data.data.user.mobilenumber,
        email:response.data.data.user.email,
        loader:false
      })
           
            
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  
    save=(e)=>{
        this.setState({
          isSubmit:true
      })
      if (this.state.firstName!=='' && this.state.firstName.match(/^[a-zA-Z ]*$/)){
        this.state.validatefirstname=true
        }
        else{
            this.state.validatefirstname=false
        }
        if (this.state.lastName!=='' && this.state.lastName.match(/^[a-zA-Z ]*$/)){
          this.state.validatelastname=true
          }
          else{
              this.state.validatelastname=false
          }
        if (this.state.phoneNumber.length>8 && this.state.phoneNumber.length<15){
        this.state.validatephone=true
        }
        else{
            this.state.validatephone=false
        }
        let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        let validEmail= pattern.test(this.state.email)
        if (this.state.email!=='' && validEmail){
    this.state.validateemail=true
    }
    else{
    this.state.validateemail=false
    }
    
        var that = this;
        
         
           const data={
          
            
              "firstname":this.state.firstName,
              "lastname":this.state.lastName,
              "email":this.state.email    ,
              "mobilenumber" : this.state.phoneNumber
          
              
          }
          if (this.state.validatefirstname && this.state.validatelastname && this.state.validateemail
             && this.state.validatephone ){
    
              this.setState({
                loader:true
            })
          var config = {
              method: 'patch',
              url: 'https://cuboidtechnologies.com/api/users/editprofile',
              headers: {
               Accept: 'application/json',
               Authorization: "Bearer " + localStorage.getItem("token"),
              'content-type': 'application/json',
              
             
          },
              data : data,
              
              
            };
            
            Axios(config)
            .then( (response) =>{
              console.log(response.data);
              localStorage.setItem("firstName",response.data.data.user.firstname);
              this.setState({loader:false})
              
              alert("Successfully edited profile!")
              
            })
            .catch(function (error) {
              console.log(error);
            });
        
          }
        }
    render() {
     


     
        
        
       
        
        return (<div>

<NavbarAdmin class="zmdi zmdi-settings" name="Admin General Setting "/>
 

<div className="general-setting">
<h3>General Setting</h3>
{
this.state.loader ? <Spinner/>:

        <div className="general-settingbox">
          <div className="row">

<div className="col-md-6">
<div className="form-group">
            <input type="text" placeholder="Enter FirstName" className="form-control"
              value={this.state.firstName}
              onChange={e => this.setState({firstName: e.target.value})}
            />
            {!this.state.validatefirstname && this.state.isSubmit?(<div className='warning'> Enter a valid first name </div> ):null}
            </div>
</div>

<div className="col-md-6">
<div className="form-group">
            <input type="text" placeholder="Enter lastName" className="form-control"
            value={this.state.lastName}
              onChange={e => this.setState({lastName: e.target.value})}
            />
            {!this.state.validatelastname && this.state.isSubmit?(<div className='warning'> Enter a valid last name </div> ):null}
            </div>

</div>
<div className="col-md-6">
<div className="form-group">
            <input type="number" placeholder="Phone Number" className="form-control"
            value={this.state.phoneNumber}
              onChange={e => this.setState({phoneNumber: e.target.value})}
              />
              {!this.state.validatephone && this.state.isSubmit?(<div className='warning'> Enter a valid phone number </div> ):null}
            </div>
</div>
<div className="col-md-6">
<div className="form-group">
  {/*edit-input*/}
            <input type="email" placeholder="Email Id" className="form-control "
            value={this.state.email}
              onChange={e => this.setState({email: e.target.value})}
            />
            {!this.state.validateemail && this.state.isSubmit?(<div className='warning'> Enter a valid email </div> ):null}
            </div>
</div>
          </div>
            

            

           

            

            <div className="row">


<div className="col-md-12 text-right">
  <button onClick={this.save } className="step-next">Save</button>  
</div>

            </div>

            </div>    






        
        }

</div>




           
        </div>)
    }
}

export default (GeneralSetting);