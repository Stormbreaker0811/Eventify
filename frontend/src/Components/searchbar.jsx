// import React from 'react'
// import '../Styles/searchbar.css';
// import searchicon from '../Assets/searchicon.png';

// const Searchbar = () => {
//   return (
//     <div className='sb'>
//       <div className = "input-wrapper">
       
//         <img src = {searchicon} className='search-icon' alt = ''/>
//         <input placeholder='search movies'/>
      
//       </div>
//     </div>
//   )
// }

// export default Searchbar


import React, { useState } from 'react';
import '../Styles/searchbar.css';
import searchIcon from '../Assets/searchicon.png';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.trim() !== '') {
      const filteredResults = mockFetchMatchingResults(value);
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const mockFetchMatchingResults = (searchTerm) => {
    const movies = [
      'Inception',
      'The Shawshank Redemption',
      'The Dark Knight',
      'Pulp Fiction',
      'Fight Club',
      'Forrest Gump'
    ];
    
    const filteredMovies = movies.filter(movie =>
      movie.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredMovies;
  };

  return (
    <div className='search-bar'>
      <div className='input-wrapper'>
        <img src={searchIcon} className='search-icon' alt='' />
        <input 
          type='text' 
          placeholder='Search movies' 
          value={searchTerm} 
          onChange={handleInputChange} 
        />
      </div>
      {/* Display matching results */}
      {searchTerm.trim() !== '' && (
        <ul className='search-results'>
          {searchResults.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
