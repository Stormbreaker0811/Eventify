import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import '../Styles/BookTickets.css';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import inception from '../Assets/inception.jpg';

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

  const updateQuantity = (eventId, categoryId, value) => {
    setTicketQuantities(prevState => ({
      ...prevState,
      [eventId]: {
        ...prevState[eventId],
        [categoryId]: Math.max((prevState[eventId]?.[categoryId] || 0) + value, 0)
      }
    }));
  
    const category = ticketData.find(event => event.id === eventId)?.categories.find(cat => cat.id === categoryId);
    if (category) {
      setCart(prevCart => {
        const newCartValue = prevCart[category.name] + (category.price * value);
        return {
          ...prevCart,
          [category.name]: Math.max(newCartValue, 0)
        };
      });
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className='cart'>
        <h3>Cart</h3>
        <p>Total: Rs. {cart.Gold + cart.Premium}</p>
      </div>
      {ticketData.map(event => (
        <div key={event.id} className='ticket-info'>
          <div className='event-poster'>
            <img src={event.poster} alt={event.eventName} />
          </div>
          <div className='event-info'>
            <h2 className='bkfor'>Book Tickets for {event.eventName}</h2>
            <h4 className='bkdate'>Date: {event.eventDate}</h4>
            <h4 className='venue'>Venue: {event.venue}</h4>
            <div className='category'>
              <h3>Category</h3>
              {event.categories.map(category => (
                <div key={category.id} className="category-item">
                  <h4>{category.name} (Rs. {category.price})</h4>
                  <div className='counter'>
                    <button onClick={() => updateQuantity(event.id, category.id, -1)}>-</button>
                    <p>{ticketQuantities[event.id]?.[category.id] || 0}</p>
                    <button onClick={() => updateQuantity(event.id, category.id, 1)}>+</button>
                  </div>
                </div>
              ))}
              <Link to="/payment" className='payment-button'>Proceed to Payment</Link>
            </div>
          </div>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default BookTickets;
