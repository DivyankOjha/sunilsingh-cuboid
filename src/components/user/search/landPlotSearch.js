import React, {Component} from "react";
import NavbarSearch from "./navbarSearch";
import InputRange from 'react-input-range';
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import SelectSearch from 'react-select-search';
import Spinner from "../../common/Spinner";

class LandPlotSearch extends Component{

    constructor() {
		super()
		this.state = {
            pop1:true,
            pop2:false,
            pop3:false,
            kmToShopping: 2,
            kmToNeighbor: 2,
            kmToTarmac: 2,
            kmToWater: 2,
            kmToElectricity: 2,
            
            cost: {
                min: 3,
                max: 7,
              },
              size: {
                min: 3,
                max: 7,
              },

              attributes:{
                mainCategory:"Buy",
              },
              results:[],
              total:'',
              isResult:false,
              loader:false,
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
        
       "cost":this.state.cost,
       "sizeinacres":this.state.size,
       "attributes":this.state.attributes,

    
        
    }
   
    var config = {
        method: 'post',
        url: 'https://cuboidtechnologies.com/api/search/land-search-1',
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


search2=e=>{
  console.log("search2");


  if(localStorage.getItem("token")){


    if(this.state.isSubscribed){

  this.setState({loader:true})

  const data={
    
   "cost":this.state.cost,
   "attributes":this.state.attributes,
   "sizeinacres":this.state.size,
   
  

    
}

var config = {
    method: 'post',
    url: 'https://cuboidtechnologies.com/api/search/land-search-2',
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

search3=e=>{
  console.log("search3");


  if(localStorage.getItem("token")){


    if(this.state.isSubscribed){


  this.setState({loader:true})
  const data={
    
    "cost":this.state.cost,
    "attributes":this.state.attributes,
    "sizeinacres":this.state.size,
    
    "kmtoshoppingcenter":this.state.kmToShopping,
  "kmtoneighbour":this.state.kmToNeighbor,
 "kmtotarmac":this.state.kmToTarmac,
 "kmtowater":this.state.kmToWater,
 "kmtoelectricity":this.state.kmToElectricity

    
}

var config = {
    method: 'post',
    url: 'https://cuboidtechnologies.com/api/search/land-search-3',
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
    url: 'https://cuboidtechnologies.com/api/admin/land/search-land-location',
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
           Area : {this.state.area}
                </div>  
          </div>


          <div className="col-md-4">
            <div className="cat-listbox">
            Minimum Cost : {this.state.cost.min}
                </div>  
          </div>

          <div className="col-md-4">
            <div className="cat-listbox">
            Maximum Cost : {this.state.cost.max}

                </div>  
          </div>
          <div className="col-md-4">
            <div className="cat-listbox">
           Minimum Size : {this.state.size.min}

                </div>  
          </div>
          <div className="col-md-4">
            <div className="cat-listbox">
           Maximum Size : {this.state.size.max}

                </div>  
          </div>

          {att.freehold?
          <div className="col-md-4">
            <div className="cat-listbox">
              FREEHOLD
             

                </div>  
          </div>:""}

          {att.lease?
          <div className="col-md-4">
            <div className="cat-listbox">
              LEASE
             

                </div>  
          </div>:""}

         

          {this.state.pop3?<div>

          {att.councilwater?
          <div className="col-md-4">
            <div className="cat-listbox">
            Council Water

             

                </div>  
          </div>:""}

          {att.electricity?
          <div className="col-md-4">
            <div className="cat-listbox">
            Electricity on site

             

                </div>  
          </div>:""}
          {att.borehole?
          <div className="col-md-4">
            <div className="cat-listbox">
            Bore Hole
             

                </div>  
          </div>:""}
          {att.readyfence?
          <div className="col-md-4">
            <div className="cat-listbox">
            Ready Fence

             

                </div>  
          </div>:""}
          {att.controlleddevelopment?
          <div className="col-md-4">
            <div className="cat-listbox">
            Controlled Development

             

                </div>  
          </div>:""}
          {att.waterfront?
          <div className="col-md-4">
            <div className="cat-listbox">
            Water Front

             

                </div>  
          </div>:""}
          {att.gated?
          <div className="col-md-4">
            <div className="cat-listbox">
            Gated

             

                </div>  
          </div>:""}
          {att.soilType?
          <div className="col-md-4">
            <div className="cat-listbox">
            Soil Type: {att.soilType}
             

                </div>  
          </div>:""}
          {att.nature?
          <div className="col-md-4">
            <div className="cat-listbox">
            Nature:  {att.nature}
             

                </div>  
          </div>:""}
          {att.road?
          <div className="col-md-4">
            <div className="cat-listbox">
            Road: {att.road}
             

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
               <NavbarSearch />

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
                     <div className="row">

                     
                        <h1>Choose one main Category</h1>
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

                            
                            <div className="sunbrun p-l">
                            <SelectSearch options={options} value={this.state.area}  name="area" placeholder="Enter a location suburb or town" search={true} getOptions={e=>this.handleAjax(e)} onChange={this.ajaxChange}  />
                            </div>
                         

                          
                            
        
       
                         {/* <h1>Enter a location suburb or town</h1> */}
                         <div className="col-md-6">
                         <div className="land-slider range-slider">
                    <div className="rangediv">
            <h5><b><i className="fa fa-usd"></i>Cost</b> <span className="rangeValues">${this.state.cost.min}-${this.state.cost.max}sq/ft</span></h5> 
                       <InputRange
          draggableTrack
          maxValue={20}
          minValue={0}
          onChange={value => this.setState({ cost: value })}
          onChangeComplete={value => console.log(value)}
          value={this.state.cost} />
                    </div>
                    </div>
                         </div>

                         <div className="col-md-6">
                         <div className="land-slider range-slider">
                    <div className="rangediv">
            <h5><b><i className="flaticon-selection"></i>Size in acres</b> <span className="rangeValues">From {this.state.size.min}- {this.state.size.max}sq/ft</span></h5> 
                       <InputRange
          draggableTrack
          maxValue={20}
          minValue={0}
          onChange={value => this.setState({ size: value })}
          onChangeComplete={value => console.log(value)}
          value={this.state.size} />
                    </div>
                    </div>
                         </div>

                         <div className="col-md-6">
  <div className="checklist landplot">
    <div className="listbox"><a><i className="flaticon-woodland"></i></a><span>FREEHOLD</span></div>
    <div className="checkradio">
      <label className="switch">
        <input type="checkbox" name="freehold" defaultChecked={this.state.attributes.freehold} onChange={this.handleAttribute} />
        <span className="slider"></span></label>
    </div>
  </div>
</div>


<div className="col-md-6">
  <div className="checklist landplot">
    <div className="listbox"><a><i className="flaticon-orchard"></i></a><span>LEASE</span></div>
    <div className="checkradio">
      <label className="switch">
        <input type="checkbox" name="lease" defaultChecked={this.state.attributes.lease} onChange={this.handleAttribute} />
        <span className="slider"></span></label>
    </div>
  </div>
</div>
<div className="btn-searcgdiv col-md-12">
<button className="button-save" onClick={this.search1}>SEARCH(with these details)</button>
               
               <button className="button-save" onClick={this.pop1_2}>ADDDETAILS (for specific search)</button>

</div>

                         </div> 
                         </div>  
                    </div>
                </div>


                



                 {/* end pop up 1 */}
            </div>:""}

            {this.state.pop2?
            
            <div>
                 {/* Start pop up 2 */}


<div className="catbox">
                <div className="container">
                
                {Allselected}
                      <div className="boxdiv landlot">
                     <div className="row">
                       <h1 className="checkgated back"><span onClick={this.pop2_1}>
                             <i className="zmdi zmdi-arrow-back"></i> Back To Previous Promt Box</span></h1>
                     </div>
                     <div className="row scroll-container height-scroll">
                         
                         <div className="col-md-4">
                              <div className={this.state.attributes.councilwater==true?"optical optical-act":"optical"}>
                                <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-valve"></i></a> <span>Council Water</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="councilwater" defaultChecked={this.state.attributes.councilwater} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.electricity==true?"optical optical-act":"optical"}>
                                <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-electric-pole"></i></a> <span>Electricity on site</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="electricity" defaultChecked={this.state.attributes.electricity} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.borehole==true?"optical optical-act":"optical"}>
                                <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-water-pump"></i></a> <span>Bore Hole </span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="borehole" defaultChecked={this.state.attributes.borehole} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.readyfence==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-wall"></i></a> <span>Ready Fence</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="readyfence" defaultChecked={this.state.attributes.readyfence} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>


                            <div className="col-md-4">
                              <div className={this.state.attributes.controlleddevelopment==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-padlock"></i></a> <span>Controlled <br />
Development</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="controlleddevelopment" defaultChecked={this.state.attributes.controlleddevelopment} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.waterfront==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-unlock"></i></a> <span>Water Front</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="waterfront" defaultChecked={this.state.attributes.waterfront} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>


                            <div className="col-md-4" style={{clear:'left'}}>
                              <div className={this.state.attributes.gated==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-big-gate"></i></a> <span>Gated</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="gated" defaultChecked={this.state.attributes.gated} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <h1>Soil Type</h1>
                            <div className="col-md-4">
                                <div className="checklist newlabel">
                                <label>
                                <div className="listbox"><a><i className="flaticon-solar-energy"></i></a>
                            <span>RED</span></div>
                            <div className="checkradio">
                                <input type="radio" name="soilType" value="Red"  checked={this.state.attributes.soilType === "Red"} onChange={this.handleAttribute}/>
                                </div>
                                </label>
                                </div>
                            
                            </div>

                            <div className="col-md-4">
                            <div className="checklist newlabel">
                              <label>
                                <div className="listbox"><a><i className="flaticon-solar-energy"></i></a>
                            <span>BLACK COTTON</span></div>
                            <div className="checkradio">
                                <input type="radio" name="soilType" value="Blackcotton"  checked={this.state.attributes.soilType === "Blackcotton"} onChange={this.handleAttribute}/>
                                </div>
                                </label>
                                </div>
                            
                            </div>

                            <div className="col-md-4">
                            <div className="checklist newlabel">
                            <label>
                                <div className="listbox"><a><i className="flaticon-plants"></i></a>
                            <span>MURRAM</span></div>
                            <div className="checkradio">
                                <input type="radio" name="soilType" value="Murram"  checked={this.state.attributes.soilType === "Murram"} onChange={this.handleAttribute}/>
                                </div>
                                </label>
                                </div>
                            
                            </div>
                            <h1>Nature</h1>

                            <div className="col-md-4">
                            <div className="checklist newlabel">
                            <label>
                                <div className="listbox"><a><i className="flaticon-home"></i></a>
                            <span>RESIDENTIAL</span></div>
                            <div className="checkradio">
                                <input type="radio" name="nature" value="Residential"  checked={this.state.attributes.nature === "Residential"} onChange={this.handleAttribute}/>
                                </div>
                                </label>
                                </div>
                            
                            </div>

                            <div className="col-md-4">
                            <div className="checklist newlabel">
                            <label>
                                <div className="listbox"><a><i className="flaticon-property"></i></a>
                            <span>COMMERCIAL</span></div>
                            <div className="checkradio">
                                <input type="radio" name="nature" value="Commercial"  checked={this.state.attributes.nature === "Commercial"} onChange={this.handleAttribute}/>
                                </div>
                                </label>
                                </div>
                            
                            </div>

                            <div className="col-md-4">
                            <div className="checklist newlabel">
                            <label>
                                <div className="listbox"><a><i className="flaticon-factory"></i></a>
                            <span>INDUSTRIAL</span></div>
                            <div className="checkradio">
                                <input type="radio" name="nature" value="Industrial"  checked={this.state.attributes.nature === "Industrial"} onChange={this.handleAttribute}/>
                                </div>
                                </label>
                                </div>
                            
                            </div>

                            <h1>Road</h1>

                            <div className="col-md-4">
                            <div className="checklist newlabel">
                            <label>
                                <div className="listbox"><a><i className="flaticon-road"></i></a>
                            <span>TARMAC</span></div>
                            <div className="checkradio">
                                <input type="radio" name="road" value="Tarmac"  checked={this.state.attributes.road === "Tarmac"} onChange={this.handleAttribute}/>
                                </div>
                                </label>
                                </div>
                            
                            </div>

                            <div className="col-md-4">
                            <div className="checklist newlabel">
                            <label>
                                <div className="listbox"><a><i className="flaticon-road-1"></i></a>
                            <span>MURRAAM</span></div>
                            <div className="checkradio">
                                <input type="radio" name="road" value="Murram"  checked={this.state.attributes.road === "Murram"} onChange={this.handleAttribute}/>
                                </div>
                                </label>
                                </div>
                            
                            </div>

                            <div className="col-md-4">
                            <div className="checklist newlabel">
                            <label>
                                <div className="listbox"><a><i className="flaticon-road"></i></a>
                            <span>ALL-WEATHER</span></div>
                            <div className="checkradio">
                                <input type="radio" name="road" value="Allweather"  checked={this.state.attributes.road === "Allweather"} onChange={this.handleAttribute}/>
                                </div>
                                </label>
                                </div>
                            
                            </div>

                            <div className="col-md-4">
                            <div className="checklist newlabel">
                            <label>
                                <div className="listbox"><a><i className="flaticon-foot-print"></i></a>
                            <span>NO ROAD</span></div>
                            <div className="checkradio">
                                <input type="radio" name="road" value="Noroad"  checked={this.state.attributes.road === "Noroad"} onChange={this.handleAttribute}/>
                                </div>
                                </label>
                                </div>
                            
                            </div>

                            

                           

                            

                           

                         
                         </div> 
                         <div className="btn-psearchbox">
                         <button className="button-save" onClick={this.search2} >SEARCH(with these details)</button>
               
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

                      <div className="boxdiv">
                        <div className="row">
                        <h1 className="checkgated back" onClick={this.pop3_2}><span><i className="zmdi zmdi-arrow-back"></i> Back To Previous Promt Box</span></h1>
                       
                    <div className="col-md-4">
                        <div className="land-slider range-slider">
                        <div className="rangediv">
            <h5><b><i className="flaticon-mall"></i>KM to shopping Center </b> <span>{this.state.kmToShopping}sq/ft</span></h5>
                        <InputRange
        
        value={this.state.kmToShopping}
        onChange={value => this.setState({ kmToShopping:value })} />

                        </div>
                        </div>
                    
                    </div>

                    <div className="col-md-4">
                        <div className="land-slider range-slider">
                        <div className="rangediv">
                        <h5><b><i className="flaticon-home-1"></i>KM to neighbor </b><span>{this.state.kmToNeighbor}sq/ft</span></h5>
                        <InputRange
          draggableTrack
          maxValue={20}
          minValue={0}
          onChange={value => this.setState({ kmToNeighbor: value })}
          onChangeComplete={value => console.log(value)}
          value={this.state.kmToNeighbor} />

                        </div>
                        </div>
                    
                    </div>

                    <div className="col-md-4">
                        <div className="land-slider range-slider">
                        <div className="rangediv">
                        <h5><b><i className="flaticon-road"></i>KM to Tarmac</b> <span>{this.state.kmToTarmac}sq/ft</span></h5>
                        <InputRange
          draggableTrack
          maxValue={20}
          minValue={0}
          onChange={value => this.setState({ kmToTarmac: value })}
          onChangeComplete={value => console.log(value)}
          value={this.state.kmToTarmac} />

                        </div>
                        </div>
                    
                    </div>

                    <div className="col-md-4">
                        <div className="land-slider range-slider">
                        <div className="rangediv">
                        <h5><b><i className="flaticon-valve"></i>KM to Water</b> <span>{this.state.kmToWater}sq/ft</span></h5>
                        <InputRange
          draggableTrack
          maxValue={20}
          minValue={0}
          onChange={value => this.setState({ kmToWater: value })}
          onChangeComplete={value => console.log(value)}
          value={this.state.kmToWater} />

                        </div>
                        </div>
                    
                    </div>

                    <div className="col-md-4">
                        <div className="land-slider range-slider">
                        <div className="rangediv">
            <h5><b><i className="flaticon-electric-pole"></i>KM to electricity</b>  <span>{this.state.kmToElectricity}sq/ft</span></h5>
                        <InputRange
          draggableTrack
          maxValue={20}
          minValue={0}
          onChange={value => this.setState({ kmToElectricity: value })}
          onChangeComplete={value => console.log(value)}
          value={this.state.kmToElectricity} />

                        </div>
                        </div>
                    
                    </div>
                    <div className="col-md-12 text-center"><button className="button-save" onClick={this.search3}>SEARCH</button>
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

export default (LandPlotSearch);