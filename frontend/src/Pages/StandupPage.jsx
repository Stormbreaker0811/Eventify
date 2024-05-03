
import React, { useState, useEffect } from 'react';
import '../Styles/StandupPage.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import samay from '../Assets/samay.jpeg';
import axios from 'axios';

const StandupPage = () => {
    axios.defaults.baseURL = "http://localhost:4000"

    const [selectedCity, setSelectedCity] = useState('Select');
    const [standupShows, setStandupShows] = useState([]);
    const [filteredData,setFilteredData] = useState([]);
    const [renderFilter,setRenderFilter] = useState(true);

    useEffect(() => {
        axios.get("/get-standup")
        .then((res) => {
            console.log(res.data)
            setStandupShows(res.data);
        }).catch((err) => {
            console.error(err);
        })
    }, []);

    useEffect(() => {
        if (selectedCity === 'Select') {
            setFilteredData(standupShows);
        } else {
            const filtered = standupShows.filter(show => show.city === selectedCity);
            setFilteredData(filtered);
        }
    }, [selectedCity, standupShows]);

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
                        <option value="Select"><button>Select</button></option>
                        <option value="Pune">Pune</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Nashik">Nashik</option>
                        <option value="Goa">Goa</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Rajasthan">Rajasthan</option>
                        {/* Add more cities as needed */}
                    </select>
                </div>
            </div>

            <div className="standup-shows">
                {filteredData.map((show) => (
                    <div className="show" key={show.id}>
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
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default StandupPage;

