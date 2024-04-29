import React, { useState, useEffect } from 'react';
import '../Styles/Music.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import samay from '../Assets/samay.jpeg';
import axios from 'axios';

const Music = () => {
    axios.defaults.baseURL = "http://localhost:4000"

    const [selectedCity, setSelectedCity] = useState('');
    const [musicShows, setMusicShows] = useState([]);

    useEffect(() => {
        axios.post("/get-music")
        .then((res) => {
            console.log(res.data)
            setMusicShows(res.data);
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
                <h1>Theatre plays near you !</h1>
                <div className="city-dropdown">
                    <label htmlFor="city">Select a city:</label>
                    <select id="city" value={selectedCity} onChange={handleCityChange}>
                        <option value="">Select</option>
                        <option value="Pune">Pune</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Nashik">Nashik</option>
                        <option value="Goa">Goa</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Rajasthan">Rajasthan</option>
                    </select>
                </div>
            </div>

            <div className="music-shows">
                {musicShows.map((show) => (
                    <div className="show" key={show.id}>
                        <div className="poster">
                            <img src={show.poster} className='img-poster' alt="show poster" />
                        </div>
                        <div className="show-name">
                            <p>{show.music_show_name}</p>
                        </div>
                        <div className="show-venue">
                            <p>{show.music_venue}</p>
                        </div>
                        <div className="date">
                            <p>{show.date}</p>
                        </div>
                        <div className="price">
                            <p>{show.music_price}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default Music;

