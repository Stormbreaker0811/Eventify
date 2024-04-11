import React from 'react';
import '../Styles/searchbar.css';
import search_icon from '../Assets/searchicon.png';

const searchbar = () => {
  return (
    <div className = "input-wrapper">
        <img src = {search_icon} className='search-icon'/>
        <input placeholder='search movies'/>
      
    </div>
  )
}

export default searchbar
