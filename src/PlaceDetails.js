import React, { Component } from 'react'; 

class PlaceDetails extends Component {  
 
    render() {  
      return(      
        <div className='place-details-container' role='listbox'>
          {this.props.places.map((place) => {
            return(
              <button
                key= {place.venue.id}
                onClick={()=>   {                 
                  this.props.infowindow.setContent(place.venue.contentString);
                  this.props.infowindow.open(this.props.map, place.venue.marker);
                  place.venue.marker.setAnimation(window.google.maps.Animation.BOUNCE);
                  setTimeout(() => {place.venue.marker.setAnimation(null)},3500);                                       
                }}
              >
                <h2>{place.venue.name}</h2>
                <p> {place.venue.location.formattedAddress[0]},</p> 
                <p> {place.venue.location.formattedAddress[1]},</p> 
                <p> {place.venue.categories[0].name}</p>
              </button>                
            )
          })}   
        </div>      
    )}          
}

export default PlaceDetails;