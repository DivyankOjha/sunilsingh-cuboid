import React, { Component } from 'react';

import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/layouts/home';
import UserLogin from './components/user/login'
import UserRegister from './components/user/register'
import ContactUs from './components/layouts/contactUs';
import AboutUs from './components/layouts/about';
import PrivacyPOlicy from './components/layouts/privacyPolicy';
import TermsAndCondition from './components/layouts/termsAndCondition';
import FAQ from './components/layouts/faq';
import UserProfileMain from './components/user/userProfileMain';
import ForgotPassword from './components/user/forgotPassword';
import ResetPassword from './components/user/resetPassword';
import PrivateRoute from './components/common/PrivateRoute';
import AdminLogin from './components/admin/adminLogin';
import adminMain from './components/admin/adminMain';

import HouseSearch from './components/user/search/houseSearch';
import LandPlotSearch from './components/user/search/landPlotSearch';
import SpaceOfficeGodownsearch from './components/user/search/spaceOfficeGodownsearch';
import SearchResult from './components/user/search/FinalSearchResult';
import subscriptionPlanDetails from './components/user/subscriptionPlanDetails';
import flipbook from './components/user/flipbook';
import Axios from 'axios';
import HotelSearch from './components/user/search/hotelSearch';

class App extends Component  {

  constructor() {
    super()
    
this.state={
  isSubscribed:''
}
  }



  componentDidMount(){
    if(localStorage.getItem("token")){

    var config = {
      method: 'get',
      url: 'https://cuboidtechnologies.com/api/users/userprofile',
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
        firstName:response.data.data.user.firstname,
        lastName:response.data.data.user.lastname,
        email:response.data.data.user.email,
        ProfilePic:response.data.data.user.imagepath,
        isSubscribed:response.data.data.user.isSubscribed,
        
       
        

      })
     
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  }

  render(){
  return (
    <div className="App">
      


      <BrowserRouter>
                <Switch>


                <Route path="/" exact component={Home} />
                <Route path="/home" exact component={Home} />
                <Route path="/login" exact component={UserLogin} />
                <Route path="/login/:id" exact component={UserLogin} />
                <Route path="/reset-password/:id" exact component={ResetPassword} />
                <Route path="/register" exact component={UserRegister} />
                <Route path="/forgot-password" exact component={ForgotPassword} />

                <Route path="/subscription-details" exact component={subscriptionPlanDetails} />
                <Route path="/flipbook/:id" exact component={flipbook} />
                


  <Route path="/hotel-search" render={ ()=><HotelSearch subscribe={this.state.isSubscribed}/>}  />
                <Route path="/house-search" render={ ()=><HouseSearch subscribe={this.state.isSubscribed}/>} />
                <Route path="/land-plot-search" render={ ()=><LandPlotSearch subscribe={this.state.isSubscribed}/>} />
                <Route path="/space-office-godown-search" render={ ()=><SpaceOfficeGodownsearch subscribe={this.state.isSubscribed}/>}  />
                <Route path="/search-result"  exact component={SearchResult} />


                <Route path="/admin" exact component={AdminLogin} />

                <PrivateRoute path="/user-profile" exact component={UserProfileMain} />
                <PrivateRoute path="/admin/dashboard" exact component={adminMain} />
                
                <Route path="/about" exact component={AboutUs} />
                <Route path="/contact" exact component={ContactUs} />
                

                <Route path="/privacy-policy" exact component={PrivacyPOlicy} />
                <Route path="/terms-and-condition" exact component={TermsAndCondition} />
                <Route path="/faq" exact component={FAQ} />

                  </Switch>
                  </BrowserRouter>

                  
    </div>
  );
}
}

export default App;
