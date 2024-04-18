// import React,{useState} from 'react'
// import '../Styles/BookTickets.css';
// import Navbar from '../Components/Navbar';
// import Poster from '../Components/Poster';


// const BookTickets = (id) => {
//   return (
//     <div>
//       <Navbar/>
//       <div className='ticket-info'>
//       <Poster className = "bkposter"/>
//         <div className='event-info'>
//           <h2 className='bkfor'>Book Tickets for Inception</h2>
//           <h4 className='bkdate'>Date : Sunday, 21st April 2024</h4>

//           <h4 className='venue'>Venue : PVR Pavillion</h4>
//           <div className='counter'>
//             <button onClick={() => updateQuantity(id, -1)}>-</button>
//             <p>{number}</p>
//             <button onClick={() => updateQuantity(id, 1)}>+</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// const [number, setNumber] = useState(1); 

// 	const updateQuantity = (id, value) => {
// 			uniqueItemsInCart.map((item) => item.id === id) &&
// 			setNumber((prevState) => prevState + value);
// 	};


// export default BookTickets


import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Poster from '../Components/Poster';
import '../Styles/BookTickets.css';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';

const BookTickets = () => {
  const [numberGold, setNumberGold] = useState(1); 

  const updateQuantityGold = (value) => {
    setNumberGold((prevState) => prevState + value);

  };

  const [numberPremium, setNumberPremium] = useState(1); 

  const updateQuantityPremium = (value) => {
    setNumberPremium((prevState) => prevState + value);
  };

  return (
    <div>
      <Navbar/>
      <div className='ticket-info'>
        <Poster className='bkposter' />
        <div className='event-info'>
          <h2 className='bkfor'>Book Tickets for Inception</h2>
          <h4 className='bkdate'>Date : Sunday, 21st April 2024</h4>
          <h4 className='venue'>Venue : PVR Pavillion</h4>
          <div className='category'>
            <h3>Category</h3>
            <div className="category-gold">
              <h4>Gold (Rs. 699)</h4>
              <div className='gold-counter'>
                <button onClick={() => updateQuantityGold(-1)}>-</button>
                <p>{numberGold}</p>
                <button onClick={() => updateQuantityGold(1)}>+</button>
              </div>
            </div>
            <div className="category-premium">
              <h4>Premium (Rs. 999)</h4>
              <div className='premium-counter'>
                <button onClick={() => updateQuantityPremium(-1)}>-</button>
                <p>{numberPremium}</p>
                <button onClick={() => updateQuantityPremium(1)}>+</button>
              </div>
            </div>
            <Link to="/payment" className='payment-button'>Proceed to Payment</Link>
          </div>  
          
        </div>
        
      </div>
      <Footer/>
    </div>
  );
};

export default BookTickets;
