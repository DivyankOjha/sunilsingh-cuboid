import React, {Component} from "react";
import NavbarSearch from "./navbarSearch";
import InputRange from 'react-input-range';
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import SelectSearch from 'react-select-search';
import Spinner from "../../common/Spinner";

class SpaceOfficeGodown extends Component{

    constructor() {
		super()
		this.state = {

            pop1:true,
            pop2:false,
            pop3:false,
            tarmac: 2,
            
            size: {
                min: 5,
                max: 10,
              },
            cost: {
                min: 3,
                max: 7,
              },

              attributes:{
                mainCategory:"",
                Type:""
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
         "attributes":this.state.attributes,
         "sizeinfeet":this.state.size,

        "kmfromtarmac":this.state.tarmac
      
          
      }
     
      var config = {
          method: 'post',
          url: 'https://cuboidtechnologies.com/api/search/warehouse-search-1',
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
        "sizeinfeet":this.state.size,

       "kmfromtarmac":this.state.tarmac
  
      
  }
  
  var config = {
      method: 'post',
      url: 'https://cuboidtechnologies.com/api/search/warehouse-search-2',
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
        "sizeinfeet":this.state.size,

       "kmfromtarmac":this.state.tarmac
  
      
  }
  
  var config = {
      method: 'post',
      url: 'https://cuboidtechnologies.com/api/search/warehouse-search-3',
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
      url: 'https://cuboidtechnologies.com/api/admin/warehouse/search-warehouse-location',
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
             Type : {att.Type}
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

            <div className="col-md-4">
              <div className="cat-listbox">
             KM From Tarmac : {this.state.tarmac}
  
                  </div>  
            </div>
  

  
  
           
  
            {this.state.pop3?<div>
  
            {att.conferencefacilites?
            <div className="col-md-4">
              <div className="cat-listbox">
              Conference facilities

  
               
  
                  </div>  
            </div>:""}
  
            {att.freshoutdoors?
            <div className="col-md-4">
              <div className="cat-listbox">
              Fresh Outdoors

  
               
  
                  </div>  
            </div>:""}
            {att.borehole?
            <div className="col-md-4">
              <div className="cat-listbox">
              Bore Hole
               
  
                  </div>  
            </div>:""}
            {att.aircon?
            <div className="col-md-4">
              <div className="cat-listbox">
              Aircon

  
               
  
                  </div>  
            </div>:""}
            {att.fullyfurnished?
            <div className="col-md-4">
              <div className="cat-listbox">
              Fully furnished

  
               
  
                  </div>  
            </div>:""}
            {att.landscapegarden?
            <div className="col-md-4">
              <div className="cat-listbox">
              Landscape Garden

  
               
  
                  </div>  
            </div>:""}
            {att.wifi?
            <div className="col-md-4">
              <div className="cat-listbox">
              Wifi

  
               
  
                  </div>  
            </div>:""}
            {att.sharedsecretary?
            <div className="col-md-4">
              <div className="cat-listbox">
              Shared secretary

               
  
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
                       <h1>Type</h1>
                            <div className="col-md-4">
                            <div className="checklist newlabel">
 <label>
                                <div className="listbox">
                                    <a><i className="flaticon-warehouse"></i></a>
                                   <span>GODOWN </span> 
                                    </div>
                                    <div className="checkradio">
                                    <input type="radio" name="Type" value="Godown"  checked={this.state.attributes.Type === "Godown"} onChange={this.handleAttribute}/>
                                    </div>
                                      </label>
                                  </div>  
                            </div>
                            

                            <div className="col-md-4">
                            <div className="checklist newlabel">
 <label>
                                <div className="listbox">
                                    <a><i className="flaticon-telephone"></i></a>
                                    <span>COMMSPACE</span>
                                    </div>
                                    <div className="checkradio">
                                    <input type="radio" name="Type" value="Commspace"  checked={this.state.attributes.Type === "Commspace"} onChange={this.handleAttribute}/>
                                    </div>
                                      </label>
                                  </div>  
                            </div>

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
                          <SelectSearch options={options} value={this.state.area}  name="area" placeholder="Enter area" search={true} getOptions={e=>this.handleAjax(e)} onChange={this.ajaxChange}  />
</div>

    <div className="col-md-6">
<div className="land-slider range-slider ">
                        <div className="rangediv">
                        <h5><b><i className="fa fa-usd"></i>Cost</b> <span>From ${this.state.cost.min} to ${this.state.cost.max}</span></h5>
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
<div className="land-slider range-slider ">
                        <div className="rangediv">
            <h5><b><i className="flaticon-selection"></i>Size In ft</b> <span>From {this.state.size.min}ft to {this.state.size.max}ft</span></h5>
                        <InputRange
          maxValue={20}
          minValue={0}
          formatLabel={value => `${value} `}
          value={this.state.size}
          onChange={value => this.setState({ size: value })}
          onChangeComplete={value => console.log(value)} />

                        </div>
                        </div>


</div>


<div className="col-md-6">
<div className="land-slider range-slider ">
                        <div className="rangediv ">
                        <h5><b><i className="flaticon-road"></i>KMs from Tarmac</b> <div className="km">{this.state.tarmac} KM</div></h5>
                        <InputRange
        
        value={this.state.tarmac}
        onChange={value => this.setState({ tarmac:value })} />

                        </div>
                        </div>


</div>


</div>
<div className="btn-psearchbox"><button className="button-save" onClick={this.search1}>SEARCH(with these details)</button>
<button className="button-save" onClick={this.pop1_2}>ADD DETAILS (for specific search)</button></div>
                        


                       </div>
                   </div>
               </div>
                

               



                 {/* end pop up 1 */}
            </div>:""}

            {this.state.pop2?
            
            <div>

                 {/* Start pop up 2 */}


               <div className="catbox height-half">
                 <div className="container">
                   {Allselected}
                   <div className="boxdiv landlot ">
                     
                     <div className="row">
                         <h1 className="checkgated back"><span onClick={this.pop2_1}>
                             <i className="zmdi zmdi-arrow-back"></i> Back To Previous Promt Box</span></h1>
                         <div className="col-md-4">
                              <div className={this.state.attributes.conferencefacilites==true?"optical optical-act":"optical"}>
                                <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-dinner-table"></i></a> <span>Conference facilities</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="conferencefacilites" defaultChecked={this.state.attributes.conferencefacilites} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.freshoutdoors==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-picnic"></i></a> <span>Fresh Outdoors</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="freshoutdoors" defaultChecked={this.state.attributes.freshoutdoors} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.aircon==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-air-conditioner"></i></a> <span>Aircon</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="aircon" defaultChecked={this.state.attributes.aircon} onChange={this.handleAttribute}  />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.fullyfurnished==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-relax"></i></a> <span>Fully furnished</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="fullyfurnished" defaultChecked={this.state.attributes.fullyfurnished} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>


                            <div className="col-md-4">
                              <div className={this.state.attributes.landscapegarden==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-landscape"></i></a> <span>Landscape Garden</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="landscapegarden" defaultChecked={this.state.attributes.landscapegarden} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.wifi==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-wifi"></i></a> <span>Wifi</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="wifi" defaultChecked={this.state.attributes.wifi} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>


                            <div className="col-md-4">
                              <div className={this.state.attributes.sharedsecretary==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-consultant"></i></a> <span>Shared secretary</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="sharedsecretary" defaultChecked={this.state.attributes.sharedsecretary} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                           


                            

                           

                            

                           

                         
                         </div> 
                         <div className="btn-psearchbox">
                         <button className="button-save" onClick={this.search2}>SEARCH(with these details)</button>
               
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


                   <div className="boxdiv landlot godwon">
                   <div className="row"> <h1 className="checkgated back"><span onClick={this.pop3_2}>
                             <i className="zmdi zmdi-arrow-back"></i> Back To Previous Promt Box</span></h1>
                             </div>
                     <div className="row scroll-container height-scroll">
                        

                             <h1>Zoning</h1>
                         

                            <div className="col-md-3">
                                <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-building"></i></a>
                            <span>COMMERCIAL</span></div>
                            <div className="checkradio">
                                <input type="radio" name="zoning" value="Commercial"  checked={this.state.attributes.zoning === "Commercial"} onChange={this.handleAttribute}/>
                                </div>
                                </label>
                                </div>
                            
                            </div>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-apartment"></i></a>
                            <span>INDUSTRIAL</span></div>
                            <div className="checkradio">
                                <input type="radio" name="zoning" value="Industrial"  checked={this.state.attributes.zoning === "Industrial"} onChange={this.handleAttribute}/>
                                </div>
                                </label>
                                </div>
                            
                            </div>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-residential"></i></a>
                            <span>RESIDENTIAL</span></div>
                            <div className="checkradio">
                                <input type="radio" name="zoning" value="Residential"  checked={this.state.attributes.zoning === "Residential"} onChange={this.handleAttribute}/>
                                </div>
                                </label>
                                </div>
                            
                            </div>                
                            
                      

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-industrial-zone"></i></a>
                            <span>EPZ</span></div>
                            <div className="checkradio">
                                <input type="radio" name="zoning" value="Epz"  checked={this.state.attributes.zoning === "Epz"} onChange={this.handleAttribute}/>
                                </div>
                                </label>
                                </div>
                            
                            </div>
                            <h1>Town Location</h1>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-town"></i></a>
                            <span>DOWNTOWN</span></div>
                            <div className="checkradio">
                            <input type="radio" name="townLocation" value="downtown" 
                            checked={this.state.attributes.townLocation ==="downtown" }     
                            onChange={this.handleAttribute} />     </div>
                            </label>
                            </div>
                            
                            </div>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-town-1"></i></a>
                            <span>UPTOWN</span></div>
                            <div className="checkradio">
                         <input type="radio" name="townLocation" value="uptown" 
                            checked={this.state.attributes.townLocation ==="uptown" }     
                            onChange={this.handleAttribute} />  
                                </div>
                                </label>
                                </div>
                            
                            </div>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-suburb"></i></a>
                            <span>NEAR-TOWN</span></div>
                            <div className="checkradio">
                            <input type="radio" name="townLocation" value="neartown" checked={this.state.attributes.townLocation==="neartown" }
                                onChange={this.handleAttribute} />
                                </div>
                                </label>
                                </div>
                            
                            </div>

                            <h1>Access Road</h1>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-road"></i></a>
                            <span>TARMAC</span></div>
                            <div className="checkradio">
                                <input type="radio" name="accessRoad" value="tarmac" checked={this.state.attributes.accessRoad  ==="tarmac" }
                                    onChange={this.handleAttribute} />
                                </div>
                                </label>
                                </div>
                            
                            </div>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-paving"></i></a>
                            <span>CABRO</span></div>
                            <div className="checkradio">
                                <input type="radio" name="accessRoad" value="cabro" checked={this.state.attributes.accessRoad==="cabro" }
                                    onChange={this.handleAttribute} />  
                                 </div>
                                 </label>
                                 </div>
                            
                            </div>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-road"></i></a>
                            <span>ALL-WEATHER</span></div>
                            <div className="checkradio">
                            <input type="radio" name="accessRoad" value="allweather" checked={this.state.attributes.accessRoad==="allweather" }
                                onChange={this.handleAttribute} />  </div>
                                </label>
                                </div>                            
                            </div>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-road"></i></a>
                            <span>MAIN</span></div>
                            <div className="checkradio">
                                <input type="radio" name="accessRoad" value="main" 
                                checked={this.state.attributes.accessRoad==="main" }
                                    onChange={this.handleAttribute} /> </div>
                                    </label>
                                    </div>                            
                            </div>

                            

                            <h1>Tenants</h1>  

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-house"></i></a>
                            <span>MIXED</span></div>
                            <div className="checkradio">
                                <input type="radio" name="tenants" value="mixed" 
                                checked={this.state.attributes.tenants==="mixed" }
                                    onChange={this.handleAttribute} /></div>
                                    </label>
                                    </div>
                            
                            </div>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-apartment-1"></i></a>
                            <span>SPECIALIZED</span></div>
                            <div className="checkradio">
                            <input type="radio" name="tenants" value="specialized" 
                            checked={this.state.attributes.tenants==="specialized" }
                                onChange={this.handleAttribute} />    </div>
                                </label>
                                </div>
                            
                            </div>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-warehouse"></i></a>
                            <span>PROCESSING</span></div>
                            <div className="checkradio">
                                <input type="radio" name="tenants" value="processing" 
                                checked={this.state.attributes.tenants==="processing" }
                                    onChange={this.handleAttribute} /> </div>
                                    </label>
                                    </div>
                            
                            </div>

                            <h1>Elevator</h1>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-elevator"></i></a>
                            <span>NONE</span></div>
                            <div className="checkradio">
                                <input type="radio" name="elevator" value="none" 
                                checked={this.state.attributes.elevator==="none" }
                                    onChange={this.handleAttribute} /> </div>
                                    </label>
                                    </div>
                            
                            </div>


                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-elevator"></i></a>
                            <span>GOODS</span></div>
                            <div className="checkradio">
                                <input type="radio" name="elevator" value="goods"
                                 checked={this.state.attributes.elevator==="goods" }
                                    onChange={this.handleAttribute} /></div>
                                    </label>
                                    </div>
                            
                            </div>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-elevator"></i></a>
                            <span>PASSENGER</span></div>
                            <div className="checkradio">
                            <input type="radio" name="elevator" value="passenger"
                             checked={this.state.attributes.elevator==="passenger" }
                                onChange={this.handleAttribute} />  </div>
                                </label>
                                </div>
                            
                            </div>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-elevator"></i></a>
                            <span>PASSENGER AND
GOODS</span></div>
                            <div className="checkradio">
                            <input type="radio" name="elevator" value="passengerandgoods"
                             checked={this.state.attributes.elevator==="passengerandgoods" }
                                onChange={this.handleAttribute} />   </div>
                                </label>
                                </div>
                            
                            </div>

                            <h1>Security</h1>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-watchman"></i></a>
                            <span>TIGHT</span></div>
                            <div className="checkradio">
                                <input type="radio" name="security" value="tight" 
                                checked={this.state.attributes.security==="tight" }
                                    onChange={this.handleAttribute} />  </div>
                                    </label>
                                    </div>
                            
                            </div>
                            {/* <!-- added main gate --> */}
                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                    <div className="listbox"><a><i className="flaticon-watchman"></i></a>
                                        <span>MAIN GATE</span></div>
                                    <div className="checkradio">
                                        <input type="radio" name="security" value="maingate"
                                            checked={this.state.attributes.security==="maingate" } onChange={this.handleAttribute} />
                                    </div>
                                    </label>
                                </div>
                            
                            </div>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-watchman"></i></a>
                            <span>MAINGATE AND FLOORS</span></div>
                            <div className="checkradio">
                                <input type="radio" name="security" value="maingateandfloors" 
                                checked={this.state.attributes.security==="maingateandfloors" }
                                    onChange={this.handleAttribute} /> </div>
                                    </label>
                                    </div>
                            
                            </div>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-watchman"></i></a>
                            <span>NONE</span></div>
                            <div className="checkradio">
                            <input type="radio" name="security" value="none" 
                            checked={this.state.attributes.security==="none" }
                                onChange={this.handleAttribute} />    
                            </div>
                            </label>
                            </div>
                            
                            </div>

<h1>Vehicle Traffic</h1>

                              <div className="col-md-3">
                              <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-traffic-jam"></i></a>
                            <span>VERY HIGH</span></div>
                            <div className="checkradio">
                                <input type="radio" name="vehicleTraffic" value="veryhigh"
                                 checked={this.state.attributes.vehicleTraffic==="veryhigh" }
                                    onChange={this.handleAttribute} />  </div>
                                    </label>
                                    </div>                            
                            </div>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-traffic-jam"></i></a>
                            <span>HIGH</span></div>
                            <div className="checkradio">
                                <input type="radio" name="vehicleTraffic" value="high" 
                                checked={this.state.attributes.vehicleTraffic==="high" }
                                    onChange={this.handleAttribute} />  </div>
                                    </label>
                                    </div>
                            
                            </div>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-traffic-jam"></i></a>
                            <span>LOW</span></div>
                            <div className="checkradio">
                            <input type="radio" name="vehicleTraffic" value="low" 
                                checked={this.state.attributes.vehicleTraffic==="low" }
                                    onChange={this.handleAttribute} />   </div>
                                    </label>
                                    </div>
                            
                            </div>
                           

                        <h1>Human Traffic</h1>

                        <div className="col-md-3">
                        <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-community"></i></a>
                            <span>VERY HIGH</span></div>
                            <div className="checkradio">
                                <input type="radio" name="humanTraffic" value="veryhigh" 
                                checked={this.state.attributes.humanTraffic ==="veryhigh" }
                                    onChange={this.handleAttribute} /> </div>
                                    </label>
                                    </div>
                            
                            </div>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-community"></i></a>
                            <span>HIGH</span></div>
                            <div className="checkradio">
                                <input type="radio" name="humanTraffic" value="high" 
                                checked={this.state.attributes.humanTraffic==="high" }
                                    onChange={this.handleAttribute} />
                                 </div>
                                 </label>
                                 </div>
                            
                            </div>
                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-community"></i></a>
                            <span>LOW</span></div>
                            <div className="checkradio">
                                <input type="radio" name="humanTraffic" value="low" 
                                checked={this.state.attributes.humanTraffic==="low" }
                                    onChange={this.handleAttribute} /> </div>
                                    </label>
                                    </div>
                            
                            </div>

                            <h1>Meeting Room</h1>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-meeting"></i></a>
                            <span>NONE</span></div>
                            <div className="checkradio">
                                <input type="radio" name="meetingRoom" value="none" 
                                checked={this.state.attributes.meetingRoom==="none" }
                                    onChange={this.handleAttribute} />  </div>
                                    </label>
                                    </div>
                            
                            </div>


                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-meeting"></i></a>
                            <span>FREE</span></div>
                            <div className="checkradio">
                                <input type="radio" name="meetingRoom" value="free" 
                                checked={this.state.attributes.meetingRoom==="free" }
                                    onChange={this.handleAttribute} /> </div>
                                    </label>
                                    </div>
                            
                            </div>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-meeting"></i></a>
                            <span>PAID</span></div>
                            <div className="checkradio">
                                 <input type="radio" name="meetingRoom" value="paid" 
                                checked={this.state.attributes.meetingRoom==="paid" }
                                    onChange={this.handleAttribute} /> </div>
                                    </label>
                                    </div>
                            
                            </div>
                            <h1>Parking</h1>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-car"></i></a>
                            <span>NONE</span></div>
                            <div className="checkradio">
                                <input type="radio" name="parking" value="none" 
                                checked={this.state.attributes.parking==="none" }
                                    onChange={this.handleAttribute} />  </div>
                                    </label>
                                    </div>
                            
                            </div>


                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-car"></i></a>
                            <span>FREE</span></div>
                            <div className="checkradio">
                                <input type="radio" name="parking" value="free"
                                 checked={this.state.attributes.parking==="free" }
                                    onChange={this.handleAttribute} />  </div>
                                    </label>
                                    </div>
                            
                            </div>

                            <div className="col-md-3">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox"><a><i className="flaticon-car"></i></a>
                            <span>PAID</span></div>
                            <div className="checkradio">
                                <input type="radio" name="parking" value="paid"
                                 checked={this.state.attributes.parking==="paid" }
                                    onChange={this.handleAttribute} />
                                 </div>
                                 </label>
                                 </div>
                            
                            </div>

                            <hr style={{display:'table', width:'100%', borderTop: '1px solid #ddd'}}/>
                            
                         
                         </div> 
                         <div className="row">
                         <div className="col-md-12 text-center">
                         
               
                         <button className="button-save" onClick={this.search3}>SEARCH</button>
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

export default (SpaceOfficeGodown);