import React, {Component} from "react";
import Axios from "axios";
import moment from 'moment'; 
import Spinner from "../common/Spinner";
import NavbarAdmin from "./NavbarAdmin";
class CustomerInquiry extends Component{

    constructor() {
		super()
		this.state = {
      fromDate:"",
      toDate:moment().format("YYYY-MM-DD"),
      AllContactInquiry:[],

      listDel:[]
      ,
      currentPage: 1,
      LocationsPerPage: 5,

      subject:"",
      message:"",
      isMail:false,
      allCheck:false


		}
    }
    handleChange=e=>{
       
  
        
      this.setState({[e.target.name]:e.target.value})

    }

   
    handleCheck(val) {
      return this.state.listDel.some(item => val === item);
     }

    checkboxChange=e=>{
      
        const id = e.target.id;
        console.log(id);

        this.state.AllContactInquiry.map(r=>{
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

    ReplyToAll = e => {
      e.preventDefault()
      this.setState({loader:true})
      this.setState({isMail:true})
      if(this.state.subject!=='' && this.state.message!=='' &&this.state.listDel.length>0){

      var singleMulti;
      if(this.state.listDel){

        singleMulti= this.state.listDel.length>1?true:false
      }
     
      const data={
        "reciever":this.state.listDel,
        "subject":[this.state.subject],
        "message":[this.state.message]
    }

      var config = {
        method: 'post',
        url: 'https://cuboidtechnologies.com/api/inquiry/admin/customer-inquiry-email-reply',
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
          subject:'',message:'', listDel:[],loader:false,isMail:false
        })

        singleMulti?
        alert('Successfully sent reply to all selected') :
        alert('Successfully Sent')
       
        
      })
      .catch(function (error) {
        console.log(error);
      });

    }
    };
    reply=id=>e=>{
      this.setState({listDel:[id]})

    }

    
    componentDidMount(){
      this.setState({loader:true})

      var config = {
        method: 'get',
        url: 'https://cuboidtechnologies.com/api/inquiry/admin/get-all-customer-inquiry',
        headers: {
         Accept: 'application/json',
         Authorization: "Bearer " + localStorage.getItem("token"),  
        'content-type': 'application/json',
        
       
    },
        
        
        
      };
      
      Axios(config)
      .then( (response)=> {
        console.log(response);
        this.setState({AllContactInquiry:response.data.inquiry,
          loader:false})
       
        
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
        url: 'https://cuboidtechnologies.com/api/inquiry/admin/customer-inquiry-filter-by-date',
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
        this.setState({AllContactInquiry:response.data.data,loader:false})
       
        
      })
      .catch(function (error) {
        console.log(error);
      });
    

    }

    searchCustomer=e=>{

      this.setState({loader:true})
      const data={
        
          "searchquery": e.target.value 
        
        
        
        
        
    }
  console.log(data)
      var config = {
        method: 'post',
        url: 'https://cuboidtechnologies.com/api/inquiry/admin/search-customer-inquiry',
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
        if(response.data.data){

        
        this.setState({AllContactInquiry:response.data.data,loader:false})
        }
        else{
          this.setState({AllContactInquiry:[],loader:false})
        }
        
      })
      .catch(function (error) {
        console.log(error);
      });
    

    

    


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
      if(this.state.currentPage < Math.ceil(this.state.AllContactInquiry.length / this.state.LocationsPerPage))
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
      var FinalInquiry= this.state.AllContactInquiry;
      // Logic for displaying Locations
      const indexOfLastLocation = currentPage * LocationsPerPage;
      const indexOfFirstLocation = indexOfLastLocation - LocationsPerPage;
  
      let Reviews = this.state.AllContactInquiry.slice(
        indexOfFirstLocation,
        indexOfLastLocation
      )
      console.log(Reviews)
      Reviews.forEach(Review => {Review.isSelect = boo;
        
        FinalInquiry.forEach(F=>{
          if(Review._id===F._id){
            F.isSelect=boo
          }
        })
        if(boo){
        list.push(Review._id)
        }
      }) 
  
      
      this.setState({AllContactInquiry: FinalInquiry,listDel:list})
     
    }
  


    render() {
      console.log(this.state)

      const { AllContactInquiry, currentPage, LocationsPerPage } = this.state;

      // Logic for displaying Locations
      const indexOfLastLocation = currentPage * LocationsPerPage;
      const indexOfFirstLocation = indexOfLastLocation - LocationsPerPage;
      const currentLocations = AllContactInquiry.slice(
        indexOfFirstLocation,
        indexOfLastLocation
      );
     
     

      var AllCustomerInquires;

      if(currentLocations){
        AllCustomerInquires= currentLocations.map(pp=>{

        return(
        <tr key={pp._id}>
      
          <td><input type="checkbox" checked={pp.isSelect} id={pp._id} onChange={this.checkboxChange}/></td>
          <td>{pp.username} </td>
          <td>{pp.userEmail} </td>
          
          <td>{pp.message} </td>
          <td>{pp.flipbookName} </td>
          <td>{pp.sellerName} </td>
          <td>{pp.sellerEmail} </td>
          
          
          
          <td><a className="reply-btn" data-toggle="modal" data-target="#myModal" onClick={this.reply(pp._id)}>REPLY</a></td>
         
        </tr>)
      })

    }
     


     
        
        
      // Logic for displaying page numbers
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(AllContactInquiry.length / LocationsPerPage);
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

<NavbarAdmin class="zmdi zmdi-calendar-alt" name="Customer Inquiry "/>




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
<input type="text" placeholder="Enter email" onChange={this.searchCustomer}/>
<i className="zmdi zmdi-search"></i>

</div>

</div>
{
this.state.loader ? <Spinner/>:

<div className="table-responsive">
<table className="table table-hover">
  <thead className="thead-light">
    <tr>
      <th><input type="checkbox" checked={this.state.allCheck} onChange={this.checkedAll} /></th>
      <th>USER NAME</th>
      <th>USER EMAIL</th>
      <th>MESSAGE</th>
      <th>FLIPBOOK</th>
      <th>SELLER NAME</th>
      <th>SELLER EMAIL</th>
      
      <th>Action</th>
      
      
    </tr>
  </thead>
  <tbody>
  {AllCustomerInquires.length>0?AllCustomerInquires:<div>No Records Found</div>}
    
    
  </tbody>
</table>

</div>}

<div className="member-delectbox">
<a data-toggle="modal" data-target="#myModal" className="reply-btn">REPLY</a>

</div>

</div>

<div className="pageination-box">
<ul>
<li className="pre-btn"  onClick={this.pagiPrev}>PREVIOUS</li>
{/* <li className="next-slide">01</li>
<li>02</li> */}
{renderPageNumbers}
<li className="next-btn next-slide" onClick={this.pagiNext}>NEXT</li>
<li className="dropdown peritem"  >
<select  onChange={this.changeItemsPerPage}>
    <option value={5}>5 Items / Page</option>
    <option value={10}>10 Items / Page</option>
    <option value={15}>15 Items / Page</option>
  </select>
</li>

</ul>

</div>
<div id="myModal" className="modal fade" role="dialog">
  <div className="modal-dialog ">

   
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Property Inquiry</h4>
      </div>
      <div className="modal-body">

      {this.state.listDel.length==0 && this.state.isMail ? <div className="warning">* Select atleast one Inquiry</div>:""}


      <div className="form-group">
        <label>Subject</label>
        <input type="text" className="form-control " name="subject" value={this.state.subject} onChange={this.handleChange}/>
      </div>

      {this.state.subject=='' && this.state.isMail ? <div className="warning">* Required</div>:""}


      <div className="form-group">
        <label>Message</label>
        <textarea className="form-control height" name="message" value={this.state.message} onChange={this.handleChange} ></textarea>
      </div>

      {this.state.message=='' && this.state.isMail ? <div className="warning">* Required</div>:""}



      <div className="form-group text-right">
        <button className="step-next" onClick={this.ReplyToAll} >Reply</button>
      </div>

      </div>
      
    </div>

  </div>
</div>

        </div>)
    }
}

export default (CustomerInquiry);