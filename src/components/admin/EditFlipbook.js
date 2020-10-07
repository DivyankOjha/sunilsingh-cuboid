import React, {Component} from "react";
import Axios from "axios";
import Spinner from "../common/Spinner";
import NavbarAdmin from "./NavbarAdmin";
import { Redirect } from "react-router-dom";

class EditFlipbook extends Component{

    constructor() {
		super()
		this.state = {
            title:'',
            description:'',
            description2:'',

            propertyName:'',
            PropertyId:'',
            CategoryType:'',

            banner:'',
            image2d:[],
            image3d:'',
            link360:'',
            tempFloor:'',
            tempFloorName:'',
            floorPlan:[],
            attributes:{},
            step1:true,
            step2:false,
            step3:false,
            loader:false,
            isAdded:false

			


		}
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
          .then( (response)=> {
            console.log(response);
            this.setState({
                title:response.data.flipbook.flipbook.title,
                description:response.data.flipbook.flipbook.description,
                image2d:response.data.flipbook.flipbook.image2D,
                image3d:response.data.flipbook.flipbook.image3D,
                attributes:response.data.flipbook.flipbook.showAttributes,
                link360:response.data.flipbook.flipbook.tour360Property,
                floorPlan:response.data.flipbook.flipbook.floorPlan,
                banner:response.data.flipbook.flipbook.flipbookBanner,
                description2:response.data.flipbook.propertyDetails.propertyDescription,
                otherdetails:response.data.flipbook.propertyDetails.otherDetails,
                seller:response.data.flipbook.sellerDetails,
                similarProperty:response.data.flipbook.propertyDetails.selectSimilarProperties,
                propertyDetails:response.data.flipbook.propertyDetails,
                CategoryType:response.data.flipbook.categoryType,
                PropertyId:response.data.flipbook._id,
                PropertyName:response.data.flipbook.propertyDetails.propertyName,
                loader:false
                 
              })
           
            
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    selectChange=e=>{
        console.log(e.target.value);
        var id=e.target.value;
        this.state.AllProperty.map(ap=>{
            if(ap[2]==id){
                console.log(ap);
                this.setState({CategoryType:ap[1], PropertyId:ap[2], attributes:{}})
            }
        })
    }


    handleChange=e=>{
     
        this.setState({[e.target.name]:e.target.value})
  
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

      onUploadBanner = event => {
        let files = event.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = e => {
            console.log(e.target.result);
            this.setState({banner:e.target.result});
        }
    }
  
    onUploadImages=event=>{
        let files = event.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = e => {
            console.log(e.target.result);
            this.setState({image2d:this.state.image2d.concat(e.target.result)});
        }

    }

    onUpload3d=event=>{
        let files = event.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = e => {
            console.log(e.target.result);
            this.setState({image3d:e.target.result});
        }

    }

    onUploadFloor=event=>{
        let files = event.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = e => {
            console.log(e.target.result);
            this.setState({tempFloor:e.target.result});
        }

    }

    addFloorPlan=e=>{
        this.setState({floorPlan:this.state.floorPlan.concat({"fileName":this.state.tempFloorName,"url":this.state.tempFloor})})
        this.setState({tempFloor:'',tempFloorName:''});
    }


    onSubmit=e=>{
        console.log(this.state);
        

        if(this.state.tempFloor!='' && this.state.tempFloorName!=''){
          this.setState({floorPlan:this.state.floorPlan.concat({"fileName":this.state.tempFloorName,"url":this.state.tempFloor})})
          this.setState({tempFloor:'',tempFloorName:''});

      }
      if(this.state.title==''){
        this.setState({valititle:true})
      }
      else{
        this.setState({valititle:false})

      }
      if(this.state.description==''){
        this.setState({validescription:true})
      }
      else{
        this.setState({validescription:false})

      }
      if(this.state.description2==''){
        this.setState({validescription2:true})
      }
      else{
        this.setState({validescription2:false})

      }

      if(this.state.banner==''){
        this.setState({valibanner:true})
      }
      else{
        this.setState({valibanner:false})

      }

      if(this.state.image2d.length >5){
        this.setState({valiimage2d:true})
      }
      else{
        this.setState({valiimage2d:false})

      }
      if(this.state.image3d==''){
        this.setState({valiimage3d:true})
      }
      else{
        this.setState({valiimage3d:false})

      }
      if(this.state.link360==''){
        this.setState({valilink360:true})
      }
      else{
        this.setState({valilink360:false})

      }
      if(this.state.floorPlan.length==0){
        this.setState({valifloorPlan:true})
      }
      else{
        this.setState({valifloorPlan:false})

      }
      if(this.state.CategoryType==''){
        this.setState({valiCatType:true})
      }
      else{
        this.setState({valiCatType:false})

      }


      if(
        this.state.title!=''
        &&
        this.state.description!=''
        &&
        this.state.description2!=''
        &&
        this.state.banner!=''
        &&
        this.state.image2d.length > 4
        &&
        this.state.image3d!=''
        &&

        this.state.link360!=''
        &&
        this.state.floorPlan.length >0
        &&
        this.state.CategoryType!=''


      ){
        this.setState({loader:true})

        const data={
            
                "propertyType":this.state.CategoryType,
                "_id":this.state.PropertyId,
                
                 "showAttributes" : this.state.attributes,
                
                 "title": this.state.title,
                 "description":this.state.description,
                
                 "flipbookBanner": this.state.banner,
                
                 "image2D": this.state.image2d,
                 "image3D":this.state.image3d,
                
                 "tour360Property":this.state.link360,
                "floorPlan": this.state.floorPlan,
                 "map":"map path/link",
                 "contactSeller": "Seller details or contact no.",
                "propertyAvailability": true,
                "sendmessageToSeller":"message",
                "content":this.state.description2
                
           
          
          
    
          
              
          }
          console.log(data)
          var config = {
              method: 'post',
              url: 'https://cuboidtechnologies.com/api/admin/flipbook',
              headers: {
               Accept: 'application/json',
               Authorization: "Bearer " + localStorage.getItem("token"),  
              'content-type': 'application/json',
              
             
          },
              data : data,
              
              
            };
            
            Axios(config)
            .then( (response)=> {
              console.log(response);
              alert("Successfully Edited Flipbook");
              this.setState({isAdded:true,loader:false})
  
             
            })
            .catch(function (error) {
              console.log(error);
            });

          }
          else{
            alert("some fields are missing")
          }
  
  
    }

    step1c=e=>{
      window.scrollTo(0, 0)
      this.setState({step1:true,step2:false,step3:false});
    }

    
    step2c=e=>{
      window.scrollTo(0, 0)
      this.setState({step1:false,step2:true,step3:false});
    }
    
    step3c=e=>{
      window.scrollTo(0, 0)
      this.setState({step1:false,step2:false,step3:true});
    }

    remove2d=i=>e=>{
      console.log("2d")
      console.log(i);
      console.log( this.state.image2d);
      var a=this.state.image2d;
      a.splice(i,1);


       console.log(a)
      this.setState({image2d:a})
    }

    removeFloor=i=>e=>{
      console.log("Floor")
      console.log(i);
      console.log( this.state.floorPlan);
      var a=this.state.floorPlan;
      console.log(a.length)
      if (i !== a.length-1) {
      a.splice(i,1);
      }
      else{
        a.pop()
      }

       console.log(a)
      this.setState({floorPlan:a})
    }




    render() {
     console.log(this.state)

     var AllPropertys;

     if(this.state.AllProperty){

     AllPropertys=  this.state.AllProperty.map(ap=>{
     return(<option key={ap[2]} value={ap[2]}>{ap[0]}</option>)
     })
    }
    
    var All2dImg;
    var j=-1;
    if(this.state.image2d.length>0){
      All2dImg= this.state.image2d.map(i=>{
        console.log("insi")
       
        console.log(j)
        j=j+1;

          return( <li><img src={i} alt="" /> <span onClick={this.remove2d(j)}><i className="zmdi zmdi-close"></i></span></li>

          
          )      
            
        })
    }

    var AllFloorPlan;
    var k=-1;
    if(this.state.floorPlan.length>0){
     

        AllFloorPlan= this.state.floorPlan.map(f=>{console.log("in floor")
        k=k+1;
        console.log(k)
            return(
                <ul className="file-img ploor">
                        <li><img src={f.url} alt="" /><span onClick={this.removeFloor(k)} ><i className="zmdi zmdi-close"></i></span>
                        <p> {f.fileName} </p>
                        </li>
                        </ul>
                        
                        
                        

            )
        })

    }

    
    


     
        
        
     
        return (<div>

<NavbarAdmin class="zmdi zmdi-map" name="Edit Flipbook "/>
{ this.state.isAdded?
        <Redirect to={{
          pathname: '/manage-property',
         
        }}/> :""}

{this.state.loader?<Spinner/>:
<div>
<div className="select-category">
  <div className="p-l-r">
    <label> Property Name:</label>
   
    <span>{this.state.PropertyName}</span>
    </div>
</div>
<div className="tabbable-panel select-category">
				<div className="tabbable-line">
					<ul className="flip-tabs ">
						<li className={this.state.step1?"active":""}>
							<a href="#tab_default_1" data-toggle="tab" onClick={this.step1c}>
                            EDIT PAGE 1</a>
						</li>
						<li  className={this.state.step2?"active":""}>
							<a href="#tab_default_2" data-toggle="tab" onClick={this.step2c}>
                            EDIT PAGE 2</a>
						</li>
						<li  className={this.state.step3?"active":""} >
							<a href="#tab_default_3" data-toggle="tab" onClick={this.step3c}>
                            EDIT PAGE 3</a>
						</li>
         
					</ul>
					<div className="tab-content">
						<div className="tab-pane active" id="tab_default_1">
                        <h3 className="add-property-title">Edit content</h3>
                        <div className="add-property-form">
                        <div className="form-group"><label>Title</label>
                        <input type="text" className="form-control" placeholder="Enter title" name="title" value={this.state.title} onChange={this.handleChange} />
                        {this.state.valititle?<div className='warning'>*Enter Title</div>:""}
                        </div>  
                   

                        <div className="form-group"><label>Description</label>
                        <textarea className="form-control" placeholder="Type here" name="description" value={this.state.description} onChange={this.handleChange}></textarea>
                        {this.state.validescription?<div className='warning'>*Enter Description</div>:""}
                        </div>
                        <div className="form-group text-right">
                            <button className="step-next" href="#tab_default_2" data-toggle="tab" onClick={this.step2c}>Next</button></div>
                        </div>
							</div>
						<div className="tab-pane" id="tab_default_2">
						<h3 className="add-property-title">Edit content</h3>
                        <div className="add-property-form">
                        <div className="form-group"><label>Upload banner</label>
                        <div className="uplimg">
                        <input type="file" name="banner" onChange={this.onUploadBanner}/>
                        {this.state.banner?<img src={this.state.banner}/>:
                             <div className="dropzone-file">
<i className="zmdi zmdi-image"></i>
<p>Attatch a image</p>

<input type="file" name="banner" onChange={this.onUploadBanner}/>
    
                        </div>}
                        </div>
                        </div> 
                        {this.state.valibanner?<div className='warning'>*Banner is Required</div>:""}

                        <div className="form-group"><label>Upload 2D images (5 Photos Minimum)</label>
                        <ul className="file-img">

                            {All2dImg}
                            <li><div className="add-imgbox">
        <i className="zmdi zmdi-plus"><input type="file" onChange={this.onUploadImages} /></i>

        </div></li>
                            
                            
                      
                                                  
                        </ul>
                        </div>  
                        {this.state.valiimage2d?<div className='warning'>* Minimum 5 2D Images are Required</div>:""}

                        
                        
                        </div>

                        {this.state.CategoryType==""? <div className="please-choose">Please Choose the property from dropdown to see the attributes</div>:""}



                        {this.state.CategoryType=="House"? <div>

                        <h3 className="add-property-title">Show Property Attributes</h3>

                    <div className="attributes-main">
                    <div className="attributes">
                    <ul>
  <li>
    <input
      type="checkbox"
      name="subCategory"
      defaultChecked={this.state.attributes.subCategory}
      onChange={this.handleAttribute}
    />
    SUB CATEGORY
  </li>
  <li>
    <input
      type="checkbox"
      name="opticalfiber"
      defaultChecked={this.state.attributes.opticalfiber}
      onChange={this.handleAttribute}
    />
    OPTICAL FIBRE
  </li>
  <li>
    <input
      type="checkbox"
      name="cctv"
      defaultChecked={this.state.attributes.cctv}
      onChange={this.handleAttribute}
    />
    CCTV
  </li>
 
  <li>
    <input
      type="checkbox"
      name="swimmingpool"
      defaultChecked={this.state.attributes.swimmingpool}
      onChange={this.handleAttribute}
    />
    SWIMMING POOL
  </li>
  <li>
    <input
      type="checkbox"
      name="borehole"
      defaultChecked={this.state.attributes.borehole}
      onChange={this.handleAttribute}
    />
    BORE HOLE
  </li>
  
  <li>
    <input
      type="checkbox"
      name="fireplace"
      defaultChecked={this.state.attributes.fireplace}
      onChange={this.handleAttribute}
    />
    FIRE PLACE
  </li>
  <li>
    <input
      type="checkbox"
      name="disabilityfeature"
      defaultChecked={this.state.attributes.disabilityfeature}
      onChange={this.handleAttribute}
    />
    DISABILITY FEATURE
  </li>
  <li>
    <input
      type="checkbox"
      name="propertyStatus"
      defaultChecked={this.state.attributes.propertyStatus}
      onChange={this.handleAttribute}
    />
    Property Status
  </li>
  <li>
    <input
      type="checkbox"
      name="petsallowed"
      defaultChecked={this.state.attributes.petsallowed}
      onChange={this.handleAttribute}
    />
    PETS ALLOWED
  </li>
  <li>
    <input
      type="checkbox"
      name="maturegarden"
      defaultChecked={this.state.attributes.maturegarden}
      onChange={this.handleAttribute}
    />
    MATURE GARDEN
  </li>
  
  <li>
    <input
      type="checkbox"
      name="solarhotwater"
      defaultChecked={this.state.attributes.solarhotwater}
      onChange={this.handleAttribute}
    />
    SOLAR HOT WATER
  </li>
  <li>
    <input
      type="checkbox"
      name="balcony"
      defaultChecked={this.state.attributes.balcony}
      onChange={this.handleAttribute}
    />
     BALCONY
  </li>
  
  <li>
    <input
      type="checkbox"
      name="waterfront"
      defaultChecked={this.state.attributes.waterfront}
      onChange={this.handleAttribute}
    />
    WATER FRONT
  </li>
  <li>
    <input
      type="checkbox"
      name="partyarea"
      defaultChecked={this.state.attributes.partyarea}
      onChange={this.handleAttribute}
    />
    PARTY AREA
  </li>
  <li>
    <input
      type="checkbox"
      name="bathrooms"
      defaultChecked={this.state.attributes.bathrooms}
      onChange={this.handleAttribute}
    />
    Bathrooms
  </li>
  {/* <!-- added - new  BEDROOM--> */}
  <li>
    <input
      type="checkbox"
      name="bedroom"
      defaultChecked={this.state.attributes.bedroom}
      onChange={this.handleAttribute}
    />
    Bedroom
  </li>
  {/* <!--added - new  STeambath--> */}
  <li>
    <input
      type="checkbox"
      name="steambath"
      defaultChecked={this.state.attributes.steambath}
      onChange={this.handleAttribute}
    />
    Steambath
  </li>

  <li>
    <input
      type="checkbox"
      name="lift"
      defaultChecked={this.state.attributes.lift}
      onChange={this.handleAttribute}
    />
    lifts
  </li>
  <li>
    <input
      type="checkbox"
      name="bathtab"
      defaultChecked={this.state.attributes.bathtab}
      onChange={this.handleAttribute}
    />
    baths tabs
  </li>
  <li>
    <input
      type="checkbox"
      name="parking"
      defaultChecked={this.state.attributes.parking}
      onChange={this.handleAttribute}
    />
    parking slots
  </li>
  <li>
    <input
      type="checkbox"
      name="gym"
      defaultChecked={this.state.attributes.gym}
      onChange={this.handleAttribute}
    />
    Gym
  </li>
  <li>
    <input
      type="checkbox"
      name="livingsize"
      defaultChecked={this.state.attributes.livingsize}
      onChange={this.handleAttribute}
    />
    Living Area Size
  </li>
  <li>
    <input
      type="checkbox"
      name="kitchensize"
      defaultChecked={this.state.attributes.kitchensize}
      onChange={this.handleAttribute}
    />
    Kitchen Area Size
  </li>
  <li>
    <input
      type="checkbox"
      name="gardensize"
      defaultChecked={this.state.attributes.gardensize}
      onChange={this.handleAttribute}
    />
    Garden Area Size
  </li>
</ul>

                    </div>
                    

               

                    

                    </div>	</div>:""}

                    {this.state.CategoryType=="Land"?  <div>

<h3 className="add-property-title">Show Property Attributes</h3>

<div className="attributes-main">
<div className="attributes">

<ul>
  <li>
    <input
      type="checkbox"
      name="freehold"
      defaultChecked={this.state.attributes.freehold}
      onChange={this.handleAttribute}
    />
    freehold
  </li>
  <li>
    <input
      type="checkbox"
      name="lease"
      defaultChecked={this.state.attributes.lease}
      onChange={this.handleAttribute}
    />
    lease
  </li>
  <li>
    <input
      type="checkbox"
      name="councilwater"
      defaultChecked={this.state.attributes.councilwater}
      onChange={this.handleAttribute}
    />
    council water
  </li>
  <li>
    <input
      type="checkbox"
      name="electricity"
      defaultChecked={this.state.attributes.electricity}
      onChange={this.handleAttribute}
    />
    electricity
  </li>
  <li>
    <input
      type="checkbox"
      name="borehole"
      defaultChecked={this.state.attributes.borehole}
      onChange={this.handleAttribute}
    />
    BORE HOLE
  </li>
  <li>
    <input
      type="checkbox"
      name="readyfence"
      defaultChecked={this.state.attributes.readyfence}
      onChange={this.handleAttribute}
    />
    readyfence
  </li>
  <li>
    <input
      type="checkbox"
      name="controlleddevelopment"
      defaultChecked={this.state.attributes.controlleddevelopment}
      onChange={this.handleAttribute}
    />
    controlleddevelopment
  </li>
  <li>
    <input
      type="checkbox"
      name="waterfront"
      defaultChecked={this.state.attributes.waterfront}
      onChange={this.handleAttribute}
    />
    waterfront
  </li>
  <li>
    <input
      type="checkbox"
      name="gated"
      defaultChecked={this.state.attributes.gated}
      onChange={this.handleAttribute}
    />
    gated
  </li>
  <li>
    <input
      type="checkbox"
      name="soilType"
      defaultChecked={this.state.attributes.soilType}
      onChange={this.handleAttribute}
    />
    soil Type
  </li>
  <li>
    <input
      type="checkbox"
      name="nature"
      defaultChecked={this.state.attributes.nature}
      onChange={this.handleAttribute}
    />
    nature
  </li>
  <li>
    <input
      type="checkbox"
      name="road"
      defaultChecked={this.state.attributes.road}
      onChange={this.handleAttribute}
    />
    road
  </li>
  <li>
    <input
      type="checkbox"
      name="kmtoshoppingcenter"
      defaultChecked={this.state.attributes.kmtoshoppingcenter}
      onChange={this.handleAttribute}
    />
    km to shopping center
  </li>
  <li>
    <input
      type="checkbox"
      name="kmtoneighbour"
      defaultChecked={this.state.attributes.kmtoneighbour}
      onChange={this.handleAttribute}
    />
    km to neighbour
  </li>
  <li>
    <input
      type="checkbox"
      name="kmtotarmac"
      defaultChecked={this.state.attributes.kmtotarmac}
      onChange={this.handleAttribute}
    />
    km to tarmac
  </li>
  <li>
    <input
      type="checkbox"
      name="kmtowater"
      defaultChecked={this.state.attributes.kmtowater}
      onChange={this.handleAttribute}
    />
    km to water
  </li>
  <li>
    <input
      type="checkbox"
      name="kmtoelectricity"
      defaultChecked={this.state.attributes.kmtoelectricity}
      onChange={this.handleAttribute}
    />
    km to electricity
  </li>
  <li>
    <input
      type="checkbox"
      name="cost"
      defaultChecked={this.state.attributes.cost}
      onChange={this.handleAttribute}
    />
    cost
  </li>
  <li>
    <input
      type="checkbox"
      name="sizeinacres"
      defaultChecked={this.state.attributes.sizeinacres}
      onChange={this.handleAttribute}
    />
    size in acres
  </li>
</ul>

    
    </div></div></div>
    :""}

                    
                    {this.state.CategoryType=="Warehouse"? <div>

<h3 className="add-property-title">Show Property Attributes</h3>

<div className="attributes-main">
<div className="attributes">

<ul>
  <li>
    <input
      type="checkbox"
      name="cost"
      defaultChecked={this.state.attributes.cost}
      onChange={this.handleAttribute}
    />
    cost
  </li>
  <li>
    <input
      type="checkbox"
      name="area"
      defaultChecked={this.state.attributes.area}
      onChange={this.handleAttribute}
    />
    area
  </li>
  <li>
    <input
      type="checkbox"
      name="sizeinfeet"
      defaultChecked={this.state.attributes.sizeinfeet}
      onChange={this.handleAttribute}
    />
    sizeinfeet
  </li>
  <li>
    <input
      type="checkbox"
      name="kmfromtarmac"
      defaultChecked={this.state.attributes.kmfromtarmac}
      onChange={this.handleAttribute}
    />
    km from tarmac
  </li>
  <li>
    <input
      type="checkbox"
      name="conferencefacilites"
      defaultChecked={this.state.attributes.conferencefacilites}
      onChange={this.handleAttribute}
    />
    conference facilites
  </li>
  <li>
    <input
      type="checkbox"
      name="freshoutdoors"
      defaultChecked={this.state.attributes.freshoutdoors}
      onChange={this.handleAttribute}
    />
    fresh outdoors
  </li>
  <li>
    <input
      type="checkbox"
      name="aircon"
      defaultChecked={this.state.attributes.aircon}
      onChange={this.handleAttribute}
    />
    aircon
  </li>
  <li>
    <input
      type="checkbox"
      name="fullyfurnished"
      defaultChecked={this.state.attributes.fullyfurnished}
      onChange={this.handleAttribute}
    />
    fully furnished
  </li>
  <li>
    <input
      type="checkbox"
      name="landscapegarden"
      defaultChecked={this.state.attributes.landscapegarden}
      onChange={this.handleAttribute}
    />
    landscape garden
  </li>
  <li>
    <input
      type="checkbox"
      name="wifi"
      defaultChecked={this.state.attributes.wifi}
      onChange={this.handleAttribute}
    />
    wifi
  </li>
  <li>
    <input
      type="checkbox"
      name="sharedsecretary"
      defaultChecked={this.state.attributes.sharedsecretary}
      onChange={this.handleAttribute}
    />
    shared secretary
  </li>
  <li>
    <input
      type="checkbox"
      name="zoning"
      defaultChecked={this.state.attributes.zoning}
      onChange={this.handleAttribute}
    />
    zoning
  </li>
  <li>
    <input
      type="checkbox"
      name="townLocation"
      defaultChecked={this.state.attributes.townLocation}
      onChange={this.handleAttribute}
    />
    Town Location
  </li>
  <li>
    <input
      type="checkbox"
      name="accessRoad"
      defaultChecked={this.state.attributes.accessRoad}
      onChange={this.handleAttribute}
    />
    Access Road
  </li>
  <li>
    <input
      type="checkbox"
      name="tenants"
      defaultChecked={this.state.attributes.tenants}
      onChange={this.handleAttribute}
    />
    Tenants
  </li>
  <li>
    <input
      type="checkbox"
      name="elevator"
      defaultChecked={this.state.attributes.elevator}
      onChange={this.handleAttribute}
    />
    elevator
  </li>
  <li>
    <input
      type="checkbox"
      name="security"
      defaultChecked={this.state.attributes.security}
      onChange={this.handleAttribute}
    />
    security
  </li>
  <li>
    <input
      type="checkbox"
      name="vehicleTraffic"
      defaultChecked={this.state.attributes.vehicleTraffic}
      onChange={this.handleAttribute}
    />
    vehicle Traffic
  </li>
  <li>
    <input
      type="checkbox"
      name="humanTraffic"
      defaultChecked={this.state.attributes.humanTraffic}
      onChange={this.handleAttribute}
    />
    human Traffic
  </li>
  <li>
    <input
      type="checkbox"
      name="meetingRoom"
      defaultChecked={this.state.attributes.meetingRoom}
      onChange={this.handleAttribute}
    />
    meeting Room
  </li>
  <li>
    <input
      type="checkbox"
      name="parking"
      defaultChecked={this.state.attributes.parking}
      onChange={this.handleAttribute}
    />
    parking
  </li>
</ul>

    
    </div></div></div>:""}

                    
                    {this.state.CategoryType=="Hotel"? <div>

<h3 className="add-property-title">Show Property Attributes</h3>

<div className="attributes-main">
<div className="attributes">

<ul>
    <li>
        <input type="checkbox" name="cost" defaultChecked={this.state.attributes.cost}
            onChange={this.handleAttribute} />
        cost
    </li>
    <li>
        <input type="checkbox" name="class" defaultChecked={this.state.attributes.class}
            onChange={this.handleAttribute} />
        class
    </li>
    <li>
        <input type="checkbox" name="locality" defaultChecked={this.state.attributes.locality}
            onChange={this.handleAttribute} />
        locality
    </li>
    <li>
        <input type="checkbox" name="area" defaultChecked={this.state.attributes.area}
            onChange={this.handleAttribute} />
        area
    </li>
    <li>
        <input type="checkbox" name="bedbreakfastcost" defaultChecked={this.state.attributes.bedbreakfastcost}
            onChange={this.handleAttribute} />
        bed break fast cost
    </li>
    <li>
        <input type="checkbox" name="kmfromtarmac" defaultChecked={this.state.attributes.kmfromtarmac}
            onChange={this.handleAttribute} />
        km from tarmac
    </li>
    <li>
        <input type="checkbox" name="conferenceroom" defaultChecked={this.state.attributes.conferenceroom}
            onChange={this.handleAttribute} />
        conference room
    </li>
    <li>
        <input type="checkbox" name="carpark" defaultChecked={this.state.attributes.carpark}
            onChange={this.handleAttribute} />
        carpark
    </li>
    <li>
        <input type="checkbox" name="aircon" defaultChecked={this.state.attributes.aircon}
            onChange={this.handleAttribute} />
        aircon
    </li>
    <li>
        <input type="checkbox" name="spa" defaultChecked={this.state.attributes.spa}
            onChange={this.handleAttribute} />
spa
    </li>
    <li>
        <input type="checkbox" name="freshoutdoors" defaultChecked={this.state.attributes.freshoutdoors}
            onChange={this.handleAttribute} />
        fresh outdoors
    </li>
    <li>
        <input type="checkbox" name="indoorpool" defaultChecked={this.state.attributes.indoorpool}
            onChange={this.handleAttribute} />
        indoor pool
    </li>
    <li>
        <input type="checkbox" name="disabilityaccess" defaultChecked={this.state.attributes.disabilityaccess}
            onChange={this.handleAttribute} />
        disability access
    </li>
    <li>
        <input type="checkbox" name="barlounge" defaultChecked={this.state.attributes.barlounge}
            onChange={this.handleAttribute} />
        barlounge
    </li>
    <li>
        <input type="checkbox" name="hairsalon" defaultChecked={this.state.attributes.hairsalon}
            onChange={this.handleAttribute} />
        hair salon
    </li>
    <li>
        <input type="checkbox" name="petsallowed" defaultChecked={this.state.attributes.petsallowed}
            onChange={this.handleAttribute} />
    petsallowed
    </li>    
</ul>
    
    </div></div></div>:""}



                    <h3 className="add-property-title"><span className="col-3">Upload 3D Image</span> <span className="col-3">Add 360 view link</span>
                    <span className="col-3">Add Floor Plan</span>
                    </h3>
                    <div className="attributes-main">
                        <div className="dblock">
                    <div className="col-3 left">
                    <div className="uplimg">
                    <input type="file" onChange={this.onUpload3d} />
                    {this.state.image3d? <img src={this.state.image3d}/>  :

                    <div className="dropzone-file"><i className="zmdi zmdi-image"></i><p>Attatch a image</p><input type="file" onChange={this.onUpload3d} /></div>
        }
                    </div>
                    {this.state.valiimage3d?<div className='warning'>* 3D Image are Required</div>:""}
                    </div>
                   
                    

                    <div className="col-3 left">
                        <input type="text" className="form-control" placeholder="Lorem epsum sit dolor emit" name="link360" value={this.state.link360} onChange={this.handleChange}/>
                        {this.state.valilink360?<div className='warning'>* Link 360 is Required</div>:""}
                    </div>
                   

                    <div className="col-3 left" style={{paddingRight:'0px'}}>
                    

                        <ul className="file-img ploor newplan">
                        {AllFloorPlan}
                        <li>
                        {this.state.tempFloor?<img src={this.state.tempFloor}/>:
                            <div className="add-imgbox">
                            <i className="zmdi zmdi-image"></i>
                            <input type="file" onChange={this.onUploadFloor}/>
    
                            </div>}
                            {this.state.valitempFloor?<div className='warning'>* image is Required</div>:""}

                       
                        </li>
                        <li> <input type="text" name="tempFloorName" value={this.state.tempFloorName} onChange={this.handleChange} />
                        {this.state.valitempFloorName?<div className='warning'>* Name is Required</div>:""}
                            <div className="add-imgbox">
                            <i className="zmdi zmdi-plus" onClick={this.addFloorPlan}></i>

                            </div>
                        </li>
                        
                        </ul>
                        {this.state.valifloorPlan?<div className='warning'>* Floor Plan are Required</div>:""}
                    </div>
</div>
                    <div className="form-group text-right"><button className="step-next" href="#tab_default_3" data-toggle="tab"  onClick={this.step3c} >Next</button></div>
                    </div>

						</div>
						<div className="tab-pane" id="tab_default_3">
                        <h3 className="add-property-title">Edit content</h3>
                        <div className="add-property-form">
                         

                        <div className="form-group"><label>Description</label>
                        <textarea className="form-control" placeholder="Type here" name="description2" value={this.state.description2} onChange={this.handleChange}></textarea>
                        {this.state.validescription2?<div className='warning'>*Enter Description</div>:""}
                        </div>
                        <div className="form-group text-right">
                            <button className="step-next" onClick={this.onSubmit}>Save</button></div>
                        </div>

						</div>
           
                        
					</div>
				</div>
			</div> </div>}

        </div>)
    }
}

export default (EditFlipbook);