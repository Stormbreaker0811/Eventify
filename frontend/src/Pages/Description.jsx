// import React from 'react'
// import Navbar from '../Components/Navbar';
// import Poster from '../Components/Poster';
// import '../Styles/Description.css';
// import Circular from '../Components/Circular';
// import Footer from '../Components/Footer';
// import { Link } from 'react-router-dom';


// const Description = () => {
//   return (
//     <div className='desc'>
//       <Navbar/>
//       <div className='leftside'>
//         <Poster/>
//       </div>
//       <div className='rightside'>
//         <div className='Title'>
//             <h1>Inception</h1>
//         </div>
//         <div className='duration'>
//             <p>2h 4m</p>
//         </div>
//         <div className='language'>
//             <p>English</p>
//         </div>
//         <div className='Venue'>
//             <p>Buntara Bhavan</p>
//         </div>
//         <div className='description'>
//             <p>A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.</p>
//         </div>
//         <button className='trailer-button' >Watch Trailer</button>
//         <Link to='/book-ticket' className='book-ticket-button'>Book Tickets</Link>

//       </div>
      
//       <Footer/>
//     </div>
    
//   )
// }


// export default Description




import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Poster from '../Components/Poster';
import '../Styles/Description.css';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Description = () => {
  // Sample data for shows (replace it with actual data from MongoDB)
  // const [shows, setShows] = useState([
  //   {
  //     id: 1,
  //     title: 'Inception',
  //     duration: '2h 4m',
  //     language: 'English',
  //     venue: 'Buntara Bhavan',
  //     description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
  //   },
  //   // Add more shows as needed
  // ]);

  const [show,setShow] = useState({});

  useEffect(() => {
    axios.get('/get-requested-show').then((res) => {
      setShow(res.data);
      console.log("show is set..//");
      console.log(show)
    }).catch((err) => {
      console.error(err);
    })
  },[])

  // State to store the selected show

  // Function to handle click event on a show
  // const handleShowClick = (show) => {
  //   // Fetch show details from MongoDB based on the show id
  //   // Example code to fetch from MongoDB (replace it with your actual implementation)
  //   // fetchShowDetailsFromMongoDB(show.id).then((data) => {
  //   //   setSelectedShow(data);
  //   // });
  //   setSelectedShow(show); // For demonstration, setting selected show directly
  // };

  return (
    <div className='desc'>
      <Navbar />
      <div className='leftside'>
        <div className="poster">
          {show.poster && <img src={show.poster} alt='poster' className='poster-img'/>}
        </div>
      </div>
      <div className='rightside'>
          <div key={show.id}>
            <div className='Title'>
              <h1>{show.name}</h1>
            </div>
            <div className='price'>
              <p>{show.price}</p>
            </div>
            <div className='city'>
              <p>{show.city}</p>
            </div>
            <div className='Venue'>
              <p>{show.venue}</p>
            </div>
            <div className='description'>
              <p>{show.description}</p>
            </div>
            <button className='trailer-button'>Watch Trailer</button>
            <Link to='/book-ticket'><button className='book-ticket-button'>Book Tickets</button></Link>
          </div>
      </div>
      {/* {selectedShow && (
        <Footer />
      )} */}
    </div>
  );
};

export default Description;
