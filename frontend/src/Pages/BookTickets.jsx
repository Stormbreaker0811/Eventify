import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import '../Styles/BookTickets.css';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import security from '../Assets/Lottie Assets/Security.json';
import LottieLoading from '../Components/LottieLoading';
import { Alert, Backdrop } from '@mui/material';
import Button from '@mui/joy/Button'
import Lottie from 'lottie-react';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'

const BookTickets = () => {
  const [ticketPrice, setTicketPrice] = useState(0);
  const [goldCount, setGoldCount] = useState(0);
  const [platinumCount, setPlatinumCount] = useState(0);
  const [alert,setAlert] = useState(false);
  const [goldPrice, setGoldPrice] = useState(0);
  const [platinumPrice, setPlatinumPrice] = useState(0);

  const handleClose = () => {
    setAlert(false);
    window.location.href = '/login';
  }

  const [show, setShow] = useState([]);

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
    if(sessionStorage.getItem('loginState') === null || sessionStorage.getItem('loginState') === undefined || sessionStorage.getItem('loginState') === '' || sessionStorage.getItem('loginState') === 'false'){
      setAlert(true);
    }
    else if(sessionStorage.getItem("loginState") === "true"){
      sessionStorage.setItem("Amount",ticketPrice);
      sessionStorage.setItem("Event_Name",show.name);
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
        <Button endDecorator={<KeyboardArrowRight />} color="success" onClick={toggleBookingProcess}>
          Go to checkout
        </Button>
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
      {alert && <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={alert}
        onClick={handleClose}
        >
          <Lottie animationData={security} />
          <Alert severity='error' ><p>Whoa! Our Security Camera says you are not Logged In! Please Login</p></Alert>
        </Backdrop>}
      <Footer />
    </div>
  );
};

export default BookTickets;
