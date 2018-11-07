import React, { Component } from 'react';

class Filters extends Component {  
   
  render() {
    return(
      
      <div className='filter-container'> 
        <h1 tabIndex='0'>EAT DALLAS!</h1>
        <p>Filter For Your Cuisine</p>

          <select
            className='filter-selector'
            role='search'
            aria-label='filter for your cuisine. use arrow up and down'
            onChange={(event) =>
              this.props.updateScreen(event.target.value)
            }
          >
            <option value='All'>All</option>
            <option value='American Restaurant'>American Cuisine</option>
            <option value='Fast Food Restaurant'>Fast Food</option>
            <option value='Pizza Place'>Pizza</option>
            <option value='Taco Place'>Tacos</option>
            <option value='Steakhouse'>Steakhouse</option>
            <option value='Seafood Restaurant'>Seafood</option>
          </select>
                         
      </div>
    )}
}
export default Filters;