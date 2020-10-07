import React, {Component} from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import moment from 'moment'; 
import NavbarAdmin from "./NavbarAdmin";
class ManageProperty extends Component{

    constructor() {
		super()
		this.state = {

              cate1:true,
            cate2:false,
            cate3:false,
            cate4:false,
            loader:true,
            loader2:false,
            loader3:false,
            loader4:false,
            
            House:[],
            Land:[],
            Hotel:[],
            Warehouse:[],

            listDel1:[],
            listDel2:[],
            listDel3:[],
            listDel4:[],

            fromDate:"",
      toDate:moment().format("YYYY-MM-DD"),

      currentPage1: 1,
      LocationsPerPage1: 5,
      currentPage2: 1,
      LocationsPerPage2: 5,
      currentPage3: 1,
      LocationsPerPage3: 5,
      currentPage4: 1,
      LocationsPerPage4: 5,

      allCheck1:false,
      allCheck2:false,
      allCheck3:false,
      allCheck4:false,

      
			


		}
    }

    cat1=e=>{
      this.setState({cate1:true,cate2:false,cate3:false,cate4:false,listDel2:[],listDel3:[],listDel4:[] ,fromDate:"",
      toDate:moment().format("YYYY-MM-DD"),currentPage1: 1,
      LocationsPerPage1: 5,
      currentPage2: 1,
      LocationsPerPage2: 5,
      currentPage3: 1,
      LocationsPerPage3: 5,currentPage4: 1,
      LocationsPerPage4: 5,
      allCheck1:false,
      allCheck2:false,
      allCheck3:false,
      allCheck4:false,
    })
  }

  cat2=e=>{
      this.setState({cate1:false,cate2:true,cate3:false,cate4:false,listDel1:[],listDel3:[],listDel4:[], fromDate:"",
      toDate:moment().format("YYYY-MM-DD"),currentPage1: 1,
      LocationsPerPage1: 5,
      currentPage2: 1,
      LocationsPerPage2: 5,
      currentPage3: 1,
      LocationsPerPage3: 5,currentPage4: 1,
      LocationsPerPage4: 5,
      allCheck1:false,
      allCheck2:false,
      allCheck3:false,
      allCheck4:false,
    })
  }

  cat3=e=>{
      this.setState({cate1:false,cate2:false,cate3:true,cate4:false,listDel1:[],listDel2:[],listDel4:[], fromDate:"",
      toDate:moment().format("YYYY-MM-DD"),currentPage1: 1,
      LocationsPerPage1: 5,
      currentPage2: 1,
      LocationsPerPage2: 5,
      currentPage3: 1,
      LocationsPerPage3: 5,
      currentPage4: 1,
      LocationsPerPage4: 5,
      allCheck1:false,
      allCheck2:false,
      allCheck3:false,
      allCheck4:false,
    })    }

  cat4=e=>{
      this.setState({cate1:false,cate2:false,cate3:false,cate4:true,listDel1:[],listDel2:[],listDel3:[], fromDate:"",
      toDate:moment().format("YYYY-MM-DD"),currentPage1: 1,
      LocationsPerPage1: 5,
      currentPage2: 1,
      LocationsPerPage2: 5,
      currentPage3: 1,
      LocationsPerPage3: 5,currentPage4: 1,
      LocationsPerPage4: 5,
      allCheck1:false,
      allCheck2:false,
      allCheck3:false,
      allCheck4:false,
    })
  }



    componentDidMount(){

      var config = {
        method: 'get',
        url: 'https://cuboidtechnologies.com/api/admin/dashboard/get-all-property-details',
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
        Hotel:response.data.hotel,
        House:response.data.house,
        Land:response.data.land,
        Warehouse:response.data.warehouse,
        loader:false

        })
       
        
      })
      .catch(function (error) {
        console.log(error);
      });
    

      

    }

    

     // Status change 

     changeStatus=id=>e=>{
      e.preventDefault();
      console.log("change")
     
     
      var config = {
        method: 'patch',
        url: 'https://cuboidtechnologies.com/api/property/admin/set-property-status/'+id,
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


    // delete property

    deleteProperty=(id,type)=>e=>{
      e.preventDefault();
      console.log(id);
      console.log(type);
      var x =window.confirm("are you sure you want to delete this "+id);
     if( x){
      const data={
        "propertyType":type
    }

      var config = {
        method: 'delete',
        url: 'https://cuboidtechnologies.com/api/property/admin/delete-one-property/'+id,
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
        if(type=='House'){
        this.setState({
          House: this.state.House.filter((u)=> {
            return u._id !== id;
            
          })
        });
      }

      if(type=='Hotel'){
        this.setState({
          Hotel: this.state.Hotel.filter((u)=> {
            return u._id !== id;
            
          })
        });
      }

      if(type=='Land'){
        this.setState({
          Land: this.state.Land.filter((u)=> {
            return u._id !== id;
            
          })
        });
      }

      if(type=='Warehouse'){
        this.setState({
          Warehouse: this.state.Warehouse.filter((u)=> {
            return u._id !== id;
            
          })
        });
      }
        alert("successfull deleted "+id);

        
       
        
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    }

     // delete property

     deleteManyProperty=(type)=>e=>{
      e.preventDefault();
     
      
      console.log(type);
      var x =window.confirm("are you sure you want to delete selected Property? ");
     if( x){
      var data;

      if(type=='House'){
        this.setState({loader:true})
          data={
          
          
            "deleteuser" : this.state.listDel1,
            "propertyType":"House"
            
      }
      }

      if(type=='Hotel'){
        this.setState({loader3:true})
          data={
          
          
          "deleteuser" : this.state.listDel3,
          "propertyType":"Hotel"
          
    }
      }

      if(type=='Land'){
        this.setState({loader2:true})
       data={
          
          
          "deleteuser" : this.state.listDel2,
          "propertyType":"Land"
          
    }
      }

      if(type=='Warehouse'){
        this.setState({loader4:true})
          data={
          
          
          "deleteuser" : this.state.listDel4,
          "propertyType":"Warehouse"
          
    }      }

     

      var config = {
        method: 'delete',
        url: 'https://cuboidtechnologies.com/api/property/admin/delete-multiple-property',
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
        var config2 = {
          method: 'get',
          url: 'https://cuboidtechnologies.com/api/admin/dashboard/get-all-property-details',
          headers: {
           Accept: 'application/json',
           Authorization: "Bearer " + localStorage.getItem("token"),  
          'content-type': 'application/json',
          
         
      },
          
          
          
        };
        
        Axios(config2)
        .then( (response)=> {
          console.log(response);
          this.setState({
          Hotel:response.data.hotel,
          House:response.data.house,
          Land:response.data.land,
          Warehouse:response.data.warehouse,
          loader:false,
          loader2:false,
          loader3:false,
          loader4:false,
  
          })
         
          
        })
        .catch(function (error) {
          console.log(error);
        });
      
  
        alert("successfull deleted ");

        
       
        
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    }

    handleCheck(val) {
      return this.state.listDel1.some(item => val === item);
     }

    checkboxChange=e=>{
      
        const id = e.target.id;
        console.log(id);
        this.state.House.map(r=>{
          if( r._id==id){
            r.isSelect=!r.isSelect;
          }
         })
     
      var v=this.handleCheck(id)==true?true:false;
     
if(!v){
        this.setState( {
          listDel1:this.state.listDel1.concat(id)
        }
         
            )
      }
      else{
        var a=this.state.listDel1;
        var i= a.indexOf(id)
        a.splice(i,1);
        // this.state.listDel.pop(id)
        this.setState( {
          listDel1:a
        })

      } 
     

    }

    handleCheck2(val) {
      return this.state.listDel2.some(item => val === item);
     }

    checkboxChange2=e=>{
      
        const id = e.target.id;
        console.log(id);

        this.state.Land.map(r=>{
          if( r._id==id){
            r.isSelect=!r.isSelect;
          }
         })
     
      var v=this.handleCheck2(id)==true?true:false;
     
if(!v){
        this.setState( {
          listDel2:this.state.listDel2.concat(id)
        }
         
            )
      }
      else{
        var a=this.state.listDel2;
        var i= a.indexOf(id)
        a.splice(i,1);
        // this.state.listDel.pop(id)
        this.setState( {
          listDel2:a
        })
      } 
     

    }


    handleCheck3(val) {
      return this.state.listDel3.some(item => val === item);
     }

    checkboxChange3=e=>{
      
        const id = e.target.id;
        console.log(id);

        this.state.Hotel.map(r=>{
          if( r._id==id){
            r.isSelect=!r.isSelect;
          }
         })
     
      var v=this.handleCheck3(id)==true?true:false;
     
if(!v){
        this.setState( {
          listDel3:this.state.listDel3.concat(id)
        }
         
            )
      }
      else{
        var a=this.state.listDel3;
        var i= a.indexOf(id)
        a.splice(i,1);
        // this.state.listDel.pop(id)
        this.setState( {
          listDel3:a
        })

      } 
     

    }


    handleCheck4(val) {
      return this.state.listDel4.some(item => val === item);
     }

    checkboxChange4=e=>{
      
        const id = e.target.id;
        console.log(id);

        this.state.Warehouse.map(r=>{
          if( r._id==id){
            r.isSelect=!r.isSelect;
          }
         })
     
      var v=this.handleCheck4(id)==true?true:false;
     
if(!v){
        this.setState( {
          listDel4:this.state.listDel4.concat(id)
        }
         
            )
      }
      else{
        var a=this.state.listDel4;
        var i= a.indexOf(id)
        a.splice(i,1);
        // this.state.listDel.pop(id)
        this.setState( {
          listDel4:a
        })

      } 
     

    }



     dateChange=p=> async event=> {
      console.log("date");
      console.log(event.target.value);
     
      if(p=="House"){
      
     await this.setState({[event.target.name]:event.target.value})

      const data={
        "startDate": this.state.fromDate,
        "endDate" : this.state.toDate
    }
  console.log(data)
      var config = {
        method: 'post',
        url: 'https://cuboidtechnologies.com/api/admin/house/house-filter-by-date',
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
        this.setState({House:response.data.data,loader:false})
       
        
      })
      .catch(function (error) {
        console.log(error);
      });
      }


      if(p=="Warehouse"){
      
        await this.setState({[event.target.name]:event.target.value})
   
         const data={
           "startDate": this.state.fromDate,
           "endDate" : this.state.toDate
       }
     console.log(data)
         var config = {
           method: 'post',
           url: 'https://cuboidtechnologies.com/api/admin/warehouse/warehouse-filter-by-date',
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
           this.setState({Warehouse:response.data.data,loader:false})
          
           
         })
         .catch(function (error) {
           console.log(error);
         });
         }

         if(p=="Land"){
      
          await this.setState({[event.target.name]:event.target.value})
     
           const data={
             "startDate": this.state.fromDate,
             "endDate" : this.state.toDate
         }
       console.log(data)
           var config = {
             method: 'post',
             url: 'https://cuboidtechnologies.com/api/admin/land/land-filter-by-date',
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
             this.setState({Land:response.data.data,loader:false})
            
             
           })
           .catch(function (error) {
             console.log(error);
           });
           }

           if(p=="Hotel"){
      
            await this.setState({[event.target.name]:event.target.value})
       
             const data={
               "startDate": this.state.fromDate,
               "endDate" : this.state.toDate
           }
         console.log(data)
             var config = {
               method: 'post',
               url: 'https://cuboidtechnologies.com/api/admin/hotel/hotel-filter-by-date',
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
               this.setState({Hotel:response.data.data,loader:false})
              
               
             })
             .catch(function (error) {
               console.log(error);
             });
             }

    }


    searchByName= p=> e=>{
     
      if(p==="House"){
        this.setState({ HouseSearch:e.target.value,loader:true})


     const data={
       
         "searchquery": e.target.value   
   }
 console.log(data)
     var config = {
       method: 'post',
       url: 'https://cuboidtechnologies.com/api/admin/house/search-property-by-name',
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
       this.setState({House:response.data.data,loader:false})
      
       
     })
     .catch(function (error) {
       console.log(error);
     });
   

   
    }
   

    if(p==="Land"){
      this.setState({ LandSearch:e.target.value,loader2:true})


   const data={
     
       "searchquery": e.target.value   
 }
console.log(data)
   var config = {
     method: 'post',
     url: 'https://cuboidtechnologies.com/api/admin/land/search-property-by-name',
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
     this.setState({Land:response.data.data,loader2:false})
    
     
   })
   .catch(function (error) {
     console.log(error);
   });
 

 
  }
 

  if(p==="Hotel"){
    this.setState({ HotelSearch:e.target.value,loader3:true})


 const data={
   
     "searchquery": e.target.value   
}
console.log(data)
 var config = {
   method: 'post',
   url: 'https://cuboidtechnologies.com/api/admin/hotel/search-property-by-name',
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
   this.setState({Hotel:response.data.data,loader3:false})
  
   
 })
 .catch(function (error) {
   console.log(error);
 });



}


if(p==="Warehouse"){
  this.setState({ WarehouseSearch:e.target.value,loader4:true})


const data={
 
   "searchquery": e.target.value   
}
console.log(data)
var config = {
 method: 'post',
 url: 'https://cuboidtechnologies.com/api/admin/warehouse/search-property-by-name',
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
 this.setState({Warehouse:response.data.data,loader4:false})

 
})
.catch(function (error) {
 console.log(error);
});



}



   }

   handleClickPagi1 = event => {
    console.log("pagi")
    console.log(event.target.id)
    this.setState({
      currentPage1: Number(event.target.id)
    });
  };

  changeItemsPerPage = event => {
    console.log("items", event.target.value);
    this.setState({
      LocationsPerPage1: Number(event.target.value)
    });
  };

  handleClickPagi2 = event => {
    console.log("pagi")
    console.log(event.target.id)
    this.setState({
      currentPage2: Number(event.target.id)
    });
  };

  changeItemsPerPage2 = event => {
    console.log("items", event.target.value);
    this.setState({
      LocationsPerPage2: Number(event.target.value)
    });
  };

  handleClickPagi3 = event => {
    console.log("pagi")
    console.log(event.target.id)
    this.setState({
      currentPage3: Number(event.target.id)
    });
  };

  changeItemsPerPage3 = event => {
    console.log("items", event.target.value);
    this.setState({
      LocationsPerPage3: Number(event.target.value)
    });
  };

  handleClickPagi4 = event => {
    console.log("pagi")
    console.log(event.target.id)
    this.setState({
      currentPage4: Number(event.target.id)
    });
  };

  changeItemsPerPage4 = event => {
    console.log("items", event.target.value);
    this.setState({
      LocationsPerPage4: Number(event.target.value)
    });
  };


  pagiNext1=e=>{
    if(this.state.currentPage1 < Math.ceil(this.state.House.length / this.state.LocationsPerPage1))
    this.setState({currentPage1:(this.state.currentPage1+1)})
  }

  pagiPrev1=e=>{
    if(this.state.currentPage1>1)
    this.setState({currentPage1:(this.state.currentPage1-1)})
  }

  pagiNext2=e=>{
    if(this.state.currentPage2 < Math.ceil(this.state.Land.length / this.state.LocationsPerPage2))
    this.setState({currentPage2:(this.state.currentPage2+1)})
  }

  pagiPrev2=e=>{
    if(this.state.currentPage2>1)
    this.setState({currentPage2:(this.state.currentPage2-1)})
  }

  pagiNext3=e=>{
    if(this.state.currentPage3 < Math.ceil(this.state.Hotel.length / this.state.LocationsPerPage3))
    this.setState({currentPage3:(this.state.currentPage3+1)})
  }

  pagiPrev3=e=>{
    if(this.state.currentPage3>1)
    this.setState({currentPage3:(this.state.currentPage3-1)})
  }

  pagiNext4=e=>{
    if(this.state.currentPage4 < Math.ceil(this.state.Warehouse.length / this.state.LocationsPerPage4))
    this.setState({currentPage4:(this.state.currentPage4+1)})
  }

  pagiPrev4=e=>{
    if(this.state.currentPage4>1)
    this.setState({currentPage4:(this.state.currentPage4-1)})
  }


  checkedAll1=event=>{
    this.setState({listDel1:[], allCheck1:event.target.checked});
    var list=[];
    var boo= event.target.checked;
    const {  currentPage1, LocationsPerPage1 } = this.state;
    var FinalHouse= this.state.House;
    // Logic for displaying Locations
    const indexOfLastLocation = currentPage1 * LocationsPerPage1;
    const indexOfFirstLocation = indexOfLastLocation - LocationsPerPage1;

    let Houses = this.state.House.slice(
      indexOfFirstLocation,
      indexOfLastLocation
    )
    console.log(Houses)
    Houses.forEach(House => {House.isSelect = boo;
      
      FinalHouse.forEach(F=>{
        if(House._id===F._id){
          F.isSelect=boo
        }
      })
      if(boo){
      list.push(House._id)
      }
    }) 

    
    this.setState({House: FinalHouse,listDel1:list})
   
  }
  
  checkedAll2=event=>{
    this.setState({listDel2:[], allCheck2:event.target.checked});
    var list=[];
    var boo= event.target.checked;
    const {  currentPage2, LocationsPerPage2 } = this.state;
    var FinalLand= this.state.Land;
    // Logic for displaying Locations
    const indexOfLastLocation = currentPage2 * LocationsPerPage2;
    const indexOfFirstLocation = indexOfLastLocation - LocationsPerPage2;

    let Lands = this.state.Land.slice(
      indexOfFirstLocation,
      indexOfLastLocation
    )
    console.log(Lands)
    Lands.forEach(Land => {Land.isSelect = boo;
      
      FinalLand.forEach(F=>{
        if(Land._id===F._id){
          F.isSelect=boo
        }
      })
      if(boo){
      list.push(Land._id)
      }
    }) 

    
    this.setState({Land: FinalLand,listDel2:list})
   
  }
  
  checkedAll3=event=>{
    this.setState({listDel3:[], allCheck3:event.target.checked});
    var list=[];
    var boo= event.target.checked;
    const {  currentPage3, LocationsPerPage3 } = this.state;
    var FinalHotel= this.state.Hotel;
    // Logic for displaying Locations
    const indexOfLastLocation = currentPage3 * LocationsPerPage3;
    const indexOfFirstLocation = indexOfLastLocation - LocationsPerPage3;

    let Hotels = this.state.Hotel.slice(
      indexOfFirstLocation,
      indexOfLastLocation
    )
    console.log(Hotels)
    Hotels.forEach(hotel => {hotel.isSelect = boo;
      
      FinalHotel.forEach(F=>{
        if(hotel._id===F._id){
          F.isSelect=boo
        }
      })
      if(boo){
      list.push(hotel._id)
      }
    }) 

    
    this.setState({Hotel: FinalHotel,listDel3:list})
   
  }
  

  checkedAll4=event=>{
    this.setState({listDel4:[], allCheck4:event.target.checked});
    var list=[];
    var boo= event.target.checked;
    const {  currentPage4, LocationsPerPage4 } = this.state;
    var FinalWarehouse= this.state.Warehouse;
    // Logic for displaying Locations
    const indexOfLastLocation = currentPage4 * LocationsPerPage4;
    const indexOfFirstLocation = indexOfLastLocation - LocationsPerPage4;

    let Warehouses = this.state.Warehouse.slice(
      indexOfFirstLocation,
      indexOfLastLocation
    )
    console.log(Warehouses)
    Warehouses.forEach(ware => {ware.isSelect = boo;
      
      FinalWarehouse.forEach(F=>{
        if(ware._id===F._id){
          F.isSelect=boo
        }
      })
      if(boo){
      list.push(ware._id)
      }
    }) 

    
    this.setState({Warehouse: FinalWarehouse,listDel4:list})
   
  }
  
    render() {
      console.log(this.state)

      var {House, Land, Hotel, Warehouse}=this.state;
      console.log("hou",House)
      const {  currentPage1, LocationsPerPage1,currentPage2, LocationsPerPage2,currentPage3, LocationsPerPage3,currentPage4, LocationsPerPage4 } = this.state;

      // Logic for displaying Locations
      const indexOfLastLocation = currentPage1 * LocationsPerPage1;
      const indexOfFirstLocation = indexOfLastLocation - LocationsPerPage1;
      const currentLocations1 = House?House.slice(
        indexOfFirstLocation,
        indexOfLastLocation
      ):[]

      if(currentLocations1){

       var Houses = currentLocations1.map(h=>{
        var isActive=h.isStatus?"Active":"In Active";

          return(
            

            <tr key={h._id}>
      
      <td><input type="checkbox" checked={h.isSelect} id={h._id} onChange={this.checkboxChange}/></td>
      <td>{h.propertyDetails.propertyName} </td>
     
      <td>${h.attributes.cost}</td>
      <td>{h.propertyDetails.propertyFor}</td>
      <td>{h.propertyDetails.propertyType}</td>
      <td>{h.sellerDetails.sellername}</td>
      <td>{h.sellerDetails.selleremail}</td>
       <td>{h.sellerDetails.sellerContactNumber}</td>
       {h.isFlipbook?
      <td style={{whiteSpace: "nowrap"}}><Link to={"/edit-flipbook/"+h._id} className="edit-btn"><i className="fa fa-edit"></i></Link>
      <a href={"https://cuboidtechnologies.com/flipbook/"+h._id} target="_blank" className="view-btn"><i className="fa fa-eye"></i></a>
      </td>:
      <td><Link to="/create-flipbook" className="create-btn"><i className="zmdi zmdi-plus-circle-o"></i> </Link></td>}
      
      <td> <select onChange={this.changeStatus(h._id)}>
    <option>{isActive}</option>
    <option>{h.isStatus?"In Active":"Active"}</option>
    </select>
      </td>

      <td align="center" style={{whiteSpace: "nowrap"}}><Link to={"/edit-property/"+h._id} className="edit-btn"><i className="fa fa-edit"></i></Link>
      <a onClick={this.deleteProperty(h._id, "House")} className="delete"><i className="fa fa-trash-o"></i></a></td>
    </tr>
          )
        })
      }
     

      const indexOfLastLocation2 = currentPage2 * LocationsPerPage2;
      const indexOfFirstLocation2 = indexOfLastLocation2 - LocationsPerPage2;
      const currentLocations2 = Land?Land.slice(
        indexOfFirstLocation2,
        indexOfLastLocation2
      ):[]
      if(currentLocations2){

        var Lands = currentLocations2.map(h=>{
         var isActive=h.isStatus?"Active":"In Active";
 
           return(
             
 
             <tr key={h._id}>
       
       <td><input type="checkbox" checked={h.isSelect} id={h._id} onChange={this.checkboxChange2} /></td>
       <td>{h.propertyDetails.propertyName} </td>
      
       <td>${h.attributes.cost}</td>
       <td>{h.propertyDetails.propertyFor}</td>
       <td>{h.propertyDetails.propertyType}</td>
       <td>{h.sellerDetails.sellername}</td>
       <td>{h.sellerDetails.selleremail}</td>
        <td>{h.sellerDetails.sellerContactNumber}</td>
        {h.isFlipbook?
      <td style={{whiteSpace: "nowrap"}}><Link to={"/edit-flipbook/"+h._id} className="edit-btn"><i className="fa fa-edit"></i></Link>
      <a href={"https://cuboidtechnologies.com/flipbook/"+h._id} target="_blank" className="view-btn"><i className="fa fa-eye"></i></a>
      </td>:
       <td><Link to="/create-flipbook" className="create-btn"><i className="zmdi zmdi-plus-circle-o"></i> </Link></td>}
       
       <td> <select onChange={this.changeStatus(h._id)}>
     <option>{isActive}</option>
     <option>{h.isStatus?"In Active":"Active"}</option>
     </select>
       </td>
 
       <td align="center" style={{whiteSpace: "nowrap"}}><Link to={"/edit-property/"+h._id} className="edit-btn"><i className="fa fa-edit"></i></Link>
       <a onClick={this.deleteProperty(h._id, "Land")} className="delete"><i className="fa fa-trash-o"></i></a></td>
     </tr>
           )
         })
       }

       const indexOfLastLocation3 = currentPage3 * LocationsPerPage3;
       const indexOfFirstLocation3 = indexOfLastLocation3 - LocationsPerPage3;
       const currentLocations3 =Hotel? Hotel.slice(
         indexOfFirstLocation3,
         indexOfLastLocation3
       ):[]



       if(currentLocations3){

        var Hotels = currentLocations3.map(h=>{
         var isActive=h.isStatus?"Active":"In Active";
 
           return(
             
 
             <tr key={h._id}>
       
       <td><input type="checkbox" checked={h.isSelect} id={h._id} onChange={this.checkboxChange3} /></td>
       <td>{h.propertyDetails.propertyName} </td>
      
       <td>${h.attributes.cost}</td>
       <td>{h.propertyDetails.propertyFor}</td>
       <td>{h.propertyDetails.propertyType}</td>
       <td>{h.sellerDetails.sellername}</td>
       <td>{h.sellerDetails.selleremail}</td>
        <td>{h.sellerDetails.sellerContactNumber}</td>
        {h.isFlipbook?
       <td style={{whiteSpace: "nowrap"}}><Link to={"/edit-flipbook/"+h._id} className="edit-btn"><i className="fa fa-edit"></i></Link>
       <a href={"https://cuboidtechnologies.com/flipbook/"+h._id} target="_blank" className="view-btn"><i className="fa fa-eye"></i></a>
       </td>:
      <td><Link to="/create-flipbook" className="create-btn"><i className="zmdi zmdi-plus-circle-o"></i> </Link></td>}
       
       <td> <select onChange={this.changeStatus(h._id)}>
     <option>{isActive}</option>
     <option>{h.isStatus?"In Active":"Active"}</option>
     </select>
       </td>
 
       <td align="center" style={{whiteSpace: "nowrap"}}><Link to={"/edit-property/"+h._id} className="edit-btn"><i className="fa fa-edit"></i></Link>
       <a onClick={this.deleteProperty(h._id, "Hotel")} className="delete"><i className="fa fa-trash-o"></i></a></td>
     </tr>
           )
         })
       }
       console.log("ware ",Warehouse);

       const indexOfLastLocation4 = currentPage4 * LocationsPerPage4;
       const indexOfFirstLocation4 = indexOfLastLocation4 - LocationsPerPage4;
       const currentLocations4 =Warehouse? Warehouse.slice(
         indexOfFirstLocation4,
         indexOfLastLocation4
       ):[]


       if(currentLocations4){

        var Warehouses = currentLocations4.map(h=>{
         var isActive=h.isStatus?"Active":"In Active";
 
           return(
             
 
             <tr key={h._id}>
       
       <td><input type="checkbox" checked={h.isSelect} id={h._id} onChange={this.checkboxChange4}/></td>
       <td>{h.propertyDetails.propertyName} </td>
      
       <td>${h.attributes.cost}</td>
       <td>{h.propertyDetails.propertyFor}</td>
       <td>{h.propertyDetails.propertyType}</td>
       <td>{h.sellerDetails.sellername}</td>
       <td>{h.sellerDetails.selleremail}</td>
        <td>{h.sellerDetails.sellerContactNumber}</td>
        {h.isFlipbook?
      <td style={{whiteSpace: "nowrap"}}><Link to={"/edit-flipbook/"+h._id} className="edit-btn"><i className="fa fa-edit"></i></Link>
      <a href={"https://cuboidtechnologies.com/flipbook/"+h._id} target="_blank" className="view-btn"><i className="fa fa-eye"></i></a>
      </td>:
       <td><Link to="/create-flipbook" className="create-btn"><i className="zmdi zmdi-plus-circle-o"></i> </Link></td>}
       
       <td> <select onChange={this.changeStatus(h._id)}>
     <option>{isActive}</option>
     <option>{h.isStatus?"In Active":"Active"}</option>
     </select>
       </td>
 
       <td align="center" style={{whiteSpace: "nowrap"}}><Link to={"/edit-property/"+h._id} className="edit-btn"><i className="fa fa-edit"></i></Link>
       <a onClick={this.deleteProperty(h._id, "Warehouse")} className="delete"><i className="fa fa-trash-o"></i></a></td>
     </tr>
           )
         })
       }



        // Logic for displaying page numbers
    const pageNumbers1 = [];
    for (
      let i = 1;
      i <= Math.ceil((House?House.length:1) / LocationsPerPage1);
      i++
    ) {
      pageNumbers1.push(i);
    }

    const renderPageNumbers1 = pageNumbers1.map(number => {
      console.log(number)
      return (
        <li key={number} id={number} onClick={this.handleClickPagi1}>
          {number}
        </li>
      );
    });
     

    const pageNumbers2 = [];
    for (
      let i = 1;
      i <= Math.ceil((Land?Land.length:1) / LocationsPerPage2);
      i++
    ) {
      pageNumbers2.push(i);
    }

    const renderPageNumbers2 = pageNumbers2.map(number => {
      console.log(number)
      return (
        <li key={number} id={number} onClick={this.handleClickPagi2}>
          {number}
        </li>
      );
    });

    const pageNumbers3 = [];
    for (
      let i = 1;
      i <= Math.ceil((Hotel?Hotel.length:1) / LocationsPerPage3);
      i++
    ) {
      pageNumbers3.push(i);
    }

    const renderPageNumbers3 = pageNumbers3.map(number => {
      console.log(number)
      return (
        <li key={number} id={number} onClick={this.handleClickPagi3}>
          {number}
        </li>
      );
    });
     
    const pageNumbers4 = [];
    for (
      let i = 1;
      i <= Math.ceil((Warehouse? Warehouse.length:1) / LocationsPerPage4);
      i++
    ) {
      pageNumbers4.push(i);
    }

    const renderPageNumbers4 = pageNumbers4.map(number => {
      console.log(number)
      return (
        <li key={number} id={number} onClick={this.handleClickPagi4}>
          {number}
        </li>
      );
    });
     
        
        
       
        
        return (<div>

<NavbarAdmin class="zmdi zmdi-account-circle" name="Manage Property"/>




<div className="select-cate">
<h2>Select Category</h2>
<div className="looking">
<ul>
    <li><a onClick={this.cat1} className={this.state.cate1?"active":""}>Looking for a house to let, buy or fullyFurnished?</a></li>
<li><a onClick={this.cat2} className={this.state.cate2?"active":""}>Looking for Land or a plot?</a></li>
<li><a onClick={this.cat3} className={this.state.cate3?"active":""}>Looking for hotel?</a></li>
<li><a onClick={this.cat4} className={this.state.cate4?"active":""}>Looking for a commercial space, office or go-down?</a></li>


</ul>


</div>
</div>


<div>
          {this.state.cate1?

          <div>


<div className="table-box">
<div className="datepiker-box">
<div className="filterbox">
    <span>Filter</span>
    
<div className="datebox">
<span><b>From</b></span>
<input type="date" placeholder="from" name="fromDate" value={this.state.fromDate} onChange={this.dateChange("House")} />
<span><b>To</b></span>
  <input type="date" placeholder="To" name="toDate" value={this.state.toDate} onChange={this.dateChange("House")} />


</div>
</div>

<div className="searchbox-right">
<input type="text" placeholder="Enter name" value={this.state.HouseSearch} onChange={this.searchByName("House")}/>
<i className="zmdi zmdi-search"></i>

</div>

</div>

<div className="create-new">
<Link to="/add-property" className="create-btn"><i className="zmdi zmdi-plus-circle-o"></i> CREATE NEW</Link>

</div>

<div className="table-responsive">
<table className="table table-hover">
  <thead className="thead-light">
    <tr>
      <th><input type="checkbox" checked={this.state.allCheck1} onChange={this.checkedAll1}/></th>
      <th>PROPERTY NAME</th>
     
      <th>PRICE</th>
      <th>PROPERTY FOR</th>
      <th>PROPERTY TYPE </th>
      <th>SELLER NAME</th>
      <th>SELLER EMAIL  </th>
      <th>SELLER MOBILE</th>
      <th>FLIPBOOK STATUS</th>
      <th>STATUS</th>
      <th align="center">ACTION</th>
    </tr>
  </thead>
  {this.state.loader ? <Spinner/>:
  <tbody>

    {Houses.length>0?Houses:<div>No Result Found</div>}
    
    

    
    
  </tbody>}
</table>

</div>

<div className="member-delectbox">
<a  className="delect_btn" onClick={this.deleteManyProperty("House")}>Delete</a>

</div>


</div>

<div className="pageination-box">
<ul>
<li className="pre-btn" onClick={this.pagiPrev1}>PREVIOUS</li>
{renderPageNumbers1}
<li className="next-btn next-slide" onClick={this.pagiNext1}>NEXT</li>
<li className="dropdown peritem">
<select  onChange={this.changeItemsPerPage}>
    <option value={5}>5 Items / Page</option>
    <option value={10}>10 Items / Page</option>
    <option value={15}>15 Items / Page</option>
  </select>


</li>

</ul>

</div>
</div>



:""}
</div>



{this.state.cate2?

<div>
<div className="table-box">
<div className="datepiker-box">
<div className="filterbox">
    <span>Filter</span>
<div className="datebox">
<input type="date" placeholder="from" name="fromDate" value={this.state.fromDate} onChange={this.dateChange("Land")} />
  <input type="date" placeholder="To" name="toDate" value={this.state.toDate} onChange={this.dateChange("Land")} />


</div>
</div>

<div className="searchbox-right">
<input type="text" placeholder="Enter name" value={this.state.LandSearch} onChange={this.searchByName("Land")}  />
<i className="zmdi zmdi-search"></i>

</div>

</div>

<div className="create-new">
<Link to="/add-property" className="create-btn"><i className="zmdi zmdi-plus-circle-o"></i> CREATE NEW</Link>

</div>

<div className="table-responsive">
<table className="table table-hover">
  <thead className="thead-light">

   
  <tr>
      <th><input type="checkbox" checked={this.state.allCheck2} onChange={this.checkedAll2} /></th>
      <th>PROPERTY NAME</th>
      <th>PRICE</th>
      <th>PROPERTY FOR</th>
      <th>PROPERTY TYPE </th>
      <th>SELLER NAME</th>
      <th>SELLER EMAIL  </th>
      <th>SELLER MOBILE</th>
      <th>FLIPBOOK STATUS</th>
      <th>STATUS</th>
      <th align="center">ACTION</th>
    </tr>
  </thead>
  {this.state.loader2 ? <Spinner/>:
  <tbody>

  {Lands.length>0?Lands:<div>No Result Found</div>}
    
    

    
    
  </tbody>
    }
</table>

</div>

<div className="member-delectbox">
<a  className="delect_btn" onClick={this.deleteManyProperty("Land")}>Delete</a>

</div>

</div>

<div className="pageination-box">
<ul>
<li className="pre-btn" onClick={this.pagiPrev2}>PREVIOUS</li>
{renderPageNumbers2}
<li className="next-btn next-slide"  onClick={this.pagiNext2}>NEXT</li>
<li className="dropdown peritem">
<select  onChange={this.changeItemsPerPage2}>
    <option value={5}>5 Items / Page</option>
    <option value={10}>10 Items / Page</option>
    <option value={15}>15 Items / Page</option>
  </select>


</li>

</ul>

</div>
</div>
:""}

{this.state.cate3?

<div>
<div className="table-box">
<div className="datepiker-box">
<div className="filterbox">
    <span>Filter</span>
<div className="datebox">
<input type="date" placeholder="from" name="fromDate" value={this.state.fromDate} onChange={this.dateChange("Hotel")} />
  <input type="date" placeholder="To" name="toDate" value={this.state.toDate} onChange={this.dateChange("Hotel")} />


</div>
</div>

<div className="searchbox-right">
<input type="text" placeholder="Enter name" value={this.state.HotelSearch} onChange={this.searchByName("Hotel")}/>
<i className="zmdi zmdi-search"></i>

</div>

</div>

<div className="create-new">
<Link to="/add-property" className="create-btn"><i className="zmdi zmdi-plus-circle-o"></i> CREATE NEW</Link>

</div>

<div className="table-responsive">
<table className="table table-hover">
  <thead className="thead-light">
  <tr>
      <th><input type="checkbox" checked={this.state.allCheck3} onChange={this.checkedAll3} /></th>
      <th>PROPERTY NAME</th>
     <th>PRICE</th>
      <th>PROPERTY FOR</th>
      <th>PROPERTY TYPE </th>
      <th>SELLER NAME</th>
      <th>SELLER EMAIL  </th>
      <th>SELLER MOBILE</th>
      <th>FLIPBOOK STATUS</th>
      <th>STATUS</th>
      <th align="center">ACTION</th>
    </tr>
  </thead>
  {this.state.loader3 ? <Spinner/>:
  <tbody>

    {Hotels.length>0? Hotels:<div>No Result Found</div>}
    
    
  </tbody>
    }
</table>

</div>

<div className="member-delectbox">
<a  className="delect_btn"  onClick={this.deleteManyProperty("Hotel")}>Delete</a>

</div>

</div>


<div className="pageination-box">
<ul>
<li className="pre-btn" onClick={this.pagiPrev3}>PREVIOUS</li>
{renderPageNumbers3}
<li className="next-btn next-slide" onClick={this.pagiNext3}>NEXT</li>
<li className="dropdown peritem">
<select  onChange={this.changeItemsPerPage3}>
    <option value={5}>5 Items / Page</option>
    <option value={10}>10 Items / Page</option>
    <option value={15}>15 Items / Page</option>
  </select>


</li>

</ul>

</div>
</div>
:""}

{this.state.cate4?
<div>

<div className="table-box">
<div className="datepiker-box">
<div className="filterbox">
    <span>Filter</span>
<div className="datebox">
<input type="date" placeholder="from" name="fromDate" value={this.state.fromDate} onChange={this.dateChange("Warehouse")} />
  <input type="date" placeholder="To" name="toDate" value={this.state.toDate} onChange={this.dateChange("Warehouse")} />


</div>
</div>

<div className="searchbox-right">
<input type="text" placeholder="Enter name" value={this.state.WarehouseSearch} onChange={this.searchByName("Warehouse")}/>
<i className="zmdi zmdi-search"></i>

</div>

</div>

<div className="create-new">
<Link to="/add-property" className="create-btn"><i className="zmdi zmdi-plus-circle-o"></i> CREATE NEW</Link>

</div>

<div className="table-responsive">
<table className="table table-hover">
  <thead className="thead-light">
  <tr>
      <th><input type="checkbox" checked={this.state.allCheck4} onChange={this.checkedAll4} /></th>
      <th>PROPERTY NAME</th> 
      <th>PRICE</th>
      <th>PROPERTY FOR</th>
      <th>PROPERTY TYPE </th>
      <th>SELLER NAME</th>
      <th>SELLER EMAIL  </th>
      <th>SELLER MOBILE</th>
      <th>FLIPBOOK STATUS</th>
      <th>STATUS</th>
      <th align="center">ACTION</th>
    </tr>
  </thead>
  {this.state.loader ? <Spinner/>:
  <tbody>

    {Warehouses.length>0?Warehouses:<div>No Result Found</div>}
    
    
    
  </tbody>
    }
</table>

</div>

<div className="member-delectbox">
<a  className="delect_btn" onClick={this.deleteManyProperty("Warehouse")}>Delete</a>

</div>

</div>

<div className="pageination-box">
<ul>
<li className="pre-btn" onClick={this.pagiPrev4}>PREVIOUS</li>
{renderPageNumbers4}
<li className="next-btn next-slide" onClick={this.pagiNext4}>NEXT</li>
<li className="dropdown peritem">
<select  onChange={this.changeItemsPerPage4}>
    <option value={5}>5 Items / Page</option>
    <option value={10}>10 Items / Page</option>
    <option value={15}>15 Items / Page</option>
  </select>


</li>

</ul>

</div>
</div>
:""}



        </div>)
    }
}

export default (ManageProperty);