// import React from 'react';
// import '../Styles/Navbar.css';
// import Logo from '../Assets/Logo.png';
// import { Link } from 'react-router-dom';
// import SearchBar from './searchbar'; 
// import menu from '../Assets/menu.png';

// const Navbar = () => {
//   return (
//     <div className="nav">
//       <img src={Logo} className="logo-img" alt="Logo" />
      
//       <SearchBar />
//       <div className="nav-links">
//         <Link to="/about">About us</Link>
//         <Link to="/login">Login</Link>
//         <Link to="/signup">Sign-Up</Link>
//       </div>
//       <img src = {menu} className='menu-button' alt = "menu"/>

//     </div>
//   );
// }

// export default Navbar;




import React from 'react';
import '../Styles/Navbar.css';
import Logo from '../Assets/Logo.png';
import { Link } from 'react-router-dom';
import searchbar from './Searchbar';
import MenuIcon from '../Assets/menu.png';
import Searchbar from './Searchbar';

const Navbar = () => {
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
          <img src={MenuIcon} className="menu-icon" alt="Menu" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
