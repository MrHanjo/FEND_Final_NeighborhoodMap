import React, { Component } from 'react';
import './App.css';
import axios from 'axios' 

//Component Pages
import PlaceDetails from './PlaceDetails';
import Filters from './Filters';

//----------------------------------------------------------------------------------------------------------------

class App extends Component {

  state = {
    venues: [],       //the initial data pull
    screen: '',       //the FILTER value. Used the simile 'screen' to distinguish the variable in the script
    someArray: [],    //'someArray' is the mutating array of restaurant objects based off the State, 'venues'
    INFOWINDOW: '',   //some states in ALLCAPS to help distinguish them from properties with the same name
    MAP: ''
  }

  componentDidMount() {
    this.getVenues('restaurants');
    // this.updateScreen('All');
  }
  
  //CRITERIA is the value of the filter drop down. eg. ALL, TACOS, PIZZA, etc.
  updateScreen = (criteria) => {
    if (criteria === 'All') {
      this.setState({someArray: this.state.venues}, this.renderMap())
    }
    else {
      const venuesScreened = this.state.venues.filter(
        oneVenue => oneVenue.venue.categories[0].name === criteria
      );
      this.setState({ screen: criteria });
      this.setState({ someArray: venuesScreened},this.renderMap());
    }
  }

  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=YOUR-API-KEY=HERE&callback=initMap')  //Your API key goes here
    window.initMap = this.initMap;    
  }


//--------------------------------------------------------------------------------------------------------------------
  // FOURSQUARE data request
  getVenues = (fourSquareQuery)=> {//fourSquareQuery is just the onetime data-query-pull. in this case 'restaurants'
  
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    const parameters = {
      client_id: 'P1PMZXAJ5EWZQTL0C305J5J4ZPWYIOMIGC2BISGHUEZOWDJP',
      client_secret: 'U4FECBDARC2ZPRSVXE3HLA22WYTXAJEVJQXEZ4YEGPQOYA5I',
      query: fourSquareQuery,
      near: "Dallas, TX",
      v: '20180323', //version of API
      limit: 50
    }


    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {      
        this.setState({ venues: response.data.response.groups[0].items,
                        someArray: response.data.response.groups[0].items  
                        //the above guarantees there's something in the array on the first load of the page.
        }, this.renderMap())          
          //it's a messy lifecycle thought, but basically the MOUNT is messed up so even though the rendeMap is called after 
          //the Component has mounted via (componentDidMount), it's using a messed up Mount.  
          //The easiest thing to do is call the function after the state has been set.                              
      })
      .catch(error => {
        console.log("ERROR: " + error)
      })
  }


//---------------------------------------------------------------------------------------------  
  initMap= () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 32.855038, lng: -96.796988}, //  University Park in Dallas, TX
      zoom: 11  // the larger the Zoom number the closer you get
    });

    const infowindow = new window.google.maps.InfoWindow({   });

    let someArray =[];
    
    //used .forEach instead of the .map, because a return value is expected when using .map
    this.state.someArray.forEach(oneVenue => {

      const marker = new window.google.maps.Marker({
        position: {lat: oneVenue.venue.location.lat, lng: oneVenue.venue.location.lng},
        map: map,
        title: oneVenue.venue.name,
        animation: window.google.maps.Animation.DROP
      })
    
      const contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h3>' + oneVenue.venue.name + '</h3>' +
        '<div id="bodyContent">'+
          oneVenue.venue.location.formattedAddress[0] + '<br>' +
          oneVenue.venue.location.formattedAddress[1] + '<br>' +
          oneVenue.venue.categories[0].name +
        '</div>'+
        '</div>';      

      marker.addListener('click', function() {
        infowindow.setContent(contentString);
        infowindow.open(map, this);
        this.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {this.setAnimation(null)},3500);       
      }
      
      );        
      oneVenue.venue.contentString = contentString;
      oneVenue.venue.marker = marker;
      someArray.push(oneVenue);

    }) 

    this.setState ({   //created these so that the List of Restaurants (PlaceDetails) can use the parameters to create infowindows
      MAP: map,
      INFOWINDOW: infowindow,   // infowindow is set in a state and passed because I only want one infowindow at a time,                        
      someArray: someArray      //    whether it be via a click of a MARKER on the map or via a List Item.
    });
    
  }

//----------------------------------------------------------------------------------------------------------------------------
  //FILTERS below is a component that has a drop down to filter 'venues' and fill 'someArray'
  //PLACEDETAILS is basically a sidebar of the restaurants in a list that you can click on to activate an infowindow
  render() {  
    return (    

      <main id='main-container'>

        
          <Filters  
            screen= {this.state.screen}
            updateScreen= {this.updateScreen}
            venues= {this.state.venues}
          />


          <PlaceDetails
            infowindow= {this.state.INFOWINDOW}
            map= {this.state.MAP} 
            contentString= {this.contentString}
            
            places= {this.state.someArray}
            screen= {this.state.screen}
          />
          
          <div id='map-override' tabIndex='-1'> 
            <div id='map' role='application' aria-label='location map'></div>
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

export default App;