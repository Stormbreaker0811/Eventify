import React, { useEffect, useState } from 'react'
import '../Styles/Payment.css';
import axios from 'axios';

const Payment = () => {
  const [qrCode,setQrCode] = useState('');

  axios.defaults.baseURL = 'http://localhost:4000';

  const amount = {
    Amount: parseInt(sessionStorage.getItem('Amount'))
  }

  useEffect(() => {
    axios.post('/payments',amount)
    .then((res) => {
      setQrCode(res.data.qrCodeUrl);
    }).catch((err) => {
      console.error(err);
    })
  })


  return (
    <div className='pay-container'>
      <h2>Scan This QRCode to pay..</h2>
      {qrCode ? (
        <img src={qrCode} alt='UPI Payment QR Code'/>
      ):(
        <p>Loading Qr Code ...</p>
      )}
    </div>
  )
}

export default Payment
