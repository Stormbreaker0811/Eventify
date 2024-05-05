import React, { useState } from 'react';
import '../Styles/Forgotpass.css';

const Forgotpass = ({ closeModal }) => {

    const [showOTPForm,setShowOTPForm] = useState(false);

    const [OTP,setOTP] = useState('');

    const [emailOrPhone,setEmailOrPhone] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        setShowOTPForm(true);
    }

    const handleSubmitOTP = (e) => {
        e.preventDefault();

    }


    return (
    <div className='forgotpass'>
        <div className="content">
            <span className='close' onClick={closeModal}>&times;</span>
        {!showOTPForm ? (
            <>
            <h2>Forgot Password?</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="emailOrPhone">Enter Email/Phone: </label>
                <input type="text" name='emailOrPhone' onChange={(e) => setEmailOrPhone(e.target.value)}/>
                <br /><button>Submit and Send OTP</button>
            </form>
            </>
        ) : (
            <>
            <h2>Verify OTP to Change Password</h2>
            <form onSubmit={handleSubmitOTP}>
                <label htmlFor="otp">Enter OTP: </label>
                <input type="text" name='otp' onChange={(e) => setOTP(e.target.value)}/>
                <button>Verify OTP</button>
            </form>
            </>
        )}
        </div>
    </div>
    )
}

export default Forgotpass
