import React, {Component} from "react";

import NavbarSearch from "./navbarSearch";
import InputRange from 'react-input-range';
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import SelectSearch from 'react-select-search';
import Spinner from "../../common/Spinner";

class HouseSearch extends Component{

    constructor() {
		super()
		this.state = {

            pop1:true,
            pop2:false,
            pop3:false,
            
            cost: {
                min: 10,
                max: 9000,
              },

              livingArea: {
                min: 50,
                max: 5000,
              },

              kitchenArea: {
                min: 50,
                max: 5000,
              },

              gardenArea: {
                min: 50,
                max: 5000,
              },

              attributes:{
                mainCategory:"",
                subCategory:"",
                propertyStatus:""
              },

              results:[],
              total:'',

              isResult:false,
              isLogin:false,
              isSubscribed:false,
              isNotSubscribed:false
            
			


    }
    
    this.ajaxChange = this.ajaxChange.bind(this);
    }

    componentDidMount(){
      window.scrollTo(0, 0);

      if(this.props.subscribe){
      this.setState({isSubscribed:this.props.subscribe});

      }


    }

    pop1_2=e=>{
      window.scrollTo(0, 0)
        this.setState({pop1:false,pop2:true})
    }

    pop2_3=e=>{
      window.scrollTo(0, 0)
        this.setState({pop2:false,pop3:true})
    }

    pop2_1=e=>{
      window.scrollTo(0, 0)
        this.setState({pop2:false,pop1:true})
    }

    pop3_2=e=>{
      window.scrollTo(0, 0)
        this.setState({pop3:false,pop2:true})
    }


    handleAttribute=e=>{
      var {name,checked,value} = e.target;
      var newd={};
      var old=this.state.attributes;
      var middle={};
     
      if(e.target.type=="checkbox")
      {
        this.setState({ attributes:newd})
      middle[name]=checked;
      Object.assign(newd, old, middle);
      console.log(newd)
      console.log(old);
    }
    
      else{
        middle[name]=value;
        Object.assign(newd, old, middle);
        console.log(newd)
        console.log(old);
        this.setState({ attributes:newd})

      }

    }

    search1=e=>{
      console.log("search");

      if(localStorage.getItem("token")){


        if(this.state.isSubscribed){

          this.setState({loader:true})

      
      const data={
       
        
        "cost": this.state.cost,
       "attributes":this.state.attributes
    
        
    }
   
    var config = {
        method: 'post',
        url: 'https://cuboidtechnologies.com/api/search/house-search-1',
        headers: {
         Accept: 'application/json',
         Authorization: "Bearer " + localStorage.getItem("token"),
        'content-type': 'application/json',
        
       
    },
        data : data,
        
        
      };

      console.log(data)
    
      Axios(config)
      .then( (response) =>{
        console.log(response.data);

        this.setState({
          results:response.data.search,
          total:response.data.results,
          isResult:true,
          loader:false
        })

        
       
        
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else{
      this.setState({isNotSubscribed:true});
      }

    }
    else{
    this.setState({isLogin:true});
    }
  

}


search2=e=>{
  console.log("search2");

  if(localStorage.getItem("token")){


    if(this.state.isSubscribed){



  
  this.setState({loader:true})

  const data={
    
   "cost":this.state.cost,
   "attributes":this.state.attributes,
   "livingsize":this.state.livingArea,
   "kitchensize":this.state.kitchenArea,
   "gardensize":this.state.gardenArea,

    
}

var config = {
    method: 'post',
    url: 'https://cuboidtechnologies.com/api/search/house-search-2',
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
    this.setState({
      results:response.data.search,
      total:response.data.results,
      isResult:true,
      loader:false
    })
   
    
  })
  .catch(function (error) {
    console.log(error);
  });



}
else{
  this.setState({isNotSubscribed:true});
  }

}
else{
this.setState({isLogin:true});
}



}


handleAjax(e){
  console.log(e)
  const data={
    "searchquery":e
}

  var config = {
    method: 'post',
    url: 'https://cuboidtechnologies.com/api/admin/house/search-house-location',
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
    this.setState({
      ajax:response.data.data
     
    })
   
    
  })
  .catch(function (error) {
    console.log(error);
  });





}
ajaxChange(e){
  console.log(e);
  this.setState({area:e})
}

    render() {
      console.log(this.state);
      if(this.state.isLogin){
        return <Redirect to ="/register"/>
      }

      if(this.state.isNotSubscribed){
        return <Redirect 
        to={{
          pathname: "/subscription-details",
          state: { Type: this.state.attributes.mainCategory }
        }}
        />
      }
      
    
      
      var att=this.state.attributes
      if(att){

    var Allselected;
      Allselected=(<div className="box-cat-main scroll-container height-min">
      <div className="row">
          <div className="col-md-4">
            <div className="cat-listbox">
            Main Category : {att.mainCategory}
                </div>  
          </div>


          <div className="col-md-4">
            <div className="cat-listbox">
            Sub Category : {att.subCategory}
                </div>  
          </div>

          <div className="col-md-4">
            <div className="cat-listbox">
            Property Status : {att.propertyStatus}

                </div>  
          </div>
          <div className="col-md-4">
            <div className="cat-listbox">
             Area : {this.state.area}

                </div>  
          </div>

          <div className="col-md-4">
            <div className="cat-listbox">
            Minimum Price : {this.state.cost.min}

                </div>  
          </div>

          <div className="col-md-4">
            <div className="cat-listbox">
            Maximum Price : {this.state.cost.max}

                </div>  
          </div>

          {this.state.pop3?<div>

          {att.cctv?
          <div className="col-md-4">
            <div className="cat-listbox">
              CCTV
             

                </div>  
          </div>:""}

          {att.balcony?
          <div className="col-md-4">
            <div className="cat-listbox">
            Balcony
             

                </div>  
          </div>:""}
          {att.borehole?
          <div className="col-md-4">
            <div className="cat-listbox">
            Borehole
             

                </div>  
          </div>:""}
          {att.disabilityfeature?
          <div className="col-md-4">
            <div className="cat-listbox">
            Disability Feature
             

                </div>  
          </div>:""}
          {att.fireplace?
          <div className="col-md-4">
            <div className="cat-listbox">
            Fireplace
             

                </div>  
          </div>:""}
          {att.maturegarden?
          <div className="col-md-4">
            <div className="cat-listbox">
            Mature Garden
             

                </div>  
          </div>:""}
          {att.opticalfiber?
          <div className="col-md-4">
            <div className="cat-listbox">
            Optical Fiber
             

                </div>  
          </div>:""}
          {att.partyarea?
          <div className="col-md-4">
            <div className="cat-listbox">
            Party Area
             

                </div>  
          </div>:""}
          {att.petsallowed?
          <div className="col-md-4">
            <div className="cat-listbox">
            Pets Allowed
             

                </div>  
          </div>:""}
          {att.solarhotwater?
          <div className="col-md-4">
            <div className="cat-listbox">
            Solar Hot Water
             

                </div>  
          </div>:""}
          {att.swimmingpool?
          <div className="col-md-4">
            <div className="cat-listbox">
            Swimming Pool
             

                </div>  
          </div>:""}
          {att.waterfront?
          <div className="col-md-4">
            <div className="cat-listbox">
            Water Front
             

                </div>  
          </div>:""}

        </div>  :""}

          </div> 
          </div> )  
    
    }

    var options = [];
      if(this.state.ajax){
        this.state.ajax.map(a=>{
          console.log(a.sellerDetails.location);
           options.push({name: a.sellerDetails.location, value: a.sellerDetails.location})
          
        })
      }
      console.log(this.props)
     


     
        
        
       
        
        return (<div>
               <NavbarSearch/>

               { this.state.isResult ?
        <Redirect to={{
          pathname: '/search-result',
          state: { results: this.state.results,total:this.state.total }
        }}/>:""}


        {this.state.loader?<Spinner/>:
        <div>
            
               
            {this.state.pop1?
            
            <div>
                
                 {/* Start pop up 1 */}
                
                
                
               <div className="house-main">
                <div className="container">
                    <div className="boxdiv">
                        
                        <div className="row scroll-container height-455">
                        <h1>Choose one main Category *</h1>
                            <div className="col-md-4">
                              <div className="checklist newlabel">
                                <label>
                                <div className="listbox">
                                    <a><i className="flaticon-online-shop"></i></a>
                                   <span>Buy</span> 
                                    </div>
                                    <div className="checkradio">
                                    <input type="radio" name="mainCategory" value="Buy"  checked={this.state.attributes.mainCategory === "Buy"} onChange={this.handleAttribute}/>
                                    </div>
                                      </label>
                                  </div>  
                                 
                            </div>

                            <div className="col-md-4">
                            <div className="checklist newlabel">
                                <label>
                                <div className="listbox">
                                    <a><i className="flaticon-rent"></i></a>
                                    <span>LET</span>
                                    </div>
                                    <div className="checkradio">
                                    <input type="radio" name="mainCategory" value="Let"  checked={this.state.attributes.mainCategory === "Let"} onChange={this.handleAttribute}/>
                                    </div>
                                    </label> 
                                  </div>  

                                  
                            </div>

                            <div className="col-md-4">
                            <div className="checklist newlabel">
                                <label>
                                <div className="listbox">
                                    <a><i className="flaticon-relax"></i></a>
                                   <span>FULLY
FURNISHED</span> 
                                    </div>
                                    <div className="checkradio">
                                    <input type="radio" name="mainCategory" value="FullyFurnished"  checked={this.state.attributes.mainCategory === "FullyFurnished"} onChange={this.handleAttribute}/>
                                    </div>
                                      </label>
                                  </div>  
                            </div>
                            

                            <div className="col-md-12">
                             <div className="checklist new-bade">
                                 <div className="bed-list">
                             <label>
                             <a><i className="flaticon-bed"></i></a>
                                   <span>BEDROOMS</span> </label>

  <label>
  <input type="radio" name="bedroom" value="1"  checked={this.state.attributes.bedroom === "1"} onChange={this.handleAttribute}/>
                                   
    ONE</label>

  <label>
  <input type="radio" name="bedroom" value="2"  checked={this.state.attributes.bedroom === "2"} onChange={this.handleAttribute}/>
  
    TWO</label>
    <label>
    <input type="radio" name="bedroom" value="3"  checked={this.state.attributes.bedroom === "3"} onChange={this.handleAttribute}/>
  
    THREE</label>
    <label>
    <input type="radio" name="bedroom" value="4"  checked={this.state.attributes.bedroom === "4"} onChange={this.handleAttribute}/>
  
    MORE THAN THREE</label>
    </div>
                             </div>
                            </div>



                       
                            
                        <h1 className="checkgated">Select Sub Category</h1>

<div className="col-md-4">
<div className="checklist newlabel">
                                <label>
    <div className="listbox">
        <a><i className="flaticon-big-gate"></i></a>
        <span>GATED</span>
        </div>
        <div className="checkradio">
                                    <input type="radio" name="subCategory" value="Gated"  checked={this.state.attributes.subCategory === "Gated"} onChange={this.handleAttribute}/>
                                    </div>
       </label>
      </div>  
</div>

<div className="col-md-4">
<div className="checklist newlabel">
                                <label>
    <div className="listbox">
        <a><i className="flaticon-food-stand"></i></a>
        <span>STAND ALONE</span>
        </div>

        <div className="checkradio">
                                    <input type="radio" name="subCategory" value="StandAlone"  checked={this.state.attributes.subCategory === "StandAlone"} onChange={this.handleAttribute}/>
                                    </div>
        
          </label>
      </div>  
</div>

<div className="col-md-4">
<div className="checklist newlabel">
                                <label>
    <div className="listbox">
        <a><i className="flaticon-apartment-1"></i></a>
        <span>APARTMENT</span>
        </div>
        <div className="checkradio">
                                    <input type="radio" name="subCategory" value="Apartment"  checked={this.state.attributes.subCategory === "Apartment"} onChange={this.handleAttribute}/>
                                    </div>
        
          </label>
      </div>  
</div>

<h1 className="checkgated">Select property status</h1>

<div className="col-md-4">
<div className="checklist newlabel">
                                <label>
    <div className="listbox">
        <a><i className="flaticon-checked"></i></a>
        <span>COMPLETED</span>
        </div>

      
        <div className="checkradio">
                                    <input type="radio" name="propertyStatus" value="Completed"  checked={this.state.attributes.propertyStatus === "Completed"} onChange={this.handleAttribute}/>
                                    </div>
         </label>
      </div>  
</div>

<div className="col-md-4">
<div className="checklist newlabel">
                                <label>
    <div className="listbox">
        <a><i className="flaticon-note"></i></a>
        <span>OFF PLAN</span>
        </div>
        <div className="checkradio">
                                    <input type="radio" name="propertyStatus" value="OffPlan"  checked={this.state.attributes.propertyStatus === "OffPlan"} onChange={this.handleAttribute}/>
                                    </div>
          </label>
      </div>  
</div>


<div className="col-md-4">
<div className="checklist newlabel">
 <label>
    <div className="listbox">
        <a><i className="flaticon-setting"></i></a>
        <span>REFURBISHED</span>
        </div>
        <div className="checkradio">
                                    <input type="radio" name="propertyStatus" value="Refurbished"  checked={this.state.attributes.propertyStatus === "Refurbished"} onChange={this.handleAttribute}/>
                                    </div>
          </label>
      </div>  
</div>

<div className="col-md-12">
  <div className="sunbrun">
   
  <SelectSearch options={options} value={this.state.area}  name="area" placeholder="Enter area" search={true} getOptions={e=>this.handleAjax(e)} onChange={this.ajaxChange}  />
          
      </div>  
</div>

{/* 
<h2 className="entersub"> <input type="number" name="area" placeholder="Enter Required area" value={this.state.attributes.area} onChange={this.handleAttribute} /> </h2> */}

            <h1 className="checkgated cost">Cost <span style={{width:'auto'}}>From &nbsp;ksh &nbsp;{this.state.cost.min} &nbsp; To &nbsp; ksh &nbsp; {this.state.cost.max}</span></h1>
<div className="rangbox">
<InputRange
          draggableTrack
          maxValue={10000}
          minValue={0}
          onChange={value => this.setState({ cost: value })}
          onChangeComplete={value => console.log(value)}
          value={this.state.cost} />
          </div>

  

                        </div>

                        <div className="btn-psearchbox">
                         <button className="button-save" onClick={this.search1}>SEARCH(with these details)</button>
               
                         <button className="button-save" onClick={this.pop1_2}>ADDDETAILS (for specific search)</button>
                      </div> 

                        {/*<div className="row">
                        <div className="col-md-12 text-right">
  <button className="button-save" onClick={this.pop1_2}>ADDDETAILS (for specific search)</button>
  </div>
                        </div>*/}


                    </div>
                </div>

               </div>


               





                     {/* end pop up 1 */}
            </div>:""}

            {this.state.pop2?
            
            <div>


                 {/* start pop up 2 */}
                 <div className="catbox">
                <div className="container">
                {Allselected}
                      <div className="boxdiv promt">
                     
                     <div className="row">
                         <h1 className="checkgated"><span onClick={this.pop2_1}>
                             <i className="zmdi zmdi-arrow-back"></i> Back To Previous Promt Box</span></h1>
                         <div className="col-md-4">
                              <div  className={this.state.attributes.opticalfiber==true?"optical optical-act":"optical"} >
                                <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-muscle"></i></a> <span>Optical fibre</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="opticalfiber" defaultChecked={this.state.attributes.opticalfiber} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.swimmingpool==true?"optical optical-act":"optical"}>
                                <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-pool"></i></a> <span>Swimming Pool</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="swimmingpool" defaultChecked={this.state.attributes.swimmingpool} onChange={this.handleAttribute}/>
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.fireplace==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-fire-place"></i></a> <span>Fire Place</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="fireplace" defaultChecked={this.state.attributes.fireplace} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.petsallowed==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-dog"></i></a> <span>Pets Allowed</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="petsallowed" defaultChecked={this.state.attributes.petsallowed} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>


                            <div className="col-md-4">
                              <div className={this.state.attributes.solarhotwater==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-solar-energy"></i></a> <span>Solar Hot Water</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="solarhotwater" defaultChecked={this.state.attributes.solarhotwater} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.waterfront==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-water-pump"></i></a> <span>Water Front</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox"  name="waterfront" defaultChecked={this.state.attributes.waterfront} onChange={this.handleAttribute}/>
                                     </div>
                                     </label>
                                  </div> 
                            </div>


                            <div className="col-md-4">
                              <div className={this.state.attributes.cctv==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-security-camera"></i></a> <span>CCTV</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="cctv" defaultChecked={this.state.attributes.cctv} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.borehole==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-water-pump"></i></a> <span>Bore Hole</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="borehole" defaultChecked={this.state.attributes.borehole} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.disabilityfeature==true?"optical optical-act":"optical"}>
                              <label>

                                 <div className="fiber">
                                 <a><i className="flaticon-disabled"></i></a> <span>Disability Feature</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="disabilityfeature" defaultChecked={this.state.attributes.disabilityfeature} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.maturegarden==true?"optical optical-act":"optical"}>
                              <label>

                                 <div className="fiber">
                                 <a><i className="flaticon-garden"></i></a> <span>Mature Garden</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="maturegarden" defaultChecked={this.state.attributes.maturegarden} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.balcony==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-antique-balcony"></i></a> <span>Balcony</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="balcony" defaultChecked={this.state.attributes.balcony} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.partyarea==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-bachelorette-party"></i></a> <span>Party Area</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="partyarea" defaultChecked={this.state.attributes.partyarea} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>
                         
                         </div> 
                         <div className="btn-psearchbox">
                         <button className="button-save" onClick={this.search1}>SEARCH(with these details)</button>
               
                <button className="button-save" onClick={this.pop2_3}>ADDDETAILS (for specific search)</button>
                      </div>   
                    </div>
                      
                </div>

               

                 </div>

                 
                


                 {/* end pop up 2 */}
                </div>:""}

            {this.state.pop3?
            <div>

                 {/* Start pop up 3 */}


                
               <div className="catbox">
                 <div className="container">
                 {Allselected}
                 
<div className="boxdiv promt">
<div className="row">
                         <h1 className="checkgated"><span onClick={this.pop3_2}>
                             <i className="zmdi zmdi-arrow-back"></i> Back To Previous Promt Box</span></h1>
                         <div className="col-md-4">
                              <div className={this.state.attributes.bathrooms>0?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-shower"></i></a> <span>How many <br />
Bathrooms</span>
                                     </div>
                                     <div className="decheck">
  <input type="number"  name="bathrooms" placeholder="0" min="0" value={this.state.attributes.bathrooms} onChange={this.handleAttribute} />
  {/*<select name="bathrooms">
    <option value={this.state.attributes.bathrooms} onChange={this.handleAttribute}>1</option>
    <option value={this.state.attributes.bathrooms} onChange={this.handleAttribute}>1</option>
    <option value={this.state.attributes.bathrooms} onChange={this.handleAttribute}>1</option>
    
  </select>*/}
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.steambath>0?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-bathtub"></i></a> <span>How many <br/>
Steam Bath</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="number" name="steambath" placeholder="0" min="0" value={this.state.attributes.steambath} onChange={this.handleAttribute}/>
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4" >
                              <div className={this.state.attributes.lift>0?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-lift"></i></a> <span>How many lifts</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="number" name="lift" placeholder="0" min="0" value={this.state.attributes.lift} onChange={this.handleAttribute}/>
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4" style={{clear:'left'}}>
                              <div className={this.state.attributes.bathtab>0?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-hot-stones"></i></a> <span>How many<br />
baths tabs</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="number"  name="bathtab" placeholder="0" min="0" value={this.state.attributes.bathtab} onChange={this.handleAttribute}/>
                                     </div>
                                     </label>
                                  </div> 
                            </div>


                            <div className="col-md-4">
                              <div className={this.state.attributes.parking>0?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-parking"></i></a> <span>How many<br />
                                      parking slots</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="number" name="parking" placeholder="0" min="0" value={this.state.attributes.parking} onChange={this.handleAttribute}/>
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.gym>0?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-dumbbell"></i></a> <span>GYM</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="number" name="gym" placeholder="0" min="0" value={this.state.attributes.gym} onChange={this.handleAttribute}/>
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <h1 className="checkgated partic">Select Particulars</h1>
                           
                            <div className="col-md-12">
                            <div className="rangebox">
                    <div className="range-colum range-slider">
                        <div className="rangediv">
            <h5><b><i className="flaticon-area"></i> Living Area Size</b> <span className="rangeValues">{this.state.livingArea.min}-{this.state.livingArea.max}sq/ft</span></h5> 
                       <InputRange
          draggableTrack
          maxValue={5000}
          minValue={0}
          onChange={value => this.setState({ livingArea: value })}
          onChangeComplete={value => console.log(value)}
          value={this.state.livingArea} />
  </div>
                    </div>


                    <div className="range-colum range-slider">
                    <div className="rangediv">
            <h5><b><i className="flaticon-kitchen"></i> Kitchen Area Size</b> <span className="rangeValues">{this.state.kitchenArea.min}-{this.state.kitchenArea.max}sq/ft</span></h5> 
                       <InputRange
          draggableTrack
          maxValue={5000}
          minValue={0}
          onChange={value => this.setState({ kitchenArea: value })}
          onChangeComplete={value => console.log(value)}
          value={this.state.kitchenArea} />
                    </div>
                    </div>

                    <div className="range-colum range-slider">
                    <div className="rangediv">
            <h5><b><i className="flaticon-garden"></i> Garden Area Size</b> <span className="rangeValues">{this.state.gardenArea.min}-{this.state.gardenArea.max}sq/ft</span></h5> 
                       <InputRange
          draggableTrack
          maxValue={5000}
          minValue={0}
          onChange={value => this.setState({ gardenArea: value })}
          onChangeComplete={value => console.log(value)}
          value={this.state.gardenArea} />
                    </div>
                    </div>

                     </div>
</div>
<div className="col-md-12 text-center">
<button className="button-save"  onClick={this.search2} >SEARCH</button>
</div>
                         
                         </div>

</div>



                 </div>
               </div>





                 {/* end pop up 3 */}
                </div>:""}


                </div>}
            
        </div>)
    }
}

export default (HouseSearch);