import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import '../Styles/BookTickets.css';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import inception from '../Assets/inception.jpg';
import axios from 'axios';

const BookTickets = () => {
  const [ticketData, setTicketData] = useState([
    {
      id: 1,
      eventName: 'Inception',
      eventDate: 'Sunday, 21st April 2024',
      venue: 'PVR Pavillion',
      categories: [
        { id: 1, name: 'Gold', price: 699 },
        { id: 2, name: 'Premium', price: 999 }
      ],
      poster: inception
    },
    // Add more events as needed
  ]);

  const [ticketQuantities, setTicketQuantities] = useState({});
  const [cart, setCart] = useState({ Gold: 0, Premium: 0 });

  const [show,setShow] = useState([]);


  useEffect(() => {
    axios.get('/get-requested-show').then((res) => {
      setShow(res.data);
      console.log("show is set..//");
      console.log(show)
    }).catch((err) => {
      console.error(err);
    })
  },[])

  // const updateQuantity = (eventId, value) => {
  //   setTicketQuantities(prevState => ({
  //     ...prevState,
  //     [eventId]: {
  //       ...prevState[eventId],
  //       [categoryId]: Math.max((prevState[eventId]?.[categoryId] || 0) + value, 0)
  //     }
  //   }));
  
    // const category = ticketData.find(event => event.id === eventId)?.categories.find(cat => cat.id === categoryId);
    // if (category) {
    //   setCart(prevCart => {
    //     const newCartValue = prevCart[category.name] + (category.price * value);
    //     return {
    //       ...prevCart,
    //       [category.name]: Math.max(newCartValue, 0)
    //     };
    //   });
    // }
  

  return (
    <div>
      <Navbar />
      <div className='cart'>
        <h3>Cart</h3>
        <p>Total: Rs. {cart.Gold + cart.Premium}</p>
      </div>
        <div key={show.id} className='ticket-info'>
          <div className='event-poster'>
            <img src={show.poster} alt={show.eventName} />
          </div>
          <div className='event-info'>
            <h2 className='bkfor'>Book Tickets for {show.eventName}</h2>
            <h4>{show.name} (Rs. {show.price})</h4>
            <h4 className='bkdate'>Date: {show.date}</h4>
            <h4 className='venue'>Venue: {show.venue}</h4>
            <div className='category'>
              <h3>Category</h3>
                <div key={show.id} className="category-item">
                  <div className='counter'>
                    {/* <button onClick={() => updateQuantity(show.id, -1)}>-</button>
                    <p>{ticketQuantities[show.id] || 0}</p>
                    <button onClick={() => updateQuantity(show.id, 1)}>+</button> */}
                  </div>
                </div>
              <Link to="/payment" className='payment-button'>Proceed to Payment</Link>
            </div>
          </div>
        </div>
      <Footer />
    </div>
  );
};

export default BookTickets;
