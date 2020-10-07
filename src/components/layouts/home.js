import React, {Component} from "react";

import MainNavbar from './mainNavBar';

import Footer from './footer';
import Axios from "axios";
import {Link} from "react-router-dom"
import Spinner from "../common/Spinner";

class Home extends Component {

    state = {
        fullName:"",
        email:"",
        phone:"",
        address:"",
        details:"",
        nationalId:"",
        images:[],
        isPost:false,
        validatefullName:false,
        validatephone:false,
        validateemail:false,
        validatedetails:false,
        validateaddress:false,
        validateid:false,
        validateimages:false,

        
    }
    componentDidMount(){
        window.scrollTo(0, 0)
    }

   
    onUploadNational = event => {
        let files = event.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = e => {
            
            this.setState({nationalId: e.target.result})
        }
       
    
       
    }
     onUploadImages =event => {
        let files = event.target.files;
       

        if(files.length>0)
        
        { 

            for(let file of files){
                let reader = new FileReader();
            
        
            reader.onload = e => {
               
                
                this.setState({images:this.state.images.concat([e.target.result])});
                
                
            }
            reader.readAsDataURL(file);
        }
        
        }
        

        
       
    
       
    }

    onSubmit=e=>{
        e.preventDefault()
        console.log(this.state)
       
        this.setState({
            isPost:true,loader:true
        })
       const data={
      
        
            "name": this.state.fullName,
            "email": this.state.email,
            "phonenumber": this.state.phone,
            "address":this.state.address,
            "propertyDetails": this.state.details,
            "nationalidimage":this.state.nationalId,
            "propertyimage": this.state.images
        
    
        
    }
    if(this.state.validatefullName && this.state.validateemail && this.state.validateaddress &&
        this.state.validatedetails && this.state.validateid && this.state.validateimages &&
        this.state.validatephone ){
    var config = {
        method: 'post',
        url: 'https://cuboidtechnologies.com/api/property/post-property',
        headers: {
         Accept: 'application/json',
        
        'content-type': 'application/json',
        
       
    },
        data : data,
        
        
      };
      
      Axios(config)
      .then( (response)=> {
        console.log(response.data);
        this.setState({loader:false,
            fullName:"",
            email:"",
            phone:"",
            address:"",
            details:"",
            nationalId:"",
            images:[],
            isPost:false,
            validatefullName:false,
            validatephone:false,
            validateemail:false,
            validatedetails:false,
            validateaddress:false,
            validateid:false,
            validateimages:false,
        })
        alert("Successfully Post Property!")
        
      })
      .catch((error)=> {
        console.log(error);
        this.setState({loader:false})
        alert("error in  Post Property!")
      });
  

    }}
    

   
    remove2d=i=>e=>{
        console.log("2d")
        console.log(i);
        console.log( this.state.images);
        var a=this.state.images;
        a.splice(i,1);
  
  
         console.log(a)
        this.setState({images:a})
      }
    
    render() {
        console.log(this.state)

                if (this.state.fullName!=='' && this.state.fullName.match(/^[a-zA-Z ]*$/)){
                this.state.validatefullName=true
                }
                else{
                this.state.validatefullName=false
                }
                if (this.state.phone.length>9 && this.state.phone.length<15){
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

                if (this.state.address!==''){
                this.state.validateaddress=true
                }
                else{
                this.state.validateaddress=false
                }
                if (this.state.details!==''){
                this.state.validatedetails=true
                }
                else{
                this.state.validatedetails=false
                }
                if (this.state.nationalId!==''){
                    this.state.validateid=true
                    }
                    else{
                    this.state.validateid=false
                    }
                    if (this.state.images.length>4){
                        this.state.validateimages=true
                        }
                        else{
                        this.state.validateimages=false
                        }



                        var All2dImg;
                        var j=-1;
                        if(this.state.images.length>0){
                          All2dImg= this.state.images.map(i=>{
                            console.log("insi")
                           
                            console.log(j)
                            j=j+1;
                    
                              return( <li ><img src={i} alt="" /> <span onClick={this.remove2d(j)}><i className="zmdi zmdi-close"></i></span></li>
                    
                              
                              )      
                                
                            })
                        }
        
        return (<div>

            <MainNavbar/>

<div className="banner">
<div className="overlay-banner">
<div className="container">
<div className="row">
<div className="col-md-6">
<div className="banner-img bg1">
<div className="banner-grid">
    <Link to="/house-search">
<h4>Looking for a house to let,
buy or fullyFurnished?</h4>
</Link>

</div>

</div>

</div>

<div className="col-md-6">
<div className="banner-img bg2">
<div className="banner-grid">
<Link to="land-plot-search">
<h4>Looking for Land or a
plot?</h4>
</Link>

</div>

</div>

</div>

<div className="col-md-6">
<div className="banner-img bg3">
<div className="banner-grid">
<Link to="hotel-search">
<h4>Looking for hotel?</h4>
</Link>
</div>

</div>

</div>

<div className="col-md-6">
<div className="banner-img bg4">
<div className="banner-grid">
<Link to="space-office-godown-search">
<h4>Looking for a commercial space,
office or go-down?</h4>
</Link>

</div>

</div>

</div>

</div>

</div>

</div>

</div>

    {/* banner area end */}

    {/* About Section start */}
{/*<div className="about">
<div className="container">
<div className="about-content">
<div className="about-left">
<div className="about-text">
<h2>About <span>Us</span></h2>
<p>Cuboid company was formed with the main aim “to assist property buyers to get their dream properties at the best possible price”. That is why we do not believe in brokerage or in any intermediary that goes between the buyers and property owners. We uphold highest values and ethical standards. We do not go behind the buyer and mark up prices for properties so that we can get a commission.</p>

</div>

</div>

<div className="about-right">
<img src={require('../../img/about-img.png')} alt=""/>

</div>

</div>

</div>

</div>*/}

<div className="about-property">
<div className="container">
<div className="post-property-box" id="post-property-box">
<div className="post-left">
<h3>Post <span>Property</span></h3>

{this.state.loader?<Spinner/>:
<form onSubmit={this.onSubmit}>
<div className="form-group">
<input type="text" className="form-control" placeholder="Name"
value={this.state.fullName}
onChange={e => this.setState({fullName: e.target.value})}
/>
{!this.state.validatefullName && this.state.isPost?(<div className='warning'> Enter a valid full name </div> ):null}
</div>
<div className="form-group">
<input type="email" className="form-control" placeholder="Email"
value={this.state.email}
onChange={e => this.setState({email: e.target.value})}
/>
{!this.state.validateemail && this.state.isPost?(<div className='warning'> Enter a valid email </div> ):null}
</div>
<div className="form-group">
<input type="number" className="form-control" placeholder="Phone Number" value={this.state.phone}
onChange={e => this.setState({phone: e.target.value})}
/>
{!this.state.validatephone && this.state.isPost?(<div className='warning'> Enter a valid mobile no. </div> ):null}
</div>

<div className="form-group">
<input type="text" className="form-control" placeholder="Address" value={this.state.address}
onChange={e => this.setState({address: e.target.value})}
/>
{!this.state.validateaddress && this.state.isPost?(<div className='warning'> Enter a valid address </div> ):null}
</div>

<div className="form-group">
<textarea className="form-control" placeholder="Property Details" value={this.state.details}
onChange={e => this.setState({details: e.target.value})}
></textarea>
{!this.state.validatedetails && this.state.isPost?(<div className='warning'> Enter valid property details </div> ):null}
</div>
<div className="form-group">
<div className="uploadfile form-control">
<label>Upload national Id </label>
<span className="fileinput-button">
           <span className="zmdi zmdi-plus"></span>
            <input type="file"
            onChange={this.onUploadNational}
             /> 
        </span>
          {this.state.nationalId?<div className="img-wrap"> <img className="thumb" src={this.state.nationalId}  /> </div>:""}
</div>
{!this.state.validateid && this.state.isPost?(<div className='warning'> National Id required  </div> ):null}
</div>


<div className="form-group">
<div className="uploadfile form-control">
<label>Upload property images <small>*minimun 5 images</small></label>
<span className="fileinput-button">
           <span className="zmdi zmdi-plus"></span>
            <input type="file" name="files[]" id="files" multiple  accept="image/jpeg, image/png, image/gif"
            onChange={this.onUploadImages}/>
        </span>
        <ul className="file-img">
        {All2dImg}
        </ul>
        {/* <output id="Filelist"></output> */}
</div>
{!this.state.validateimages && this.state.isPost?(<div className='warning'> minimum 5 images required </div> ):null}
</div>

<div className="btn-box">
<button type="submit" className="btn btn-post btn-warning" >Post</button>

</div>
</form>
    }
</div>
<div className="post-right-content">
    <div className="post-text-right">
<h2>Post your property <span>with us</span></h2>
<p>Lorem ipsum dolor sit amet, consectetur
adipiscing elit. Nullam ut scelerisque felis,
at aliquam libero. In elementum orci eu
iaculis vehicula. Nullam ante est, porttitor
vel arcu sed, sollicitudin dapibus dui.
Maecenas finibus est nunc, ac consequat
lacus scelerisque et. Maecenas risus mi,
lacinia a elit in, sollicitudin vehicula justo.
Aliquam varius vitae purus nec tincidunt.
Etiam iaculis, turpis ut feugiat blandit,
lectus ex lacinia tellus, eu dictum nunc
diam sit amet velit.</p>
</div>
    
</div>

</div>

</div>

</div>



{/* About Section end */}

<div className="download-app">
<div className="container">
<div className="row">

    <div className="col-md-3 col-sm-3 col-xs-6">
<div className="global">
<img src={require('../../img/icon-1.png') } alt=""/>
<h4>Our Websites</h4>

</div>

    </div>

    <div className="col-md-3 col-sm-3 col-xs-6">
<div className="global">
<img src={require('../../img/icon-2.png') } alt=""/>
<h4>Download our App<br></br>
from Play store</h4>

</div>

    </div>

    <div className="col-md-3 col-sm-3 col-xs-6">
<div className="global">
<img src={require('../../img/icon-3.png') } alt=""/>
<h4>Download our App<br></br>
from App store</h4>

</div>

    </div>

    <div className="col-md-3 col-sm-3 col-xs-6">
<div className="global">
<img src={require('../../img/icon-4.png') } alt=""/>
<h4>Save us for<br></br>
later</h4>

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




export default (Home);
