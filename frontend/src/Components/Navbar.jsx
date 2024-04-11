import React from 'react';
import '../Styles/Navbar.css';
import Logo from '../Assets/Logo.png';
import { Link } from 'react-router-dom';
import SearchBar from './searchbar'; 
import menu from '../Assets/menu.png';

const Navbar = () => {
  return (
    <div className="nav">
      <img src={Logo} className="logo-img" alt="Logo" />
      
      <SearchBar />
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign-Up</Link>
      </div>
      <img src = {menu} className='menu-button' alt = "menu"/>

    </div>
  );
}

export default Navbar;













/*import React from 'react'
import '../Styles/Navbar.css';
import Logo from '../Assets/Logo.png';
import {Link} from 'react-router-dom';
import searchbar from './searchbar';

const Navbar = () => {
  return (
    <div className = "nav">
      <img src = {Logo} className = "logo-img"/>
      <searchbar/>
      <div className = "nav-links">
        <Link to = "/">Home</Link>
        <Link to = "/login">Login</Link>
        <Link to = "/signup">Sign-Up</Link>
      </div>
    </div>
    
  )
}

export default Navbar
*/

