import React, {Component} from "react";
import Axios from "axios";
import Spinner from "../common/Spinner";




class MySavedFlipbooks extends Component {

    state = {
      AllSavedFlip:[],
      loader:true
        
    }
    
    componentDidMount(){

       
    
        var config = {
          method: 'get',
          url: 'https://cuboidtechnologies.com/api/admin/flipbook/get-saved-flipbook/'+localStorage.getItem("userId"),
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
              AllSavedFlip:response.data.saveflipbook,
              loader:false
          })
          
          
    
          
         
          
        })
        .catch(function (error) {
          console.log(error);
        });
    
    
    
    
    
      }

      removeFlipbook=id=>e=>{
       
        console.log("remve")
        console.log(id);
        var a=this.state.AllSavedFlip[0];
        console.log(a)

        if(window.confirm("you are going to delete flipbook??"))
        {
        //   console.log(a);
        // a=  a.filter(f=>{ console.log(f)}).map(save=>save);
        // console.log(a);
        //   this.setState({AllSavedFlip:a})

  
        const data={
          
         
      "idToDelete":id[0]
       
           
       }
      
       var config = {
           method: 'patch',
           url: 'https://cuboidtechnologies.com/api/admin/flipbook/delete-flipbook/'+localStorage.getItem("userId"),
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
           var config2 = {
            method: 'get',
            url: 'https://cuboidtechnologies.com/api/admin/flipbook/get-saved-flipbook/'+localStorage.getItem("userId"),
            headers: {
             Accept: 'application/json',
             Authorization: "Bearer " + localStorage.getItem("token"),
            'content-type': 'application/json',
            
            
           
        },
            
            
            
          };
          
          Axios(config2)
          .then((response)=> {
            console.log(response.data);
  
            this.setState({
                AllSavedFlip:response.data.saveflipbook,
                loader:false
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
      }
      
   

    
    render() {

        console.log(this.state)

        var AllSavedFlipbook;
        if(this.state.AllSavedFlip){
            AllSavedFlipbook= this.state.AllSavedFlip.map(f=>{

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
<button className="btn btn-block btn-black btn-cancel" onClick={this.removeFlipbook(f[0])}>Remove Flip Book</button>
<a href="/flipbook"  target="_blank"><button className="btn btn-block btn-black btn-save">Open Flip Book</button></a>

</div>



</div>

</div>
                )
            })
        }
       
        
        return (<div>

{
this.state.loader ? <Spinner/>:

            AllSavedFlipbook.length>0?AllSavedFlipbook:<div className="no-saved">No saved Flipbook</div>
              }

            






        
        
        </div>
        )
    }
}




export default (MySavedFlipbooks);
