import React, {Component} from "react";
import Axios from "axios";
import moment from 'moment'; 
import Spinner from "../common/Spinner";
import NavbarAdmin from "./NavbarAdmin";
class ManageMember extends Component{

    constructor() {
		super()
		this.state = {
      AllUser:[],
      fromDate:"",
      toDate:moment().format("YYYY-MM-DD"),
      listDel:[],
      loader:true,

      currentPage: 1,
      LocationsPerPage: 5,
      allCheck:false
      


		}
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
      var x =window.confirm("are you sure you want to delete this "+id);
      if( x){

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
          AllUser: this.state.AllUser.filter((u)=> {
            return u._id !== id;
            
          })
        });
        alert("successfull deleted "+id);

        
       
        
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    }

     dateChange= async event=> {
      console.log("date");
      console.log(event.target.value);
     
      
     await this.setState({[event.target.name]:event.target.value})

     if(this.state.fromDate!=''
     
     &&
     this.state.toDate!=''
     ){
      this.setState({loader:true});

      const data={
        "startDate": this.state.fromDate,
        "endDate" : this.state.toDate
    }
  console.log(data)
      var config = {
        method: 'post',
        url: 'https://cuboidtechnologies.com/api/users/admin/user-filter-by-date',
        headers: {
         Accept: 'application/json',
         Authorization: "Bearer " + localStorage.getItem("token"),  
        'content-type': 'application/json',
        
       
    },
    data:data,
        
        
        
      };
      
      Axios(config)
      .then( (response)=> {
        console.log(response);
        this.setState({AllUser:response.data.data,loader:false})
       
        
      })
      .catch(function (error) {
        console.log(error);
      });
    
    }
    }

    searchUser=e=>{
      this.setState({loader:true})
      const data={
        
          "searchquery": e.target.value 
        
        
        
        
        
    }
  console.log(data)
      var config = {
        method: 'post',
        url: 'https://cuboidtechnologies.com/api/users/admin/search-user',
        headers: {
         Accept: 'application/json',
         Authorization: "Bearer " + localStorage.getItem("token"),  
        'content-type': 'application/json',
        
       
    },
    data:data,
        
        
        
      };
      
      Axios(config)
      .then( (response)=> {
        console.log(response);
        this.setState({AllUser:response.data.data,loader:false})
       
        
      })
      .catch(function (error) {
        console.log(error);
      });
    

    

    


    }
    

    componentDidMount(){
      var config = {
        method: 'get',
        url: 'https://cuboidtechnologies.com/api/users/admin/allusers-list',
        headers: {
         Accept: 'application/json',
         Authorization: "Bearer " + localStorage.getItem("token"),  
        'content-type': 'application/json',
        
       
    },
        
        
        
      };
      
      Axios(config)
      .then( (response)=> {
        console.log(response);
        this.setState({AllUser:response.data.data,loader:false})
       
        
      })
      .catch(function (error) {
        console.log(error);
      });
    

      
    }
    handleCheck(val) {
      return this.state.listDel.some(item => val === item);
     }

    checkboxChange=e=>{
      
        const id = e.target.id;
        console.log(id);

        this.state.AllUser.map(r=>{
          if( r._id==id){
            r.isSelect=!r.isSelect;
          }
         })
     
     
      var v=this.handleCheck(id)==true?true:false;
     
if(!v){
        this.setState( {
          listDel:this.state.listDel.concat(id)
        }
         
            )
      }
      else{
        var a=this.state.listDel;
        var i= a.indexOf(id)
        a.splice(i,1);
        // this.state.listDel.pop(id)
        this.setState( {
          listDel:a
        })

      } 
     

    }

    handleClick = e => {
      e.preventDefault()
      // this.setState(prevState => {
      //   return {
      //     AllUser: prevState.AllUser.filter(li => !li.isActive)
      //   };
      // });
      if(window.confirm("are you sure you want to delete?")){
      var delet=this.state.listDel;
      const data={
        "deleteuser" : delet
  
      }

      var config = {
        method: 'delete',
        url: 'https://cuboidtechnologies.com/api/users/deletemany',
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
        delet.map(li=>this.state.AllUser.pop(li))
        this.setState({
          AllUser:this.state.AllUser, listDel:[]
        })
       
        
      })
      .catch(function (error) {
        console.log(error);
      });

    }
    };


    handleClickPagi = event => {
      console.log("pagi")
      console.log(event.target.id)
      this.setState({
        currentPage: Number(event.target.id), allCheck:false
      });
    };
  
    changeItemsPerPage = event => {
      console.log("items", event.target.value);
      this.setState({
        LocationsPerPage: Number(event.target.value)
      });
    };

    checkedAll=event=>{
      this.setState({listDel:[], allCheck:event.target.checked});
      var list=[];
      var boo= event.target.checked;
      const {  currentPage, LocationsPerPage } = this.state;
      var FinalUser= this.state.AllUser;
      // Logic for displaying Locations
      const indexOfLastLocation = currentPage * LocationsPerPage;
      const indexOfFirstLocation = indexOfLastLocation - LocationsPerPage;
  
      let Users = this.state.AllUser.slice(
        indexOfFirstLocation,
        indexOfLastLocation
      )
      console.log(Users)
      Users.forEach(user => {user.isSelect = boo;
        
        FinalUser.forEach(F=>{
          if(user._id===F._id){
            F.isSelect=boo
          }
        })
        if(boo){
        list.push(user._id)
        }
      }) 
  
      
      this.setState({AllUser: FinalUser,listDel:list})
     
    }
    
    pagiNext=e=>{
      if(this.state.currentPage < Math.ceil(this.state.AllUser.length / this.state.LocationsPerPage))
      this.setState({currentPage:(this.state.currentPage+1)})
    }

    pagiPrev=e=>{
      if(this.state.currentPage>1)
      this.setState({currentPage:(this.state.currentPage-1)})
    }
      
    render() {
      console.log(this.state);

      const { AllUser, currentPage, LocationsPerPage } = this.state;

      // Logic for displaying Locations
      const indexOfLastLocation = currentPage * LocationsPerPage;
      const indexOfFirstLocation = indexOfLastLocation - LocationsPerPage;
      const currentLocations = AllUser.slice(
        indexOfFirstLocation,
        indexOfLastLocation
      );
     



     if(currentLocations){
      var AllUsers= currentLocations.map(nm=>{
        var isActive=nm.isActive?"Active":"In Active";

        return(

<tr key={nm._id}>
<td><input type="checkbox" checked={nm.isSelect} id={nm._id}  onChange={this.checkboxChange}  /> </td>     
{/* checked={this.state.AllCheck} */}

  <td>{nm.firstname} {nm.lastname}</td>
<td>{nm.email}</td>
  <td>{nm.mobilenumber?nm.mobilenumber:"--"}</td>
<td> {nm.savedflipbook.length} </td>
<td>Rent</td>
{/* <td> {nm.subscription.usedPoints} </td> */}
  <td>{nm.createdAt.slice(0,10)}</td>
  <td> <select onChange={this.changeStatus(nm._id,nm.email)}>
    <option>{isActive}</option>
    <option>{nm.isActive?"In Active":"Active"}</option>
    </select>  </td>
<td align="center"><a onClick={this.deleteUser(nm._id)} className="delete"><i className="fa fa-trash-o"></i></a></td>
</tr>

        )
       })
     }


     
      // Logic for displaying page numbers
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(AllUser.length / LocationsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      console.log(number)
      return (
        <li key={number} id={number} onClick={this.handleClickPagi}>
          {number}
        </li>
      );
    });

     
        
        
       
        
        return (<div>

<NavbarAdmin class="zmdi zmdi-account-circle" name="Manage Member "/>




<div className="table-box">
<div className="datepiker-box">
<div className="filterbox">
    <span>Filter</span>
    
<div className="datebox">
<span><b>From</b></span>

  <input type="date" placeholder="from" name="fromDate" onChange={this.dateChange} />
  <span><b>To</b></span>
  <input type="date" placeholder="To" name="toDate" value={this.state.toDate} onChange={this.dateChange} />


</div>
</div>

<div className="searchbox-right">
<input type="text" placeholder=" Enter Member Name.." onChange={this.searchUser}/>
<i className="zmdi zmdi-search"></i>

</div>

</div>
{this.state.loader ? <Spinner/>:
<div className="table-responsive">
<table className="table table-hover">
  <thead className="thead-light">
    <tr>
    <th><input type="checkbox" checked={this.state.allCheck} onChange={this.checkedAll} /> </th>
      
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
    

    {AllUsers.length>0?AllUsers:<div>NO Results Found</div>}

    
    
  </tbody>
</table>

</div>
    }
<div className="member-delectbox">
<a  className="delect_btn" onClick={this.handleClick}>Delete</a>

</div>

</div>

<div className="pageination-box">
<ul>
<li className="pre-btn" onClick={this.pagiPrev}>PREVIOUS</li>
{/* <li className="next-slide">01</li>
<li>02</li> */}
{renderPageNumbers}
<li className="next-btn next-slide" onClick={this.pagiNext}>NEXT</li>
<li className="dropdown peritem">
<select  onChange={this.changeItemsPerPage}>
    <option value={5}>5 Items / Page</option>
    <option value={10}>10 Items / Page</option>
    <option value={15}>15 Items / Page</option>
  </select>

</li>

</ul>

</div>


        </div>)
    }
}

export default (ManageMember);