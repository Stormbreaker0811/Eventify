import React from 'react'
import '../Styles/Cards.css';
import inception from '../Assets/inception.jpg';

const cards = () => {
  return (
    <div className='card'>
        <img src = {inception} className='img' alt = "profilepic" />
        <p className = "title">Inception</p>
        <p className='category'>Sci-Fi/Thriller</p>
    </div>
  )
}

export default cards
