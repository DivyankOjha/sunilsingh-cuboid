import React, {Component} from "react";

import MainNavbar from './mainNavBar';

import Footer from './footer';


class Home extends Component {

    state = {
        
    }

    componentDidMount(){
      window.scrollTo(0, 0)
  }
    

   

    
    render() {
       
        
        return (<div>

            <MainNavbar/>
           <div className="main-user-content">
               <img src={require('../../img/faq.jpg')} alt="" />
           </div>

           <div className="inner-content">
               <div className="container">
                   <div className="faq-title">
                       <h2>FAQ's</h2>
                       <div className="faq-content">
                       <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <div className="panel panel-default">
    <div className="panel-heading active" role="tab" id="headingOne">
      <h4 className="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        How much does it costto list my property?
        </a>
      </h4>
    </div>
    <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
      <div className="panel-body"> Loremipsumdolor sit amet, consetetur sadipscing elitr, sed diamnonumy eirmod temporinvidunt utlabore et doloremagna
aliquyamerat, sed diamvoluptua.At vero eos et accusametjusto duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata</div>
    </div>
  </div>
  <div className="panel panel-default">
    <div className="panel-heading" role="tab" id="headingTwo">
      <h4 className="panel-title">
        <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Lorem ipsum dolor sit amet, consetetur
        </a>
      </h4>
    </div>
    <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
      <div className="panel-body">
      Loremipsumdolor sit amet, consetetur sadipscing elitr, sed diamnonumy eirmod temporinvidunt utlabore et doloremagna
aliquyamerat, sed diamvoluptua.At vero eos et accusametjusto duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata

       </div>
    </div>
  </div>
  <div className="panel panel-default">
    <div className="panel-heading" role="tab" id="headingThree">
      <h4 className="panel-title">
        <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Loremipsumdolor sit amet, consetetur
        </a>
      </h4>
    </div>
    <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
      <div className="panel-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>


  <div className="panel panel-default">
    <div className="panel-heading" role="tab" id="headingFour">
      <h4 className="panel-title">
        <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
        Loremipsumdolor sit amet, consetetur
        </a>
      </h4>
    </div>
    <div id="collapseFour" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
      <div className="panel-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>


</div>
</div>
                   </div>
               </div>
           </div>

<Footer/>



        
        
        </div>
        )
    }
}




export default (Home);
