import React, { Component } from 'react';
//import { Route } from 'react-router-dom';

//Component Pages
import PlaceDetails from './PlaceDetails';
import Filters from './Filters';
//import SideBar from './SideBar';

import './App.css';
import axios from 'axios'

//----------------------------------------------------------------------------------------------------------------

class App extends Component {

  state = {
    venues: [],
    screen: '',
    someArray: [],
    //arrayOfInfoWindowsData: [],  hypothetical
    //arrayOfMarkers [],  created, ID'ed, and used upon the click of a list item via the id found in the VENUES-->SOMEARRAY state
    INFOWINDOW: '',
    MAP: ''
  }

  componentDidMount() {
    //this.renderMap()  //problem description below
    this.getVenues('restaurants');      
    //this.updateScreen('All');   
  }

  

  //CRITERIA is the value of the filter drop down. eg. ALL, TACOS, PIZZA, etc
  updateScreen = (criteria) => {
    //let temp = criteria;
    if (criteria === 'All') { 
      this.setState({someArray: this.state.venues}, this.renderMap())    
    }
    else {              
      const venuesScreened = this.state.venues.filter( 
        oneVenue => oneVenue.venue.categories[0].name == criteria 
      );
      this.setState({ screen: criteria });
      this.setState({ someArray: venuesScreened});
      this.renderMap();
      // this.setState({ someArray: venuesScreened})
      // .then(()=>{this.renderMap()})
    }
  }


  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDru1pflxGUqPv1S3jBeLcx1yxpXELX6oA&callback=initMap')  //Your API key
    window.initMap = this.initMap
  }


  //--------------------------------------------------------------------
  getVenues = (booboo)=> {//FOURSQUARE
   
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'  //this is the request from the site  
    const parameters = {
      client_id: 'P1PMZXAJ5EWZQTL0C305J5J4ZPWYIOMIGC2BISGHUEZOWDJP',
      client_secret: 'U4FECBDARC2ZPRSVXE3HLA22WYTXAJEVJQXEZ4YEGPQOYA5I',
      //ll: '40.7243,-74.0018',
      query: booboo,
      near: "Dallas, TX",
      v: '20180323', //version of API
      limit: 50
    } 


    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
      
        this.setState({venues: response.data.response.groups[0].items,
                        someArray: response.data.response.groups[0].items  
                        //the above guarantees there's something in the array on the first load of the page.
                        //"someArray" is the changing source that is used and "venues" is the repository that doesn't change.
        }, this.renderMap())
          
           //it's a messy lifecycle thought, but basically the MOUNT is messed up so even though the renderMap is called after 
                            //the Component has mounted via (componentDidMount), it's using a messed up Mount.  
                            //The easiest thing to do is call the function after the state has been set.                              
      })
      .catch(error => {
        console.log("ERROR: " + error)
      })
    //this.setState({someArray: this.state.venues}, this.renderMap());
  }


//---------------------------------------------------------------------------------------------  
  initMap= () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 32.855038, lng: -96.796988}, //  coordinates of University Park in Dallas, TX
      zoom: 11  // the larger the Zoom number the closer you get
    });

    const infowindow = new window.google.maps.InfoWindow({   });

    //const moreSomeArray    
    this.state.someArray.map(oneVenue => { //it must be "someArray", because the "updateScreen" function above 
                                            // uses this initMap function via the renderMap function to refresh the screen with 
                                            // the new array of someArray.  The state, "venues" is just the initial data that is
                                            // fetched.  This script uses "venues" to make a new someArray via the filter change.

      //---not sure how----but maybe make all or some of the following a component--------------------------------
      const marker = new window.google.maps.Marker({
        position: {lat: oneVenue.venue.location.lat, lng: oneVenue.venue.location.lng},
        map: map,
        title: oneVenue.venue.name,
        //get id also, so I can I guess trigger a particular marker to animate when a list item BUTTON is clicked. 
        animation: window.google.maps.Animation.DROP
        //create array here and PUSH each marker into a MARKERS state, so the MARKER of MARKERS can be toggled/triggered other places.
      })
    
      const contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h3 id="firstHeading" class="firstHeading">' + oneVenue.venue.name + '</h3>' +
        '<div id="bodyContent">'+
          oneVenue.venue.location.formattedAddress[0] + '<br>' +
          oneVenue.venue.location.formattedAddress[1] + '<br>' +
          oneVenue.venue.categories[0].name +
        '</div>'+
        '</div>';      

      //SAFETY---------------------------------------------------------------
      marker.addListener('click', function() {
        infowindow.setContent(contentString);
        infowindow.open(map, this);
        this.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {this.setAnimation(null)},3500);       
      }
      // //SAFETY------------------------------------------------------------
      );        
      


    }) 
    //-----------------------------------------possible component end-----------------------------------------------------
    this.setState ({   //created these so that the List of Restaurants (PlaceDetails) can use the parameters to create infowindows
      MAP: map,
      INFOWINDOW: infowindow  // infowindow is set in a state and passed because I only want one infowindow at a time,
                              //  whether it be clicked via a MARKER on the map or if I click a List Item.
    });
  }


  
//----------------------------------------------------------------------------------------------------------------------------
  //FILTERS below is a component that has a drop down to filter the type of restaurant from the "venues" fetch
  //PLACEDETAILS is basically a sidebar of the restaurants in a list that you can click on.
  render() {  
    return (    

      <main id='main-container'>
     


        
        <Filters        
          screen= {this.state.screen}
          updateScreen= {this.updateScreen}
          //renderMap= {this.renderMap}
          venues= {this.state.venues}
        />




        <PlaceDetails
          infowindow= {this.state.INFOWINDOW}
          map= {this.state.MAP}
          contentString= {this.contentString}
          
          places= {this.state.someArray}
          screen= {this.state.screen}
        />

        <div id='map-override'> 
          <div id="map"></div>
        </div>

      </main>      
      
    )
  }
}



function loadScript(url) {
  const index = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}    
/* <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>  all the parameters were taken care of above */


export default App;