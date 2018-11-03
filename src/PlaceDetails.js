import React, { Component } from 'react'; 

class PlaceDetails extends Component {  
 

    render() {  
      return(      
        <div class="place-details">
            {this.props.places.map((place) => {
              return(
                <button  //key={this.props.place.keyid}
                  

                  /*TO MENTOR:  RIGHT NOW I MISTAKENLY THOUGHT IF I JUST MAKE AN INFOWINDOW POPUP AT THE POSITION OF THE MARKER
                  USING THE PROPERTIES OF THE PULLED VENUE (LINE 34), LAT LNG, THAT IT WOULD SOLVE THIS CHALLENGE.
                  I THEN READ THE RUBRIC AGAIN AND FOUND THAT THE MARKER NEEDS TO ANIMATE.  SO THE EASIEST SOLUTION WITHOUT 
                  HAVING TO NEARLY START FROM SCRATCH IS CREATE AN ARRAY OF MARKERS SOMEHOW (I THINK..) AND HAVE THEM TRIGGERED AS IF 
                  THEY WERE CLICKED WHEN EACH OF THESE LIST ITEM BUTTONS ARE CLICKED. THEY WOULD BE RELATED BY THE ID PROPERTY
                  IN THE VENUE. (I STILL HAVE TO GET THE ID'S, MAKE NOTE) I'M HAVING TROUBLE UNDERSTANDING HOW THAT IS WRITTEN.
                  ?????????????????????????? 
                  ONCLICK={()=> THIS.PROPS.MARKER.ID == THIS.PROPS.ID {FUNCTION---TOGGLE THE PROPER MARKER TO OPEN THE INFOWINDOW}
                  ??????????????????????????
                  */



                  onClick={()=>   {                 //console.log('you clicked a button')
                    this.props.infowindow.setContent(/*this.props.contentString*/
                    '<div>'+   //this.props.markersarray.keyid={this.props.place.keyid}
                      '<h3>'+'HIIIIIIIIIII'+'</h3>'+
                    '</div>'
                    
                    );
                    this.props.infowindow.setPosition({lat: place.venue.location.lat, lng: place.venue.location.lng});
                    //this.props.infowindow.setPosition({lat: 32.79282294227872, lng: -96.82250930922442});
                      //this position is arbitrary.  I just put it here to see if this function even works
                    this.props.infowindow.open(this.props.map);  // I don't have a position here because the documentation
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
                      
            {JSON.stringify('HIHIHI')}            
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