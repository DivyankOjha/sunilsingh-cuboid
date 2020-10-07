import React, {Component} from "react";
import NavbarSearch from "./navbarSearch";
import InputRange from 'react-input-range';
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import SelectSearch from 'react-select-search';
import Spinner from "../../common/Spinner";

class HotelSearch extends Component{

    constructor() {
		super()
		this.state = {
            pop1:true,
            pop2:false,
            kmfromtarmac: 2,
            conferenceroom: 2,
            bedbreakfastcost: {
                min: 3,
                max: 7,
              },

              attributes:{
                class:"",
                locality:""
              },
              results:[],
              total:'',
              isResult:false,
              HotelName:'',
              isLogin:false,
              isSubscribed:false,
              isNotSubscribed:false


    }
    this.ajaxChange = this.ajaxChange.bind(this);
    this.ajaxHotelNameChange = this.ajaxHotelNameChange.bind(this);
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

   

    pop2_1=e=>{
      window.scrollTo(0, 0)
        this.setState({pop2:false,pop1:true})
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
        
       
       "attributes":this.state.attributes,
       "bedbreakfastcost":this.state.bedbreakfastcost,

        "kmfromtarmac":this.state.kmfromtarmac,

        "conferenceroom":this.state.conferenceroom
    
        
    }
   
    var config = {
        method: 'post',
        url: 'https://cuboidtechnologies.com/api/search/hotel-search-1',
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
    
   
    "attributes":this.state.attributes,
       "bedbreakfastcost":this.state.bedbreakfastcost,

        "kmfromtarmac":this.state.kmfromtarmac,

        "conferenceroom":this.state.conferenceroom

    
}

var config = {
    method: 'post',
    url: 'https://cuboidtechnologies.com/api/search/hotel-search-2',
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
    url: 'https://cuboidtechnologies.com/api/admin/hotel/search-hotel-location',
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
handleAjaxHotelName(e){
  console.log(e)
  const data={
    "searchquery":e
}

  var config = {
    method: 'post',
    url: 'https://cuboidtechnologies.com/api/admin/hotel/search-hotel-name',
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
      HotelName:response.data.data
     
    })
   
    
  })
  .catch(function (error) {
    console.log(error);
  });





}
ajaxHotelNameChange(e){
  console.log(e);
  this.setState({Hotel:e})
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
          state: { Type: "rent" }
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
            Class :{att.class}
                </div>  
          </div>


          <div className="col-md-4">
            <div className="cat-listbox">
            Locality :{att.locality}
                </div>  
          </div>

          <div className="col-md-4">
            <div className="cat-listbox">
            Area :{this.state.area}

                </div>  
          </div>
          <div className="col-md-4">
            <div className="cat-listbox">
            Bed Break fast Minimum cost:
${this.state.bedbreakfastcost.min}


                </div>  
          </div>

          <div className="col-md-4">
            <div className="cat-listbox">
            Bed Breakfast Maximum cost:
${this.state.bedbreakfastcost.max}

                </div>  
          </div>

          <div className="col-md-4">
            <div className="cat-listbox">
            Hotel Name :{this.state.Hotel}

                </div>  
          </div>
          <div className="col-md-4">
            <div className="cat-listbox">
      KMs from Tarmac :{this.state.kmfromtarmac}KM

                </div>  
          </div>
          <div className="col-md-4">
            <div className="cat-listbox">
            Conference room :{this.state.conferenceroom}

                </div>  
          </div>

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

      var options2 = [];
      if(this.state.HotelName){
        this.state.HotelName.map(a=>{
          console.log(a.propertyDetails.propertyName);
           options2.push({name: a.propertyDetails.propertyName, value: a.propertyDetails.propertyName})
          
        })
      }
      console.log(this.props)
     


     
        
        
       
        
        return (<div>

            <NavbarSearch/>
            { this.state.isResult?
        <Redirect to={{
          pathname: '/search-result',
          state: { results: this.state.results,total:this.state.total }
        }}/> :""}

        {this.state.loader?<Spinner/>:
        <div>
            
           

            {this.state.pop1?


            
            <div>
                
                {/* Start pop up 1 */}
                
                <div className="house-main">
                <div className="container">
                    <div className="boxdiv">
                   
                        <div className="row scroll-container height-455">
                        <h1>Class</h1>
                            <div className="col-md-4">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox">
                                    <a><i className="flaticon-hotel"></i></a>
                                   <span>WORLD-CLASS </span> 
                                    </div>
                                    <div className="checkradio">
                                    <input type="radio" name="class" value="WorldClass"  checked={this.state.attributes.class === "WorldClass"} onChange={this.handleAttribute}/>
                                    </div>
                                      </label>
                                  </div>  
                            </div>

                            <div className="col-md-4">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox">
                                    <a><i className="flaticon-hotel-1"></i></a>
                                    <span>MID RANGE</span>
                                    </div>
                                    <div className="checkradio">
                                    <input type="radio" name="class" value="MidRange"  checked={this.state.attributes.class === "MidRange"} onChange={this.handleAttribute}/>
                                    </div>
                                     </label>
                                  </div>  
                            </div>

                            <div className="col-md-4">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox">
                                    <a><i className="flaticon-hotel-2"></i></a>
                                   <span>BUDGET</span> 
                                    </div>
                                    <div className="checkradio">
                                    <input type="radio" name="class" value="Budget"  checked={this.state.attributes.class === "Budget"} onChange={this.handleAttribute}/>
                                    </div>
                                      </label>
                                  </div>  
                            </div>
                            

                            



                            
                        <h1 className="checkgated">Locality</h1>


                        <div className="col-md-4">
                        <div className="checklist newlabel">
                                  <label>
                                <div className="listbox">
                                    <a><i className="flaticon-review"></i></a>
                                   <span>CITY</span> 
                                    </div>
                                    <div className="checkradio">
                                    <input type="radio" name="locality" value="City"  checked={this.state.attributes.locality === "City"} onChange={this.handleAttribute}/>
                                    </div>
                                     </label> 
                                  </div>  
                            </div>

                            <div className="col-md-4">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox">
                                    <a><i className="flaticon-transporting"></i></a>
                                   <span>AIRPORT</span> 
                                    </div>
                                    <div className="checkradio">
                                    <input type="radio" name="locality" value="Airport"  checked={this.state.attributes.locality === "Airport"} onChange={this.handleAttribute}/>
                                    </div>
                                      </label>
                                  </div>  
                            </div>
                            <div className="col-md-4">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox">
                                    <a><i className="flaticon-bungalow"></i></a>
                                   <span>OUT SKIRTS</span> 
                                    </div>
                                    <div className="checkradio">
                                    <input type="radio" name="locality" value="Outskirts"  checked={this.state.attributes.locality === "Outskirts"} onChange={this.handleAttribute}/>
                                    </div>
                                      </label>
                                  </div>  
                            </div>
                            <div className="col-md-4">
                            <div className="checklist newlabel">
                                  <label>
                                <div className="listbox">
                                    <a><i className="flaticon-hotel-3"></i></a>
                                   <span>GAME HOTEL</span> 
                                    </div>
                                    <div className="checkradio">
                                    <input type="radio" name="locality" value="GameHotel"  checked={this.state.attributes.locality === "GameHotel"} onChange={this.handleAttribute}/>
                                    </div>
                                      </label>
                                  </div>  
                            </div>









{/*<h2 className="entersub">Enter a location suburb or town</h2>*/}

<div className="sunbrun p-l" >
<SelectSearch options={options} value={this.state.area}  name="area" placeholder="Enter area" search={true} getOptions={e=>this.handleAjax(e)} onChange={this.ajaxChange}  />
     </div> 
<div className="col-md-4">
<div className="land-slider range-slider ">
                        <div className="rangediv">
            <h5><b><i className="flaticon-bed-and-breakfast"></i>Bed Breakfast Cost</b> <span>${this.state.bedbreakfastcost.min}-${this.state.bedbreakfastcost.max}</span></h5>
                        <InputRange
          draggableTrack
          maxValue={20}
          minValue={0}
          onChange={value => this.setState({ bedbreakfastcost: value })}
          onChangeComplete={value => console.log(value)}
          value={this.state.bedbreakfastcost} />

                        </div>
                        </div>


</div>

{/*<h2 className="entersub border-bottom">Hotel Name</h2>*/}

<div className="sunbrun p-l">
<SelectSearch options={options2}   name="HotelName" value={this.state.Hotel} placeholder="Enter name" search={true} getOptions={e=>this.handleAjaxHotelName(e)} onChange={this.ajaxHotelNameChange}  />
</div>

<div className="col-md-12">
<div className="kms tarbox">
  <div className="tarmsb"><i className="flaticon-road"></i><span>KMs from Tarmac</span> </div>

<div className="tramc">
<InputRange
          maxValue={20}
          minValue={0}
          formatLabel={value => value.toFixed(2)}
          value={this.state.kmfromtarmac}
          onChange={value => this.setState({ kmfromtarmac: value })}
          onChangeComplete={value => console.log(value)} />  
     <span> {this.state.kmfromtarmac}</span>
</div>

</div>
</div>

<div className="col-md-12">
<div className="kms">
<div className="tarmsb"><i className="flaticon-dinner-table"></i>
<span>Conference room and number </span> </div>

<div className="tramc">
<InputRange
          maxValue={20}
          minValue={0}
          formatLabel={value => value.toFixed(2)}
          value={this.state.conferenceroom}
          onChange={value => this.setState({ conferenceroom: value })}
          onChangeComplete={value => console.log(value)} />

<span>{this.state.conferenceroom}</span>
</div>

</div>
</div>


    

  

                        </div>
                        <div className="btn-psearchbox">
                        <button className="button-save" onClick={this.search1}>SEARCH(with these details)</button>
  <button className="button-save" onClick={this.pop1_2}>ADD DETAILS (for specific search)</button>
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
                      <div className="boxdiv promt">
                     
                     <div className="row">
                         <h1 className="checkgated"><span onClick={this.pop2_1}>
                             <i className="zmdi zmdi-arrow-back"></i> Back To Previous Promt Box</span></h1>
                         <div className="col-md-4">
                              <div className={this.state.attributes.carpark==true?"optical optical-act":"optical"}>
                                <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-car"></i></a> <span>Car park</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="carpark" defaultChecked={this.state.attributes.carpark} onChange={this.handleAttribute} />
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
                                     <input type="checkbox" name="aircon" defaultChecked={this.state.attributes.aircon} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.spa==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-massage"></i></a> <span>Spa</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="spa" defaultChecked={this.state.attributes.spa} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.freshoutdoors==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-picnic"></i></a> <span>Fresh outdoors</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="freshoutdoors" defaultChecked={this.state.attributes.freshoutdoors} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>


                            <div className="col-md-4">
                              <div className={this.state.attributes.indoorpool==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-swimming"></i></a> <span>Indoor Pool</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="indoorpool" defaultChecked={this.state.attributes.indoorpool} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.disabilityaccess==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-handicap"></i></a> <span>Disability Access</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="disabilityaccess" defaultChecked={this.state.attributes.disabilityaccess} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>


                            <div className="col-md-4">
                              <div className={this.state.attributes.barlounge==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-bar"></i></a> <span>Bar Lounge</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="barlounge" defaultChecked={this.state.attributes.barlounge} onChange={this.handleAttribute}/>
                                     </div>
                                     
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.hairsalon==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-hair"></i></a> <span>Hair salon</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="hairsalon" defaultChecked={this.state.attributes.hairsalon} onChange={this.handleAttribute} />
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
                                     <input type="checkbox"  name="petsallowed" defaultChecked={this.state.attributes.petsallowed} onChange={this.handleAttribute}/>
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                            <div className="col-md-4">
                              <div className={this.state.attributes.maturegarden==true?"optical optical-act":"optical"}>
                              <label>
                                 <div className="fiber">
                                 <a><i className="flaticon-warehouse"></i></a> <span>Mature Garden</span>
                                     </div>
                                     <div className="decheck">
                                     <input type="checkbox" name="maturegarden" defaultChecked={this.state.attributes.maturegarden} onChange={this.handleAttribute} />
                                     </div>
                                     </label>
                                  </div> 
                            </div>

                           
                            <div className="col-md-12 text-center">
                            <button className="button-save" onClick={this.search2}>SEARCH</button>
               
                
                      </div> 
                         
                         
                         </div> 
                           
                    </div>



                    </div>
                </div>
                
                


                 {/* end pop up 2 */}


                </div>:""}

                </div>}
        </div>)
    }
}

export default (HotelSearch);