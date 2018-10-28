import React, { Component } from 'react'; 

class PlaceDetails extends Component {  
    render() {     
        return(
        <div class="place-details">
            Hi This is place Details or a list of the results in more detail that you would find in the infoWindow
            {this.props.places.map((place) => {
              return(
                <div>
                  <h3>  {place.venue.name}  </h3> 
                  <p>
                  {place.venue.location.formattedAddress[0]}, </p> 
                  <p>{place.venue.location.formattedAddress[1]},</p> 
                  <p>{place.venue.categories[0].name}            </p>
                </div>
              )
            })}            
        </div>      
    )}    
}

export default PlaceDetails;
//I saw that they write the top and bottom like this:  export default class PlaceDetails extends Component {}