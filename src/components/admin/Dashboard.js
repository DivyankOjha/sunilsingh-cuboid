import React, {Component} from "react";
import Axios from "axios";
import Spinner from "../common/Spinner";
import NavbarAdmin from "./NavbarAdmin";
class Dashboard extends Component{

    constructor() {
		super()
		this.state = {
      newUsers:[],
      summary:[],
			
      loader:true

		}
    }
    componentDidMount(){

     

var config = {
    method: 'get',
    url: 'https://cuboidtechnologies.com/api/admin/dashboard/summary',
    headers: {
     Accept: 'application/json',
     Authorization: "Bearer " + localStorage.getItem("token"),  
    'content-type': 'application/json',
    
   
},
    
    
    
  };
  
  Axios(config)
  .then( (response)=> {
    console.log(response);
    this.setState({summary:response.data.data,
      loader:false
    })
   
    
  })
  .catch(function (error) {
    console.log(error);
  });


  var config2 = {
    method: 'get',
    url: 'https://cuboidtechnologies.com/api/users/admin/newusers',
    headers: {
     Accept: 'application/json',
     Authorization: "Bearer " + localStorage.getItem("token"),  
    'content-type': 'application/json',
    
   
},
    
    
    
  };
  
  Axios(config2)
  .then((response)=> {
    console.log(response);
    this.setState({newUsers:response.data.data})
   
    
  })
  .catch(function (error) {
    console.log(error);
  });

  

    }

    // Status change 

    changeStatus=(id,email)=>e=>{
      e.preventDefault();
      console.log("change")
     
     
      var config = {
        method: 'patch',
        url: 'https://cuboidtechnologies.com/api/users/admin/set-user-status/'+id,
        headers: {
         Accept: 'application/json',
         Authorization: "Bearer " + localStorage.getItem("token"),  
        'content-type': 'application/json',
        
       
    },
        
        
        
      };
      
      Axios(config)
      .then( (response)=> {
        console.log(response);
        alert("status changes for "+email);
       
        
      })
      .catch(function (error) {
        console.log(error);
      });
    
    }


    // delete users

    deleteUser=id=>e=>{
      e.preventDefault();
      console.log(id);
      if(window.confirm("are you sure you want to delete?")){

      var config = {
        method: 'delete',
        url: 'https://cuboidtechnologies.com/api/users/deleteuser/'+id,
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
          newUsers: this.state.newUsers.filter((u)=> {
            return u._id !== id;
          })
        });
        alert("successfull deleted "+id);

        var config2 = {
          method: 'get',
          url: 'https://cuboidtechnologies.com/api/admin/dashboard/summary',
          headers: {
           Accept: 'application/json',
           Authorization: "Bearer " + localStorage.getItem("token"),  
          'content-type': 'application/json',
          
         
      },
          
          
          
        };
        
        Axios(config2)
        .then( (response)=> {
          console.log(response);
          this.setState({summary:response.data.data})
         
          
        })
        .catch(function (error) {
          console.log(error);
        });
      
       
        
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    

    }


    render() {
      console.log(this.state)
     

      var {totalMembers,totalPropertyInquiries,totalcontactusinquiry,totalproperty,totalSubsription}= this.state.summary;
      var newMem=this.state.newUsers;


      if(newMem){
        var users10=newMem.map((nm)=>{
          var isActive=nm.isActive?"Active":"In Active";
          
          return(
          <tr key={nm._id}>
      
      <td>{nm.firstname} {nm.lastname}</td>
<td>{nm.email}</td>
  <td>{nm.mobilenumber?nm.mobilenumber:"--"}</td>
<td> {nm.savedflipbook.length} </td>
<td>Rent</td>
{/* <td> {nm.subscription.usedPoints} </td> */}
          <td>{nm.createdAt.slice(0,10)}</td>
          <td> <select onChange={this.changeStatus(nm._id, nm.email)}>
            <option>{isActive}</option>
            <option>{nm.isActive?"In Active":"Active"}</option>
            </select>  </td>
      <td align="center"><a  onClick={this.deleteUser(nm._id)} className="delete"><i className="fa fa-trash-o"></i></a></td>
    </tr>)

        })
      }

     
        
        
       
        
        return (<div>

<NavbarAdmin class="zmdi zmdi-equalizer" name="Dashboard "/>



{this.state.loader ? <Spinner/>:
<div>
<div className="columbox">
<div className="grid-5">
<div className="total-user-box purple">
<h2>Total member</h2>
<div className="total-k">
        <span> { totalMembers} </span>

<div className="total-k-img">
<img src={require('../../img/chart.png')} alt=""/>

</div>

</div>

</div>

</div>



<div className="grid-5">
<div className="total-user-box green">
<h2>Total subscriber</h2>
<div className="total-k">
<span>{totalSubsription}</span>

<div className="total-k-img">
<img src={require('../../img/chart.png')} alt=""/>

</div>

</div>

</div>

</div>


<div className="grid-5">
<div className="total-user-box blue">
<h2>Total Property</h2>
<div className="total-k">
<span>{totalproperty} </span>

<div className="total-k-img">
<img src={require('../../img/chart.png')} alt=""/>

</div>

</div>

</div>

</div>


<div className="grid-5">
<div className="total-user-box red">
<h2>Total post property inqueries</h2>
<div className="total-k">
        <span>{totalPropertyInquiries}</span>

<div className="total-k-img">
<img src={require('../../img/chart.png')} alt=""/>

</div>

</div>

</div>

</div>



<div className="grid-5">
<div className="total-user-box yellow">
<h2>Total customer inquiry </h2>
<div className="total-k">
        <span>{totalcontactusinquiry}</span>

<div className="total-k-img">
<img src={require('../../img/chart.png')} alt=""/>

</div>

</div>

</div>

</div>




</div>
 
<div className="table-box top-50">
<h3>Newly Register Members</h3>

<div className="table-responsive">
<table className="table table-hover">
  <thead className="thead-light">
    <tr>
    <th>USERNAME</th>
      <th>EMAIL</th>
      <th>PHONE NUMBER</th>
      <th>Saved Flipbook</th>
      <th>SUBSCRIPTION</th>
      {/* <th>Used Points</th> */}
      <th>REGISTRATION DATE</th>
      <th>STATUS</th>
      <th align="center">ACTION</th>
    </tr>
  </thead>
  <tbody>

    {users10}
    

    
  </tbody>
</table>

</div>

</div>
</div>
    }
    
        </div>)
    }
}

export default (Dashboard);