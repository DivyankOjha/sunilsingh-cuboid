import React, {Component} from "react";
import $, { data } from "jquery";
import Axios from "axios";
import StarRatings from "react-star-ratings";
import Spinner from "../common/Spinner";




class Flipbook extends Component {

    constructor() {
          super()
          this.scroll = this.scroll.bind(this);
          this.scroll1 = this.scroll1.bind(this);

          this.state={
            title:'',
            description:'',
            image2d:[],
            image3d:'',
            showAttributes:[],
            floorPlan:[],
            link360:'',
            banner:'',
            description2:'',
            otherdetails:'',
            seller:[],
            rating:0,
            loader:false,
            imgIndex:0

          }
         
         
    }
    
    scroll(direction) {
      let far = $('.image-container').width() / 2 * direction;
      let pos = $('.image-container').scrollLeft() + far;
      $('.image-container').animate({ scrollLeft: pos }, 1000);
    }

    scroll1(direction) {
      let far = $('.thamalisslider-main').width() / 2 * direction;
      let pos = $('.thamalisslider-main').scrollLeft() + far;
      $('.thamalisslider-main').animate({ scrollLeft: pos }, 1000);
    }

    componentDidMount(){

    var id = this.props.match.params.id;
    this.setState({loader:true})
      var config = {
        method: 'get',
        url: 'https://cuboidtechnologies.com/api/admin/flipbook/get-flipbook-by-id/'+id,
        headers: {
         Accept: 'application/json',
         Authorization: "Bearer " + localStorage.getItem("token"),
        'content-type': 'application/json',
        
        
       
    },
        
        
        
      };
      
      Axios(config)
      .then((response)=> {
        console.log(response.data);

        this.setState({
          title:response.data.flipbook.flipbook.title,
          description:response.data.flipbook.flipbook.description,
          image2d:response.data.flipbook.flipbook.image2D,
          image3d:response.data.flipbook.flipbook.image3D,
          showAttributes:response.data.flipbook.flipbook.showAttributes,
          link360:response.data.flipbook.flipbook.tour360Property,
          floorPlan:response.data.flipbook.flipbook.floorPlan,
          banner:response.data.flipbook.flipbook.flipbookBanner,
          description2:response.data.flipbook.propertyDetails.propertyDescription,
          otherdetails:response.data.flipbook.propertyDetails.otherDetails,
          seller:response.data.flipbook.sellerDetails,
          similarProperty:response.data.flipbook.propertyDetails.selectSimilarProperties,
          propertyDetails:response.data.flipbook.propertyDetails,
          loader:false,
          categoryType : response.data.flipbook.categoryType,
          attributeValue:response.data.flipbook.attributes

           
        })
        
        
  
        
       
        
      })
      .catch(function (error) {
        console.log(error);
      });
      
      const data={
        "propertyID":id
    }

      var config2 = {
        method: 'post',
        url: 'https://cuboidtechnologies.com/api/review/admin/get-reviews-by-property-id',
        headers: {
         Accept: 'application/json',
         Authorization: "Bearer " + localStorage.getItem("token"),
        'content-type': 'application/json',
        
        
       
    },
    data:data
        
        
        
      };
      
      Axios(config2)
      .then((response)=> {
        console.log(response);

        this.setState({
          ReviewByProperty:response.data.getReviews
         
           
        })
        
        
  
        
       
        
      })
      .catch(function (error) {
        console.log(error);
      });


      var config3 = {
        method: 'get',
        url: 'https://cuboidtechnologies.com/api/property/admin/get-property-neighbourhood/'+id,
        headers: {
         Accept: 'application/json',
         Authorization: "Bearer " + localStorage.getItem("token"),
        'content-type': 'application/json',
        
        
       
    },
        
        
        
      };
      
      Axios(config3)
      .then((response)=> {
        console.log(response);

        this.setState({
          Neighborhood:response.data.property
           
        })
        
        
  
        
       
        
      })
      .catch(function (error) {
        console.log(error);
      });
    

  
  
  
  
    }
    changeRating =( newRating )=> {
      this.setState({
        rating: newRating
      });
    }

    postReview=e=>{
      var pid = this.props.match.params.id;
      const data={
        
        "review":this.state.reviewText,
        "rating":this.state.rating,
        "userId":localStorage.getItem("userId"),
        "propertyID":pid
    }

      
   
  
    var config = {
      method: 'post',
      url: 'https://cuboidtechnologies.com/api/review/post-review',
      headers: {
       Accept: 'application/json',
       Authorization: "Bearer " + localStorage.getItem("token"),
      'content-type': 'application/json',
      
      
     
  },
  data:data
      
      
      
    };
    
    Axios(config)
    .then((response)=> {
      console.log(response.data);
      alert('successfully post review')

      this.setState({
     reviewText:'',
     rating:0
         
      });


      const data={
        "propertyID":this.props.match.params.id
    }

      var config2 = {
        method: 'post',
        url: 'https://cuboidtechnologies.com/api/review/admin/get-reviews-by-property-id',
        headers: {
         Accept: 'application/json',
         Authorization: "Bearer " + localStorage.getItem("token"),
        'content-type': 'application/json',
        
        
       
    },
    data:data
        
        
        
      };
      
      Axios(config2)
      .then((response)=> {
        console.log(response);

        this.setState({
          ReviewByProperty:response.data.getReviews
         
           
        })
        
        
  
        
       
        
      })
      .catch(function (error) {
        console.log(error);
      });


      
      

      
     
      
    })
    .catch(function (error) {
      console.log(error);
    });


      
    }

    sendMsgSeller=e=>{
      
      const data=
        {
          "flipbookName": this.state.propertyDetails.propertyName,
          "sellerName": this.state.seller.sellername,
          "sellerEmail": this.state.seller.selleremail,
          "message": this.state.msgSeller,
         "userId":localStorage.getItem("userId")
        }
    

      
   
  
    var config = {
      method: 'post',
      url: 'https://cuboidtechnologies.com/api/inquiry/post-customer-inquiry',
      headers: {
       Accept: 'application/json',
       Authorization: "Bearer " + localStorage.getItem("token"),
      'content-type': 'application/json',
      
      
     
  },
  data:data
      
      
      
    };
    
    Axios(config)
    .then((response)=> {
      console.log(response.data);
      alert('successfully Sent to Seller')

      this.setState({
     msgSeller:'',
    
         
      })
      
      

      
     
      
    })
    .catch(function (error) {
      console.log(error);
    });


    }
    onimgEnlarge=id=>e=>{
      console.log(id)
      this.setState({imgIndex:id});

    }
    render() {
      console.log(this.state)

      var Img2d,AllFloorPlan,k=-1;
      if(this.state.image2d){
        Img2d= this.state.image2d.map(i=>{
          k=k+1;

          return(
             <div className="img-thum" data-toggle="modal" data-target="#enlarge2d"  onClick={this.onimgEnlarge(k)}><img src={i} alt=""/></div>
          )
        })
      }

      if(this.state.floorPlan){

      AllFloorPlan = this.state.floorPlan.map(f=>{
      return( 
        <div className="col-md-3">
      <div className="florplan-pop">
       <img src={f.url}/>
        <h4> {f.fileName}</h4>
        </div>
        </div>
      )
      })
      }

      var AllSimilarProperty;
      if(this.state.similarProperty){
        AllSimilarProperty= this.state.similarProperty.map(s=>{

            // var style={ 
            //   background: "url('"+f[1]+"') no-repeat center center",
            //   display: "flex",
            //   alignItems: "center",
            //   justifyContent: "center",
            //   minHeight: "370px",
              
            //   backgroundSize: "cover",
            //   padding: "50px"
            // }
            // console.log(style)

              return(
                  <div className="flipbook">
<div className="flipbox-bg"  >
<div className="flipbox-btn">

<a href={"/flipbook/"+s}  target="_blank"><button className="btn btn-block btn-black btn-save">Open Flip Book</button></a>

</div>



</div>

</div>
              )
          })
      }

      var AllNeighborProperty;
      if(this.state.Neighborhood){
        AllNeighborProperty= this.state.Neighborhood.map(s=>{

            // var style={ 
            //   background: "url('"+f[1]+"') no-repeat center center",
            //   display: "flex",
            //   alignItems: "center",
            //   justifyContent: "center",
            //   minHeight: "370px",
              
            //   backgroundSize: "cover",
            //   padding: "50px"
            // }
            // console.log(style)

              return(
                  <div className="flipbook">
<div className="flipbox-bg"  >
<div className="flipbox-btn">

<a href={"/flipbook/"+s}  target="_blank"><button className="btn btn-block btn-black btn-save">Open Flip Book</button></a>

</div>



</div>

</div>
              )
          })
      }

      var AllReview;
      if(this.state.ReviewByProperty){
        AllReview= this.state.ReviewByProperty.map(r=>{


              return(
                  <div className="rating-titlebox">

                    <h3>{r.name}</h3>
                    <StarRatings
          starEmptyColor='rgb(203, 211, 227)'
          
          rating={r.rating}
          
          starRatedColor="#f7c508"
         
         
          numberOfStars={5}
          starDimension="20px"
          starSpacing="2px"
          
        /><br/>
                    {r.review}






      </div>


              )
          })


      }

    
      var show = this.state.showAttributes;
      var val = this.state.attributeValue
     

        
       

          return (<div>

           
<div className="mainsection-admin flip-padding">
<div className="flipbook-wrap">
  <a href="" className="btn123 prev"><i className="fa fa-angle-left"></i></a>
<div className="sample-flipbook">
	<div className="flip-imgbox flip_bg style-4">
       
  {this.state.loader?<Spinner/>:

        <div className="flipboxd">
      <div className="text-center"><a className="flipbtn">{this.state.title} </a>  </div>
      <p>
      {this.state.description}
      </p>
          </div>}
    </div>
	<div className="flip-dot ">
<div className="flip-dot-p">
<div className="checkabv">

<a  className="flipbtn" data-toggle="modal" data-target="#neighbour">Properties in Neighbourhood</a>
<a className="flipbtn" data-toggle="modal" data-target="#reviews">Reviews  </a>
<a  className="flipbtn" data-toggle="modal" data-target="#seller">Contact seller</a>


<button type="button" className="help-icon" data-toggle="tooltip" data-placement="bottom" title="This is a Tooltip">
    <i className="zmdi zmdi-help-outline"></i></button>


</div>


   <div className="flipbanner">
<div className="flipimgbox">
  <div class="gallery">
<img src={this.state.banner} alt="" data-toggle="modal" data-target="#enlargebanner"  />
  

    {/*<a href="images/image1.jpg"><img src="require('')" alt="" title=""/></a>*/}
    
</div>
      {show?
      <div className="wrapper">
        <a className="rightarrow" onClick={this.scroll.bind(null,-1)}><i className="fa fa-angle-left"></i></a>
        
          {/* <div className="image"><i className="fa fa-home"></i><p>5Bhk Villa</p></div>
          <div className="image"><i className="fa fa-tag"></i><p>$3000</p></div>
          <div className="image"><i className="fa fa-building"></i><p>2500sq/ft</p></div>
          <div className="image"><i className="fa fa-bed"></i><p>5</p></div>
          <div className="image"><i className="fa fa-bath"></i><p>6</p></div>
          <div className="image"><i className="fa fa-home"></i><p>5Bhk Villa</p></div>
          <div className="image"><i className="fa fa-tag"></i><p>$3000</p></div>
          <div className="image"><i className="fa fa-building"></i><p>2500sq/ft</p></div>
          <div className="image"><i className="fa fa-bed"></i><p>5</p></div>
          <div className="image"><i className="fa fa-bath"></i><p>6</p></div> */}
          {/*Looking for a house to let, buy or fullyFurnished? start*/}

          {this.state.categoryType=='House'? 
          <div className="image-container">


          {/* <div className="image"><i className="flaticon-online-shop"></i><p><i class="fa fa-check-circle"></i></p></div>
          <div className="image"><i className="flaticon-rent"></i><p><i class="fa fa-check-circle"></i></p></div>
          <div className="image"><i className="flaticon-relax"></i><p><i class="fa fa-check-circle"></i></p></div>
           */}
           <div className="image"><i className="fa fa-tag"></i><p>${val.cost?val.cost:""}</p></div>
           {show.bedroom?
          <div className="image"><i className="flaticon-bed"></i><p>{val.bedroom?val.bedroom:""}</p></div>
          :"" }

          {
          show.subcategory ?
           <div className="image">
            { 
             val.subCategory=="gated" ?
        
          <i className="flaticon-big-gate"></i> :""}

             {val.subCategory=="standalone" ?
        
        <i className="flaticon-food-stand"></i> :""}

{val.subCategory=="apartment" ?
        
        <i className="flaticon-apartment-1"></i> :""}
          
          
           <p><i class="fa fa-check-circle"></i></p></div> :"" }
         
          {/* <div className="image"><i className="flaticon-food-stand"></i><p><i class="fa fa-check-circle"></i></p></div>
          <div className="image"><i className="flaticon-apartment-1"></i><p><i class="fa fa-check-circle"></i></p></div>
           */}

{
          show.propertystatus ?
           <div className="image">
            { 
             val.subCategory=="completed" ?
        
          <i className="flaticon-checked"></i> :""}

             {val.subCategory=="offplan" ?
        
        <i className="flaticon-note"></i> :""}

{val.subCategory=="refurbished" ?
        
        <i className="flaticon-setting"></i> :""}
          
          
           <p><i class="fa fa-check-circle"></i></p></div> :"" }
         
{/*   
          <div className="image"><i className="flaticon-checked"></i><p><i class="fa fa-check-circle"></i></p></div>
          <div className="image"><i className="flaticon-note"></i><p><i class="fa fa-check-circle"></i></p></div>
          <div className="image"><i className="flaticon-setting"></i><p><i class="fa fa-check-circle"></i></p></div> */}

          {show.opticalfiber?
          <div className="image"><i className="flaticon-muscle"></i><p><i class="fa fa-check-circle"></i></p></div>
          :""}

{show.swimmingpool?
          <div className="image"><i className="flaticon-pool"></i><p><i class="fa fa-check-circle"></i></p></div>
          :""}
          {show.fireplace?
          <div className="image"><i className="flaticon-fire-place"></i><p><i class="fa fa-check-circle"></i></p></div>
          :""}
          {show.petsallowed?
          <div className="image"><i className="flaticon-dog"></i><p><i class="fa fa-check-circle"></i></p></div>
          :""}
          {show.solarhotwater?
          <div className="image"><i className="flaticon-solar-energy"></i><p><i class="fa fa-check-circle"></i></p></div>
          :""}
          {show.waterfront?
          <div className="image"><i className="flaticon-water-pump"></i><p><i class="fa fa-check-circle"></i></p></div>
          :""}
          {show.cctv?
          <div className="image"><i className="flaticon-security-camera"></i><p><i class="fa fa-check-circle"></i></p></div>
          :""}
          {show.borehole?
          <div className="image"><i className="flaticon-water-pump"></i><p><i class="fa fa-check-circle"></i></p></div>
          :""}
          {show.disabilityfeature?
          <div className="image"><i className="flaticon-disabled"></i><p><i class="fa fa-check-circle"></i></p></div>
          :""}

         {show.maturegarden?
          <div className="image"><i className="flaticon-garden"></i><p><i class="fa fa-check-circle"></i></p></div>
          :""}
          {show.balcony?
          <div className="image"><i className="flaticon-antique-balcony"></i><p><i class="fa fa-check-circle"></i></p></div>
          :""}
          {show.partyarea?
          <div className="image"><i className="flaticon-bachelorette-party"></i><p><i class="fa fa-check-circle"></i></p></div>
          :""}
          {show.bathrooms?
          <div className="image"><i className="flaticon-shower"></i><p> {val.bathrooms?val.bathrooms:""} </p></div>
          :""}
          {show.steambath?
          <div className="image"><i className="flaticon-bathtub"></i><p>{val.steambath?val.steambath:""}</p></div>
          :""}
          {show.lift?
          <div className="image"><i className="flaticon-lift"></i><p>{val.lift?val.lift:""}</p></div>
          :""}
           {show.bathtab?
          <div className="image"><i className="flaticon-hot-stones"></i><p>{val.bathtab?val.bathtab:""}</p></div>
          :""}
          {show.parking?
          <div className="image"><i className="flaticon-parking"></i><p>{val.parking?val.parking:""}</p></div>
          :""}
          {show.gym?
          <div className="image"><i className="flaticon-dumbbell"></i><p>{val.gym?val.gym:""}</p></div>
          :""}
          {show.livingsize?
          <div className="image"><i className="flaticon-area"></i><p>{val.livingsize?val.livingsize:""}</p></div>
          :""}
          {show.kitchensize?
          <div className="image"><i className="flaticon-kitchen"></i><p>{val.kitchensize?val.kitchensize:""}</p></div>
          :""}
          {show.gardensize?
          <div className="image"><i className="flaticon-garden"></i><p>{val.gardensize?val.gardensize:""}</p></div>
          :""}
         
         
         </div>:""}
          {/*Looking for a house to let, buy or fullyFurnished? end*/}
          {/*looking for a land or plot start */}


          {this.state.categoryType=='Land'? 
          <div className="image-container">

<div className="image"><i className="fa fa-tag"></i><p>${val.cost?val.cost:""}</p></div>

{show.sizeinacres?
<div className="image"><i className="flaticon-selection"></i><p> {val.sizeinacres?val.sizeinacres:""} </p></div>
:""}

{show.freehold?
          <div className="image"><i className="flaticon-woodland"></i><p><i class="fa fa-check-circle"></i></p></div>
          :""}
          {show.lease?
            <div className="image"><i className="flaticon-orchard"></i><p><i class="fa fa-check-circle"></i></p></div>
            :""}
            {show.councilwater?
            <div className="image"><i className="flaticon-valve"></i><p><i class="fa fa-check-circle"></i></p></div>
            :""}
 
 {show.electricity?
 <div className="image"><i className="flaticon-electric-pole"></i><p><i class="fa fa-check-circle"></i></p></div>
 :""}
 {show.borehole?
 <div className="image"><i className="flaticon-water-pump"></i><p><i class="fa fa-check-circle"></i></p></div>
 :""}
 {show.readyfence?
 <div className="image"><i className="flaticon-wall"></i><p><i class="fa fa-check-circle"></i></p></div>
 :""}
 {show.controlleddevelopment?
 <div className="image"><i className="flaticon-padlock"></i><p><i class="fa fa-check-circle"></i></p></div>
 :""}
 {show.waterfront?
 <div className="image"><i className="flaticon-unlock"></i><p><i class="fa fa-check-circle"></i></p></div>
 :""}
 {show.gated?
 <div className="image"><i className="flaticon-big-gate"></i><p><i class="fa fa-check-circle"></i></p></div>
 :""}
 {show.soilType?

 <div className="image">
   {val.soilType=="murram"?<i className="flaticon-home"></i>:
   
   <i className="flaticon-solar-energy"></i>}
   
   <p><i class="fa fa-check-circle"></i></p></div>
 :""}
 {/* <div className="image"><i className="flaticon-plants"></i><p><i class="fa fa-check-circle"></i></p></div> */}
 
 {show.nature ?

 <div className="image">

   {val.nature=="residential"?
    <i className="flaticon-home"></i>:""
  }
   {val.nature=="commercial"?
    <i className="flaticon-property"></i>:""
  }
   {val.nature=="industrial"?
    <i className="flaticon-factory"></i>:""
  }
   
  
   
   <p><i class="fa fa-check-circle"></i></p></div>:""}
 {/* <div className="image"><i className="flaticon-property"></i><p><i class="fa fa-check-circle"></i></p></div>
 <div className="image"><i className="flaticon-factory"></i><p><i class="fa fa-check-circle"></i></p></div>
  */}

{show.road ?

<div className="image">

  {val.road=="tarmac"?
   <i className="flaticon-home"></i>:""
 }
  {val.road=="murram"?
   <i className="flaticon-road"></i>:""
 }
  {val.road=="allweather"?
   <i className="flaticon-road-1"></i>:""}
   {val.road=="noroad"?
   <i className="flaticon-foot-print"></i>:""
 }
  
 
  
  <p><i class="fa fa-check-circle"></i></p></div>:""}
 {/* <div className="image"><i className="flaticon-road"></i><p><i class="fa fa-check-circle"></i></p></div>
 <div className="image"><i className="flaticon-road-1"></i><p><i class="fa fa-check-circle"></i></p></div>
<div className="image"><i className="flaticon-foot-print"></i><p><i class="fa fa-check-circle"></i></p></div> */}

{show.kmtoshoppingcenter?
<div className="image"><i className="flaticon-mall"></i><p> {val.kmtoshoppingcenter?val.kmtoshoppingcenter:""} </p></div>
:""}

{show.kmtoneighbour?
<div className="image"><i className="flaticon-home-1"></i><p> {val.kmtoneighbour?val.kmtoneighbour:""} </p></div>:""}


{show.kmtotarmac?
<div className="image"><i className="flaticon-road"></i><p> {val.kmtotarmac?val.kmtotarmac:""} </p></div>:""}

{show.kmtowater?
<div className="image"><i className="flaticon-home-1"></i><p> {val.kmtowater?val.kmtowater:""} </p></div>:""}

{show.kmtoelectricity?
<div className="image"><i className="flaticon-home-1"></i><p> {val.kmtoelectricity?val.kmtoelectricity:""} </p></div>:""}
{/* 
<div className="image"><i className="fa fa-usd"></i><p><i class="fa fa-check-circle"></i></p></div>
               */}
              </div>:""}
           {/*looking for a land or plot end */}

           {/*looking for a hotel start */}

           {this.state.categoryType=='Hotel'? 
           <div className="image-container">

<div className="image"><i className="fa fa-tag"></i><p>${val.cost?val.cost:""}</p></div>

{show.class ?

<div className="image">

  {val.class=="worldclass"?
   <i className="flaticon-hotel"></i>:""
 }
  {val.class=="midrange"?
   <i className="flaticon-hotel-1"></i>:""
 }
  {val.class=="budget"?
   <i className="flaticon-hotel-2"></i>:""}
  
  
 
  
  <p><i class="fa fa-check-circle"></i></p></div>:""}


{/* <div className="image"><i className="flaticon-hotel"></i><p><i class="fa fa-check-circle"></i></p></div>
<div className="image"><i className="flaticon-hotel-1"></i><p><i class="fa fa-check-circle"></i></p></div>
<div className="image"><i className="flaticon-hotel-2"></i><p><i class="fa fa-check-circle"></i></p></div> */}


{show.locality ?

<div className="image">

  {val.locality=="city"?
   <i className="flaticon-review"></i>:""
 }
  {val.locality=="airport"?
   <i className="flaticon-transporting"></i>:""
 }
  {val.locality=="outskirts"?
   <i className="flaticon-bungalow"></i>:""}
  {val.locality=="gamehotel"?
   <i className="flaticon-hotel-3"></i>:""}
  
  
 
  
  <p><i class="fa fa-check-circle"></i></p></div>:""}


{/* 
<div className="image"><i className="flaticon-review"></i><p><i class="fa fa-check-circle"></i></p></div>
<div className="image"><i className="flaticon-transporting"></i><p><i class="fa fa-check-circle"></i></p></div>
<div className="image"><i className="flaticon-bungalow"></i><p><i class="fa fa-check-circle"></i></p></div>
<div className="image"><i className="flaticon-hotel-3"></i><p><i class="fa fa-check-circle"></i></p></div> */}

{show.bedbreakfastcost?
<div className="image"><i className="flaticon-bed-and-breakfast"></i><p>{val.bedbreakfastcost?val.bedbreakfastcost:""}</p></div>
:""}
{show.kmfromtarmac?
<div className="image"><i className="flaticon-road"></i><p>{val.kmfromtarmac?val.kmfromtarmac:""}</p></div>
:""}
{show.conferenceroom?
<div className="image"><i className="flaticon-dinner-table"></i><p>{val.conferenceroom?val.conferenceroom:""}</p></div>
:""}


{show.carpark?
<div className="image"><i className="flaticon-car"></i><p><i class="fa fa-check-circle"></i></p></div>
:""}
{show.aircon?
<div className="image"><i className="flaticon-air-conditioner"></i><p><i class="fa fa-check-circle"></i></p></div>
:""}
{show.spa?
<div className="image"><i className="flaticon-massage"></i><p><i class="fa fa-check-circle"></i></p></div>
:""}
{show.freshoutdoors?
<div className="image"><i className="flaticon-picnic"></i><p><i class="fa fa-check-circle"></i></p></div>
:""}
{show.indoorpool?
<div className="image"><i className="flaticon-swimming"></i><p><i class="fa fa-check-circle"></i></p></div>
:""}
{show.disabilityaccess?
<div className="image"><i className="flaticon-handicap"></i><p><i class="fa fa-check-circle"></i></p></div>
:""}
{show.barlounge
?
<div className="image"><i className="flaticon-bar"></i><p><i class="fa fa-check-circle"></i></p></div>
:""}
{show.hairsalon?
<div className="image"><i className="flaticon-hair"></i><p><i class="fa fa-check-circle"></i></p></div>
:""}
{show.petsallowed
?
<div className="image"><i className="flaticon-dog"></i><p><i class="fa fa-check-circle"></i></p></div>
:""}
{show.maturegarden
?
<div className="image"><i className="flaticon-warehouse"></i><p><i class="fa fa-check-circle"></i></p></div>
 :""}           {/*looking for a hotel end */}
            </div>:""}

            {/*looking for commercial space or godown start */}

            {this.state.categoryType=='Warehouse'? 
            <div className="image-container">

<div className="image"><i className="fa fa-tag"></i><p>${val.cost?val.cost:""}</p></div>

{show.sizeinfeet?
<div className="image"><i className="flaticon-selection"></i><p> {val.sizeinfeet?val.sizeinfeet:""} </p></div>
:""}
{show.kmfromtarmac?
<div className="image"><i className="flaticon-road"></i><p>{val.kmfromtarmac?val.kmfromtarmac:""}</p></div>
:""}
{show.Type?
  <div className="image">
    {val.Type=="godown"?
    <i className="flaticon-warehouse"></i>:""
    }
    {val.Type=="commspace"?
    <i className="flaticon-telephone"></i>:""
    }
    <p><i class="fa fa-check-circle"></i></p></div>

:""}

{/* <div className="image"><i className="flaticon-telephone"></i><p><i class="fa fa-check-circle"></i></p></div> */}
{/* <div className="image"><i className="fa fa-usd"></i><p><i class="fa fa-check-circle"></i></p></div> */}

{/* <div className="image"><i className="flaticon-selection"></i><p><i class="fa fa-check-circle"></i></p></div> */}

{show.conferencefacilites?
<div className="image"><i className="flaticon-road"></i><p><i class="fa fa-check-circle"></i></p></div>
:""}
{show.freshoutdoors?
<div className="image"><i className="flaticon-dinner-table"></i><p><i class="fa fa-check-circle"></i></p></div>
:""}
{show.aircon?
<div className="image"><i className="flaticon-picnic"></i><p><i class="fa fa-check-circle"></i></p></div>
:""}
{show.fullyfurnished?
<div className="image"><i className="flaticon-air-conditioner"></i><p><i class="fa fa-check-circle"></i></p></div>
:""}
{show.sharedsecretary?
<div className="image"><i className="flaticon-relax"></i><p><i class="fa fa-check-circle"></i></p></div>
:""}
{show.landscapegarden?
<div className="image"><i className="flaticon-landscape"></i><p><i class="fa fa-check-circle"></i></p></div>
:""}
{show.wifi?
<div className="image"><i className="flaticon-wifi"></i><p><i class="fa fa-check-circle"></i></p></div>
:""}


{show.zoning?
  <div className="image">
    {val.zoning=="commercial"?
    <i className="flaticon-consultant"></i>:""
    }
    {val.zoning=="industrial"?
    <i className="flaticon-building"></i>:""
    }

{val.zoning=="residential"?
    <i className="flaticon-apartment"></i>:""
    }

{val.zoning=="epz"?
    <i className="flaticon-residential"></i>:""
    }
    <p><i class="fa fa-check-circle"></i></p></div>

:""}

{/* <div className="image"><i className="flaticon-consultant"></i><p><i class="fa fa-check-circle"></i></p></div>
<div className="image"><i className="flaticon-building"></i><p><i class="fa fa-check-circle"></i></p></div>
<div className="image"><i className="flaticon-apartment"></i><p><i class="fa fa-check-circle"></i></p></div>
<div className="image"><i className="flaticon-residential"></i><p><i class="fa fa-check-circle"></i></p></div> */}




{show.townLocation?
  <div className="image">
    {val.townLocation=="downtown"?
    <i className="flaticon-industrial-zone"></i>:""
    }
    {val.townLocation=="uptown"?
    <i className="flaticon-town"></i>:""
    }

{val.townLocation=="neartown"?
    <i className="flaticon-town-1"></i>:""
    }


    <p><i class="fa fa-check-circle"></i></p></div>

:""}


{/* <div className="image"><i className="flaticon-industrial-zone"></i><p><i class="fa fa-check-circle"></i></p></div>
<div className="image"><i className="flaticon-town"></i><p><i class="fa fa-check-circle"></i></p></div>
<div className="image"><i className="flaticon-town-1"></i><p><i class="fa fa-check-circle"></i></p></div> */}


{show.accessRoad?
  <div className="image">
    {val.accessRoad=="tarmac"?
    <i className="flaticon-suburb"></i>:""
    }
    {val.accessRoad=="cabro"?
    <i className="flaticon-road"></i>:""
    }

{val.accessRoad=="allweather"?
    <i className="flaticon-paving"></i>:""
    }

{val.accessRoad=="main"?
    <i className="flaticon-road"></i>:""
    }
    <p><i class="fa fa-check-circle"></i></p></div>

:""}

{/* <div className="image"><i className="flaticon-suburb"></i><p><i class="fa fa-check-circle"></i></p></div>
<div className="image"><i className="flaticon-road"></i><p><i class="fa fa-check-circle"></i></p></div>
<div className="image"><i className="flaticon-paving"></i><p><i class="fa fa-check-circle"></i></p></div>
<div className="image"><i className="flaticon-road"></i><p><i class="fa fa-check-circle"></i></p></div> */}




{show.tenants?
  <div className="image">
    {val.tenants=="mixed"?
    <i className="flaticon-house"></i>:""
    }
    {val.tenants=="specialized"?
    <i className="flaticon-apartment-1"></i>:""
    }

{val.tenants=="processing"?
    <i className="flaticon-warehouse"></i>:""
    }


    <p><i class="fa fa-check-circle"></i></p></div>

:""}

{/* <div className="image"><i className="flaticon-house"></i><p><i class="fa fa-check-circle"></i></p></div>
<div className="image"><i className="flaticon-apartment-1"></i><p><i class="fa fa-check-circle"></i></p></div>
<div className="image"><i className="flaticon-warehouse"></i><p><i class="fa fa-check-circle"></i></p></div> */}

{show.elevator?
<div className="image"><i className="flaticon-elevator"></i><p><i class="fa fa-check-circle"></i></p></div>
:""}


{show.security?
<div className="image"><i className="flaticon-watchman"></i><p><i class="fa fa-check-circle"></i></p></div>
:""}
{show.vehicleTraffic?
<div className="image"><i className="flaticon-traffic-jam"></i><p><i class="fa fa-check-circle"></i></p></div>
:""}
{show.humanTraffic?
<div className="image"><i className="flaticon-community"></i><p><i class="fa fa-check-circle"></i></p></div>
:""}
{show.meetingRoom?
<div className="image"><i className="flaticon-meeting"></i><p><i class="fa fa-check-circle"></i></p></div>
:""}
{show.parking?
<div className="image"><i className="flaticon-car"></i><p><i class="fa fa-check-circle"></i></p></div>
  :""}          {/*looking for commercial space or godown end */}
           </div>:""}

        
        <a className="leftarrow" onClick={this.scroll.bind(null,1)}><i className="fa fa-angle-right"></i></a>
      </div>
:""}
      
   

   
</div>


<div className="thamalisslider">
        <a className="rightarrow" onClick={this.scroll1.bind(null,-2)}><i className="fa fa-angle-left"></i></a>
        <div className="thamalisslider-main">
          {Img2d}
          
        </div>
        <a className="leftarrow" onClick={this.scroll1.bind(null,2)}><i className="fa fa-angle-right"></i></a>
      </div>


{/*<ul className="thamalisslider">
    <li><img src={require('../../img/flipslider-bg.png')} alt=""/></li>
    <li><img src={require('../../img/flipslider-bg.png')} alt=""/></li>
    <li><img src={require('../../img/flipslider-bg.png')} alt=""/></li>
    <li><img src={require('../../img/flipslider-bg.png')} alt=""/></li>

</ul>*/}



<div className="listflipview">
<ul>
    <li><a href={"https://makevt.com/media/tourmaker/zdklwtvfsj/"} target="_blank"><i className="fa fa-street-view"></i>
    <p>360 Property view</p>
    </a></li>

    <li><a data-toggle="modal" data-target="#img3d"><i className="fa fa-map-signs"></i>
    <p>Virtual Tour</p>
    </a></li>
   

    <li><a data-toggle="modal" data-target="#floorPlan"><i className="fa fa-eye"></i>
    <p>View Floor Plan</p>
    </a></li>
    <li><a data-toggle="modal" data-target="#map"><i className="fa fa-map"></i>
    <p>Map view</p>
    </a></li>

    <li><a  data-toggle="modal" data-target="#similar"><i className="fa fa-hand-lizard-o"></i>
    <p>Similar Properties</p>
    </a></li>

    

    
</ul>
    
</div> 



       
       </div>   
         
        
 


    </div>
    </div>
    <div className="flip-dot overscroll scroll-container">
<div className="flip-dot-p ">
<div className="flip-heading" style={{border:'0px'}}>
<h2>Description</h2>
<p>{this.state.description2} </p>

</div>
 <div className="flip-heading" style={{paddingTop:'0px'}}>
 <h2>Other Property Deails</h2>
<p> {this.state.otherdetails} </p>
   </div>

   <div className="checkabv">
  
<a className="flipbtn" data-toggle="modal" data-target="#msgSeller">Send Message to Seller </a>
</div>
  
</div>

    </div>


    <div className="flipthird">

<div className="flip-logothird">
  <div className="flip-middle">
      <img src={require('../../img/flip-logo.png')} alt=""/>
<h1>Thans for watching</h1>
<h4>See you again</h4>
      </div>  
</div>

    </div>
	

</div>
    <a href="" className="btn123 next"><i className="fa fa-angle-right"></i></a>

</div>

</div>


<div className="modal fade" id="enlarge2d" role="dialog">
    <div className="modal-dialog">

      
      <div className="modal-content">
       
        <div className="modal-body">
        <div class="enlard-pop"><button type="button" className="close" data-dismiss="modal">&times;</button>
         <img src={this.state.image2d[this.state.imgIndex]} />
         
         
          </div>
       
        </div>
        
      </div>
      </div>
      </div> 
      <div className="modal fade" id="enlargebanner" role="dialog">
    <div className="modal-dialog">

      
      <div className="modal-content">
        
        <div className="modal-body">
        <div class="enlard-pop"><button type="button" className="close" data-dismiss="modal">&times;</button>
       
         <img src={this.state.banner} />
         
         </div>
         
       
        </div>
        
      </div>
      </div>
      </div> 



<div className="modal fade" id="reviews" role="dialog">
    <div className="modal-dialog">

      
      <div className="modal-content">
        <div className="modal-header">
          
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">Reviews</h4>
        </div>
        <div className="modal-body">
          <div className="review-scroll">
          <p>Write a Review</p>
          <StarRatings
          starEmptyColor='rgb(203, 211, 227)'
          starHoverColor="#f7c508"
          rating={this.state.rating}
          
          starRatedColor="#f7c508"
          changeRating={this.changeRating}
         
          numberOfStars={5}
          starDimension="20px"
          starSpacing="2px"
          
        />
          <textarea className="form-control rattexta" name="reviewText"  value={this.state.reviewText} onChange={e => this.setState({reviewText: e.target.value})}></textarea>
          <button className="step-next" onClick={this.postReview}>Save</button>

          <hr></hr>
          {AllReview}
         
         
          </div>
       
        </div>
        
      </div>
      </div>
      </div> 

      <div className="modal fade" id="map" role="dialog">
    <div className="modal-dialog">

      
      <div className="modal-content">
        <div className="modal-header">
          
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">MAP</h4>
        </div>
        <div className="modal-body">
       
        <div className="map">
   
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317715.71192633547!2d-0.3817840693070167!3d51.52873519756609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sin!4v1596758430055!5m2!1sen!2sin" width="100%" height="450" frameBorder="0"  allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
</div>
        </div>
        
      </div>
      </div>
      </div> 

      <div className="modal fade" id="neighbour" role="dialog">
    <div className="modal-dialog">

      
      <div className="modal-content">
        <div className="modal-header">
          
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title"> Property's in Neighborhood</h4>
        </div>
        <div className="modal-body">
       
          {AllNeighborProperty}
      
        </div>
        
      </div>
      </div>
      </div>


      <div className="modal fade" id="similar" role="dialog">
    <div className="modal-dialog">

      
      <div className="modal-content">
        <div className="modal-header">
          
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">Similar Property</h4>
        </div>
        <div className="modal-body">
       <div className="scroll-container simal-scroll">
          {AllSimilarProperty}
          </div>
        </div>
        
      </div>
      </div>
      </div>

      <div className="modal fade" id="seller" role="dialog">
    <div className="modal-dialog">

      
      <div className="modal-content">
        <div className="modal-header">
          
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">CONTACT SELLER</h4>
        </div>
        <div className="modal-body">
<div className="saller-logo">
        <label>Seller Logo</label>:<br/> <img src= {this.state.seller.sellerlogo}/> 
        </div>
       
       <label> Seller Contact Number</label>:  {this.state.seller.sellerContactNumber} <br/>
       <label>Seller Alt Number</label>: {this.state.seller.selleraltnumber}  <br/>
       <label>Seller Email</label>: {this.state.seller.selleremail} <br/>
      
       <label>Seller Name</label>: {this.state.seller.sellername} <br/>
       <label>Seller Office Address</label>: {this.state.seller.sellerofficeaddress} <br/>
       <label>Seller Type</label>: {this.state.seller.sellertype}  <br/>
       <label>Seller Website</label>: {this.state.seller.sellerwebsite}  <br/>
      
        </div>
        
      </div>
      </div>
      </div>

      <div className="modal fade" id="floorPlan" role="dialog">
    <div className="modal-dialog">

      
      <div className="modal-content">
        <div className="modal-header">
          
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">FLOOR PLAN</h4>
        </div>
        <div className="modal-body">
<div className="row">
          {AllFloorPlan}
       
          </div>
      
        </div>
        
      </div>
      </div>
      </div> 

      <div className="modal fade" id="img3d" role="dialog">
    <div className="modal-dialog">

      
      <div className="modal-content">
        <div className="modal-header">
          
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">VIRTUAL TOUR</h4>
        </div>
        <div className="modal-body">

          <img src={this.state.image3d}/>
       
       
      
        </div>
        
      </div>
      </div>
      </div>

      <div className="modal fade" id="msgSeller" role="dialog">
    <div className="modal-dialog">

      
      <div className="modal-content">
        <div className="modal-header">
          
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">Send Message To Seller</h4>
        </div>
        <div className="modal-body">
       
        <textarea className="form-control smsds" name="msgSeller"  value={this.state.msgSeller} onChange={e => this.setState({msgSeller: e.target.value})}></textarea>
          <button className="step-next" onClick={this.sendMsgSeller}>Send</button>
      
        </div>
        
      </div>
      </div>
      </div>
              
                        </div>)}  
}  

export default (Flipbook);