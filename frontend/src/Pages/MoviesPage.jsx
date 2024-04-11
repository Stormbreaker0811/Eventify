import React from 'react';
import Navbar from '../Components/Navbar'
import '../Styles/MoviesPage.css';

const MoviesPage = () => {
  return (
    <div className="movies-page">
      <Navbar />
      <div className="content">
        <div className = "Header">
          <h1>Movies</h1>
        </div>
      </div>
    </div>
  );
}

export default MoviesPage;
