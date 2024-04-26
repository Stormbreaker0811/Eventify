import React, { useEffect, useState } from 'react';
import '../Styles/Cards.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cards = () => {
  axios.defaults.baseURL = "http://localhost:5000";

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.post("/get-movies")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.error("Error fetching movies: ", err);
      });
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    bytes.forEach(byte => binary += String.fromCharCode(byte));
    return window.btoa(binary);
  }

  console.log(movies)

  return (
    <div className='card-container'>
      {movies.map((movie) => (
        <div className="card">
          <Link to="/movies-desc" className='desc'>
            <img src={movie.Poster_img} className='img' alt="movie poster" />
            <p className="title">{movie.Movie_title}</p>
            <p className='category'>{movie.Genre}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Cards;
