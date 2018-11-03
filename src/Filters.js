 import React, { Component } from 'react';
// you maybe can write this one up as a function like the lesson was mentioning about
class Filters extends Component {  
   
  render() {
    return(
    
        <div class='sidebar-container'>Filter Your Results Here <br/> 
             
          <select 
          id='filter-selector'
            //value={this.state.filter}
            onChange={(event) =>
                this.props.updateScreen(event.target.value)
                
            } >
              <option value="All">All</option>
              <option value="American Restaurant">American Cuisine</option>
              <option value="Fast Food Restaurant">Fast Food</option>
              <option value="Pizza Place">Pizza</option>
              <option value="Taco Place">Tacos</option>
              <option value="Steakhouse">Steakhouse</option>
              <option value="Seafood Restaurant">Seafood</option>  
                          
          </select>


          {JSON.stringify(this.props.screen)}
        
                        
        </div>
    )}
}
export default Filters;