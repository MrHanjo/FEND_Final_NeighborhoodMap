import React, { Component } from 'react';  
import Filters from './Filters';
import PlaceDetails from './PlaceDetails';

class SideBar extends Component {  //name of the component variable...


    render() {
        return(
            <div className= 'sidebar-container'>
               
                <div className>
                    Hallo this is the SIDEBAR container thing          
                </div>
                <Filters/>
                <PlaceDetails/>
            </div>
        );
    }
}

export default SideBar;