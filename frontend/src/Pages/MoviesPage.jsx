//<<<<<<< HEAD
//import React from 'react';
import Navbar from '../Components/Navbar'
//=======
import React, { useState } from 'react';
//>>>>>>> 507ff97 (Cards Added)
import '../Styles/MoviesPage.css';
import Cards from '../Components/Cards';
import Footer from '../Components/Footer';


const MoviesPage = () => {
  // State to manage the visibility of each dropdown menu
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // Function to toggle the visibility of each dropdown menu
  const toggleLangDropdown = () => {
    setShowLangDropdown(!showLangDropdown);
  };

  const toggleGenreDropdown = () => {
    setShowGenreDropdown(!showGenreDropdown);
  };

  const toggleLocationDropdown = () => {
    setShowLocationDropdown(!showLocationDropdown);
  };

  return (
    <div className="movies-page">
      <Navbar />
      <div className="content">
        <div className="Header">
          <h1 className="movies-title">Movies</h1>
          {/* Language Dropdown */}
          <div className="dropdown">
            <button className="lang-btn" onClick={toggleLangDropdown}>
              Language
            </button>
            {showLangDropdown && (
              <div className="lang-content">
                <a href="#">Hindi</a>
                <a href="#">Marathi</a>
                <a href="#">English</a>
              </div>
            )}
          </div>
          {/* Genre Dropdown */}
          <div className="dropdown">
            <button className="genre-btn" onClick={toggleGenreDropdown}>
              Genre
            </button>
            {showGenreDropdown && (
              <div className="genre-content">
                <a href="#">Action</a>
                <a href="#">Thriller</a>
                <a href="#">Sci-fi</a>
              </div>
            )}
          </div>
          {/* Location Dropdown */}
          <div className="dropdown">
            <button className="location-btn" onClick={toggleLocationDropdown}>
              Location
            </button>
            {showLocationDropdown && (
              <div className="location-content">
                <a href="#">Pune</a>
                <a href="#">Mumbai</a>
                <a href="#">Nashik</a>
              </div>
            )}
          </div>
          
        </div>
        
      </div>
      <Cards />
      <Footer/>
    </div>
  );
}

export default MoviesPage;
