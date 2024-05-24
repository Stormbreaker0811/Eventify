
import React, { useEffect, useState } from 'react';
import '../Styles/Navbar.css';
import Logo from '../Assets/Logo.png';
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { MdOutlineMenu } from "react-icons/md";
import Searchbar from './Searchbar';
import MenuIcon from '../Assets/menu.png';
import CreateEvent from '../Pages/CreateEvent'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false); // State for Create Event overlay
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [menuIcon,setMenuIcon] = useState(true);

  const toggleMenu = () => {
    setMenuIcon(!menuIcon);
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("Name");
    sessionStorage.removeItem("Email");
    sessionStorage.removeItem("Mobile");
    sessionStorage.removeItem("loginState");
    sessionStorage.removeItem("Amount");
  }

  useEffect(() => {
    if(sessionStorage.getItem("loginState") === "true"){
      setIsLoggedIn(true);
    }
  })

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
          <Link to="/about" className="nav-link" id='about'>About us</Link>
          {isLoggedIn ? (
            <></>
          ) : (
            <>
            <Link to="/login" className="nav-link" id='login'>Login</Link>
            <Link to="/signup" className="nav-link" id='signup'>Sign-Up</Link>
            </>
          )}
          <div className="menu-container">
            {menuIcon ? (<>
              <MdOutlineMenu className='menu-icon' onClick={toggleMenu} /> </>) 
            : (
              <>
              <IoMdClose className='menu-icon' onClick={toggleMenu} />
              </>
            )}
            {isMenuOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-link">Profile Settings</Link>
                <Link to="/orders" className="dropdown-link">Your Orders</Link>
                <Link to="/add-event" className="dropdown-link" onClick={toggleCreateEvent}>Add an Event</Link>
                <Link to="/theme" className="dropdown-link">Theme</Link>
                <Link to="/login" className="dropdown-link" onClick={toggleLogout}>Logout</Link>
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
