import React from 'react'
import Navbar from '../Components/Navbar';
import Poster from '../Components/Poster';
import '../Styles/Description.css';
import Circular from '../Components/Circular';

const Description = () => {
  return (
    <div className='desc'>
      <Navbar/>
      <div className='leftside'>
         <Poster/>
      </div>
      <div className='rightside'>
        <div className='Title'>
            <h1>Inception</h1>
        </div>
        <div className='duration'>
            <p>2h 4m</p>
        </div>
        <div className='category'>
            <p>Sci-fi/Thriller</p>
        </div>
        <div className='director'>
            <p>Directed by : Cristopher Nolan</p>
        </div>
        <div className='movie-description'>
            <p>A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.</p>
        </div>
        <button className='trailer-button' >Watch Trailer</button>
        <button className='book-ticket-button'>Book Tickets</button>

      </div>
      <div className='cast'>
        <h1 className='casttitle'>Cast</h1>
        <div className='castimg'>
            <Circular/>
        </div>
      </div>
    </div>
    
  )
}





export default Description
