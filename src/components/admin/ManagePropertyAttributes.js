import React, {Component} from "react";
import Axios from "axios";
import NavbarAdmin from "./NavbarAdmin";

class ManagePropertyAttributes extends Component{

    constructor() {
		super()
		this.state = {
      AllAttributes:[],
      house:[],
      hotel:[],
      land:[],
      warehouse:[]
			


		}
    }

    
    componentDidMount(){

       
      var config = {
          method: 'get',
          url: 'https://cuboidtechnologies.com/api/admin/attributes',
          headers: {
           Accept: 'application/json',
           Authorization: "Bearer " + localStorage.getItem("token"),  
          'content-type': 'application/json',
          
         
      },
          
          
          
        };
        
        Axios(config)
        .then( (response)=> {
          console.log(response);
          this.setState({AllAttributes:response.data.attributes,
            AllAttributes:response.data.attributes,
            house:response.data.attributes[0].house,
            land:response.data.attributes[0].land,
            hotel:response.data.attributes[0].hotel,
            warehouse:response.data.attributes[0].warehouse
          })
         
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  onChange=e=>{
    var v=[e.target.name];
    var a=this.state.house.v;
    this.setState({a:e.target.checked})
  }

    render() {
      console.log(this.state);
      var hotel= this.state.hotel;
      var house= this.state.house;
      var land= this.state.land;
      var warehouse= this.state.warehouse;
      console.log(hotel);
      

     


     
        
        
       
        
        return (<div>
          <NavbarAdmin class="zmdi zmdi-globe-alt" name="Manage property atrributes"/>




<div className="table-box">
{/* <div className="datepiker-box flex-end">


<div className="searchbox-right">
<input type="text" placeholder="username/id/email"/>
<i className="zmdi zmdi-search"></i>

</div>

</div> */}

<div className="table-responsive">
<table className="table table-hover">
  <thead className="thead-light">
    <tr>
      <th><input type="checkbox"/></th>
      <th style={{width : '75%'}}>ATTRIBUTES NAME</th>
      
      <th>STATUS</th>
      
      <th>Action</th>
      
    </tr>
  </thead>
  <tbody>
   
    {/* <tr>
      
      <td><input type="checkbox" name="cost" value={this.state.house.cost} onChange={this.onChange} /></td>
      <td>cost </td>
      <td>{house.cost?"Active":"Not Active"}</td>
      
      
      <td>
      <div>
        <label className="switch">
            <input type="checkbox" defaultChecked/>
            <span className="slider"></span>
        </label> 
      </div>

      </td>
     
    </tr> */}

    {/* <tr>
      
      <td><input type="checkbox"/></td>
      <td>STAND ALONE </td>
      <td>Pending</td>
      
      
      <td>
      <div>
        <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
        </label> 
      </div>

      </td>
     
    </tr>

    <tr>
      
      <td><input type="checkbox"/></td>
      <td>APARTMENT </td>
      <td>Active</td>
      
      
      <td>
      <div>
        <label className="switch">
            <input type="checkbox" defaultChecked/>
            <span className="slider"></span>
        </label> 
      </div>

      </td>
     
    </tr>

    <tr>
      
      <td><input type="checkbox"/></td>
      <td>COMPLETED </td>
      <td>Active</td>
      
      
      <td>
      <div>
        <label className="switch">
            <input type="checkbox" defaultChecked/>
            <span className="slider"></span>
        </label> 
      </div>

      </td>
     
    </tr>

    <tr>
      
      <td><input type="checkbox"/></td>
      <td>OFF PLAN </td>
      <td>Active</td>
      
      
      <td>
      <div>
        <label className="switch">
            <input type="checkbox" defaultChecked/>
            <span className="slider"></span>
        </label> 
      </div>

      </td>
     
    </tr>

    <tr>
      
      <td><input type="checkbox"/></td>
      <td>GATED </td>
      <td>Active</td>
      
      
      <td>
      <div>
        <label className="switch">
            <input type="checkbox" defaultChecked/>
            <span className="slider"></span>
        </label> 
      </div>

      </td>
     
    </tr> */}

      {/* House */}
<tr>
  <td><input type="checkbox" /></td>
  <td>SUB CATEGORY</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>SWIMMING POOL</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>DISABILITY FEATURE</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>MATURE GARDEN</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>WATER FRONT</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>BEDROOM</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>BATH TABS</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>OPTICAL FIBER</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>BORE HOLE</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>PROPERTY STATUS</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>SOLAR HOT WATER</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>PARTY AREA</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>STEAM BATH</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>PARKING SLOTS</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>CCTV</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>FIRE PLACE</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>PETS ALLOWED</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>BALCONY</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>BATHROOMS</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>LIFTS</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>GYM</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>LIVING AREA SIZE</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>KITCHEN AREA SIZE</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>GARDEN AREA SIZE</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>


{/* Land */}

<tr>
  <td><input type="checkbox" /></td>
  <td>FREEHOLD</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>LEASE</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>COUNCIL WATER</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>ELECTRICITY</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>BORE HOLE</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>READYFENCE</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>CONTROLLEDDEVELOPMENT</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>WATERFRONT</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>GATED</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>SOIL TYPE</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>NATURE</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>ROAD</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>KM TO SHOPPING CENTER</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>KM TO NEIGHBOUR</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>KM TO TARMAC</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>KM TO WATER</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>KM TO ELECTRICITY</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>COST</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>SIZE IN ACRES</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>


{/* Warehouse */}
<tr>
  <td><input type="checkbox" /></td>
  <td>COST</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>AREA</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>SIZEINFEET</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>KM FROM TARMAC</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>CONFERENCE FACILITIES</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>FRESHOUTDOORS</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>AIRCON</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>FULLY FURNISHED</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>LANSCAPE GARDEN</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>WIFI</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>SHARED SECRETARY</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>ZONING</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>TOWN LOCATION</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>ACCESS ROAD</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>TENANTS</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>ELEVATOR</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>SECURITY</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>VEHICLE TRAFFIC</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>HUMAN TRAFFIC</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>MEETING ROOM</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>PARKING</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>

{/* Hotel */}

<tr>
  <td><input type="checkbox" /></td>
  <td>COST</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>CLASS</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>LOCALITY</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>AREA</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>BED BREAKFAST COST</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>KM FROM TARMAC</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>CONFERENCE ROOM</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>CARPARK</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>AIRCON</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>SPA</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>FRESH OUTDOORS</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>INDOOR POOL</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>DISABILITY ACCESS</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>BARLOUNGE</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>HAIT SALON</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td><input type="checkbox" /></td>
  <td>PETSALLOWED</td>
  <td>Pending</td>

  <td>
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  </td>
</tr>



    
    
    

    
    
  </tbody>
</table>

</div>

{/* <div className="member-delectbox">
<a href="#" className="delect_btn">Delete</a>

</div> */}

</div>

{/* <div className="pageination-box">
<ul>
<li className="pre-btn">PREVIOUS</li>
<li className="next-slide">01</li>
<li>02</li>
<li className="next-btn next-slide">NEXT</li>
<li className="dropdown peritem">
<button className="btn-itempage dropdown-toggle" type="button" data-toggle="dropdown">5 Items / Page
  <span className="caret"></span></button>
  <ul className="dropdown-menu">
    <li><a href="#">5 Items / Page</a></li>
    <li><a href="#">5 Items / Page</a></li>
    <li><a href="#">5 Items / Page</a></li>
  </ul>

</li>

</ul>

</div> */}


        </div>)
    }
}

export default (ManagePropertyAttributes);