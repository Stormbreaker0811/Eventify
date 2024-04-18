import React from 'react';
import Navbar from '../Components/Navbar';
import '../Styles/Homepage.css';
import ed from '../Assets/ed.jpg';
import zakir from '../Assets/zakir.jpeg';
import comedy from '../Assets/comedy.jpg';
import samay from '../Assets/samay.jpeg';
import Footer from '../Components/Footer';
import SeeMore from '../Components/SeeMore';

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <div className="popular ">
        <h2>Popular right now</h2>
        {/* Add your popular content here */}
        <div className="popular-content">
          <div className="popcard1">
            <img src = {samay} className='pop1'/>
          </div>
          <div className="popcard2">
            <img src={ed} className='pop2'/>
          </div>
          <div className="popcard3">
            <img src={zakir} className='pop3'/>
          </div>
          <div className="popcard4">
            <img src={comedy} className='pop4'/>
          </div>
          {/* <div className="popcard5">
            <img src={ed} className='pop2'/>
          </div> */}
        
        </div>
      </div>
      <div className="categories">
        <h2>Categories</h2>
        <div className="categories-content">
          <div className="cat1">Movies</div>
          <div className="cat2">Music</div>
          <div className="cat3">Standup</div>
          <div className="cat4">Theatre</div>
        </div>
        
      </div>
      <div className="movies ">
        <h2>Movies</h2>
        <SeeMore/>
        <div className="movies-content">
          <div className="card1">Movie 1</div>
          <div className="card2">Movie 2</div>
          <div className="card3">Movie 3</div>
          <div className="card4">Movie 4</div>
          <div className="card5">Movie 5</div>
        </div>
      </div>
      <div className="standup ">
        <h2>Standup Comedy</h2>
        <SeeMore/>
       <div className="standup-content">
          <div className="st1">Movie 1</div>
          <div className="st2">Movie 2</div>
          <div className="st3">Movie 3</div>
          <div className="st4">Movie 4</div>
          <div className="st5">Movie 5</div>
        </div>
      </div>
      <div className="music">
        <h2>Music events</h2>
        <SeeMore/>
        <div className="music-content">
          <div className="music1">Movie 1</div>
          <div className="music2">Movie 2</div>
          <div className="music3">Movie 3</div>
          <div className="music4">Movie 4</div>
          <div className="music5">Movie 5</div>
        </div>
      </div>
      <div className="theatre ">
        <h2>Theatre</h2>
        <SeeMore/>
        <div className="theatre-content">
          <div className="th1">Movie 1</div>
          <div className="th2">Movie 2</div>
          <div className="th3">Movie 3</div>
          <div className="th4">Movie 4</div>
          <div className="th5">Movie 5</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Homepage;
