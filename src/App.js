import React, { Component } from 'react';
//import { Route } from 'react-router-dom';

//Component Pages
import PlaceDetails from './PlaceDetails';
import Filters from './Filters';
//import SideBar from './SideBar';

import './App.css';
import axios from 'axios'

//----------------------------------------------------------------------------------------------

class App extends Component {

  state = {
    venues: [],
    screen: '',
    someArray: [],
    //arrayOfInfoWindowsData: [],  hypothetical
  }

  componentDidMount() {
    //this.renderMap()  //problem description below
    this.getVenues('restaurants');
  }

  // this gets passed into the Filters.js component
  // PROBABLY will discard this in favor of querying from the Venues state
  // updateFilter = (criteria) => {// we can't use this because this is just performing another search.  we need to use ALLTHERESTAURANTS that we got and filter those results, not run another query
  //   let temp = criteria;
  //   if (criteria === 'All') { this.setState({filter: 'restaurants'})}
  //   else{this.setState({ filter: criteria })        
  //   this.getVenues( temp );   
  //   }
  // }

 //this.props.updateFilter(event.target.value)

//CRITERIA is the thing the filter drop down will get ALL, TACOS, PIZZA, etc
  updateScreen = (criteria) => {
    //let temp = criteria;
    if (criteria === 'All') { this.setState({someArray: this.state.venues})} //this part is messed up. fix later.
    else {
      this.setState({ screen: criteria });        
      const venuesScreened = this.state.venues.filter( myVenue => myVenue.venue.categories[0].name == this.state.screen );
      this.setState({ someArray: venuesScreened});
      this.renderMap();
      // this.setState({ someArray: venuesScreened})
      // .then(()=>{this.renderMap()})
    }
  }
 

    // i think to do the click the listitme to get the map marker to bounch and show its infowindow
   // off the list button. click, function () document.getElementById('the id is set to the venue id number')
  
 //if something == all then set someArray to Venues which goes to places here...
  // else...  some filter is applied to Venues and that creates someArray and then array gets passed in here
  // in any case the someArray gets passed in here.... the work will be done on this page


  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDru1pflxGUqPv1S3jBeLcx1yxpXELX6oA&callback=initMap')  //Your API key
    window.initMap = this.initMap
  }
  
  getVenues = (booboo)=> {//FOURSQUARE
   //POSSIBLY TRY USING THE FETCH API INSTEAD OF THIS BELOW.... it's suspected that what is here is better because that way I can use the as entries in forms
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

  /*fetch('https://api.foursquare.com/v2/venues/explore?
  client_id=CLIENT_ID&
  client_secret=CLIENT_SECRET
  &v=20180323&
  limit=1&
  ll=40.7243,-74.0018
  &query=coffee')  */

  axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      //console.log(response)  at about 9:30 it showed the raw response
      this.setState({
        venues: response.data.response.groups[0].items
      }, this.renderMap())  //it's a messy lifecycle thought, but basically the MOUNT is messed up so even though the renderMap is called after 
                            //the Component has mounted via (componentDidMount), it's using a messed up Mount.  
                            //The easiest thing to do is call the function after the state has been set.                              
                            //a key problems is the callback=initMap in the loadScript of the renderMap...
      //console.log(response.data.response.groups[0].items)
    })
    .catch(error => {
      console.log("ERROR: " + error)
    })
  }

  
  initMap= () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 32.855038, lng: -96.796988}, //  coordinates of University Park 
      zoom: 12  // the larger the Zoom number the closer you get
    });


  //--------------possibly make the below a COMPONENT. 

    const infowindow = new window.google.maps.InfoWindow({
     // content: contentString
    });

    //marker clicker to open an InfoWindow over the marker
  

    this.state.someArray.map(oneVenue => {      //FOURSQUARE and GOOGLE
      const marker = new window.google.maps.Marker({
        position: {lat: oneVenue.venue.location.lat, lng: oneVenue.venue.location.lng},
        map: map,
        title: oneVenue.venue.name,
        //get id too to add as a key id in the element of the marker if tha'ts an element
        animation: window.google.maps.Animation.DROP
      })
    
      const contentString = '<div id="content">'+// FOURSQUARE
        '<div id="siteNotice">'+
        '</div>'+
        '<h3 id="firstHeading" class="firstHeading">' + oneVenue.venue.name + '</h3>' +
        '<div id="bodyContent">'+
          oneVenue.venue.location.formattedAddress[0] + '<br>' +
          oneVenue.venue.location.formattedAddress[1] + '<br>' +
          oneVenue.venue.categories.name +
        '</div>'+
        '</div>';      

      // function infoWinInit (thing) {
      //   infowindow.setContent(contentString);
      //   infowindow.open(map, thing);
      //   thing.setAnimation(window.google.maps.Animation.BOUNCE);
      //   setTimeout(() => {thing.setAnimation(null)},3500);       
      // }

      marker.addListener('click', function() {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {marker.setAnimation(null)},3500);       
      });  

      // marker.addListener('click', infoWinInit(marker) )

    }) 

    //--------------------------------------------------------------------------
   


  }//keep this one.. you need it for the initmap
 



  render() {
  
    return (
     

      <main id='main-container'>
     
        <Filters        
          screen= {this.state.screen}
          updateScreen= {this.updateScreen}
          renderMap= {this.renderMap}
        />

        <PlaceDetails

//probably create function on this page and then pass it's application into here

//if something == all then set someArray to Venues which goes to places here...
// else...  some filter is applied to Venues and that creates someArray and then array gets passed in here
// in any case the someArray gets passed in here.... the work will be done on this page
          infowindow= {this.infowindow}
          map= {this.map}
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