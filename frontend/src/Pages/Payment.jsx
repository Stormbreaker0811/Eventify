import React, { useEffect, useState } from 'react'
import '../Styles/Payment.css';
import axios from 'axios';
import { Backdrop } from '@mui/material';
import Lottie from 'lottie-react';
import animation from '../Assets/Lottie Assets/checkout.json';

const Payment = () => {
  const [qrCode,setQrCode] = useState('');
  const [alert,setAlert] = useState(false);
  const [checkout,setCheckout] = useState(false);

  axios.defaults.baseURL = 'http://localhost:4000';

  const [amount,setAmount] = useState(0);

  const handleClose = () => {
    setAlert(false);
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
    if(sessionStorage.getItem('paymentStatus') === 'Done'){
      setCheckout(true);
      setAlert(true);
    }
  })


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
          </div>
        </Backdrop>}
        </div>
      ):(
        <p>Loading Qr Code ...</p>
      )}
    </div>
  )
}

export default Payment
