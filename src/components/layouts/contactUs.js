import React, {Component} from "react";

import MainNavbar from './mainNavBar';

import Footer from './footer';
import Axios from "axios";


class ContactUs extends Component {

    state = {
        name:"",
        phone:"",
        email:"",
        comment:"",
        pincode:"",
        address:"",
        isSend:false,
        validatename:false,
        validatephone:false,
        validateemail:false,
        validatecomment:false,
        validatepincode:false,
        validateaddress:false,
    }
    
    componentDidMount(){
        window.scrollTo(0, 0)
    }

   submit=e=>{
       e.preventDefault();
       console.log(this.state)
       this.setState({
        isSend:true
    })
       const data={
        
            "name":this.state.name,
            "email":this.state.email,
            "mobilenumber": this.state.phone,
            "comment": this.state.phone,
            "code": this.state.pincode,
            "address": this.state.address
        
    }
    if (this.state.name!=='' && this.state.name.match(/^[a-zA-Z ]*$/)){
        this.state.validatename=true
        }
        else{
            this.state.validatename=false
        }
       
        if (this.state.phone.length>9 && this.state.phone.length<15){
        this.state.validatephone=true
        }
        else{
            this.state.validatephone=false
        }
        if (this.state.email!==''){
            let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            let validEmail= pattern.test(this.state.email)

            if (validEmail) {
    this.state.validateemail=true
}
else{
    this.state.validateemail=false
}

        }
        if (this.state.pincode!==''){
        this.state.validatepincode=true
        }
        else{
            this.state.validatepincode=false
        }
        if (this.state.address!==''){
        this.state.validateaddress=true
        }
        else{
            this.state.validateaddress=false
        }
        if (this.state.comment!==''){
            this.state.validatecomment=true
            }
            else{
                this.state.validatecomment=false
            }
    if(this.state.validatename && this.state.validateemail && this.state.validateaddress &&
        this.state.validatephone && this.state.validatepincode && this.state.validatecomment ){
    var config = {
        method: 'post',
        url: 'https://cuboidtechnologies.com/api/inquiry/add-new',
        headers: {
         Accept: 'application/json',
         
        'content-type': 'application/json',
        
       
    },
        data : data,
        
        
      };
      
      Axios(config)
      .then( (response)=> {
        console.log(response.data);
       
        alert("Successfullly Sent your inquiry")
        this.setState({
            name:'',
            email:'',
            phone:'',
            phone:'',
            pincode:'',
            address:''
        })
        
      })
      .catch(function (error) {
        console.log(error);
      });
  
    }
   }

    
    render() {
               
                        
        
        return (<div>

            <MainNavbar/>
            <div className="main-user-content">
    <img src={require('../../img/edit-profile.jpg')}  alt="" />
    
</div>

<div className="contact-title">
<div className="container"><h2>Contact Us</h2></div>
</div>
<div className="contact-main">
    <div className="container">
        <div className="row">
            <div className="col-md-6">
              <div className="query">
                  <h3>Have a Query?</h3>
                  <p>Just Fill the Below Information.</p>
                  <form onSubmit={this.submit}>
                  <div className="form-group">
                      <input required type="text" placeholder="Name" className="form-control" value={this.state.name}
                       onChange={e => this.setState({ name: e.target.value})} 
                      />
                      {!this.state.validatename && this.state.isSend?(<div className='warning'> Enter a valid name </div> ):null}
                  </div>
                  <div className="form-group">
                      <input type="number" placeholder="Phone Number" className="form-control" value={this.state.phone}
                       onChange={e => this.setState({phone: e.target.value})} 
                      />
                      {!this.state.validatephone && this.state.isSend?(<div className='warning'> Enter a valid mobile no. </div> ):null}
                  </div>
                  <div className="form-group">
                      <input type="email" placeholder="Email" className="form-control" value={this.state.email}
                       onChange={e => this.setState({email: e.target.value})} 
                      />
                      {!this.state.validateemail && this.state.isSend?(<div className='warning'> Enter a valid email </div> ):null}
                  </div>
                  <div className="form-group">
                      <input type="text" placeholder="Comment" className="form-control" value={this.state.comment}
                       onChange={e => this.setState({ comment: e.target.value})} 
                      />
                      {!this.state.validatecomment && this.state.isSend?(<div className='warning'> Enter a comment </div> ):null}
                  </div>
                  <div className="form-group">
                      <input type="number" placeholder="Enter Pin Code" className="form-control" value={this.state.pincode}
                       onChange={e => this.setState({pincode: e.target.value})} 
                      />
                      {!this.state.validatepincode && this.state.isSend?(<div className='warning'> Enter a valid pin code </div> ):null}
                  </div>
                  <div className="form-group">
                      <textarea className="form-control" placeholder="Address" className="form-control" value={this.state.address}
                       onChange={e => this.setState({address: e.target.value})} 
                      ></textarea>
                      {!this.state.validateaddress && this.state.isSend?(<div className='warning'> Enter address </div> ):null}
                  </div>
                  <div className="form-group">
                      <button type="submit" className="btn btn-send " >Send</button>
                  </div>
                  </form>
                  </div>  
            </div>

<div className="col-md-6">

<div className="query">
                  <h3>How to Reach?</h3>

                  <div className="cuboid-address">
                <div className="address-title">
                    <h4>CUBOID</h4>
                    <p>Loreum epsum sit dolor emit <br />
                        loreum epsum</p>
                </div>

                  </div>

                  <div className="contact-number">
                    <div className="phone-icon">
                   <a href="tel:+XXXXXXXXXX"><i className="zmdi zmdi-phone"></i> <br />
                   +XXXXXXXXXX
                   </a>
                    </div>

                    <div className="phone-icon">
                   <a href="mailto:xyz@gmail.com"><i className="fa fa-envelope"></i> <br />
                   xyz@gmail.com
                   </a>
                    </div>

                  </div>
                  
                  </div>
</div>

<div className="col-md-12">
<div className="map">
    <h2>Our Location</h2>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317715.71192633547!2d-0.3817840693070167!3d51.52873519756609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sin!4v1596758430055!5m2!1sen!2sin" width="100%" height="450" frameBorder="0"  allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
</div>

</div>


        </div>
    </div>
</div>

<Footer/>
        
        </div>
        )
    }
}




export default (ContactUs);
