// import React from 'react';
// import Navbar from '../Components/Navbar';
// import '../Styles/Homepage.css';
// import ed from '../Assets/ed.jpg';
// import zakir from '../Assets/zakir.jpeg';
// import comedy from '../Assets/comedy.jpg';
// import samay from '../Assets/samay.jpeg';
// import Footer from '../Components/Footer';
// import SeeMore from '../Components/SeeMore';


// const Homepage = () => {
//   return (
//     <div>
//       <Navbar />
//       <div className="popular ">
//         <h2>Popular Right Now</h2>
//         {/* Add your popular content here */}
//         <div className="popular-content">
//           <div className="popcard1">
//             <img src = {samay} className='pop1'/>
//           </div>
//           <div className="popcard2">
//             <img src={ed} className='pop2'/>
//           </div>
//           <div className="popcard3">
//             <img src={zakir} className='pop3'/>
//           </div>
//           <div className="popcard4">
//             <img src={comedy} className='pop4'/>
//           </div>
          
//         </div>
//       </div>
//       <div className="categories">
//         <h2>Categories</h2>
//         <div className="categories-content">
          
//           <div className="cat2">Music</div>
//           <div className="cat3">Standup</div>
//           <div className="cat4">Theatre</div>
//         </div>
        
//       </div>
      
//       <div className="standup ">
//         <h2>Standup Comedy</h2>
//         <SeeMore/>
//        <div className="standup-content">
//           <div className="st1">Movie 1</div>
//           <div className="st2">Movie 2</div>
//           <div className="st3">Movie 3</div>
//           <div className="st4">Movie 4</div>
//           <div className="st5">Movie 5</div>
//         </div>
//       </div>
//       <div className="music">
//         <h2>Music events</h2>
//         <SeeMore/>
//         <div className="music-content">
//           <div className="music1">Movie 1</div>
//           <div className="music2">Movie 2</div>
//           <div className="music3">Movie 3</div>
//           <div className="music4">Movie 4</div>
//           <div className="music5">Movie 5</div>
//         </div>
//       </div>
//       <div className="theatre ">
//         <h2>Theatre</h2>
//         <SeeMore/>
//         <div className="theatre-content">
//           <div className="th1">Movie 1</div>
//           <div className="th2">Movie 2</div>
//           <div className="th3">Movie 3</div>
//           <div className="th4">Movie 4</div>
//           <div className="th5">Movie 5</div>
//         </div>
//       </div>
//       <Footer/>
//     </div>
//   );
// };

// export default Homepage;


import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import '../Styles/Homepage.css';
import Footer from '../Components/Footer';
import SeeMore from '../Components/SeeMore';
import samay from '../Assets/samay.jpeg';
import ed from '../Assets/ed.jpg';
import zakir from '../Assets/zakir.jpeg';
import comedy from '../Assets/comedy.jpg';
import { Link, Navigate } from 'react-router-dom';
import musicgraphic from '../Assets/musicgraphic.jpeg';
import standupgraphic from '../Assets/standupgraphic.jpeg';
import theatregraphic from '../Assets/theatregraphic.jpeg';
import Carousel from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import Description from './Description';
import PlaneLoading from '../Components/PlaneLoading';



const Homepage = () => {
  axios.defaults.baseURL = "http://localhost:4000";
  const [loading,setLoading] = useState(true);
  // const popularContent = [
  //   { id: 1, image: samay },
  //   { id: 2, image: ed },
  //   { id: 3, image: zakir },
  //   { id: 4, image: comedy },
  // ];

  const [popular,setPopular] = useState([]);

  const [standup, setStandup] = useState([]);

  const [music, setMusic] = useState([]);

  const [theatre, setTheatre] = useState([]);

  const [descInfo, setDescInfo] = useState({
    category: '',
    id: '',
    show_name: '',
    show_price: '',
    show_poster: '',
    show_language: '',
    show_venue: '',
    show_city: '',
    show_desc: ''
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    },5000);

    return () => clearTimeout(timer);
  },[]);

  useEffect(() => {
    axios.get('/standup-homepage').then((res) => {
      setStandup(res.data);
      console.log(standup);
    }).catch((err) => {
      console.error(err);
    })
  },[])

  useEffect(() => {
    axios.get('/music-homepage').then((res) => {
      setMusic(res.data);
      console.log(music);
    }).catch((err) => {
      console.error(err);
    })
    .finally(() => setLoading(false))
},[])

  useEffect(() => {
    axios.get('/theatre-homepage').then((res) => {
      setTheatre(res.data);
      console.log(theatre);
    }).catch((err) => {
      console.error(err);
    })
    .finally(() => setLoading(false))
  },[])

  useEffect(() => {
    axios.get('/get-popular').then((res) => {
      setPopular(res.data);
    }).catch((err) => {
      console.error();
    })
    .finally(() => setLoading(false))
  },[])


  const handleShowStandup = (category, show) => {
    const newDescInfo = {
      category: category,
      id: show.id,
      show_name: show.name,
      show_price: show.price,
      show_language: show.language,
      show_venue: show.venue,
      show_city: show.city,
      show_desc: show.desc,
      show_poster: show.poster,
      show_gold_price: show.gold_price,
      show_platinum_price: show.platinum_price
      // ... other show details
    };
  
    // Check if relevant info differs before sending request
    if (
      newDescInfo !== descInfo
    ) {
      setDescInfo(newDescInfo);
      axios.post('/post-requested-show', newDescInfo)
        .then((res) => {
          console.log("descInfo sent..//");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };


  const musicEventsContent = ['Movie 1', 'Movie 2', 'Movie 3', 'Movie 4'];

  const theatreContent = ['Movie 1', 'Movie 2', 'Movie 3', 'Movie 4'];

  if(loading){
    return (
      <PlaneLoading />
    )
  }

  return (
    <div className='homepage'>
      <Navbar />
      <div className="popular">
        <h2>Popular Right Now</h2>
        <div className="popular-content">
          {popular.map((item) => (
            <Link to='/desc'><div key={item.id} className={`popcard${item.id}`} >
              <img src={item.poster} alt={`Popular ${item.id}`} className='pop'/>
            </div></Link>
          ))}
        </div>
      </div>
      <div className="categories">
        <h2>Categories</h2>
        <div className="categories-content">
          <Link to='/music' className="cat1">
            <img src ={musicgraphic} className='graphic'/>
          </Link>
          <Link to='/standup' className="cat2">
            <img src = {standupgraphic} className='graphic'/>
          </Link>
          <Link to='/theatre' className="cat3">
            <img src = {theatregraphic} className='graphic'/>
          </Link>
        </div>
      </div>
      <div className="standup">
        <h2>Standup Comedy</h2>
        <Link to='/standup' className='seemore'><SeeMore /></Link>
        <div className="standup-content">
          {standup.map((show) => (
            <div key={show.id} className='st'>
              <Link to='/desc'><div className="show" key={show.id} onClick={() => handleShowStandup("standup",show)}>
                        <div className="poster">
                            <img src={show.poster} className='img-poster' alt="show poster" />
                        </div>
                        <div className="show-name">
                            <p>{show.name}</p>
                        </div>
                        <div className="show-venue">
                            <p>{show.venue}</p>
                        </div>
                        <div className="date">
                            <p>{show.date}</p>
                        </div>
                        <div className="price">
                            <p>{show.price}</p>
                        </div>
                    </div></Link>
              
            </div>
          ))}
        </div>
      </div>
      <div className="music">
        <h2>Music events</h2>
        <Link to='/music' className='seemore'><SeeMore /></Link>
        <div className="music-content">
        {music.map((show) => (
            <div key={show.id} className='st'>
              <Link to='/desc'><div className="show" key={show.id} onClick={() => handleShowStandup("music",show)}>
                        <div className="poster">
                            <img src={show.poster} className='img-poster' alt="show poster" />
                        </div>
                        <div className="show-name">
                            <p>{show.name}</p>
                        </div>
                        <div className="show-venue">
                            <p>{show.venue}</p>
                        </div>
                        <div className="date">
                            <p>{show.date}</p>
                        </div>
                        <div className="price">
                            <p>{show.price}</p>
                        </div>
                    </div></Link>
              
            </div>
          ))}
        </div>
      </div>
      <div className="theatre">
        <h2>Theatre</h2>
        <Link to='/theatre' className='seemore'><SeeMore /></Link>
        <div className="theatre-content">
        {theatre.map((show) => (
            <div key={show.id} className='st'>
              <Link to='/desc'><div className="show" key={show.id} onClick={() => handleShowStandup("theatre",show)}>
                        <div className="poster">
                            <img src={show.poster} className='img-poster' alt="show poster" />
                        </div>
                        <div className="show-name">
                            <p>{show.name}</p>
                        </div>
                        <div className="show-venue">
                            <p>{show.venue}</p>
                        </div>
                        <div className="date">
                            <p>{show.date}</p>
                        </div>
                        <div className="price">
                            <p>{show.price}</p>
                        </div>
                    </div></Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
