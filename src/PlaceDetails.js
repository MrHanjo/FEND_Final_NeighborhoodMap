import React, { Component } from 'react'; 

class PlaceDetails extends Component {  

    render() {  
      return(      
        <div class="place-details">
            {this.props.places.map((place) => {
              return(
                <button
                  
                  onclick={()=>{
                    {this.props.infowindow.setContent(this.props.contentString);
                      //this.props.infowindow.position(place.venue.location.lat, place.venue.location.lng)
                      this.props.infowindow.position(32.79282294227872, -96.82250930922442)}
                      //this position is arbitrary.  I just put it here to see if this function even works
                    this.props.infowindow.open(this.props.map);// I don't have a position here because the documentation
                                  //says that if there is no position it defaults to the assigned position.
                    
                   
                  }}      

                >
                  <h3>{place.venue.name}</h3> 
                  <p> {place.venue.location.formattedAddress[0]},</p> 
                  <p> {place.venue.location.formattedAddress[1]},</p> 
                  <p> {place.venue.categories[0].name}</p>
                  <p> {place.venue.location.lat}</p>
                  <p> {place.venue.location.lng}</p>
                </button>
              )
            })}            
        </div>      
    )}          
}

export default PlaceDetails;
//I saw that they write the top and bottom like this:  export default class PlaceDetails extends Component {}




     // <button onclick= {(something)=>
                //   if something=== marker run that one
                // } else {  run the one below.
                //   //infowindow.setContent(contentString);
                //   infowindow.open(map);  //, marker--VARIES marker or blank)  if no marker is provided the infowindow will open at it's POSITION
                //   infowindow.position(place.venue.location.lat, place.venue.location.lng)
                //      VARIES.... might not be used for the 
                //                                           
                //   } 