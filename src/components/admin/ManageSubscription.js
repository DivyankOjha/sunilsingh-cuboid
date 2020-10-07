import React, {Component} from "react";
import Axios from "axios";
import moment from 'moment'; 
import Spinner from "../common/Spinner";
import NavbarAdmin from "./NavbarAdmin";
class ManageSubscription extends Component{

    constructor() {
		super()
		this.state = {
      AllSubscription:[],
      fromDate:'',
      toDate:moment().format("YYYY-MM-DD"),
      listDel:[],

      currentPage: 1,
      LocationsPerPage: 5,
      allCheck:false

			


		}
    }

    componentDidMount(){
      this.setState({loader:true})

       
      var config = {
          method: 'get',
          url: 'https://cuboidtechnologies.com/api/subscription/get-all-subscriptions',
          headers: {
           Accept: 'application/json',
           Authorization: "Bearer " + localStorage.getItem("token"), 
          'content-type': 'application/json',
          
         
      },
          
          
          
        };
        
        Axios(config)
        .then( (response)=> {
          console.log(response);
          this.setState({AllSubscription:response.data.data.subscription,loader:false})
         
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  dateChange= async event=> {
    console.log("date");
    console.log(event.target.value);
   
    
   await this.setState({[event.target.name]:event.target.value, loader:true})

    const data={
      "startDate": this.state.fromDate,
      "endDate" : this.state.toDate
  }
console.log(data)
    var config = {
      method: 'post',
      url: 'https://cuboidtechnologies.com/api/subscription/subscription-filter-by-date',
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
      this.setState({AllSubscription:response.data.data,loader:false})
     
      
    })
    .catch(function (error) {
      console.log(error);
    });
  

  }

  filterRentBuy=  event=> {
    console.log("rent");
    console.log(event.target.value);
   
    
    this.setState({ loader:true})

    const data={
      "subscriptionType":(event.target.value).toLowerCase()
  }
console.log(data)
    var config = {
      method: 'post',
      url: 'https://cuboidtechnologies.com/api/subscription/subscription-filter-by-type',
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
      this.setState({AllSubscription:response.data.data,loader:false})
     
      
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
      this.state.AllSubscription.map(r=>{
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

  delete=e=>{

    if(window.confirm("are you sure you want to delete?")){
      this.setState({loader:true,currentPage:1});
    const data={
      
        "deleteSubscription":this.state.listDel
    
    }
    var config = {
      method: 'delete',
      url: 'https://cuboidtechnologies.com/api/subscription/admin/delete-subscription-by-id',
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
      alert("deleted selected Subscription ");


      var config2 = {
        method: 'get',
        url: 'https://cuboidtechnologies.com/api/subscription/get-all-subscriptions',
        headers: {
         Accept: 'application/json',
         Authorization: "Bearer " + localStorage.getItem("token"),  
        'content-type': 'application/json',
        
       
    },
        
        
        
      };
      
      Axios(config2)
      .then( (respons)=> {
        console.log(respons);
        this.setState({AllReview:respons.data.review,loader:false})
       
        
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


  handleClick = event => {
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

  
  pagiNext=e=>{
    if(this.state.currentPage < Math.ceil(this.state.AllSubscription.length / this.state.LocationsPerPage))
    this.setState({currentPage:(this.state.currentPage+1)})
  }

  pagiPrev=e=>{
    if(this.state.currentPage>1)
    this.setState({currentPage:(this.state.currentPage-1)})
  }


  checkedAll=event=>{
    this.setState({listDel:[], allCheck:event.target.checked});
    var list=[];
    var boo= event.target.checked;
    const {  currentPage, LocationsPerPage } = this.state;
    var FinalSub= this.state.AllSubscription;
    // Logic for displaying Locations
    const indexOfLastLocation = currentPage * LocationsPerPage;
    const indexOfFirstLocation = indexOfLastLocation - LocationsPerPage;

    let Subscriptions = this.state.AllSubscription.slice(
      indexOfFirstLocation,
      indexOfLastLocation
    )
    console.log(Subscriptions)
    Subscriptions.forEach(Sub => {Sub.isSelect = boo;
      
      FinalSub.forEach(F=>{
        if(Sub._id===F._id){
          F.isSelect=boo
        }
      })
      if(boo){
      list.push(Sub._id)
      }
    }) 

    
    this.setState({AllSubscription: FinalSub,listDel:list})
   
  }

    
    render() {
      console.log(this.state);

      const { AllSubscription, currentPage, LocationsPerPage } = this.state;

      // Logic for displaying Locations
      const indexOfLastLocation = currentPage * LocationsPerPage;
      const indexOfFirstLocation = indexOfLastLocation - LocationsPerPage;
      const currentLocations = AllSubscription.slice(
        indexOfFirstLocation,
        indexOfLastLocation
      );


      var AllSub;


      if(currentLocations){
       AllSub= currentLocations.map(s=>{

          return(
          <tr key={s._id}>
          <td><input type="checkbox" checked={s.isSelect} id={s._id} onChange={this.checkboxChange} /></td>
          <td>{s._id}</td>
          <td>{s.email}</td>
          <td>{s.userID}</td>
          <td>{s.subscriptionType}</td>
          <td>${s.subscriptionAmount}</td>
          <td>{s.usedPoints}</td>
          
          
          <td>{s.subscriptionDate.slice(0,10)}</td>
          
         
          
          </tr>)
        })
      }


      // Logic for displaying page numbers
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(AllSubscription.length / LocationsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      console.log(number)
      return (
        <li key={number} id={number} onClick={this.handleClick}>
          {number}
        </li>
      );
    });
     


     
        
        
       
        
        return (<div>

<NavbarAdmin class="zmdi zmdi-comments" name="Manage Subscription"/>



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
<select className="form-control" placeholder="Subscription Type" onChange={this.filterRentBuy}>
<option>Filter By Type</option>
  <option>Rent</option>
  <option>Buy</option>
</select>

</div>

</div>

<div className="table-responsive">
{this.state.loader?
    <Spinner/>
    :
<table className="table table-hover">
  <thead className="thead-light">
    <tr>
      <th><input type="checkbox" checked={this.state.allCheck} onChange={this.checkedAll}/></th>
      <th>OrderId</th>
      <th>EMAIL</th>
      <th>USERID</th>
      <th>SUBSCRIPTION TYPE</th>
      <th>AMOUNT</th>
      
     
      
      <th>USED POINTS </th>
      <th>SUBNCRIPTION DATE</th>
      
      
    </tr>
  </thead>
  <tbody>
   
    {AllSub.length>0?AllSub:<div>NO Result Found</div>}
    
    
    
  </tbody>
</table>
    }

</div>

<div className="member-delectbox">
<a  className="delect_btn" onClick={this.delete}>Delete</a>

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

export default (ManageSubscription);