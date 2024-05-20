import React, { useState, useEffect } from 'react';
import '../Styles/Theatre.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import samay from '../Assets/samay.jpeg';
import axios from 'axios';

const Theatre = () => {
    axios.defaults.baseURL = "http://localhost:4000"

    const [selectedCity, setSelectedCity] = useState('Select');
    const [theatreShows, setTheatreShows] = useState([]);
    const [filtered,setFiltered] = useState([])

    useEffect(() => {
        axios.post("/get-theatre")
        .then((res) => {
            console.log(res.data)
            setTheatreShows(res.data);
        }).catch((err) => {
            console.error(err);
        })
    }, []);

    useEffect(() => {
        setFiltered(theatreShows);
        if(selectedCity === 'Select'){
            setFiltered(theatreShows);
        }else{
            const filter = theatreShows.filter(show => show.city === selectedCity);
            setFiltered(filter);
        }
    },[selectedCity,theatreShows])

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
                        <option value="Select">Select</option>
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

            <div className="theatre-shows">
                {filtered.map((show) => (
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

export default Theatre;

