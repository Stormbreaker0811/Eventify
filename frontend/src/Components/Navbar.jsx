
import React, { useState } from 'react';
import '../Styles/Navbar.css';
import Logo from '../Assets/Logo.png';
import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';
import MenuIcon from '../Assets/menu.png';
import CreateEvent from '../Pages/CreateEvent'; 


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false); // State for Create Event overlay

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCreateEvent = () => {
    setIsCreateEventOpen(!isCreateEventOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="logo-link">
            <img src={Logo} className="logo-img" alt="Logo" />
          </Link>
          <Searchbar />
        </div>
        <div className="navbar-right">
          <Link to="/about" className="nav-link">About us</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-link">Sign-Up</Link>
          <div className="menu-container">
            <img src={MenuIcon} className="menu-icon" alt="Menu" onClick={toggleMenu} />
            {isMenuOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-link">Profile Settings</Link>
                <Link to="/orders" className="dropdown-link">Your Orders</Link>
                <Link to="/add-event" className="dropdown-link" onClick={toggleCreateEvent}>Add an Event</Link>
                <Link to="/theme" className="dropdown-link">Theme</Link>
                <Link to="/logout" className="dropdown-link">Logout</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {isCreateEventOpen && <CreateEvent onClose={toggleCreateEvent} />} {/* Render the CreateEventPage component when isCreateEventOpen is true */}
    </nav>
  );
}

export default Navbar;
