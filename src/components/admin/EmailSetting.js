import React, {Component} from "react";
import Axios from "axios";
import NavbarAdmin from "./NavbarAdmin";

class EmailSetting extends Component{

    constructor() {
		super()
		this.state = {
            host:'',
            username:'',
            password:''
			


		}
    }
    
    componentDidMount(){

        var config = {
          method: 'get',
          url: 'https://cuboidtechnologies.com/api/admin/email/email-settings',
          headers: {
           Accept: 'application/json',
           Authorization: "Bearer " + localStorage.getItem("token"),
          'content-type': 'application/json',
          
         
      },
          
          
          
        };
        
        Axios(config)
        .then( (response)=> {
          console.log(response);
          this.setState({host:response.data.email[0].host,password:response.data.email[0].password,username:response.data.email[0].username,
            loader:false})
         
          
        })
        .catch(function (error) {
          console.log(error);
        });
      
  
        
  
      }

      onSubmit=e=>{

        const data={       
            "host":this.state.host,
             "username":this.state.username,
            "password":this.state.password
            }
        var config = {
            method: 'post',
            url: 'https://cuboidtechnologies.com/api/admin/email/email-settings',
            headers: {
             Accept: 'application/json',
            Authorization: "Bearer " + localStorage.getItem("token"), 
            'content-type': 'application/json',
            
           
        },
        data:data
            
            
            
          };
          
          Axios(config)
          .then( (response)=> {
            console.log(response);
            this.setState({
              loader:false})
           
            
          })
          .catch(function (error) {
            console.log(error);
          });
        
      }
    render() {
      console.log(this.state)
     


     
        
        
       
        
        return (<div>

          
<NavbarAdmin class="zmdi zmdi-settings" name="Manage Email Setting "/>



<div className="general-setting">
<h3>Email Setting</h3>
<div className="add-property-form">
    <div className="row">
        <div className="col-md-6">
<div className="form-group">
    <label>SMTP Host</label>
    <input type="text" className="form-control" name="host" value={this.state.host}   onChange={e => this.setState({host: e.target.value})} />
    </div>
    </div>
    <div className="col-md-6">
<div className="form-group">
    <label>SMTP Username</label>
    <input type="text" className="form-control" name="username" value={this.state.username}  onChange={e => this.setState({username: e.target.value})}/>
    </div>
    </div>

    <div className="col-md-6">
<div className="form-group">
    <label>SMTP Password
</label>
    <input type="password" className="form-control" name="password" value={this.state.password}  onChange={e => this.setState({password: e.target.value})}/>
    </div>
    </div>

    <div className="col-md-12">
    <div className="form-group text-right"><button className="step-next" onClick={this.onSubmit}>Update</button></div>
    </div>


    </div>  
</div>
</div>
            
        </div>)
    }
}

export default (EmailSetting);