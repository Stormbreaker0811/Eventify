// import React,{useState} from 'react'
// import '../Styles/StandupPage.css';
// import Navbar from '../Components/Navbar';
// import Footer from '../Components/Footer';
// import samay from '../Assets/samay.jpeg';

// const StandupPage = () => {
//     const [selectedCity, setSelectedCity] = useState(''); 

  
//     const handleCityChange = (event) => {
//      setSelectedCity(event.target.value);
//     };


//   return (
//     <div>
//       <Navbar/>

//         <div className="header">
//             <h1>Standup shows near you !</h1>
//             <div className="city-dropdown">
//              <label htmlFor="city">Select a city:</label>
//              <select id="city" value={selectedCity} onChange={handleCityChange}>
//               <option value="">Select</option>
//               <option value="Pune">Pune</option>
//               <option value="Mumbai">Mumbau</option>
//               <option value="Chennai">Chennai</option>
//               <option value="Nashik">Nashik</option>
//               <option value="Goa">Goa</option>
//               <option value="Kerala">Kerala</option>
//               <option value="Delhi">Delhi</option>
//               <option value="Haryana">Haryana</option>
//               <option value="Punjab">Punjab</option>
//               <option value="Gujarat">Gujarat</option>
//               <option value="Rajasthan">Rajasthan</option>
//              </select>
//             </div>
//         </div>

//         <div className="standup-shows">
//             <div className="show">
//                 <div className="poster">
//                     <img src = {samay} className='img-poster'/>
//                 </div>
//                 <div className="show-name">
//                     <p>Samay Raina Special</p>
//                 </div>
//                 <div className="show-venue">
//                     <p>Bantara Bhavan</p>
//                 </div>
//                 <div className="date">
//                     <p>24/04/2024</p>
//                 </div>
//                 <div className="price">
//                     <p>Rs. 799</p>
//                 </div>
//             </div>
//         </div>


//       <Footer/>
//     </div>
//   )
// }

// export default StandupPage


import React, { useState, useEffect } from 'react';
import '../Styles/StandupPage.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import samay from '../Assets/samay.jpeg';
import axios from 'axios';

const StandupPage = () => {
    axios.defaults.baseURL = "http://localhost:4000"

    const [selectedCity, setSelectedCity] = useState('');
    const [standupShows, setStandupShows] = useState([]);

    useEffect(() => {
        axios.post("/get-standup")
        .then((res) => {
            console.log(res.data)
            setStandupShows(res.data);
        }).catch((err) => {
            console.error(err);
        })
    }, []);

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    return (
        <div>
            <Navbar />
            <div className="header">
                <h1>Standup shows near you !</h1>
                <div className="city-dropdown">
                    <label htmlFor="city">Select a city:</label>
                    <select id="city" value={selectedCity} onChange={handleCityChange}>
                        <option value="">Select</option>
                        <option value="Pune">Pune</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Chennai">Chennai</option>
                        {/* Add more cities as needed */}
                    </select>
                </div>
            </div>

            <div className="standup-shows">
                {standupShows.map((show) => (
                    <div className="show" key={show.id}>
                        <div className="poster">
                            <img src={show.poster} className='img-poster' alt="show poster" />
                        </div>
                        <div className="show-name">
                            <p>{show.standup_name}</p>
                        </div>
                        <div className="show-venue">
                            <p>{show.standup_venue}</p>
                        </div>
                        <div className="date">
                            <p>{show.date}</p>
                        </div>
                        <div className="price">
                            <p>{show.standup_price}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default StandupPage;

