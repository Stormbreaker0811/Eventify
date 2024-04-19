import React from 'react'
import '../Styles/Cards.css';
import inception from '../Assets/inception.jpg';
import { Link } from 'react-router-dom';


const cards = () => {
  return (
    <div className='card'>
      <Link to="/movies-desc" className='desc'>
      <img src = {inception} className='img' alt = "profilepic" />
      <p className = "title">Inception</p>
      <p className='category'>Sci-Fi/Thriller</p>
      </Link>
      {/* <img src = {inception} className='img' alt = "profilepic" />
      <p className = "title">Inception</p>
      <p className='category'>Sci-Fi/Thriller</p> */}

    </div>
  )
}

export default cards
