import React from 'react'
import inception from '../Assets/inception.jpg';
import '../Styles/Poster.css';

const Poster = () => {
  return (
    <div className='mvpost' alt = "img">
        <img src = {inception} className='post' alt = "img-src"/> 
    </div>
  )
}

export default Poster
