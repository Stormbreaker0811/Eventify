import React from 'react'
import '../Styles/SeeMore.css';
import { Link } from 'react-router-dom';

const seemore = () => {
  return (
    <div className='sm'>
      <Link to="/movies">see more</Link>
    </div>
  )
}

export default seemore
