import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../Styles/Aboutus.css';
import Aboutusimg from '../Assets/Aboutusimg.jpeg';

const Aboutus = () => {
  return (
    <div>
      <Navbar/>
        <div className="about">
            <img src={Aboutusimg} className='aboutimg'/>
            <div className="abouttext">
                <p>Welcome to eventify where out commitment to excellence is cornerstone of everything we do. Founded with a vision to redefine the standards of global logistics, our journey has been a testement of unwavering dedication, 
                    innovation and customer-centracity. </p>
                <p>Eventify emerged from a collective passion for reliable ticket booking platform. With a team of experienced proffessionals, we have evolved ourselves into a major organisation, consistently pushing boundaries of what's possible in the world of event management. </p>
            </div>
            <div className="cards">
                <div className="cards-content">
                    {/* <div className="card1">
                        <p>2+ Years </p>
                        <p>of  team experience</p>
                    </div> */}
                    <div className="card2">
                        <p>Accessible in </p>
                        <p>23+ cities</p>
                    </div>
                    <div className="card3">
                        <p>2+ Years </p>
                        <p>of team experience</p>
                    </div>
                </div>
            </div>
        </div>

      <Footer/>
    </div>
  )
}

export default Aboutus
