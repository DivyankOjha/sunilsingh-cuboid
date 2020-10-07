import React, {Component} from "react";
import MainNavBar from "../../layouts/mainNavBar";
import Footer from "../../layouts/footer";
import { Link } from "react-router-dom";
import Axios from "axios";
class SearchResult extends Component{

    constructor() {
		super()
		this.state = {
      AllResults:[],
      total:0
			


		}
    }
    componentDidMount(){
      this.setState({AllResults:this.props.location.state.results,total:this.props.location.state.total}
        )

        try {
          setInterval(async () => {

        var config = {
          method: 'patch',
          url: 'https://cuboidtechnologies.com/api/subscription/subscription-update-points/'+localStorage.getItem('userId'),
          headers: {
           Accept: 'application/json',
           Authorization: "Bearer " + localStorage.getItem("token"),
          'content-type': 'application/json',
          
         
      },
          
          
          
        };
        
        Axios(config)
        .then( (response)=> {
          console.log(response);
          
         
          
        })
        .catch(function (error) {
          console.log(error);
        });
      }, 
      
      
    60000
    
    
    
    );
    } catch(e) {
      console.log(e);
    }
  
        
  

    }

    saveFlipbook=id=>e=>{
      e.preventDefault();
      console.log("save")
      console.log(id);
      var a=this.state.AllResults

      a.map(r=>{
        if( r._id==id){
          r.isSaved=!r.isSaved;
        }
       })
       this.setState({AllResults:a})

      const data={
        
        "userID":localStorage.getItem("userId"),
    "propertyId":id
     
         
     }
    
     var config = {
         method: 'patch',
         url: 'https://cuboidtechnologies.com/api/admin/flipbook/save-flipbook',
         headers: {
          Accept: 'application/json',
          Authorization: "Bearer " + localStorage.getItem("token"),
         'content-type': 'application/json',
         
        
     },
         data : data,
         
         
       };
 
       console.log(data)
     
       Axios(config)
       .then( (response)=> {
         console.log(response);
        //  alert("Flipbook Saved")
        
         
       })
       .catch(function (error) {
         console.log(error);
       });
   
    }
    render() {
      console.log(this.props.location.state.total);
      console.log(this.props.location.state.results);
      console.log(this.props.location.state)

      var Results, k=-1;
      if(this.state.AllResults){
      Results= this.state.AllResults.map(r=>{
        k=k+1;
        return( <div className={k==0?"item active":"item"}>
         <img src={require('../../../img/bg-flipimg.png')} alt="" />
        <div className="flipmain">
  <div className="fulldiv">
  <Link to="/" className="back_btn"><i className="zmdi zmdi-arrow-back"></i> Perform Another Search</Link>
      <div className="save-flip">
  {r.isSaved?<a  className="save_btn" >Saved</a>
  :<a  className="save_btn" onClick={this.saveFlipbook(r._id)}>Save FlipBook</a>} 
  <a href={"/flipbook/"+r._id} className="open_btn" target="_blank">Open FlipBook</a>
  
  
      </div>
  </div>
  
        </div>
      </div>)

      })
    }


     
        var pagination;
        var t=this.state.total;

        var Results, k=0;
      if(this.state.AllResults){
      pagination= this.state.AllResults.map(r=>{
        k=k+1;
return(<li data-target="#myCarousel" data-slide-to={k-1} className={k==0?"active":""}>{k}</li>)
      })}
        
       
        
        return (<div>
            <MainNavBar/>
            
           <div className="search-result">Dear {localStorage.getItem("firstName")} your search has <span> {this.state.total} </span> results</div>
           
           {this.state.AllResults.length>0?
           <div id="myCarousel" className="carousel slide banner-filp" data-ride="carousel">
           <div className="container">
  {/*<ol className="carousel-indicators">
    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
    <li data-target="#myCarousel" data-slide-to="1"></li>
    <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>*/}


  <div className="carousel-inner">

    {Results}

    

    

    
  
    

  </div>
 


  <a className="left carousel-control" href="#myCarousel" data-slide="prev">
    <span className="glyphicon glyphicon-chevron-left"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="right carousel-control" href="#myCarousel" data-slide="next">
    <span className="glyphicon glyphicon-chevron-right"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
<div className="pagination-banner">
  <div className="container">
  <div className="pagebtn">
    <a className="prev_banner" href="#myCarousel" data-slide="prev"><i className="zmdi zmdi-arrow-left"></i> PREVIOUS</a>
<ul>
    

   {pagination}
        </ul>
        <a className="next_banner" href="#myCarousel" data-slide="next">Next <i className="zmdi zmdi-arrow-right"></i> </a>
        </div>
        </div>
</div>
           </div> 
           
          :<div className="container"><div className="no-search">No Results Found</div></div>}


            <Footer/>
        </div>)
    }
}

export default (SearchResult);