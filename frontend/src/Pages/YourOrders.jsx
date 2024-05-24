import React, { useEffect, useState } from 'react';
import '../Styles/YourOrders.css';
import inception from '../Assets/inception.jpg';
import samay from '../Assets/samay.jpeg';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import zakir from '../Assets/zakir.jpeg';
import comedy from '../Assets/comedy.jpg';
import axios from 'axios';
  
const YourOrders = () => {
  // const ordersData = [
  //   {
  //     id: 1,
  //     eventName: 'Samay Raina Special',
  //     eventDate: '2024-04-30',
  //     price: 1199,
  //     poster: samay,
  //     venue: 'Bantara Bhavan'
  //   },
  //   {
  //     id: 2,
  //     eventName: 'Inception',
  //     eventDate: '2024-05-05',
  //     price: 399,
  //     poster: inception,
  //     venue: 'PVR Pvaillion Mall'
  //   },
  //   {
  //       id: 3,
  //       eventName: 'Comedy Nights',
  //       eventDate: '2024-04-30',
  //       price: 199,
  //       poster: comedy,
  //       venue: 'Wakad'
  //   },
  //   {
  //       id: 4,
  //       eventName: 'The Zakir Khan Show',
  //       eventDate: '2024-04-30',
  //       price: 1799,
  //       poster: zakir,
  //       venue: 'Nehru Hall'
  //     },
      
  //   // Add more orders as needed
  // ];

    const [myOrders,setMyOrders] = useState([]);

    axios.defaults.baseURL = 'http://localhost:4000';

    const name = String(sessionStorage.getItem("Name") || "");

    useEffect(() => {
      axios.get('/get-orders',{
        params: {name}
      }).then((res) => {
        if(res.status === 200){
          setMyOrders(res.data)
        }
      }).catch((err) => {
        console.error(err);
      })
    }, [])


    return (
      <div className="your-orders-container">
        <Navbar/>
        <h2 className="your-orders-title">Your Orders</h2>
        <div className="order-list">
        {myOrders.map(order => (
            <div key={order.id} className="order-item">
              <img src={order.poster} alt={order.eventName} className="event-poster" />
              <div className="order-details">
                <h3 className="event-name">{order.eventName}</h3>
                <p className="event-date">Date: {order.eventDate}</p>
                <p className="event-price">Price: Rs. {order.price}</p>
                <p className="event-venue">Venue: {order.venue}</p>
              </div>
            </div>
          ))}
        </div>
        <Footer/>
      </div>
    );
  };
  

export default YourOrders;
