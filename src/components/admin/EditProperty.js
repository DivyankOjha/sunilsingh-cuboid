import React, {Component} from "react";
import Axios from "axios";
import Spinner from "../common/Spinner";
import NavbarAdmin from "./NavbarAdmin";
import { Redirect } from "react-router-dom";
class EditProperty extends Component{

    constructor() {
		super()
		this.state = {
			
            cate1:true,
            cate2:false,
            cate3:false,
            cate4:false,

            step1:true,
            step2:false,
            step3:false,
            PropertyFor:"Rent",
            PropertyDescription:"",
            MapLink:"",
            PropertyType:"",
            PropertyName:"",
            OtherDetails:"",
           
            similarProperties:[],
            attributes:{},
            sellerType:"Owner",
            sellerLogo:'',
            sellerLocation:'',
            sellerMapLink:'',
            sellerNearestPlaceNameKm:'',
            sellerNearestPlaceName:'',
            sellerName:'',
            sellerContactNo:'',
            sellerOfficeAddress:'',
            sellerEmail:'',
            sellerAltTeleNo:'',
            sellerAltEmail:'',
            sellerWebsite:'',
            AllProperty:[],
            CategoryType:'',
            loader:false,

            valiPropertyFor:false,
            valiPropertyDescription:false,
            valiMapLink:false,
            valiPropertyType:false,
            valiPropertyName:false,
            valiOtherDetails:false,

            valisellerLogo:false,
            valisellerLocation:false,
            valisellerMapLink:false,
            valisellerNearestPlaceNameKm:false,
            valisellerNearestPlaceName:false,

            submitHouse:false,
            isAdded:false,
            isAdd:false


            

		}
    }
     componentDidMount=e=>{

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
              CategoryType:response.data.flipbook.categoryType,
              PropertyName:response.data.flipbook.propertyDetails.propertyName,
              PropertyFor:response.data.flipbook.propertyDetails.propertyFor,
              PropertyDescription:response.data.flipbook.propertyDetails.propertyDescription,
              PropertyType:response.data.flipbook.propertyDetails.propertyType,
              OtherDetails:response.data.flipbook.propertyDetails.otherDetails,
              MapLink:response.data.flipbook.propertyDetails.mapLink,
              attributes:response.data.flipbook.attributes,
              sellerType:response.data.flipbook.sellerDetails.sellertype,
            sellerLogo:response.data.flipbook.sellerDetails.sellerlogo,
            sellerLocation:response.data.flipbook.sellerDetails.location,
            sellerMapLink:response.data.flipbook.sellerDetails.maplink,
            sellerNearestPlaceNameKm:response.data.flipbook.sellerDetails.nearestplace.kms,
            sellerNearestPlaceName:response.data.flipbook.sellerDetails.nearestplace.placename,
            sellerName:response.data.flipbook.sellerDetails.sellername,
            sellerContactNo:response.data.flipbook.sellerDetails.sellerContactNumber,
            sellerAltTeleNo:response.data.flipbook.sellerDetails.selleraltnumber,
            sellerEmail:response.data.flipbook.sellerDetails.selleremail,
           sellerAltEmail:response.data.flipbook.sellerDetails.selleraltemail,
            sellerOfficeAddress:response.data.flipbook.sellerDetails.sellerofficeaddress,
            sellerWebsite:response.data.flipbook.sellerDetails.sellerwebsite,
            loader:false
            

          })

          if(this.state.CategoryType=="House"){
              this.cat1()
          }
          if(this.state.CategoryType=="Land"){
            this.cat2()
        }
        if(this.state.CategoryType=="Hotel"){
            this.cat3()
        }
        if(this.state.CategoryType=="Warehouse"){
            this.cat4()
        }
        
         
          
        })
        .catch(function (error) {
          console.log(error);
        });





        var config2 = {
            method: 'get',
            url: 'https://cuboidtechnologies.com/api/property/admin/get-dropdown-all-property-name',
            headers: {
             Accept: 'application/json',
             Authorization: "Bearer " + localStorage.getItem("token"),  
            'content-type': 'application/json',
            
           
        },
            
            
            
          };
          
          Axios(config2)
          .then( (response)=> {
            console.log(response);
            this.setState({AllProperty:response.data.sortedName})
           
            
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  
    cat1=e=>{
        this.setState({cate1:true,cate2:false,cate3:false,cate4:false, step1:true,step2:false,step3:false, })
    }

    cat2=e=>{
        this.setState({cate1:false,cate2:true,cate3:false,cate4:false,step1:true,step2:false,step3:false, })
    }

    cat3=e=>{
        this.setState({cate1:false,cate2:false,cate3:true,cate4:false,step1:true,step2:false,step3:false, })    }

    cat4=e=>{
        this.setState({cate1:false,cate2:false,cate3:false,cate4:true,step1:true,step2:false,step3:false, })
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

    handleChange=e=>{
     

      if(e.target.type==="checkbox"){
        console.log("rad")
        this.setState({[e.target.name]:e.target.checked})
      }
      else
      this.setState({[e.target.name]:e.target.value})

    }
    handleAttribute=e=>{
      var {name,checked,value} = e.target;
      var newd={};
      var old=this.state.attributes;
      var middle={};
     
      if(e.target.type==="checkbox")
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
    handleChangeLogo = event => {
      let files = event.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = e => {
          console.log(e.target.result);
          this.setState({sellerLogo:e.target.result})
        }}
        handleCheck(val) {
          return this.state.similarProperties.some(item => val === item);
         }

        checkboxChange=id=>e=>{
      
         
          console.log(id);
       
        var v=this.handleCheck(id)==true?true:false;
       
  if(!v){
          this.setState( {
            similarProperties:this.state.similarProperties.concat(id)
          }
           
              )
        }
        else{
          this.state.similarProperties.pop(id)
          this.setState( {
            similarProperties:this.state.similarProperties
          })
  
        } 
       
  
      }
  
  
      addHouse=e=>{

        e.preventDefault();
           console.log(this.state);
           console.log("House");
           this.setState({isAdd:true});

           var id=this.props.match.params.id;
           
           if(this.state.PropertyDescription==''){
            this.setState({valiPropertyDescription:true})
          }
          else{
            this.setState({valiPropertyDescription:false})
          }
  
          if(this.state.PropertyName==''){
            this.setState({valiPropertyName:true})
          }
          else{
            this.setState({valiPropertyName:false})
          }
          if(this.state.PropertyType==''){
            this.setState({valiPropertyType:true})
          }
          else{
            this.setState({valiPropertyType:false})
          }
          if(this.state.OtherDetails==''){
            this.setState({valiOtherDetails:true})
          }
          else{
            this.setState({valiOtherDetails:false})
          }
          if(this.state.MapLink==''){
            this.setState({valiMapLink:true})
          }
          else{
            this.setState({valiMapLink:false})
          }
          
           
  
          if(this.state.sellerName==''){
            this.setState({valisellerName:true})
          }
          else{
            this.setState({valisellerName:false})
          }
  
  
          if(this.state.sellerContactNo==''){
            this.setState({valisellerContactNo:true})
          }
          else{
            if(this.state.sellerContactNo.length>9){
              this.setState({valisellerContactNo:false})
            }
            else{
              this.setState({valisellerContactNo:true})
  
            }
            
          }
  
  
          if(this.state.sellerOfficeAddress==''){
            this.setState({valisellerOfficeAddress:true})
          }
          else{
            this.setState({valisellerOfficeAddress:false})
          }
  
          let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          let validEmail= pattern.test(this.state.sellerEmail);
  console.log(validEmail)
          if(  this.state.sellerEmail!=='' && validEmail){
            this.setState({valisellerEmail:false})
          }
         
          else{
            
            this.setState({valisellerEmail:true})
            
          }
          if(this.state.sellerAltTeleNo==''){
            this.setState({valisellerAltTeleNo:true})
  
           
          }
          else{
            if(this.state.sellerAltTeleNo.length>9){
              
              this.setState({valisellerAltTeleNo:false})
              }
              else{
                
              this.setState({valisellerAltTeleNo:true})
    
              }
             
          }
  
           if(this.state.sellerOfficeAddress==''){
            this.setState({valisellerOfficeAddress:true})
          }
          else{
            this.setState({valisellerOfficeAddress:false})
          }
         
         
          
          let pattern3 = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          let validEmail3= pattern3.test(this.state.sellerAltEmail);
  console.log(validEmail3)
  
  
          if(this.state.sellerAltEmail!==''  && validEmail3){
            this.setState({valisellerAltEmail:false})
          }
          else{
            this.setState({valisellerAltEmail:true})
          }
  
          let pattern2 = new RegExp(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/);
          let validWebsite= pattern2.test(this.state.sellerWebsite);
  console.log(validWebsite)
          if(this.state.sellerWebsite!=='' && validWebsite){
            this.setState({valisellerWebsite:false})
          }
          else{
            this.setState({valisellerWebsite:true})
          }
          if(this.state.sellerLogo==''){
            this.setState({valisellerLogo:true})
          }
          else{
            this.setState({valisellerLogo:false})
          }
          
  
          
          if(this.state.sellerLocation==''){
            this.setState({valisellerLocation:true})
          }
          else{
            this.setState({valisellerLocation:false})
          }
          if(this.state.sellerMapLink==''){
            this.setState({valisellerMapLink:true})
          }
          else{
            this.setState({valisellerMapLink:false})
          }
          if(this.state.sellerNearestPlaceName==''){
            this.setState({valisellerNearestPlaceName:true})
          }
          else{
            this.setState({valisellerNearestPlaceName:false})
          }
  
          if(this.state.sellerNearestPlaceNameKm==''){
            this.setState({valisellerNearestPlaceNameKm:true})
          }
          else{
            this.setState({valisellerNearestPlaceNameKm:false})
          }
          
  
  
          if(
            this.state.PropertyName!=''
            &&
            this.state.PropertyDescription!=''
            &&
            this.state.PropertyType!=''
            &&
            this.state.OtherDetails!=''
            &&
            this.state.MapLink!=''
            &&
            this.state.sellerName!=''
            &&
            this.state.sellerContactNo!=''
            &&
            this.state.sellerOfficeAddress!=''
            &&
            this.state.sellerEmail!=''
            &&
            this.state.sellerAltTeleNo!=''
            
            &&
          
            
            this.state.sellerAltEmail!=''
            &&
            this.state.sellerWebsite!=''
            &&
            this.state.sellerLogo!=''
            &&
            this.state.sellerLocation!=''
            &&
            this.state.sellerMapLink!=''
            &&
            this.state.sellerNearestPlaceName!=''
            &&
            this.state.sellerNearestPlaceNameKm!=''
  
  
            &&
            this.state.attributes.mainCategory !==''
  &&
  this.state.attributes.subCategory !==''
  &&
  this.state.attributes.propertyStatus !==''
  &&
  this.state.attributes.bedroom!=''
  &&
  this.state.attributes.bathrooms!=''
  &&
  this.state.attributes.steambath!=''
  &&
  this.state.attributes.lift!=''
  &&
  this.state.attributes.bathtab!=''
  &&
  this.state.attributes.parking!=''
  &&
  this.state.attributes.gym!=''
  &&
  this.state.attributes.livingsize!=''
  &&
  this.state.attributes.kitchensize!=''
  &&
  this.state.attributes.gardensize!=''
  &&
  this.state.attributes.cost!=''
  
  
          ){
            this.setState({loader:true})
  
          
          
        
         
           const data={
             
            
            
      
            "propertyDetails" : {
              "propertyName":this.state.PropertyName,
              "propertyFor": this.state.PropertyFor   ,
              "propertyDescription":this.state.PropertyDescription,
              "propertyType":this.state.PropertyType,
              "otherDetails":this.state.OtherDetails,
              "mapLink":this.state.MapLink,
              "selectSimilarProperties":this.state.similarProperties
            
            },
  
              "attributes": this.state.attributes
                    
              ,
          
              "sellerDetails": {
                  "sellername":this.state.sellerName,
                  "sellerContactNumber":this.state.sellerContactNo,
                  "sellerofficeaddress":this.state.sellerOfficeAddress,
                  "selleremail":this.state.sellerEmail,
                  "sellertype": this.state.sellerType,        
                  "selleraltnumber":this.state.sellerAltTeleNo,
                  "sellerwebsite":this.state.sellerWebsite,
                  "sellerlogo":this.state.sellerLogo,
                  "location":this.state.sellerLocation,
                  "maplink":this.state.sellerMapLink,
                  "nearestplace":{
                      "placename":this.state.sellerNearestPlaceName,
                      "kms":this.state.sellerNearestPlaceNameKm
                  },
                  "selleraltemail":this.state.sellerAltEmail         
              }    
          
          
              
          }
          
          var config = {
              method: 'put',
              url: 'https://cuboidtechnologies.com/api/admin/house/edit-house/'+id,
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
              
              alert("Successfully Updated House");
              this.setState({isAdded:true,loader:false})
  
             
            })
            .catch(function (error) {
              console.log(error);
            });
          }
          else{
            alert("some fields are missing, plz fill all step")
          }
  
  
      }
     
  
      addLand=e=>{
  
        e.preventDefault();
           console.log(this.state);
           console.log("Land");
           this.setState({isAdd:true});
           var id=this.props.match.params.id;
  
           if(this.state.PropertyDescription==''){
            this.setState({valiPropertyDescription:true})
          }
          else{
            this.setState({valiPropertyDescription:false})
          }
  
          if(this.state.PropertyName==''){
            this.setState({valiPropertyName:true})
          }
          else{
            this.setState({valiPropertyName:false})
          }
          if(this.state.PropertyType==''){
            this.setState({valiPropertyType:true})
          }
          else{
            this.setState({valiPropertyType:false})
          }
          if(this.state.OtherDetails==''){
            this.setState({valiOtherDetails:true})
          }
          else{
            this.setState({valiOtherDetails:false})
          }
          if(this.state.MapLink==''){
            this.setState({valiMapLink:true})
          }
          else{
            this.setState({valiMapLink:false})
          }
          
           
  
          if(this.state.sellerName==''){
            this.setState({valisellerName:true})
          }
          else{
            this.setState({valisellerName:false})
          }
  
  
          if(this.state.sellerContactNo==''){
            this.setState({valisellerContactNo:true})
          }
          else{
            if(this.state.sellerContactNo.length>9){
              this.setState({valisellerContactNo:false})
            }
            else{
              this.setState({valisellerContactNo:true})
  
            }
            
          }
  
  
          if(this.state.sellerOfficeAddress==''){
            this.setState({valisellerOfficeAddress:true})
          }
          else{
            this.setState({valisellerOfficeAddress:false})
          }
  
          let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          let validEmail= pattern.test(this.state.sellerEmail);
  console.log(validEmail)
          if(  this.state.sellerEmail!=='' && validEmail){
            this.setState({valisellerEmail:false})
          }
         
          else{
            
            this.setState({valisellerEmail:true})
            
          }
          if(this.state.sellerAltTeleNo==''){
            this.setState({valisellerAltTeleNo:true})
  
           
          }
          else{
            if(this.state.sellerAltTeleNo.length>9){
              
              this.setState({valisellerAltTeleNo:false})
              }
              else{
                
              this.setState({valisellerAltTeleNo:true})
    
              }
             
          }
  
         
         
         
          
          let pattern3 = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          let validEmail3= pattern3.test(this.state.sellerAltEmail);
  console.log(validEmail3)
  
  
          if(this.state.sellerAltEmail!==''  && validEmail3){
            this.setState({valisellerAltEmail:false})
          }
          else{
            this.setState({valisellerAltEmail:true})
          }
  
          let pattern2 = new RegExp(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/);
          let validWebsite= pattern2.test(this.state.sellerWebsite);
  console.log(validWebsite)
          if(this.state.sellerWebsite!=='' && validWebsite){
            this.setState({valisellerWebsite:false})
          }
          else{
            this.setState({valisellerWebsite:true})
          }
          if(this.state.sellerLogo==''){
            this.setState({valisellerLogo:true})
          }
          else{
            this.setState({valisellerLogo:false})
          }
          
  
          
          if(this.state.sellerLocation==''){
            this.setState({valisellerLocation:true})
          }
          else{
            this.setState({valisellerLocation:false})
          }
          if(this.state.sellerMapLink==''){
            this.setState({valisellerMapLink:true})
          }
          else{
            this.setState({valisellerMapLink:false})
          }
          if(this.state.sellerNearestPlaceName==''){
            this.setState({valisellerNearestPlaceName:true})
          }
          else{
            this.setState({valisellerNearestPlaceName:false})
          }
  
          if(this.state.sellerNearestPlaceNameKm==''){
            this.setState({valisellerNearestPlaceNameKm:true})
          }
          else{
            this.setState({valisellerNearestPlaceNameKm:false})
          }
          
  
  
          if(
            this.state.PropertyName!=''
            &&
            this.state.PropertyDescription!=''
            &&
            this.state.PropertyType!=''
            &&
            this.state.OtherDetails!=''
            &&
            this.state.MapLink!=''
            &&
            this.state.sellerName!=''
            &&
            this.state.sellerContactNo!=''
            &&
            this.state.sellerOfficeAddress!=''
            &&
            this.state.sellerEmail!=''
            &&
            this.state.sellerAltTeleNo!=''
            
            &&
          
            
            this.state.sellerAltEmail!=''
            &&
            this.state.sellerWebsite!=''
            &&
            this.state.sellerLogo!=''
            &&
            this.state.sellerLocation!=''
            &&
            this.state.sellerMapLink!=''
            &&
            this.state.sellerNearestPlaceName!=''
            &&
            this.state.sellerNearestPlaceNameKm!=''
  
  
            &&
  
            this.state.attributes.mainCategory !==''
  &&
  this.state.attributes.soilType !==''
  &&
  this.state.attributes.nature !==''
  &&
  this.state.attributes.road!==''
  &&
  this.state.attributes.cost!=''
  &&
  this.state.attributes.sizeinacres!=''
  &&
  this.state.attributes.kmtoshoppingcenter!=''
  &&
  this.state.attributes.kmtoneighbour!=''
  &&
  this.state.attributes.kmtotarmac!=''
  &&
  this.state.attributes.kmtowater!=''
  &&
  this.state.attributes.kmtoelectricity!=''
          ){
           
        
  
           this.setState({loader:true})
         
           const data={
             
            
            
      
            "propertyDetails" : {
              "propertyName":this.state.PropertyName,
              "propertyFor": this.state.PropertyFor   ,
              "propertyDescription":this.state.PropertyDescription,
              "propertyType":this.state.PropertyType,
              "otherDetails":this.state.OtherDetails,
              "mapLink":this.state.MapLink,
              "selectSimilarProperties":this.state.similarProperties
            
            },
              "attributes": this.state.attributes
                    
              ,
          
              "sellerDetails": {
                "sellername":this.state.sellerName,
                "sellerContactNumber":this.state.sellerContactNo,
                "sellerofficeaddress":this.state.sellerOfficeAddress,
                "selleremail":this.state.sellerEmail,
                "sellertype": this.state.sellerType,        
                "selleraltnumber":this.state.sellerAltTeleNo,
                "sellerwebsite":this.state.sellerWebsite,
                "sellerlogo":this.state.sellerLogo,
                "location":this.state.sellerLocation,
                "maplink":this.state.sellerMapLink,
                "nearestplace":{
                    "placename":this.state.sellerNearestPlaceName,
                    "kms":this.state.sellerNearestPlaceNameKm
                }  ,
                "selleraltemail":this.state.sellerAltEmail   
            }     
          
          
              
          }
          
          var config = {
              method: 'put',
              url: 'https://cuboidtechnologies.com/api/admin/land/edit-land/'+id,
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
              alert("Successfully Updated Land");
              this.setState({isAdded:true,loader:false})
  
             
            })
            .catch(function (error) {
              console.log(error);
            });
  
          }
          else{
            alert("some fields are missing, plz fill all step")
          }
  
  
      }
  
  
      addHotel=e=>{
  
        e.preventDefault();
           console.log(this.state);
           console.log("Hotel");
           this.setState({isAdd:true});
           var id=this.props.match.params.id;
  
  
           if(this.state.PropertyDescription==''){
            this.setState({valiPropertyDescription:true})
          }
          else{
            this.setState({valiPropertyDescription:false})
          }
  
          if(this.state.PropertyName==''){
            this.setState({valiPropertyName:true})
          }
          else{
            this.setState({valiPropertyName:false})
          }
          if(this.state.PropertyType==''){
            this.setState({valiPropertyType:true})
          }
          else{
            this.setState({valiPropertyType:false})
          }
          if(this.state.OtherDetails==''){
            this.setState({valiOtherDetails:true})
          }
          else{
            this.setState({valiOtherDetails:false})
          }
          if(this.state.MapLink==''){
            this.setState({valiMapLink:true})
          }
          else{
            this.setState({valiMapLink:false})
          }
          
           
  
          if(this.state.sellerName==''){
            this.setState({valisellerName:true})
          }
          else{
            this.setState({valisellerName:false})
          }
  
  
          if(this.state.sellerContactNo==''){
            this.setState({valisellerContactNo:true})
          }
          else{
            if(this.state.sellerContactNo.length>9){
              this.setState({valisellerContactNo:false})
            }
            else{
              this.setState({valisellerContactNo:true})
  
            }
            
          }
  
  
          if(this.state.sellerOfficeAddress==''){
            this.setState({valisellerOfficeAddress:true})
          }
          else{
            this.setState({valisellerOfficeAddress:false})
          }
  
          let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          let validEmail= pattern.test(this.state.sellerEmail);
  console.log(validEmail)
          if(  this.state.sellerEmail!=='' && validEmail){
            this.setState({valisellerEmail:false})
          }
         
          else{
            
            this.setState({valisellerEmail:true})
            
          }
          if(this.state.sellerAltTeleNo==''){
            this.setState({valisellerAltTeleNo:true})
  
           
          }
          else{
            if(this.state.sellerAltTeleNo.length>9){
              
              this.setState({valisellerAltTeleNo:false})
              }
              else{
                
              this.setState({valisellerAltTeleNo:true})
    
              }
             
          }
  
           if(this.state.sellerOfficeAddress==''){
            this.setState({valisellerOfficeAddress:true})
          }
          else{
            this.setState({valisellerOfficeAddress:false})
          }
         
         
          
          let pattern3 = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          let validEmail3= pattern3.test(this.state.sellerAltEmail);
  console.log(validEmail3)
  
  
          if(this.state.sellerAltEmail!==''  && validEmail3){
            this.setState({valisellerAltEmail:false})
          }
          else{
            this.setState({valisellerAltEmail:true})
          }
  
          let pattern2 = new RegExp(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/);
          let validWebsite= pattern2.test(this.state.sellerWebsite);
  console.log(validWebsite)
          if(this.state.sellerWebsite!=='' && validWebsite){
            this.setState({valisellerWebsite:false})
          }
          else{
            this.setState({valisellerWebsite:true})
          }
          if(this.state.sellerLogo==''){
            this.setState({valisellerLogo:true})
          }
          else{
            this.setState({valisellerLogo:false})
          }
          
  
          
          if(this.state.sellerLocation==''){
            this.setState({valisellerLocation:true})
          }
          else{
            this.setState({valisellerLocation:false})
          }
          if(this.state.sellerMapLink==''){
            this.setState({valisellerMapLink:true})
          }
          else{
            this.setState({valisellerMapLink:false})
          }
          if(this.state.sellerNearestPlaceName==''){
            this.setState({valisellerNearestPlaceName:true})
          }
          else{
            this.setState({valisellerNearestPlaceName:false})
          }
  
          if(this.state.sellerNearestPlaceNameKm==''){
            this.setState({valisellerNearestPlaceNameKm:true})
          }
          else{
            this.setState({valisellerNearestPlaceNameKm:false})
          }
          
  
  
          if(
            this.state.PropertyName!=''
            &&
            this.state.PropertyDescription!=''
            &&
            this.state.PropertyType!=''
            &&
            this.state.OtherDetails!=''
            &&
            this.state.MapLink!=''
            &&
            this.state.sellerName!=''
            &&
            this.state.sellerContactNo!=''
            &&
            this.state.sellerOfficeAddress!=''
            &&
            this.state.sellerEmail!=''
            &&
            this.state.sellerAltTeleNo!=''
            
            &&
          
            
            this.state.sellerAltEmail!=''
            &&
            this.state.sellerWebsite!=''
            &&
            this.state.sellerLogo!=''
            &&
            this.state.sellerLocation!=''
            &&
            this.state.sellerMapLink!=''
            &&
            this.state.sellerNearestPlaceName!=''
            &&
            this.state.sellerNearestPlaceNameKm!=''
  
            &&
  
            this.state.attributes.class !==''
  &&
  this.state.attributes.locality!==''
  &&
  this.state.attributes.cost!=''
  &&
  this.state.attributes.conferenceroom!=''
  &&
  this.state.attributes.kmfromtarmac!=''
  &&
  this.state.attributes.bedbreakfastcost!=''
  
          ){
  
  
           this.setState({loader:true})
           
        
         
           const data={
             
            
            
      
            "propertyDetails" : {
              "propertyName":this.state.PropertyName,
              "propertyFor": this.state.PropertyFor   ,
              "propertyDescription":this.state.PropertyDescription,
              "propertyType":this.state.PropertyType,
              "otherDetails":this.state.OtherDetails,
              "mapLink":this.state.MapLink,
              "selectSimilarProperties":this.state.similarProperties
            
            },
              "attributes": this.state.attributes
                    
              ,
          
              "sellerDetails": {
                "sellername":this.state.sellerName,
                "sellerContactNumber":this.state.sellerContactNo,
                "sellerofficeaddress":this.state.sellerOfficeAddress,
                "selleremail":this.state.sellerEmail,
                "sellertype": this.state.sellerType,        
                "selleraltnumber":this.state.sellerAltTeleNo,
                "sellerwebsite":this.state.sellerWebsite,
                "sellerlogo":this.state.sellerLogo,
                  "location":this.state.sellerLocation,
                  "maplink":this.state.sellerMapLink,
                  "nearestplace":{
                      "placename":this.state.sellerNearestPlaceName,
                      "kms":this.state.sellerNearestPlaceNameKm
                  } ,
                  "selleraltemail":this.state.sellerAltEmail   
            }     
          
          
              
          }
          
          var config = {
              method: 'put',
              url: 'https://cuboidtechnologies.com/api/admin/hotel/edit-hotel/'+id,
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
              alert("Successfully Updated Hotel");
              this.setState({isAdded:true,loader:false})
  
             
            })
            .catch(function (error) {
              console.log(error);
            });
  
          }
          else{
            alert("some fields are missing, plz fill all step")
          }
  
  
      }
  
      addWarehouse=e=>{
  
        e.preventDefault();
           console.log(this.state);
           console.log("warehouse");
           this.setState({isAdd:true});
           var id=this.props.match.params.id;
  
           if(this.state.PropertyDescription==''){
            this.setState({valiPropertyDescription:true})
          }
          else{
            this.setState({valiPropertyDescription:false})
          }
  
          if(this.state.PropertyName==''){
            this.setState({valiPropertyName:true})
          }
          else{
            this.setState({valiPropertyName:false})
          }
          if(this.state.PropertyType==''){
            this.setState({valiPropertyType:true})
          }
          else{
            this.setState({valiPropertyType:false})
          }
          if(this.state.OtherDetails==''){
            this.setState({valiOtherDetails:true})
          }
          else{
            this.setState({valiOtherDetails:false})
          }
          if(this.state.MapLink==''){
            this.setState({valiMapLink:true})
          }
          else{
            this.setState({valiMapLink:false})
          }
          
           
  
          if(this.state.sellerName==''){
            this.setState({valisellerName:true})
          }
          else{
            this.setState({valisellerName:false})
          }
  
  
          if(this.state.sellerContactNo==''){
            this.setState({valisellerContactNo:true})
          }
          else{
            if(this.state.sellerContactNo.length>9){
              this.setState({valisellerContactNo:false})
            }
            else{
              this.setState({valisellerContactNo:true})
  
            }
            
          }
  
  
          if(this.state.sellerOfficeAddress==''){
            this.setState({valisellerOfficeAddress:true})
          }
          else{
            this.setState({valisellerOfficeAddress:false})
          }
  
          let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          let validEmail= pattern.test(this.state.sellerEmail);
  console.log(validEmail)
          if(  this.state.sellerEmail!=='' && validEmail){
            this.setState({valisellerEmail:false})
          }
         
          else{
            
            this.setState({valisellerEmail:true})
            
          }
          if(this.state.sellerAltTeleNo==''){
            this.setState({valisellerAltTeleNo:true})
  
           
          }
          else{
            if(this.state.sellerAltTeleNo.length>9){
              
              this.setState({valisellerAltTeleNo:false})
              }
              else{
                
              this.setState({valisellerAltTeleNo:true})
    
              }
             
          }
  
           if(this.state.sellerOfficeAddress==''){
            this.setState({valisellerOfficeAddress:true})
          }
          else{
            this.setState({valisellerOfficeAddress:false})
          }
         
         
          
          let pattern3 = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          let validEmail3= pattern3.test(this.state.sellerAltEmail);
  console.log(validEmail3)
  
  
          if(this.state.sellerAltEmail!==''  && validEmail3){
            this.setState({valisellerAltEmail:false})
          }
          else{
            this.setState({valisellerAltEmail:true})
          }
  
          let pattern2 = new RegExp(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/);
          let validWebsite= pattern2.test(this.state.sellerWebsite);
  console.log(validWebsite)
          if(this.state.sellerWebsite!=='' && validWebsite){
            this.setState({valisellerWebsite:false})
          }
          else{
            this.setState({valisellerWebsite:true})
          }
          if(this.state.sellerLogo==''){
            this.setState({valisellerLogo:true})
          }
          else{
            this.setState({valisellerLogo:false})
          }
          
  
          
          if(this.state.sellerLocation==''){
            this.setState({valisellerLocation:true})
          }
          else{
            this.setState({valisellerLocation:false})
          }
          if(this.state.sellerMapLink==''){
            this.setState({valisellerMapLink:true})
          }
          else{
            this.setState({valisellerMapLink:false})
          }
          if(this.state.sellerNearestPlaceName==''){
            this.setState({valisellerNearestPlaceName:true})
          }
          else{
            this.setState({valisellerNearestPlaceName:false})
          }
  
          if(this.state.sellerNearestPlaceNameKm==''){
            this.setState({valisellerNearestPlaceNameKm:true})
          }
          else{
            this.setState({valisellerNearestPlaceNameKm:false})
          }
          
  
  
          if(
            this.state.PropertyName!=''
            &&
            this.state.PropertyDescription!=''
            &&
            this.state.PropertyType!=''
            &&
            this.state.OtherDetails!=''
            &&
            this.state.MapLink!=''
            &&
            this.state.sellerName!=''
            &&
            this.state.sellerContactNo!=''
            &&
            this.state.sellerOfficeAddress!=''
            &&
            this.state.sellerEmail!=''
            &&
            this.state.sellerAltTeleNo!=''
            
            &&
          
            
            this.state.sellerAltEmail!=''
            &&
            this.state.sellerWebsite!=''
            &&
            this.state.sellerLogo!=''
            &&
            this.state.sellerLocation!=''
            &&
            this.state.sellerMapLink!=''
            &&
            this.state.sellerNearestPlaceName!=''
            &&
            this.state.sellerNearestPlaceNameKm!=''
  
  
            &&
  
            this.state.attributes.mainCategory !==''
  &&
  this.state.attributes.zoning !==''
  &&
  this.state.attributes.townLocation !==''
  &&
  this.state.attributes.accessRoad!==''
  &&
  this.state.attributes.tenants!==''
  &&
  this.state.attributes.elevator!==''
  &&
  this.state.attributes.security!==''
  &&
  this.state.attributes.vehicleTraffic!==''&&
  this.state.attributes.humanTraffic!==''&&
  this.state.attributes.meetingRoom!==''&&
  this.state.attributes.parking!==''&&
  this.state.attributes.area!=''
  &&
  this.state.attributes.cost!=''
  &&
  this.state.attributes.sizeinfeet!=''
  &&
  
  this.state.attributes.kmfromtarmac!=''
          ){
  
           this.setState({loader:true})
           
        
         
           const data={
             
            
            
            "propertyDetails" : {
              "propertyName":this.state.PropertyName,
              "propertyFor": this.state.PropertyFor   ,
              "propertyDescription":this.state.PropertyDescription,
              "propertyType":this.state.PropertyType,
              "otherDetails":this.state.OtherDetails,
              "mapLink":this.state.MapLink,
              "selectSimilarProperties":this.state.similarProperties
            
            },
              "attributes": this.state.attributes
                    
              ,
          
              "sellerDetails": {
                "sellername":this.state.sellerName,
                "sellerContactNumber":this.state.sellerContactNo,
                "sellerofficeaddress":this.state.sellerOfficeAddress,
                "selleremail":this.state.sellerEmail,
                "sellertype": this.state.sellerType,        
                "selleraltnumber":this.state.sellerAltTeleNo,
                "sellerwebsite":this.state.sellerWebsite,
                "sellerlogo":this.state.sellerLogo,
                  "location":this.state.sellerLocation,
                  "maplink":this.state.sellerMapLink,
                  "nearestplace":{
                      "placename":this.state.sellerNearestPlaceName,
                      "kms":this.state.sellerNearestPlaceNameKm
                  }   ,
                  "selleraltemail":this.state.sellerAltEmail    
            }    
  
            
          
          
              
          }
          
          var config = {
              method: 'put',
              url: 'https://cuboidtechnologies.com/api/admin/warehouse/edit-warehouse/'+id,
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
              alert("Successfully Updated Warehouse");
              this.setState({isAdded:true,loader:false})
              
  
             
            })
            .catch(function (error) {
              console.log(error);
            });
  
          }
  
          else{
            alert("some fields are missing, plz fill all step")
          }
  
      }
     
   
   
   
    render() {
      console.log(this.state);
      var SimilarHouse,SimilarLand,SimilarHotel,SimilarWare;

      if(this.state.AllProperty){
        SimilarHouse= this.state.AllProperty.map(s=>{
        return(<div>{s[1]=="House"?<tr>
        <td><input type="checkbox" onChange={this.checkboxChange(s[2])}/></td>
      <td>{s[0]}</td>
        
      </tr>:""}</div>)
        })

        SimilarLand= this.state.AllProperty.map(s=>{
          return(<div>{s[1]=="Land"?<tr>
          <td><input type="checkbox" onChange={this.checkboxChange(s[2])}/></td>
        <td>{s[0]}</td>
          
        </tr>:""}</div>)
          })

          SimilarHotel= this.state.AllProperty.map(s=>{
            return(<div>{s[1]=="Hotel"?<tr>
            <td><input type="checkbox" onChange={this.checkboxChange(s[2])}/></td>
          <td>{s[0]}</td>
            
          </tr>:""}</div>)
            })

            SimilarWare= this.state.AllProperty.map(s=>{
              return(<div>{s[1]=="Warehouse"?<tr>
              <td><input type="checkbox" onChange={this.checkboxChange(s[2])}/></td>
            <td>{s[0]}</td>
              
            </tr>:""}</div>)
              })

      }
     


     
        
        
       
        
        return (<div>
          <NavbarAdmin class="zmdi zmdi-city" name="Edit Property "/>

          { this.state.isAdded?
        <Redirect to={{
          pathname: '/manage-property',
         
        }}/> :""}



{this.state.loader?<Spinner/>:

<div className="select-category top-50">
<div className="select-cate">
<h2> Category</h2>
<div className="looking">
<ul>
    {this.state.CategoryType=="House"?
    <li><a onClick={this.cat1} className={this.state.cate1?"active":""}>Looking for a house to let, buy or fullyFurnished?</a></li>
    :""}
    {this.state.CategoryType=="Land"?
<li><a onClick={this.cat2} className={this.state.cate2?"active":""}>Looking for Land or a plot?</a></li>
 :""}
{this.state.CategoryType=="Hotel"?
<li><a onClick={this.cat3} className={this.state.cate3?"active":""}>Looking for hotel?</a></li>
 :""}
{this.state.CategoryType=="Warehouse"?
<li><a onClick={this.cat4} className={this.state.cate4?"active":""}>Looking for a commercial space, office or go-down?</a></li>
 :""}

</ul>


</div>
</div>


{this.state.cate1?

// House step
<div className="tabbable-panel">
				<div className="tabbable-line">
                    <div className="space">
					<ul className="category-tabs">
						<li className={this.state.step1?"active":""}>
							<a href="#tab_default_1" data-toggle="tab" onClick={this.step1c}>
                            Step 01  </a>
						</li>
						<li className={this.state.step2?"active":""}>
							<a href="#tab_default_2" data-toggle="tab" onClick={this.step2c}>
                            Step 02 </a>
						</li>
						<li className={this.state.step3?"active":""}>
							<a href="#tab_default_3" data-toggle="tab" onClick={this.step3c}>
                            Step 03 </a>
						</li>
          
					</ul>
                    
                    </div>
					<div className="tab-content">
						<div className="tab-pane active" id="tab_default_1">
                            
                        <div className="step-1 space">
                    <span className="step-btn">Step 01</span>

                    </div>
							
                    <h3 className="add-property-title">Add Property Details</h3>
                <form>
                                      <div className="add-property-form col-6">
                    <div className="form-group">
                    <label>Property Name</label>
                    <input type="text" className="form-control" name="PropertyName" placeholder="Property name" value={this.state.PropertyName}
                    onChange={this.handleChange}
                    />
                     {this.state.valiPropertyName?<div className='warning'>*Enter Property name</div>:""}
                    </div>


                    <div className="form-group">
                    <label>Property for</label>
                    <div className="form-control checkdivbox">
                    <label>
    <input type="radio" name="PropertyFor" value="Rent"  checked={this.state.PropertyFor === "Rent"} onChange={this.handleChange}/>
    Rent</label>

  <label>
    <input type="radio"  name="PropertyFor" value="Buy"  checked={this.state.PropertyFor ==="Buy"} onChange={this.handleChange} />
    Buy</label>

                    </div>
                    </div>

                    <div className="form-group">
                    <label>Property description</label>
                   
                   <textarea className="form-control" name="PropertyDescription" placeholder="Type here" value={this.state.PropertyDescription} onChange={this.handleChange}></textarea>
                   {this.state.valiPropertyDescription?<div className='warning'>*Enter Property description</div>:""}
                    </div>

                    <div className="form-group">
                    <label>Property type</label>
                   <select className="form-control" name="PropertyType"  onChange={this.handleChange}>
            
            <option>Property type</option>
            <option value="House">House</option>
            

                   </select>
                   {this.state.valiPropertyType?<div className='warning'>*Enter Property type</div>:""}
                    </div>

                    <div className="form-group">
                    <label>Other Details</label>
                    <textarea className="form-control" name="OtherDetails" placeholder="Type here" value={this.state.OtherDetails} onChange={this.handleChange}></textarea>
                    
                    {this.state.valiOtherDetails?<div className='warning'>*Enter other details</div>:""}
                    </div>

                    <div className="form-group">
                    <label>Map link</label>
                    <input className="form-control" name="MapLink" placeholder="Paste here" value={this.state.MapLink} onChange={this.handleChange}/>
                    {this.state.valiMapLink?<div className='warning'>*Enter Map Link</div>:""}
                    </div>
                   

                    <div className="form-group">
                    <label>Select similar properties</label>
                    <div className="select-file" data-toggle="modal" data-target="#myModal">
                    <i className="zmdi zmdi-plus"></i>
                    {/*<input type="file"/>*/}

                    </div>
                    </div>
                    

                    <div className="form-group text-right">
                    <button className="step-next" href="#tab_default_2" data-toggle="tab" onClick={this.step2c}>Next</button>
                    </div>

                    </div></form>


							</div>
						<div className="tab-pane" id="tab_default_2">
                        <div className="step-1 space">
                    <span className="step-btn">Step 02</span>

                    </div>
							
                    <h3 className="add-property-title">Add Property Attributes</h3>

                    <div className="attributes-main">
                    <div className="attributes">
                    <ul>
                    <li><input type="checkbox" name="opticalfiber" defaultChecked={this.state.attributes.opticalfiber} onChange={this.handleAttribute}/> OPTICAL FIBRE </li>
                    <li><input type="checkbox" name="cctv" defaultChecked={this.state.attributes.cctv} onChange={this.handleAttribute}/> CCTV</li>
                    <li><input type="checkbox" name="swimmingpool" defaultChecked={this.state.attributes.swimmingpool} onChange={this.handleAttribute}/> SWIMMING POOL </li>
                    <li><input type="checkbox" name="borehole" defaultChecked={this.state.attributes.borehole} onChange={this.handleAttribute}/> BORE HOLE </li>
                    <li><input type="checkbox" name="fireplace" defaultChecked={this.state.attributes.fireplace} onChange={this.handleAttribute}/> FIRE PLACE</li>
                    <li><input type="checkbox" name="disabilityfeature" defaultChecked={this.state.attributes.disabilityfeature} onChange={this.handleAttribute}/> DISABILITY FEATURE</li>
                    <li><input type="checkbox" name="petsallowed" defaultChecked={this.state.attributes.petsallowed} onChange={this.handleAttribute}/> PETS ALLOWED</li>
                    <li><input type="checkbox" name="maturegarden" defaultChecked={this.state.attributes.maturegarden} onChange={this.handleAttribute}/> MATURE GARDEN</li>
                    <li><input type="checkbox" name="solarhotwater" defaultChecked={this.state.attributes.solarhotwater} onChange={this.handleAttribute}/> SOLAR HOT WATER</li>
                    <li><input type="checkbox" name="balcony" defaultChecked={this.state.attributes.balcony} onChange={this.handleAttribute}/> BALCONY</li>
                    <li><input type="checkbox" name="waterfront" defaultChecked={this.state.attributes.waterfront} onChange={this.handleAttribute}/> WATER FRONT</li>
                    <li><input type="checkbox" name="partyarea" defaultChecked={this.state.attributes.partyarea} onChange={this.handleAttribute}/> PARTY AREA</li>
                    

                    </ul>

                    </div>

                    <h4 class="particilars">Main Category</h4>
<div className="attributes">
  <ul>
    <li>
      <input type="radio"name="mainCategory" value="buy"  checked={this.state.attributes.mainCategory === "buy"} onChange={this.handleAttribute} /> Buy
    </li>
    <li>
      <input type="radio" name="mainCategory" value="let"  checked={this.state.attributes.mainCategory === "let"} onChange={this.handleAttribute}/> Let
    </li>
    <li>
      <input type="radio" name="mainCategory" value="fullyfurnished"  checked={this.state.attributes.mainCategory === "fullyfurnished"} onChange={this.handleAttribute}/> Fully Furnished
    </li>
   
  </ul>
  {this.state.attributes.mainCategory!=='' && this.state.isAdd?<div className='warning'>* Select Main category</div>:""}
</div>

<h4 class="particilars">Sub Category</h4>
<div className="attributes">
  <ul>
    <li>
      <input type="radio" name="subCategory" value="gated"  checked={this.state.attributes.subCategory === "gated"} onChange={this.handleAttribute} /> Gated
    </li>
    <li>
      <input type="radio" name="subCategory" value="standalone"  checked={this.state.attributes.subCategory === "standalone"} onChange={this.handleAttribute}/> Stand Alone
    </li>
    <li>
      <input type="radio" name="subCategory" value="apartment"  checked={this.state.attributes.subCategory === "apartment"} onChange={this.handleAttribute}/> Apartment
    </li>
   
  </ul>
  {this.state.attributes.subCategory!=='' && this.state.isAdd?<div className='warning'>* Select Sub category</div>:""}
</div>  

<h4 class="particilars">Property Status</h4>
<div className="attributes">
  <ul>
    <li>
      <input type="radio" name="propertyStatus" value="completed"  checked={this.state.attributes.propertyStatus === "completed"} onChange={this.handleAttribute} /> Completed
    </li>
    <li>
      <input type="radio" name="propertyStatus" value="offplan"  checked={this.state.attributes.propertyStatus === "offplan"} onChange={this.handleAttribute}/> Off Plan
    </li>
    <li>
      <input type="radio" name="propertyStatus" value="refurbished"  checked={this.state.attributes.propertyStatus === "refurbished"} onChange={this.handleAttribute}/> Refurbished
    </li>
   
  </ul>
  {this.state.attributes.propertyStatus!=='' && this.state.isAdd?<div className='warning'>* Select Property Status</div>:""}
</div>

                    <div className="numeric-number">
                        <ul>
                           <li>
                           <div className="numeric-label">
                    <label>How many <br /> BedRooms</label>
                         <input type="number"  name="bedroom" placeholder="0" value={this.state.attributes.bedroom} onChange={this.handleAttribute}/></div>
                         {this.state.attributes.bedroom!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
                         </li>
                         <li>
                           
                           <div className="numeric-label">
                  
                    <label>How many <br /> Bathrooms</label>
                         <input type="number"  name="bathrooms" placeholder="0" value={this.state.attributes.bathrooms} onChange={this.handleAttribute}/></div>
                         {this.state.attributes.bathrooms!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
                               </li> 

                               <li>
                <div className="numeric-label">
                    <label>How many<br /> Steam Bath</label>
                         <input type="number" name="steambath" placeholder="0" value={this.state.attributes.steambath} onChange={this.handleAttribute}/></div>
                         {this.state.attributes.steambath!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
                               </li>

                               <li>
                <div className="numeric-label">
                    <label>How many lifts</label>
                         <input type="number" name="lift" placeholder="0" value={this.state.attributes.lift} onChange={this.handleAttribute}/></div>
                              
                         {this.state.attributes.lift!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
                               </li>

                               <li>
                <div className="numeric-label">
                    <label>How many <br /> baths tabs</label>
                         <input type="number" name="bathtab" placeholder="0" value={this.state.attributes.bathtab} onChange={this.handleAttribute}/></div>
                             
                         {this.state.attributes.bathtab!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
                               </li>

                               <li>
                <div className="numeric-label">
                    <label>How many <br /> parking slots</label>
                         <input type="number" name="parking" placeholder="0" value={this.state.attributes.parking} onChange={this.handleAttribute}/></div>
                         {this.state.attributes.parking!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
                               </li>
                               <li>
                <div className="numeric-label">
                    <label>GYM</label>
                         <input type="number" name="gym" placeholder="0"  value={this.state.attributes.gym} onChange={this.handleAttribute}/></div>
                         {this.state.attributes.gym!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
                               </li>


                        </ul>
                    </div>

                    <div className="row">
    <div className="col-md-6">
        
    <div className="form-group">
                    <label>Living Area Size</label>
                    <input type="number" className="form-control" name="livingsize" placeholder="0"  value={this.state.attributes.livingsize} onChange={this.handleAttribute}/>
                    {this.state.attributes.livingsize!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
                    </div>
    </div>
    <div className="col-md-6">
        
    <div className="form-group">
                    <label>Kitchen Area Size</label>
                    <input type="number" className="form-control" name="kitchensize" placeholder="0" value={this.state.attributes.kitchensize} onChange={this.handleAttribute}/>
                    {this.state.attributes.kitchensize!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
                    </div>
    </div>
    <div className="col-md-6" >

    <div className="form-group">
                    <label>Garden Area Size </label>
                    <input type="number" className="form-control" name="gardensize" placeholder="0" value={this.state.attributes.gardensize} onChange={this.handleAttribute}/>
                    {this.state.attributes.gardensize!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
                    </div>
    </div>



    <div className="col-md-6">
        <div className="form-group">
            <label>Cost</label>
            <input type="number" className="form-control" name="cost" value={this.state.attributes.cost} onChange={this.handleAttribute}/>
            {this.state.attributes.cost!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
        </div>
    </div>
    </div>
    
    



                   




                   

                  

                     

                     
                    
                    <div className="form-group text-right"><button className="step-next" href="#tab_default_3" data-toggle="tab"  onClick={this.step3c}>Next</button></div>

                    </div>

						</div>
						<div className="tab-pane" id="tab_default_3">
                            
                        <div className="step-1 space">
                    <span className="step-btn">Step 03</span>

                    </div>
							
                    <h3 className="add-property-title">Add Seller Details</h3>

                    <div className="add-property-form col-6">
                    <div className="form-group">
                    <label>Seller Name</label>
                    <input type="text" className="form-control" placeholder="Name" name="sellerName" value={this.state.sellerName}  onChange={this.handleChange}/>
                    {this.state.valisellerName?<div className='warning'>*Enter seller name</div>:""}
                    </div>
                    <div className="form-group">
                    <label>Seller Contact Number</label>
                    <input type="number" className="form-control" placeholder="Contact number" name="sellerContactNo" value={this.state.sellerContactNo}  onChange={this.handleChange}/>
                    {this.state.valisellerContactNo?<div className='warning'>* Invalid contact no</div>:""}
                    </div>

                    <div className="form-group">
                    <label>Seller office address</label>
                    <textarea className="form-control" placeholder="Type here" name="sellerOfficeAddress" value={this.state.sellerOfficeAddress}  onChange={this.handleChange}></textarea>
                    {this.state.valisellerOfficeAddress?<div className='warning'>*Enter seller office address</div>:""}
                   
                    </div>

                    <div className="form-group">
                    <label>Seller email</label>
                   <input type="email" className="form-control" name="sellerEmail" value={this.state.sellerEmail}  onChange={this.handleChange}/>
                   {this.state.valisellerEmail?<div className='warning'>* Invalid email</div>:""}
                   
                    </div>


                    <div className="form-group">
                    <label>Seller type</label>
                    <div className="form-control checkdivbox">
                    <label>
    <input type="radio" name="sellerType" value="Owner"   checked={this.state.sellerType === "Owner"} onChange={this.handleChange}/>
    Owner</label>

  <label>
    <input type="radio" name="sellerType" value="Agent"  checked={this.state.sellerType === "Agent"} onChange={this.handleChange}/>
    Agent</label>

                    </div>
                    </div>

                    

                    

                    

                    <div className="form-group">
                    <label>Seller Alternative telephone number</label>
                    <input type="number" className="form-control" placeholder="Paste here" name="sellerAltTeleNo" value={this.state.sellerAltTeleNo}   onChange={this.handleChange} />
                    
                    {this.state.valisellerAltTeleNo?<div className='warning'>* Invalid telephone no</div>:""}
                  
                    </div>
                    

   

                    <div className="form-group">
                    <label>Seller Alternative email address</label>
                    <input type="email" className="form-control" placeholder="Paste here" name="sellerAltEmail" value={this.state.sellerAltEmail} onChange={this.handleChange} />
                    {this.state.valisellerAltEmail?<div className='warning'>* Invalid Email</div>:""}
                  
                    </div>

                    <div className="form-group">
                    <label>Seller's website</label>
                    <input className="form-control" placeholder="Paste here" name="sellerWebsite" value={this.state.sellerWebsite} onChange={this.handleChange}/>
                   
                    {this.state.valisellerWebsite?<div className='warning'>* Invalid Website</div>:""}
                  
                    </div>

                    <div className="form-group sellerbox12">
                    <label>Seller's Logo</label>
                    <div className="select-file">
                    <i className="zmdi zmdi-plus"></i>
                    <input type="file"  name="sellerLogo"  onChange={this.handleChangeLogo}/>
                   
                  
                    </div>
                    <div className="sellerlogo">
                   {this.state.sellerLogo?<img src={this.state.sellerLogo}/>:''}
                   </div>
                   {this.state.valisellerLogo?<div className='warning'>*Enter seller Logo</div>:""}
                    </div>
                    <div className="form-group">
                    <label>Location</label>
                    <input className="form-control" placeholder="Paste here" name="sellerLocation" value={this.state.sellerLocation} onChange={this.handleChange}/>
                    
                    {this.state.valisellerLocation?<div className='warning'>*Enter seller Location</div>:""}
                  
                    </div>
                    <div className="form-group">
                    <label>Map Link</label>
                    <input className="form-control" placeholder="Paste here" name="sellerMapLink" value={this.state.sellerMapLink} onChange={this.handleChange}/>
                    {this.state.valisellerMapLink?<div className='warning'>*Enter seller Map Link</div>:""}
                  
                    </div>
                    <div className="form-group">
                    <label>Nearest Place Name</label>
                    <input className="form-control" placeholder="Paste here" name="sellerNearestPlaceName" value={this.state.sellerNearestPlaceName} onChange={this.handleChange}/>
                   
                    {this.state.valisellerNearestPlaceName?<div className='warning'>*Enter seller Nearest PlaceName</div>:""}
                  
                    </div>
                    <div className="form-group">
                    <label>Nearest Place KM</label>
                    <input type="number" className="form-control" placeholder="Paste here" name="sellerNearestPlaceNameKm" value={this.state.sellerNearestPlaceNameKm} onChange={this.handleChange}/>
                   
                    {this.state.valisellerNearestPlaceNameKm?<div className='warning'>*Enter seller Nearest Place Name Km</div>:""}
                  
                    </div>

                   

         

                    <div className="form-group text-right">
                    <button className="step-next" onClick={this.addHouse}>Add</button>
                    </div>

                    </div>

							</div>
           
                        
					</div>
				</div>
			</div>
            :""}

            {this.state.cate2?
            // Land plot step
            
            <div className="tabbable-panel">
				<div className="tabbable-line">
                    <div className="space">
                    <ul className="category-tabs">
						<li className={this.state.step1?"active":""}>
							<a href="#tab_default_1" data-toggle="tab" onClick={this.step1c}>
                            Step 01  </a>
						</li>
						<li className={this.state.step2?"active":""}>
							<a href="#tab_default_2" data-toggle="tab" onClick={this.step2c}>
                            Step 02 </a>
						</li>
						<li className={this.state.step3?"active":""}>
							<a href="#tab_default_3" data-toggle="tab" onClick={this.step3c}>
                            Step 03 </a>
						</li>
          
					</ul>
                    
                    </div>
					<div className="tab-content">
						<div className="tab-pane active" id="tab_default_1">
                            
                        <div className="step-1 space">
                    <span className="step-btn">Step 01</span>

                    </div>
							
                    <h3 className="add-property-title">Add Property Details</h3>
                    <form>
                      <div className="add-property-form col-6">  
                    <div className="form-group">
                    <label>Property Name</label>
                    <input type="text" className="form-control" name="PropertyName" placeholder="Property name" value={this.state.PropertyName}
                    onChange={this.handleChange}
                    />
                     {this.state.valiPropertyName?<div className='warning'>*Enter Property name</div>:""}
                    </div>


                    <div className="form-group">
                    <label>Property for</label>
                    <div className="form-control checkdivbox">
                    <label>
    <input type="radio" name="PropertyFor" value="Rent"  checked={this.state.PropertyFor === "Rent"} onChange={this.handleChange}/>
    Rent</label>

  <label>
    <input type="radio"  name="PropertyFor" value="Buy"  checked={this.state.PropertyFor ==="Buy"} onChange={this.handleChange} />
    Buy</label>

                    </div>
                    </div>

                    <div className="form-group">
                    <label>Property description</label>
                   
                   <textarea className="form-control" name="PropertyDescription" placeholder="Type here" value={this.state.PropertyDescription} onChange={this.handleChange}></textarea>
                   {this.state.valiPropertyDescription?<div className='warning'>*Enter Property description</div>:""}
                    </div>

                    <div className="form-group">
                    <label>Property type</label>
                   <select className="form-control" name="PropertyType"  onChange={this.handleChange}>
            
            <option>Property type</option>
            <option value="House">Land</option>
            <option value="House">Plot</option>
            

                   </select>
                   {this.state.valiPropertyType?<div className='warning'>*Enter Property type</div>:""}
                    </div>

                    <div className="form-group">
                    <label>Other Details</label>
                    <textarea className="form-control" name="OtherDetails" placeholder="Type here" value={this.state.OtherDetails} onChange={this.handleChange}></textarea>
                    
                    {this.state.valiOtherDetails?<div className='warning'>*Enter other details</div>:""}
                    </div>

                    <div className="form-group">
                    <label>Map link</label>
                    <input className="form-control" name="MapLink" placeholder="Paste here" value={this.state.MapLink} onChange={this.handleChange}/>
                    {this.state.valiMapLink?<div className='warning'>*Enter Map Link</div>:""}
                    </div>
                   
                    <div className="form-group">
                    <label>Select similar properties</label>
                    <div className="select-file" data-toggle="modal" data-target="#landModal">
                    <i className="zmdi zmdi-plus"></i>
                    {/*<input type="file"/>*/}

                    </div>
                    </div>
                    

                    <div className="form-group text-right">
                    <button className="step-next" href="#tab_default_2" data-toggle="tab" onClick={this.step2c}>Next</button>
                    </div>

                    </div></form>
							</div>
						<div className="tab-pane" id="tab_default_2">
                        <div className="step-1 space">
                    <span className="step-btn">Step 02</span>

                    </div>
							
                    <h3 className="add-property-title">Add Property Attributes</h3>
                    {/* Land attributes */}
                    
                    <div>
      <div className="add-property-form">
<div className="row">
    <div className="col-md-6">
        <div className="form-group">
            <label>Cost</label>
            <input type="number" className="form-control" name="cost" value={this.state.attributes.cost}  onChange={this.handleAttribute}/>

        </div>
        {this.state.attributes.cost!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
    </div>
    <div className="col-md-6">
        <div className="form-group">
            <label>Size in acres</label>
            <input className="form-control" name="sizeinacres" value={this.state.attributes.sizeinacres} onChange={this.handleAttribute} />

        </div>
        {this.state.attributes.sizeinacres!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
    </div>
</div>

<div className="attributes">
    <ul>
        <li><input type="checkbox" name="freehold" defaultChecked={this.state.attributes.freehold} onChange={this.handleAttribute}/> freehold</li>
        <li><input type="checkbox" name="lease" defaultChecked={this.state.attributes.lease} onChange={this.handleAttribute} /> lease</li>
        <li><input type="checkbox" name="councilwater" defaultChecked={this.state.attributes.councilwater} onChange={this.handleAttribute}/> council water</li>
        <li><input type="checkbox" name="electricity" defaultChecked={this.state.attributes.electricity} onChange={this.handleAttribute}/> electricity</li>
        <li><input type="checkbox" name="borehole" defaultChecked={this.state.attributes.borehole} onChange={this.handleAttribute} /> borehole</li>
        <li><input type="checkbox" name="readyfence" defaultChecked={this.state.attributes.readyfence} onChange={this.handleAttribute} /> readyfence</li>
        <li><input type="checkbox" name="gated" defaultChecked={this.state.attributes.gated} onChange={this.handleAttribute} /> gated</li>
        <li><input type="checkbox" name="waterfront" defaultChecked={this.state.attributes.waterfront} onChange={this.handleAttribute} /> waterfront</li>
        <li><input type="checkbox" name="controlleddevelopment" defaultChecked={this.state.attributes.controlleddevelopment} onChange={this.handleAttribute} /> controlleddevelopment</li>
    </ul>
</div>

<h4 class="particilars">Main Category</h4>
<div className="attributes">
  <ul>
    <li>
      <input type="radio"name="mainCategory" value="buy"  checked={this.state.attributes.mainCategory === "buy"} onChange={this.handleAttribute} /> Buy
    </li>
    <li>
      <input type="radio" name="mainCategory" value="let"  checked={this.state.attributes.mainCategory === "let"} onChange={this.handleAttribute}/> Let
    </li>
   
   
  </ul>
  {this.state.attributes.mainCategory!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
</div>

<h4 className="particilars"> Soil Type</h4>
<div className="attributes">
    <ul>
        <li><input type="radio" name="soilType"  value="red"  checked={this.state.attributes.soilType === "red"}  onChange={this.handleAttribute}/> Red</li>
        <li><input type="radio" name="soilType"  value="blackcotton" checked={this.state.attributes.soilType === "blackcotton"} onChange={this.handleAttribute}/> Black cotton</li>
        <li><input type="radio" name="soilType"  value="murram" checked={this.state.attributes.soilType === "murram"} onChange={this.handleAttribute}/> Murram</li>

    </ul>
    {this.state.attributes.soilType!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
</div>
<h4 class="particilars"> Nature</h4>
<div className="attributes">
    <ul>
        <li><input type="radio" name="nature"  value="residential" checked={this.state.attributes.nature === "residential"}  onChange={this.handleAttribute} /> Residential</li>
        <li><input type="radio" name="nature" value="commercial" checked={this.state.attributes.nature === "commercial"} onChange={this.handleAttribute} /> Commercial</li>
        <li><input type="radio" name="nature" value="industrial" checked={this.state.attributes.nature === "industrial"} onChange={this.handleAttribute} /> Industrial</li>

    </ul>
    {this.state.attributes.nature!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
</div>
<h4 class="particilars"> Road</h4>
<div className="attributes">
    <ul>
        <li><input type="radio" name="road"  value="tarmac"  checked={this.state.attributes.road === "tarmac"} onChange={this.handleAttribute} /> Tarmac</li>
        <li><input type="radio" name="road"  value="murram"  checked={this.state.attributes.road === "murram"} onChange={this.handleAttribute} /> Murram</li>
        <li><input type="radio" name="road"  value="allweather"  checked={this.state.attributes.road === "allweather"} onChange={this.handleAttribute} /> All weather</li>
        <li><input type="radio" name="road"  value="noroad"  checked={this.state.attributes.road === "noroad"} onChange={this.handleAttribute} /> No road</li>

    </ul>
    {this.state.attributes.road!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
</div>
<div className="numeric-number lookingd">
    <ul>
        <li>
            <div className="numeric-label"> <span>km to shopping center</span> <input name="kmtoshoppingcenter" type="number" value={this.state.attributes.kmtoshoppingcenter} onChange={this.handleAttribute}/></div>
            {this.state.attributes.kmtoshoppingcenter!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
        </li>
        <li>
            <div className="numeric-label"> <span>km to neighbour</span> <input  name="kmtoneighbour" type="number" value={this.state.attributes.kmtoneighbour}  onChange={this.handleAttribute}/></div>
            {this.state.attributes.kmtoneighbour!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
        </li>
        <li>
            <div className="numeric-label"> <span>km to tarmac</span> <input  name="kmtotarmac" type="number" value={this.state.attributes.kmtotarmac}  onChange={this.handleAttribute}/></div>
            {this.state.attributes.kmtotarmac!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
        </li>
        <li>
            <div className="numeric-label"> <span>km to water</span> <input name="kmtowater" type="number" value={this.state.attributes.kmtowater}  onChange={this.handleAttribute} /></div>
            {this.state.attributes.kmtowater!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
        </li>
        <li>
            <div className="numeric-label"> <span>km to electricity</span> <input name="kmtoelectricity" type="number"  value={this.state.attributes.kmtoelectricity}  onChange={this.handleAttribute}/></div>
            {this.state.attributes.kmtoelectricity!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
        </li>
    </ul>
</div>
  
<div className="form-group text-right"><button className="step-next" href="#tab_default_3" data-toggle="tab"  onClick={this.step3c}>Next</button></div>

</div>
       
       
       
        
        
      </div>

						</div>
						<div className="tab-pane" id="tab_default_3">
                            
                        <div className="step-1 space">
                    <span className="step-btn">Step 03</span>

                    </div>
							
                    <h3 className="add-property-title">Add Seller Details</h3>

                    <div className="add-property-form col-6">
                    <div className="form-group">
                    <label>Seller Name</label>
                    <input type="text" className="form-control" placeholder="Name" name="sellerName" value={this.state.sellerName}  onChange={this.handleChange}/>
                    {this.state.valisellerName?<div className='warning'>*Enter seller name</div>:""}
                    </div>
                    <div className="form-group">
                    <label>Seller Contact Number</label>
                    <input type="number" className="form-control" placeholder="Contact number" name="sellerContactNo" value={this.state.sellerContactNo}  onChange={this.handleChange}/>
                    {this.state.valisellerContactNo?<div className='warning'>*Enter seller contact no</div>:""}
                    </div>

                    <div className="form-group">
                    <label>Seller office address</label>
                    <textarea className="form-control" placeholder="Type here" name="sellerOfficeAddress" value={this.state.sellerOfficeAddress}  onChange={this.handleChange}></textarea>
                    {this.state.valisellerOfficeAddress?<div className='warning'>*Enter seller office address</div>:""}
                   
                    </div>

                    <div className="form-group">
                    <label>Seller email</label>
                   <input type="email" className="form-control" name="sellerEmail" value={this.state.sellerEmail}  onChange={this.handleChange}/>
                   {this.state.valisellerEmail?<div className='warning'>*Invalid email</div>:""}
                   
                    </div>


                    <div className="form-group">
                    <label>Seller type</label>
                    <div className="form-control checkdivbox">
                    <label>
    <input type="radio" name="sellerType" value="Owner"   checked={this.state.sellerType === "Owner"} onChange={this.handleChange}/>
    Owner</label>

  <label>
    <input type="radio" name="sellerType" value="Agent"  checked={this.state.sellerType === "Agent"} onChange={this.handleChange}/>
    Agent</label>

                    </div>
                    </div>

                    

                    

                    

                    <div className="form-group">
                    <label>Seller Alternative telephone number</label>
                    <input type="number" className="form-control" placeholder="Paste here" name="sellerAltTeleNo" value={this.state.sellerAltTeleNo}   onChange={this.handleChange} />
                    
                    {this.state.valisellerAltTeleNo?<div className='warning'>* Invalid alt telephone no</div>:""}
                  
                    </div>
                    

   

                    <div className="form-group">
                    <label>Seller Alternative email address</label>
                    <input type="email" className="form-control" placeholder="Paste here" name="sellerAltEmail" value={this.state.sellerAltEmail} onChange={this.handleChange} />
                    {this.state.valisellerAltEmail?<div className='warning'>* Invalid Alt Email</div>:""}
                  
                    </div>

                    <div className="form-group">
                    <label>Seller's website</label>
                    <input className="form-control" placeholder="Paste here" name="sellerWebsite" value={this.state.sellerWebsite} onChange={this.handleChange}/>
                   
                    {this.state.valisellerWebsite?<div className='warning'>* Invalid Website</div>:""}
                  
                    </div>

                    <div className="form-group sellerbox12">
                    <label>Seller's Logo</label>
                    <div className="select-file">
                    <i className="zmdi zmdi-plus"></i>
                    <input type="file"  name="sellerLogo"  onChange={this.handleChangeLogo}/>
                   
                  
                    </div>
                    <div className="sellerlogo">
                   {this.state.sellerLogo?<img src={this.state.sellerLogo}/>:''}
                   </div>
                   {this.state.valisellerLogo?<div className='warning'>*Enter seller Logo</div>:""}
                    </div>
                    <div className="form-group">
                    <label>Location</label>
                    <input className="form-control" placeholder="Paste here" name="sellerLocation" value={this.state.sellerLocation} onChange={this.handleChange}/>
                    
                    {this.state.valisellerLocation?<div className='warning'>*Enter seller Location</div>:""}
                  
                    </div>
                    <div className="form-group">
                    <label>Map Link</label>
                    <input className="form-control" placeholder="Paste here" name="sellerMapLink" value={this.state.sellerMapLink} onChange={this.handleChange}/>
                    {this.state.valisellerMapLink?<div className='warning'>*Enter seller Map Link</div>:""}
                  
                    </div>
                    <div className="form-group">
                    <label>Nearest Place Name</label>
                    <input className="form-control" placeholder="Paste here" name="sellerNearestPlaceName" value={this.state.sellerNearestPlaceName} onChange={this.handleChange}/>
                   
                    {this.state.valisellerNearestPlaceName?<div className='warning'>*Enter seller Nearest PlaceName</div>:""}
                  
                    </div>
                    <div className="form-group">
                    <label>Nearest Place KM</label>
                    <input type="number" className="form-control" placeholder="Paste here" name="sellerNearestPlaceNameKm" value={this.state.sellerNearestPlaceNameKm} onChange={this.handleChange}/>
                   
                    {this.state.valisellerNearestPlaceNameKm?<div className='warning'>*Enter seller Nearest Place Name Km</div>:""}
                  
                    </div>

         

                    <div className="form-group text-right">
                    <button className="step-next" onClick={this.addLand}>Add</button>
                    </div>

                    </div>
							</div>
           
                        
					</div>
				</div>
			</div>
            
            
            :""}
            {this.state.cate3?

            // Hotel Step
            
            <div className="tabbable-panel">
            <div className="tabbable-line">
                <div className="space">
                <ul className="category-tabs">
						<li className={this.state.step1?"active":""}>
							<a href="#tab_default_1" data-toggle="tab" onClick={this.step1c}>
                            Step 01  </a>
						</li>
						<li className={this.state.step2?"active":""}>
							<a href="#tab_default_2" data-toggle="tab" onClick={this.step2c}>
                            Step 02 </a>
						</li>
						<li className={this.state.step3?"active":""}>
							<a href="#tab_default_3" data-toggle="tab" onClick={this.step3c}>
                            Step 03 </a>
						</li>
          
					</ul>
                
                </div>
                <div className="tab-content">
                    <div className="tab-pane active" id="tab_default_1">
                        
                    <div className="step-1 space">
                <span className="step-btn">Step 01</span>

                </div>
                        
                <h3 className="add-property-title">Add Property Details</h3>
                <form>
                                      <div className="add-property-form col-6">
                                      <div className="form-group">
                    <label>Property Name</label>
                    <input type="text" className="form-control" name="PropertyName" placeholder="Property name" value={this.state.PropertyName}
                    onChange={this.handleChange}
                    />
                     {this.state.valiPropertyName?<div className='warning'>*Enter Property name</div>:""}
                    </div>


                    <div className="form-group">
                    <label>Property for</label>
                    <div className="form-control checkdivbox">
                    <label>
    <input type="radio" name="PropertyFor" value="Rent"  checked={this.state.PropertyFor === "Rent"} onChange={this.handleChange}/>
    Rent</label>

  <label>
    <input type="radio"  name="PropertyFor" value="Buy"  checked={this.state.PropertyFor ==="Buy"} onChange={this.handleChange} />
    Buy</label>

                    </div>
                    </div>

                    <div className="form-group">
                    <label>Property description</label>
                   
                   <textarea className="form-control" name="PropertyDescription" placeholder="Type here" value={this.state.PropertyDescription} onChange={this.handleChange}></textarea>
                   {this.state.valiPropertyDescription?<div className='warning'>*Enter Property description</div>:""}
                    </div>

                    <div className="form-group">
                    <label>Property type</label>
                   <select className="form-control" name="PropertyType"  onChange={this.handleChange}>
            
            <option>Property type</option>
            <option value="House">Hotel</option>
            

                   </select>
                   {this.state.valiPropertyType?<div className='warning'>*Enter Property type</div>:""}
                    </div>

                    <div className="form-group">
                    <label>Other Details</label>
                    <textarea className="form-control" name="OtherDetails" placeholder="Type here" value={this.state.OtherDetails} onChange={this.handleChange}></textarea>
                    
                    {this.state.valiOtherDetails?<div className='warning'>*Enter other details</div>:""}
                    </div>

                    <div className="form-group">
                    <label>Map link</label>
                    <input className="form-control" name="MapLink" placeholder="Paste here" value={this.state.MapLink} onChange={this.handleChange}/>
                    {this.state.valiMapLink?<div className='warning'>*Enter Map Link</div>:""}
                    </div>
                   
                    <div className="form-group">
                    <label>Select similar properties</label>
                    <div className="select-file" data-toggle="modal" data-target="#hotelModal">
                    <i className="zmdi zmdi-plus"></i>
                    {/*<input type="file"/>*/}

                    </div>
                    </div>
                    

                    <div className="form-group text-right">
                    <button className="step-next" href="#tab_default_2" data-toggle="tab" onClick={this.step2c}>Next</button>
                    </div>

                    </div></form>
                        </div>
                    <div className="tab-pane" id="tab_default_2">
                    <div className="step-1 space">
                <span className="step-btn">Step 02</span>

                </div>
                        
                <h3 className="add-property-title">Add Property Attributes</h3>


                {/* hotel attribute*/}
                <div className="add-property-form">

                <h4 class="particilars">Class</h4>
<div className="attributes">
  <ul>
    <li>
      <input type="radio" name="class" value="worldclass"
      checked={this.state.attributes.class==="worldclass" }
      onChange={this.handleAttribute}/> world class
    </li>
    <li>
      <input type="radio" name="class" value="midrange"
      checked={this.state.attributes.class==="midrange" }
      onChange={this.handleAttribute}/> Mid-range
    </li>
    <li>
      <input type="radio" name="class" value="budget"
      checked={this.state.attributes.class==="budget" }
      onChange={this.handleAttribute}/> Budget
    </li>
  </ul>
  {this.state.attributes.class!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
</div>
<h4 class="particilars">Locality</h4>
<div className="attributes">
  <ul>
    <li>
      <input type="radio" name="locality" value="city"
      checked={this.state.attributes.locality==="city" }
      onChange={this.handleAttribute} /> City
    </li>
    <li>
      <input type="radio" name="locality" value="airport"
      checked={this.state.attributes.locality==="airport" }
      onChange={this.handleAttribute}/> Airport
    </li>
    <li>
      <input type="radio" name="locality" value="outskirts"
      checked={this.state.attributes.locality==="outskirts" }
      onChange={this.handleAttribute}/> Outskirts
    </li>
    <li>
      <input type="radio" name="locality" value="gamehotel"
      checked={this.state.attributes.locality==="gamehotel" }
      onChange={this.handleAttribute}/> Game hotel
    </li>
  </ul>
  {this.state.attributes.locality!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
</div>


  <div className="attributes">
    <ul>
      <li><input type="checkbox" name="carpark" defaultChecked={this.state.attributes.carpark} onChange={this.handleAttribute}/> carpark</li>
      <li><input type="checkbox" name="spa" defaultChecked={this.state.attributes.spa} onChange={this.handleAttribute}/> spa</li>
      <li><input type="checkbox" name="aircon" defaultChecked={this.state.attributes.aircon} onChange={this.handleAttribute}/> aircon</li>
      <li><input type="checkbox" name="freshoutdoors" defaultChecked={this.state.attributes.freshoutdoors} onChange={this.handleAttribute}/> fresh out doors</li>
      <li><input type="checkbox" name="indoorpool" defaultChecked={this.state.attributes.indoorpool} onChange={this.handleAttribute}/> indoor pool</li>
      <li>
        <input type="checkbox" name="disabilityaccess" defaultChecked={this.state.attributes.disabilityaccess} onChange={this.handleAttribute}/> disability access
      </li>
      <li><input type="checkbox" name="barlounge" defaultChecked={this.state.attributes.barlounge} onChange={this.handleAttribute}/> Bar Lounge</li>
      <li><input type="checkbox" name="hairsalon" defaultChecked={this.state.attributes.hairsalon} onChange={this.handleAttribute}/> Hair Salon</li>
      <li><input type="checkbox" name="petsallowed" defaultChecked={this.state.attributes.petsallowed} onChange={this.handleAttribute}/> Pets Allowed</li>
    </ul>
  </div>
  <div className="numeric-number lookingd">
    <ul>
      <li>
        <div className="numeric-label">
          <span>Bed Breakfast Cost</span>
          <input type="number" name="bedbreakfastcost" value={this.state.attributes.bedbreakfastcost} onChange={this.handleAttribute} />
        </div>
        {this.state.attributes.bedbreakfastcost!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
      </li>
      <li>
        <div className="numeric-label">
          <span>km from tarmac</span>
          <input type="number" name="kmfromtarmac" value={this.state.attributes.kmfromtarmac} onChange={this.handleAttribute} />
        </div>
        {this.state.attributes.kmfromtarmac!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
      </li>
      <li>
        <div className="numeric-label">
          <span>Conference room</span>
          <input type="number" name="conferenceroom" value={this.state.attributes.conferenceroom} onChange={this.handleAttribute}/>
        </div>
        {this.state.attributes.conferenceroom!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
      </li>
      <li>
        <div className="numeric-label">
          <span>Cost</span>
          <input type="number" className="form-control" name="cost" value={this.state.attributes.cost}  onChange={this.handleAttribute}/>
        </div>
        {this.state.attributes.cost!=='' && this.state.isAdd?<div className='warning'>* Required</div>:""}
      </li>
   
    </ul>
  </div>

    
  <div className="form-group text-right"><button className="step-next" href="#tab_default_3" data-toggle="tab"  onClick={this.step3c}>Next</button></div>

</div>

                

                </div> 

                    
                    <div className="tab-pane" id="tab_default_3">
                        
                    <div className="step-1 space">
                <span className="step-btn">Step 03</span>

                </div>
                        
                <h3 className="add-property-title">Add Seller Details</h3>
                <div className="add-property-form col-6">
                <div className="form-group">
                    <label>Seller Name</label>
                    <input type="text" className="form-control" placeholder="Name" name="sellerName" value={this.state.sellerName}  onChange={this.handleChange}/>
                    {this.state.valisellerName?<div className='warning'>*Enter seller name</div>:""}
                    </div>
                    <div className="form-group">
                    <label>Seller Contact Number</label>
                    <input type="number" className="form-control" placeholder="Contact number" name="sellerContactNo" value={this.state.sellerContactNo}  onChange={this.handleChange}/>
                    {this.state.valisellerContactNo?<div className='warning'>* Invalid contact no</div>:""}
                    </div>

                    <div className="form-group">
                    <label>Seller office address</label>
                    <textarea className="form-control" placeholder="Type here" name="sellerOfficeAddress" value={this.state.sellerOfficeAddress}  onChange={this.handleChange}></textarea>
                    {this.state.valisellerOfficeAddress?<div className='warning'>*Enter seller office address</div>:""}
                   
                    </div>

                    <div className="form-group">
                    <label>Seller email</label>
                   <input type="email" className="form-control" name="sellerEmail" value={this.state.sellerEmail}  onChange={this.handleChange}/>
                   {this.state.valisellerEmail?<div className='warning'>*Invalid email</div>:""}
                   
                    </div>


                    <div className="form-group">
                    <label>Seller type</label>
                    <div className="form-control checkdivbox">
                    <label>
    <input type="radio" name="sellerType" value="Owner"   checked={this.state.sellerType === "Owner"} onChange={this.handleChange}/>
    Owner</label>

  <label>
    <input type="radio" name="sellerType" value="Agent"  checked={this.state.sellerType === "Agent"} onChange={this.handleChange}/>
    Agent</label>

                    </div>
                    </div>

                    

                    

                    

                    <div className="form-group">
                    <label>Seller Alternative telephone number</label>
                    <input type="number" className="form-control" placeholder="Paste here" name="sellerAltTeleNo" value={this.state.sellerAltTeleNo}   onChange={this.handleChange} />
                    
                    {this.state.valisellerAltTeleNo?<div className='warning'>* Invalid alt telephone no</div>:""}
                  
                    </div>
                    

   

                    <div className="form-group">
                    <label>Seller Alternative email address</label>
                    <input type="email" className="form-control" placeholder="Paste here" name="sellerAltEmail" value={this.state.sellerAltEmail} onChange={this.handleChange} />
                    {this.state.valisellerAltEmail?<div className='warning'>* Invalid Alt Email</div>:""}
                  
                    </div>

                    <div className="form-group">
                    <label>Seller's website</label>
                    <input className="form-control" placeholder="Paste here" name="sellerWebsite" value={this.state.sellerWebsite} onChange={this.handleChange}/>
                   
                    {this.state.valisellerWebsite?<div className='warning'>* Invalid Website</div>:""}
                  
                    </div>

                    <div className="form-group sellerbox12">
                    <label>Seller's Logo</label>
                    <div className="select-file">
                    <i className="zmdi zmdi-plus"></i>
                    <input type="file"  name="sellerLogo"  onChange={this.handleChangeLogo}/>
                   
                  
                    </div>
                    <div className="sellerlogo">
                   {this.state.sellerLogo?<img src={this.state.sellerLogo}/>:''}
                   </div>
                   {this.state.valisellerLogo?<div className='warning'>*Enter seller Logo</div>:""}
                    </div>
                    <div className="form-group">
                    <label>Location</label>
                    <input className="form-control" placeholder="Paste here" name="sellerLocation" value={this.state.sellerLocation} onChange={this.handleChange}/>
                    
                    {this.state.valisellerLocation?<div className='warning'>*Enter seller Location</div>:""}
                  
                    </div>
                    <div className="form-group">
                    <label>Map Link</label>
                    <input className="form-control" placeholder="Paste here" name="sellerMapLink" value={this.state.sellerMapLink} onChange={this.handleChange}/>
                    {this.state.valisellerMapLink?<div className='warning'>*Enter seller Map Link</div>:""}
                  
                    </div>
                    <div className="form-group">
                    <label>Nearest Place Name</label>
                    <input className="form-control" placeholder="Paste here" name="sellerNearestPlaceName" value={this.state.sellerNearestPlaceName} onChange={this.handleChange}/>
                   
                    {this.state.valisellerNearestPlaceName?<div className='warning'>*Enter seller Nearest PlaceName</div>:""}
                  
                    </div>
                    <div className="form-group">
                    <label>Nearest Place KM</label>
                    <input type="number" className="form-control" placeholder="Paste here" name="sellerNearestPlaceNameKm" value={this.state.sellerNearestPlaceNameKm} onChange={this.handleChange}/>
                   
                    {this.state.valisellerNearestPlaceNameKm?<div className='warning'>*Enter seller Nearest Place Name Km</div>:""}
                  
                    </div>

                    <div className="form-group text-right">
                    <button className="step-next" onClick={this.addHotel}>Add</button>
                    </div>

                    </div>

                        </div>
       
                    
                </div>
            </div>
        </div>

            :""}


            {this.state.cate4?

            // Go down
            
            <div className="tabbable-panel">
				<div className="tabbable-line">
                    <div className="space">
                    <ul className="category-tabs">
						<li className={this.state.step1?"active":""}>
							<a href="#tab_default_1" data-toggle="tab" onClick={this.step1c}>
                            Step 01  </a>
						</li>
						<li className={this.state.step2?"active":""}>
							<a href="#tab_default_2" data-toggle="tab" onClick={this.step2c}>
                            Step 02 </a>
						</li>
						<li className={this.state.step3?"active":""}>
							<a href="#tab_default_3" data-toggle="tab" onClick={this.step3c}>
                            Step 03 </a>
						</li>
          
					</ul>
                    
                    </div>
					<div className="tab-content">
						<div className="tab-pane active" id="tab_default_1">
                            
                        <div className="step-1 space">
                    <span className="step-btn">Step 01</span>

                    </div>
							
                    <h3 className="add-property-title">Add Property Details</h3>
                    <form>
                                      <div className="add-property-form col-6">
                                      <div className="form-group">
                    <label>Property Name</label>
                    <input type="text" className="form-control" name="PropertyName" placeholder="Property name" value={this.state.PropertyName}
                    onChange={this.handleChange}
                    />
                     {this.state.valiPropertyName?<div className='warning'>*Enter Property name</div>:""}
                    </div>


                    <div className="form-group">
                    <label>Property for</label>
                    <div className="form-control checkdivbox">
                    <label>
    <input type="radio" name="PropertyFor" value="Rent"  checked={this.state.PropertyFor === "Rent"} onChange={this.handleChange}/>
    Rent</label>

  <label>
    <input type="radio"  name="PropertyFor" value="Buy"  checked={this.state.PropertyFor ==="Buy"} onChange={this.handleChange} />
    Buy</label>

                    </div>
                    </div>

                    <div className="form-group">
                    <label>Property description</label>
                   
                   <textarea className="form-control" name="PropertyDescription" placeholder="Type here" value={this.state.PropertyDescription} onChange={this.handleChange}></textarea>
                   {this.state.valiPropertyDescription?<div className='warning'>*Enter Property description</div>:""}
                    </div>

                    <div className="form-group">
                    <label>Property type</label>
                   <select className="form-control" name="PropertyType"  onChange={this.handleChange}>
            
            <option>Property type</option>
            <option value="House">Office</option>
            <option value="House">Godown</option>
            <option value="House">warehouse</option>
           

                   </select>
                   {this.state.valiPropertyType?<div className='warning'>*Enter Property type</div>:""}
                    </div>

                    <div className="form-group">
                    <label>Other Details</label>
                    <textarea className="form-control" name="OtherDetails" placeholder="Type here" value={this.state.OtherDetails} onChange={this.handleChange}></textarea>
                    
                    {this.state.valiOtherDetails?<div className='warning'>*Enter other details</div>:""}
                    </div>

                    <div className="form-group">
                    <label>Map link</label>
                    <input className="form-control" name="MapLink" placeholder="Paste here" value={this.state.MapLink} onChange={this.handleChange}/>
                    {this.state.valiMapLink?<div className='warning'>*Enter Map Link</div>:""}
                    </div>
                   
                    <div className="form-group">
                    <label>Select similar properties</label>
                    <div className="select-file" data-toggle="modal" data-target="#wareModal">
                    <i className="zmdi zmdi-plus"></i>
                    {/*<input type="file"/>*/}

                    </div>
                    </div>
                    

                    <div className="form-group text-right">
                    <button className="step-next" href="#tab_default_2" data-toggle="tab" onClick={this.step2c}>Next</button>
                    </div>

                    </div></form>
							</div>
						<div className="tab-pane" id="tab_default_2">
                        <div className="step-1 space">
                    <span className="step-btn">Step 02</span>

                    </div>
							
                    <h3 className="add-property-title">Add Property Attributes</h3>

                    {/* <!-- kmfromtarmax -> this field is missing please check kmfromtarmax --> */}
<div className="attributes-main fourcateroy">
  {/* godown attributes start */}

  <label>Type</label>
  <div className="attributes">
    <ul>
      <li>
        <input type="radio" name="Type"  value="godown" checked={this.state.attributes.Type==="godown" }
      onChange={this.handleAttribute} />
        godown
      </li>
      <li>
        <input
          type="radio"
          name="Type"
          
          value="commercialspace" checked={this.state.attributes.Type==="commercialspace" }
          onChange={this.handleAttribute}
        />
        Commercial space
      </li>
    </ul>
    {this.state.attributes.Type!==''  && this.state.isAdd?<div className='warning'>* Required</div>:""}
  </div>

  
  <h4 class="particilars">Main Category</h4>
<div className="attributes">
  <ul>
    <li>
      <input type="radio"name="mainCategory" value="buy"  checked={this.state.attributes.mainCategory === "buy"} onChange={this.handleAttribute} /> Buy
    </li>
    <li>
      <input type="radio" name="mainCategory" value="let"  checked={this.state.attributes.mainCategory === "let"} onChange={this.handleAttribute}/> Let
    </li>
    
   
  </ul>
  {this.state.attributes.mainCategory!==''  && this.state.isAdd?<div className='warning'>* Required</div>:""}
</div>

  <div className="numeric-number lookingd">
    <ul>
      <li>
        <div className="numeric-label">
          <span>Area</span> <input type="number" name="area" value={this.state.attributes.area} onChange={this.handleAttribute}/>
        </div>
        {this.state.attributes.area!==''  && this.state.isAdd?<div className='warning'>* Required</div>:""}
      </li>

      <li>
        <div className="numeric-label">
          <span>Cost</span> <input type="number" name="cost" value={this.state.attributes.cost} onChange={this.handleAttribute}/>
        </div>
        {this.state.attributes.cost!==''  && this.state.isAdd?<div className='warning'>* Required</div>:""}
      </li>
      <li>
        <div className="numeric-label">
          <span>Size in ft</span> <input type="number" name="sizeinfeet" value={this.state.attributes.sizeinfeet} onChange={this.handleAttribute}/>
        </div>
        {this.state.attributes.sizeinfeet!==''  && this.state.isAdd?<div className='warning'>* Required</div>:""}
      </li>
      <li>
      <div className="numeric-label">
          <span>km from tarmac</span>
          <input type="number" name="kmfromtarmac" value={this.state.attributes.kmfromtarmac} onChange={this.handleAttribute} />
        </div>
        {this.state.attributes.kmfromtarmac!==''  && this.state.isAdd?<div className='warning'>* Required</div>:""}
      </li>
    </ul>
  </div>
  <hr />
  <div className="attributes">
    <ul>
      <li>
        <input type="checkbox" name="conferencefacilites" defaultChecked={this.state.attributes.conferencefacilites} onChange={this.handleAttribute} />
        conference facilites
      </li>
      <li>
        <input type="checkbox" name="freshoutdoors" defaultChecked={this.state.attributes.freshoutdoors} onChange={this.handleAttribute} />
        freshout doors
      </li>
      <li>
        <input type="checkbox" name="aircon" defaultChecked={this.state.attributes.aircon} onChange={this.handleAttribute}/>
        aircon
      </li>
      <li>
        <input type="checkbox" name="sharedsecretary" defaultChecked={this.state.attributes.sharedsecretary} onChange={this.handleAttribute}/>
        shared secretary
      </li>
      <li>
        <input type="checkbox" name="fullyfurnished" defaultChecked={this.state.attributes.fullyfurnished} onChange={this.handleAttribute}/>
        fully furnished
      </li>
      <li>
        <input type="checkbox" name="landscapegarden"  defaultChecked={this.state.attributes.landscapegarden} onChange={this.handleAttribute}/>
        landscape garden
      </li>
      <li>
        <input type="checkbox" name="wifi" defaultChecked={this.state.attributes.wifi} onChange={this.handleAttribute}/>
        wifi
      </li>
      {/* <!-- below 3  fields are extra --> */}
      
      <li>
        <input type="checkbox" name="indoorpool"  defaultChecked={this.state.attributes.indoorpool} onChange={this.handleAttribute}/>
        indoor pool
      </li>
      <li>
        <input type="checkbox" name="disabilityaccess" defaultChecked={this.state.attributes.disabilityaccess}  onChange={this.handleAttribute}/>
        disability access
      </li>
    </ul>
  </div>

  <h4 className="particilars">Zoning</h4>
<div className="attributes">
  <ul>
    <li>
      <input type="radio" name="zoning" value="commercial"
      checked={this.state.attributes.zoning==="commercial" }
      onChange={this.handleAttribute} /> Commercial
    </li>
    <li>
      <input type="radio" name="zoning" value="industrial"
      checked={this.state.attributes.zoning==="industrial" }
      onChange={this.handleAttribute} /> Industrial
    </li>
    <li>
      <input type="radio" name="zoning" value="residential"
      checked={this.state.attributes.zoning==="residential" }
      onChange={this.handleAttribute} /> Residential
    </li>
    <li>
      <input type="radio" name="zoning" value="epz"
      checked={this.state.attributes.zoning==="epz" }
      onChange={this.handleAttribute} /> epz
    </li>
  </ul>
  {this.state.attributes.zoning!==''  && this.state.isAdd?<div className='warning'>* Required</div>:""}
</div>
<h4 class="particilars">Town Location</h4>
<div className="attributes">
  <ul>
    <li>
      <input type="radio" name="townLocation" value="downtown"
      checked={this.state.attributes.townLocation==="downtown" }
      onChange={this.handleAttribute} /> Downtown
    </li>
    <li>
      <input type="radio" name="townLocation" value="uptown"
      checked={this.state.attributes.townLocation==="uptown" }
      onChange={this.handleAttribute} /> Uptown
    </li>
    <li>
      <input type="radio" name="townLocation" value="neartown"
      checked={this.state.attributes.townLocation==="neartown" }
      onChange={this.handleAttribute} /> Neartown
    </li>
    {/*
    <!-- added near town li , check id -->
    */}
  </ul>
  {this.state.attributes.townLocation!==''  && this.state.isAdd?<div className='warning'>* Required</div>:""}
</div>

<h4 class="particilars">Access Road</h4>
<div className="attributes">
  <ul>
    <li>
      <input type="radio" name="accessRoad" value="tarmac"
      checked={this.state.attributes.accessRoad==="tarmac" }
      onChange={this.handleAttribute}/> Tarmac
    </li>
    <li>
      <input type="radio" name="accessRoad" value="cabro"
      checked={this.state.attributes.accessRoad==="cabro" }
      onChange={this.handleAttribute} /> Cabro
    </li>
    <li>
      <input type="radio" name="accessRoad" value="allWeather"
      checked={this.state.attributes.accessRoad==="allweather" }
      onChange={this.handleAttribute}/> All weather
    </li>
    <li>
      <input type="radio" name="accessRoad" value="main"
      checked={this.state.attributes.accessRoad==="main" }
      onChange={this.handleAttribute} /> Main
    </li>
  </ul>
  {this.state.attributes.accessRoad!==''  && this.state.isAdd?<div className='warning'>* Required</div>:""}
</div>
<h4 class="particilars">Tenants</h4>

<div className="attributes">
  <ul>
    <li>
      <input type="radio" name="tenants" value="mixed"
      checked={this.state.attributes.tenants==="mixed" }
      onChange={this.handleAttribute} /> Mixed
    </li>
    <li>
      <input type="radio" name="tenants" value="specialized"
      checked={this.state.attributes.tenants==="specialized" }
      onChange={this.handleAttribute} /> Specialized
    </li>
    <li>
      <input type="radio" name="tenants" value="processing"
      checked={this.state.attributes.tenants==="processing" }
      onChange={this.handleAttribute} /> Processing
    </li>
    {this.state.attributes.tenants!==''  && this.state.isAdd?<div className='warning'>* Required</div>:""}
  </ul>
</div>
<h4 class="particilars">Elevator</h4>
<div className="attributes">
  <ul>
    <li>
      <input type="radio" name="elevator" value="none"
      checked={this.state.attributes.elevator==="none" }
      onChange={this.handleAttribute}/> None
    </li>
    <li>
      <input type="radio" name="elevator" value="goods"
      checked={this.state.attributes.elevator==="goods" }
      onChange={this.handleAttribute}/> Goods
    </li>
    <li>
      <input type="radio" name="elevator" value="passenger"
      checked={this.state.attributes.elevator==="passenger" }
      onChange={this.handleAttribute}/> Passenger
    </li>
    <li>
      <input type="radio" name="elevator" value="passenger and goods"
      checked={this.state.attributes.elevator==="passenger and goods" }
      onChange={this.handleAttribute}/> Passenger and goods
    </li>
  </ul>
  {this.state.attributes.elevator!==''  && this.state.isAdd?<div className='warning'>* Required</div>:""}
</div>

<h4 class="particilars">Security</h4>

<div className="attributes">
  <ul>
    <li>
      <input type="radio" name="security" value="Tight"
      checked={this.state.attributes.security==="Tight" }
      onChange={this.handleAttribute}/> Tight
    </li>
    <li>
      <input type="radio" name="security" value="MainGate"
      checked={this.state.attributes.security==="MainGate" }
      onChange={this.handleAttribute}/> Main gate {/*
      <!--  added maingate -->
      */}
    </li>

    <li>
      <input type="radio" name="security" value="MainGateAndFloors"
      checked={this.state.attributes.security==="MainGateAndFloors" }
      onChange={this.handleAttribute}/> Main gate and floors
    </li>
    <li>
      <input type="radio" name="security" value="None"
      checked={this.state.attributes.security==="none" }
      onChange={this.handleAttribute}/> None
    </li>
  </ul>
  {this.state.attributes.security!==''  && this.state.isAdd?<div className='warning'>* Required</div>:""}
</div>
<h4 class="particilars">Vehicle Traffic</h4>
<div className="attributes">
  <ul>
    <li>
      <input type="radio" name="vehicleTraffic" value="veryhigh"
      checked={this.state.attributes.vehicleTraffic==="veryhigh" }
      onChange={this.handleAttribute}/> Very high
    </li>
    <li>
      <input type="radio" name="vehicleTraffic" value="high"
      checked={this.state.attributes.vehicleTraffic==="high" }
      onChange={this.handleAttribute}/> High
    </li>
    <li>
      <input type="radio" name="vehicleTraffic" value="low"
      checked={this.state.attributes.vehicleTraffic==="low" }
      onChange={this.handleAttribute}/> Low
    </li>
  </ul>
  {this.state.attributes.vehicleTraffic!==''  && this.state.isAdd?<div className='warning'>* Required</div>:""}
</div>

<h4 class="particilars">Human Traffic</h4>
<div className="attributes">
  <ul>
    <li>
      <input type="radio" name="humanTraffic" value="veryhigh"
      checked={this.state.attributes.humanTraffic==="veryhigh" }
      onChange={this.handleAttribute}/> Very high
    </li>
    <li>
      <input type="radio" name="humanTraffic" value="high"
      checked={this.state.attributes.humanTraffic==="high" }
      onChange={this.handleAttribute}/> High
    </li>
    <li>
      <input type="radio" name="humanTraffic" value="low"
      checked={this.state.attributes.humanTraffic==="low" }
      onChange={this.handleAttribute}/> Low
    </li>
  </ul>
  {this.state.attributes.humanTraffic!==''  && this.state.isAdd?<div className='warning'>* Required</div>:""}
</div>

<h4 class="particilars">Meeting Room</h4>
<div className="attributes">
  <ul>
    <li>
      <input type="radio" name="meetingRoom" value="none"
      checked={this.state.attributes.meetingRoom==="none" }
      onChange={this.handleAttribute} /> None
    </li>
    <li>
      <input type="radio" name="meetingRoom" value="free"
      checked={this.state.attributes.meetingRoom==="free" }
      onChange={this.handleAttribute}/> Free
    </li>
    <li>
      <input type="radio" name="meetingRoom" value="paid"
      checked={this.state.attributes.meetingRoom==="paid" }
      onChange={this.handleAttribute}/> Paid
    </li>
  </ul>
  {this.state.attributes.meetingRoom!==''  && this.state.isAdd?<div className='warning'>* Required</div>:""}
</div>
{/* <!-- this is extra, i have commented it. --> */}
  {/*<!-- <h4 class="particilars">Meeting Room</h4>

  <div className="attributes">
    <ul>
      <li>
        <input
          type="radio"
          name="RadioGroup15"
          id="RadioGroup15_0"
          value="radio"
        />
        None
      </li>
      <li>
        <input
          type="radio"
          name="RadioGroup15"
          id="RadioGroup15_1"
          value="radio"
        />
        Free
      </li>
      <li>
        <input
          type="radio"
          name="RadioGroup15"
          id="RadioGroup15_2"
          value="radio"
        />
        Paid
      </li>
    </ul>
            </div> -->*/}
  <h4 class="particilars">Parking</h4>

<div className="attributes">
  <ul>
    <li>
      <input type="radio" name="parking" value="none"
      checked={this.state.attributes.parking==="none" }
      onChange={this.handleAttribute} /> None
    </li>
    <li>
      <input type="radio" name="parking" value="free"
      checked={this.state.attributes.parking==="free" }
      onChange={this.handleAttribute} /> Free
    </li>
    <li>
      <input type="radio" name="parking" value="paid"
      checked={this.state.attributes.parking==="paid" }
      onChange={this.handleAttribute}/> Paid
    </li>
  </ul>
  {this.state.attributes.parking!==''  && this.state.isAdd?<div className='warning'>* Required</div>:""}
</div>

  {/* end */}
    
  <div className="form-group text-right"><button className="step-next" href="#tab_default_3" data-toggle="tab"  onClick={this.step3c}>Next</button></div>

</div>


						</div>
						<div className="tab-pane" id="tab_default_3">
                            
                        <div className="step-1 space">
                    <span className="step-btn">Step 03</span>

                    </div>
							
                    <h3 className="add-property-title">Add Seller Details</h3>
                    <div className="add-property-form col-6">
                    <div className="form-group">
                    <label>Seller Name</label>
                    <input type="text" className="form-control" placeholder="Name" name="sellerName" value={this.state.sellerName}  onChange={this.handleChange}/>
                    {this.state.valisellerName?<div className='warning'>*Enter seller name</div>:""}
                    </div>
                    <div className="form-group">
                    <label>Seller Contact Number</label>
                    <input type="number" className="form-control" placeholder="Contact number" name="sellerContactNo" value={this.state.sellerContactNo}  onChange={this.handleChange}/>
                    {this.state.valisellerContactNo?<div className='warning'>*Enter seller contact no</div>:""}
                    </div>

                    <div className="form-group">
                    <label>Seller office address</label>
                    <textarea className="form-control" placeholder="Type here" name="sellerOfficeAddress" value={this.state.sellerOfficeAddress}  onChange={this.handleChange}></textarea>
                    {this.state.valisellerOfficeAddress?<div className='warning'>*Enter seller office address</div>:""}
                   
                    </div>

                    <div className="form-group">
                    <label>Seller email</label>
                   <input type="email" className="form-control" name="sellerEmail" value={this.state.sellerEmail}  onChange={this.handleChange}/>
                   {this.state.valisellerEmail?<div className='warning'>*Invalid email</div>:""}
                   
                    </div>


                    <div className="form-group">
                    <label>Seller type</label>
                    <div className="form-control checkdivbox">
                    <label>
    <input type="radio" name="sellerType" value="Owner"   checked={this.state.sellerType === "Owner"} onChange={this.handleChange}/>
    Owner</label>

  <label>
    <input type="radio" name="sellerType" value="Agent"  checked={this.state.sellerType === "Agent"} onChange={this.handleChange}/>
    Agent</label>

                    </div>
                    </div>

                    

                    

                    

                    <div className="form-group">
                    <label>Seller Alternative telephone number</label>
                    <input type="number" className="form-control" placeholder="Paste here" name="sellerAltTeleNo" value={this.state.sellerAltTeleNo}   onChange={this.handleChange} />
                    
                    {this.state.valisellerAltTeleNo?<div className='warning'>* Invalid alt telephone no</div>:""}
                  
                    </div>
                    

   

                    <div className="form-group">
                    <label>Seller Alternative email address</label>
                    <input type="email" className="form-control" placeholder="Paste here" name="sellerAltEmail" value={this.state.sellerAltEmail} onChange={this.handleChange} />
                    {this.state.valisellerAltEmail?<div className='warning'>* Invalid Alt Email</div>:""}
                  
                    </div>

                    <div className="form-group">
                    <label>Seller's website</label>
                    <input className="form-control" placeholder="Paste here" name="sellerWebsite" value={this.state.sellerWebsite} onChange={this.handleChange}/>
                   
                    {this.state.valisellerWebsite?<div className='warning'>* Invalid Website</div>:""}
                  
                    </div>

                    <div className="form-group sellerbox12">
                    <label>Seller's Logo</label>
                    <div className="select-file">
                    <i className="zmdi zmdi-plus"></i>
                    <input type="file"  name="sellerLogo"  onChange={this.handleChangeLogo}/>
                   
                  
                    </div>
                    <div className="sellerlogo">
                   {this.state.sellerLogo?<img src={this.state.sellerLogo}/>:''}
                   </div>
                   {this.state.valisellerLogo?<div className='warning'>*Enter seller Logo</div>:""}
                    </div>
                    <div className="form-group">
                    <label>Location</label>
                    <input className="form-control" placeholder="Paste here" name="sellerLocation" value={this.state.sellerLocation} onChange={this.handleChange}/>
                    
                    {this.state.valisellerLocation?<div className='warning'>*Enter seller Location</div>:""}
                  
                    </div>
                    <div className="form-group">
                    <label>Map Link</label>
                    <input className="form-control" placeholder="Paste here" name="sellerMapLink" value={this.state.sellerMapLink} onChange={this.handleChange}/>
                    {this.state.valisellerMapLink?<div className='warning'>*Enter seller Map Link</div>:""}
                  
                    </div>
                    <div className="form-group">
                    <label>Nearest Place Name</label>
                    <input className="form-control" placeholder="Paste here" name="sellerNearestPlaceName" value={this.state.sellerNearestPlaceName} onChange={this.handleChange}/>
                   
                    {this.state.valisellerNearestPlaceName?<div className='warning'>*Enter seller Nearest PlaceName</div>:""}
                  
                    </div>
                    <div className="form-group">
                    <label>Nearest Place KM</label>
                    <input type="number" className="form-control" placeholder="Paste here" name="sellerNearestPlaceNameKm" value={this.state.sellerNearestPlaceNameKm} onChange={this.handleChange}/>
                   
                    {this.state.valisellerNearestPlaceNameKm?<div className='warning'>*Enter seller Nearest Place Name Km</div>:""}
                  
                    </div>
         

                    <div className="form-group text-right">
                    <button className="step-next" onClick={this.addWarehouse}>Add</button>
                    </div>

                    </div>

							</div>
           
                        
					</div>
				</div>
			</div>
            
            :""}







</div> }

<div id="myModal" className="modal fade" role="dialog">
  <div className="modal-dialog modal-lg">

   
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Similar properties</h4>
      </div>
      <div className="modal-body">
      <div className="table-responsive">
<table className="table table-hover">
  <thead className="thead-light">
    <tr>
    <th></th>
      
      <th>PROPERTY NAME</th>
     
     
      
     
    </tr>
  </thead>
  <tbody>

   {SimilarHouse}
  
    
    

    
    
  </tbody>
</table>

</div>
      </div>
      
    </div>

  </div>
</div>


<div id="hotelModal" className="modal fade" role="dialog">
  <div className="modal-dialog modal-lg">

   
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Similar properties</h4>
      </div>
      <div className="modal-body">
      <div className="table-responsive">
<table className="table table-hover">
  <thead className="thead-light">
    <tr>
    <th></th>
      
      <th>PROPERTY NAME</th>
     
     
      
     
    </tr>
  </thead>
  <tbody>

   {SimilarHotel}
  
    
    

    
    
  </tbody>
</table>

</div>
      </div>
      
    </div>

  </div>
</div>



<div id="landModal" className="modal fade" role="dialog">
  <div className="modal-dialog modal-lg">

   
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Similar properties</h4>
      </div>
      <div className="modal-body">
      <div className="table-responsive">
<table className="table table-hover">
  <thead className="thead-light">
    <tr>
    <th></th>
      
      <th>PROPERTY NAME</th>
     
     
      
     
    </tr>
  </thead>
  <tbody>

   {SimilarLand}
  
    
    

    
    
  </tbody>
</table>

</div>
      </div>
      
    </div>

  </div>
</div>



<div id="wareModal" className="modal fade" role="dialog">
  <div className="modal-dialog modal-lg">

   
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal">&times;</button>
        <h4 className="modal-title">Similar properties</h4>
      </div>
      <div className="modal-body">
      <div className="table-responsive">
<table className="table table-hover">
  <thead className="thead-light">
    <tr>
    <th></th>
      
      <th>PROPERTY NAME</th>
     
     
      
     
    </tr>
  </thead>
  <tbody>

   {SimilarWare}
  
    
    

    
    
  </tbody>
</table>

</div>
      </div>
      
    </div>

  </div>
</div>
            
        </div>)
    }
}

export default (EditProperty);