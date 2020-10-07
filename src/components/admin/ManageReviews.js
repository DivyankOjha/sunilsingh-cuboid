import React, {Component} from "react";
import Axios from "axios";
import StarRatings from 'react-star-ratings'
import Spinner from "../common/Spinner";
import NavbarAdmin from "./NavbarAdmin";
class ManageReviews extends Component{

    constructor() {
		super()
		this.state = {
      AllReview:[],
      listDel:[],

      currentPage: 1,
    LocationsPerPage: 5,
    allCheck:false
			


		}
    }
    
    componentDidMount(){
      this.setState({loader:true});

       
      var config = {
          method: 'get',
          url: 'https://cuboidtechnologies.com/api/review/admin/get-all-review',
          headers: {
           Accept: 'application/json',
           Authorization: "Bearer " + localStorage.getItem("token"),  
          'content-type': 'application/json',
          
         
      },
          
          
          
        };
        
        Axios(config)
        .then( (response)=> {
          console.log(response);
          this.setState({AllReview:response.data.review,loader:false})
         
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  changeStatus=id=>e=>{
    console.log(id);
    var config = {
      method: 'patch',
      url: 'https://cuboidtechnologies.com/api/review/admin/update-review-status/'+id,
      headers: {
       Accept: 'application/json',
       Authorization: "Bearer " + localStorage.getItem("token"),  
      'content-type': 'application/json',
      
     
  },
      
      
      
    };
    
    Axios(config)
    .then( (response)=> {
      console.log(response);
      alert("status changed for "+id);
     
      
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

      this.state.AllReview.map(r=>{
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
      
        "deletereview":this.state.listDel
    
    }
    var config = {
      method: 'delete',
      url: 'https://cuboidtechnologies.com/api/review/admin/delete-review-by-id',
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
      alert("deleted selected review ");


      var config2 = {
        method: 'get',
        url: 'https://cuboidtechnologies.com/api/review/admin/get-all-review',
        headers: {
         Accept: 'application/json',
         Authorization: "Bearer " + localStorage.getItem("token"),  
        'content-type': 'application/json',
        
       
    },
        
        
        
      };
      
      Axios(config2)
      .then( (respons)=> {
        console.log(respons);
        this.setState({AllReview:respons.data.review,loader:false, allCheck:false})
       
        
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

  filterRating=  event=> {
    console.log("rating");
    console.log(event.target.value);
   
    
    this.setState({ loader:true})

    const data={
      "rating":event.target.value
  }
console.log(data)
    var config = {
      method: 'post',
      url: 'https://cuboidtechnologies.com/api/review/admin/get-review-by-rating',
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
      this.setState({AllReview:response.data.review,loader:false})
     
      
    })
    .catch(function (error) {
      console.log(error);
    });
  

  }

  handleClick = event => {
    console.log("pagi")
    console.log(event.target.id);
    

        this.setState({
          currentPage: Number(event.target.id), allCheck:false
        });
     
  }

  changeItemsPerPage = event => {
    console.log("items", event.target.value);
   
       
        this.setState({
          LocationsPerPage: Number(event.target.value)
        });
    
   
    
  }

  
  pagiNext=e=>{
    if(this.state.currentPage < Math.ceil(this.state.AllReview.length / this.state.LocationsPerPage))
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
    var FinalReview= this.state.AllReview;
    // Logic for displaying Locations
    const indexOfLastLocation = currentPage * LocationsPerPage;
    const indexOfFirstLocation = indexOfLastLocation - LocationsPerPage;

    let Reviews = this.state.AllReview.slice(
      indexOfFirstLocation,
      indexOfLastLocation
    )
    console.log(Reviews)
    Reviews.forEach(Review => {Review.isSelect = boo;
      
      FinalReview.forEach(F=>{
        if(Review._id===F._id){
          F.isSelect=boo
        }
      })
      if(boo){
      list.push(Review._id)
      }
    }) 

    
    this.setState({AllReview: FinalReview,listDel:list})
   
  }
    
    render() {
      console.log(this.state)
     
      const { AllReview, currentPage, LocationsPerPage } = this.state;

      // Logic for displaying Locations
      const indexOfLastLocation = currentPage * LocationsPerPage;
      const indexOfFirstLocation = indexOfLastLocation - LocationsPerPage;
      const currentLocations = AllReview.slice(
        indexOfFirstLocation,
        indexOfLastLocation
      );
      var AllReviewss;
      if(currentLocations){

        AllReviewss=currentLocations.map(r=>{
          return(
            <tr key={r._id}>
      
            <td><input type="checkbox" id={r._id} checked={r.isSelect} onChange={this.checkboxChange} /></td>
            <td> {r.name} </td>
            <td> {r.review} </td>
            <td><div className="star-rating">
            <StarRatings
          rating={r.rating}
          starRatedColor="#f7c508"
         
          numberOfStars={5}
          starDimension="20px"
          starSpacing="2px"
          
        />
                </div>
                </td>
            <td>
            <div>
              <label className="switch">
                  <input type="checkbox" defaultChecked={r.isActive} onChange={this.changeStatus(r._id)}/>
                  <span className="slider"></span>
              </label> 
            </div>
      
            </td>
         
           
          </tr>
      
          
          )
        })
      }
     

    


     // Logic for displaying page numbers
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(AllReview.length / LocationsPerPage);
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

          
<NavbarAdmin class="zmdi zmdi-settings" name="Manage reviews"/>




<div className="table-box">
<div className="datepiker-box flex-end">


<div className="searchbox-right">
<select placeholder="Filter By Rating" onChange={this.filterRating}>
<option>Filter By Rating</option>
  <option>5</option>
  <option>4</option>
  <option>3</option>
  <option>2</option>
  <option>1</option>
</select>

</div>

</div>

<div className="table-responsive">

  {this.state.loader?<Spinner/>:
<table className="table table-hover">
  <thead className="thead-light">
    <tr>
      <th><input type="checkbox" checked={this.state.allCheck} onChange={this.checkedAll}/></th>
      <th>NAME</th>
      <th>REVIEW</th>
      <th>RATING</th>
      <th>STATUS</th>
      
      
      
    </tr>
  </thead>
  <tbody>
   {AllReviewss.length>0?AllReviewss:<div>NO Results Found</div>}

    

    
    
    

    
    
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
<li className="pre-btn"  onClick={this.pagiPrev}>PREVIOUS</li>

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

export default (ManageReviews);