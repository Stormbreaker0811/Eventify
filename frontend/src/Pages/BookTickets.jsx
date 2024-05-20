import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import '../Styles/BookTickets.css';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LottieLoading from '../Components/LottieLoading';

const BookTickets = () => {
  const [ticketPrice, setTicketPrice] = useState(0);
  const [goldCount, setGoldCount] = useState(0);
  const [platinumCount, setPlatinumCount] = useState(0);

  const [goldPrice, setGoldPrice] = useState(0);
  const [platinumPrice, setPlatinumPrice] = useState(0);

  const [show, setShow] = useState(null);

  useEffect(() => {
    axios.get('/get-requested-show')
      .then((res) => {
        const fetchedShow = res.data;
        setShow(fetchedShow);
        console.log(fetchedShow);
        if (fetchedShow.gold_price !== null && fetchedShow.gold_price !== undefined) {
          setGoldPrice(fetchedShow.gold_price);
          console.log(goldPrice)
        }
        if (fetchedShow.platinum_price !== null && fetchedShow.platinum_price !== undefined) {
          setPlatinumPrice(fetchedShow.platinum_price);
          console.log(platinumPrice)
        }
        if((fetchedShow.gold_price === null || fetchedShow.gold_price === undefined) && (fetchedShow.platinum_price === null || fetchedShow.platinum_price === undefined)){
          let finalGoldPrice = parseFloat(fetchedShow.price.replace('Rs. ','').trim());
          setGoldPrice(finalGoldPrice);
          setPlatinumPrice(finalGoldPrice + 200);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const updateTicketPrice = (goldCount, platinumCount) => {
    const newTicketPrice = (goldCount * goldPrice) + (platinumCount * platinumPrice);
    setTicketPrice(newTicketPrice);
  };

  const toggleBookingProcess = () => {
    if(sessionStorage.getItem('loginState') === null || sessionStorage.getItem('loginState') === undefined || sessionStorage.getItem('loginState') === ''){
      alert('Please login to book Tickets.')
    }
    else{
      sessionStorage.setItem("Amount",ticketPrice);
      window.location.href = "/payment";
    }
  }


  const toggleGoldPlus = () => {
    const newGoldCount = goldCount + 1;
    setGoldCount(newGoldCount);
    updateTicketPrice(newGoldCount, platinumCount);
  };

  const toggleGoldMinus = () => {
    if (goldCount > 0) {
      const newGoldCount = goldCount - 1;
      setGoldCount(newGoldCount);
      updateTicketPrice(newGoldCount, platinumCount);
    }
  };

  const togglePlatinumPlus = () => {
    const newPlatinumCount = platinumCount + 1;
    setPlatinumCount(newPlatinumCount);
    updateTicketPrice(goldCount, newPlatinumCount);
  };

  const togglePlatinumMinus = () => {
    if (platinumCount > 0) {
      const newPlatinumCount = platinumCount - 1;
      setPlatinumCount(newPlatinumCount);
      updateTicketPrice(goldCount, newPlatinumCount);
    }
  };

  if (!show) {
    return <LottieLoading />;
  }

  return (
    <div>
      <Navbar />
      <div className="cart-container">
        <div className='cart'>
          <h3>Cart</h3>
          <p>Total: Rs. {ticketPrice}</p>
        </div>
        <Link to="/payments" className='payment-button' onClick={toggleBookingProcess}>Book</Link>
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
                  <button className='gold_button' onClick={toggleGoldMinus}>-</button>
                  {goldCount}
                  <button className='gold_button' onClick={toggleGoldPlus}>+</button>
                </div>
                <div className="platinum">
                  Platinum Ticket
                  <button className='platinum_button' onClick={togglePlatinumMinus}>-</button>
                  {platinumCount}
                  <button className='platinum_button' onClick={togglePlatinumPlus}>+</button>
                </div>
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
