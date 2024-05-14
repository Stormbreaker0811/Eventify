import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import '../Styles/BookTickets.css';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import inception from '../Assets/inception.jpg';
import axios from 'axios';

const BookTickets = () => {
  const [ticketPrice, setTicketPrice] = useState(0);
  const [counter,setCounter] = useState('')

  const [goldPrice,setGoldPrice] = useState('');
  const [platinumPrice,setPlatinumPrice] = useState('');

  const [ticketQuantities, setTicketQuantities] = useState({});
  const [cart, setCart] = useState({ Gold: 0, Premium: 0 });

  const [show,setShow] = useState([]);


  useEffect(() => {
    axios.get('/get-requested-show').then((res) => {
      setShow(res.data);
      console.log("show is set..//");
      console.log(show);
      if(show.gold_price === null || show.gold_price === undefined || show.gold_price === ''){
        const finalPrice = show.price.split(".")
        setGoldPrice(show.price);
        setPlatinumPrice(show.price+200);
      }else{
        setGoldPrice(show.gold_price);
        setPlatinumPrice(show.platinum_price);
      }
    }).catch((err) => {
      console.error(err);
    })
  },[])

  const toggleGoldPlus = () => {
    setTicketPrice(ticketPrice+parseInt(goldPrice));
  }

  const toggleGoldMinus = () => {
    if(ticketPrice === 0){
      setTicketPrice(0)
    }
    setTicketPrice(ticketPrice-parseInt(goldPrice));
  }

  const togglePlatinumPlus = () => {
    setTicketPrice(ticketPrice+parseInt(platinumPrice));

  }

  const togglePlatinumMinus = () => {
    if(ticketPrice === 0){
      setTicketPrice(0)
    }
    setTicketPrice(ticketPrice-parseInt(platinumPrice));
  }

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
      <div className="cart-container">
        <div className='cart'>
          <h3>Cart</h3>
          <p>Total: Rs. {cart.Gold + cart.Premium}</p>
        </div>
        <Link to="/payments" className='payment-button'>Book</Link>
      </div>
        <div key={show.id} className='ticket-info'>
          <div className='event-poster'>
            <img src={show.poster} alt={show.eventName} />
          </div>
          <div className='event-info'>
            <h2 className='bkfor'>Book Tickets for {show.eventName}</h2>
            <h4>{show.name} ({show.price})</h4>
            <h4 className='bkdate'>Date: {show.date}</h4>
            <h4 className='venue'>Venue: {show.venue}</h4>
            <div className='category'>
              <h3>Category</h3>
                <div key={show.id} className="category-item">
                  <div className='counter'>
                    <div className="gold">
                      Gold Ticket
                      <button className='gold_button' onClick={toggleGoldPlus}>-</button>
                      {ticketPrice}
                      <button className='gold_button' onClick={toggleGoldMinus}>+</button>
                    </div>
                    <div className="platinum">
                      Platinum Ticket
                      <button className='platinum_button' onClick={togglePlatinumPlus}>-</button>
                      {ticketPrice}
                      <button className='platinum_button' onClick={togglePlatinumMinus}>+</button>
                    </div>
                    {/* <button onClick={() => updateQuantity(show.id, -1)}>-</button>
                    <p>{ticketQuantities[show.id] || 0}</p>
                    <button onClick={() => updateQuantity(show.id, 1)}>+</button> */}
                  </div>
                </div>
            </div>
          </div>
        </div>
      <Footer />
    </div>
  );
};

export default BookTickets;
