import React, { useEffect, useState } from 'react'
import '../Styles/Payment.css';
import axios from 'axios';
import { Alert, Backdrop } from '@mui/material';
import Button from '@mui/joy/Button';
import Lottie from 'lottie-react';
import animation from '../Assets/Lottie Assets/checkout.json';

const Payment = () => {
  const [qrCode,setQrCode] = useState('');
  const [alert,setAlert] = useState(false);
  const [checkout,setCheckout] = useState(false);
  const [checkPayment,setCheckPayment] = useState(false);

  axios.defaults.baseURL = 'http://localhost:4000';

  const [amount,setAmount] = useState(0);

  const handleClose = () => {
    setAlert(false);
    window.location.href = '/';
  }

  useEffect(() => {
    const amount = {
      Amount: parseInt(sessionStorage.getItem('Amount'))
    }
    setAmount(amount.Amount);
    axios.post('/payments',amount)
    .then((res) => {
      setQrCode(res.data.qrCodeUrl);
    }).catch((err) => {
      console.error(err);
    })
  })

  const toggleCheckingProcess = () => {
    setCheckPayment(true);
    const name = sessionStorage.getItem("Name");
    const email = sessionStorage.getItem("Email");
    const phoneNumber = sessionStorage.getItem("Mobile");
    const eventName = sessionStorage.getItem("Event_Name");
    const userData = {
      user_name: name,
      user_email: email,
      user_phone: phoneNumber,
      event_name: eventName
    }
    axios.post('/orders',userData).then((res) => {
      if(res.status === 200){
        sessionStorage.setItem("paymentStatus","Done");
        setCheckout(true);
        setAlert(true);
      }
    }).catch((err) => {
      console.error(err);
    });
  }


  return (
    <div className='pay-container'>
      <h2>Scan This QRCode to pay..</h2>
      {qrCode ? (
        <div className='payment'>
          <div className='top'>
            <div className='qr'>
              <img src={qrCode} alt='UPI Payment QR Code'/>
            </div>
            <div className="amount">
              Pay Rs. {amount} to the QR Code
            </div>
          </div>
          {checkout && <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={alert}
            onClick={handleClose}
            >
          <div className="checkout" style={{width: "25%", textAlign: "center", justifyContent: "center"}}>
            <Lottie animationData={animation} />
            <Alert severity='success'>Ticket Booked Successfully</Alert>
          </div>
        </Backdrop>}
        {checkPayment ? (
        <>
        <Button variant='solid' loading>Checking</Button>
        </>
        ) : 
        (
        <>
        <Button variant="solid" onClick={toggleCheckingProcess} className='checkPayment'>Check for Payment!</Button>
        </>
        )}
        </div>
      ):(
        <p>Loading Qr Code ...</p>
      )}
      
    </div>
  )
}

export default Payment
