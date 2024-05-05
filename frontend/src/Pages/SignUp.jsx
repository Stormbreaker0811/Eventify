
import React, { useState } from 'react';
import '../Styles/signUpPage.css';
import PhoneInput from 'react-phone-input-2';
import animation from '../Assets/Lottie Assets/Login.json';
import Lottie from 'lottie-react';


const SignUp = ({ toggleForm }) => {

  const [email,setEmail] = useState('');
  const [mobile,setMobile] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  }


  return (
    <div className="signupform">
      <div className="lottie">
        <Lottie animationData={animation} />
      </div>
      <div className="signup-container">
      <form id="signupForm" method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required onChange={(e) => setName(e.target.value)} />
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)}/>
      <label htmlFor="phone">Phone Number:</label>
      <input type="tel" name="mobile" id="mobile" onChange={(e) => setMobile(e.target.value)} />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required />
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" name="confirmPassword" required />
      <input type="submit" value="Sign Up" />
      <div className="or">or</div>
      <div className="additional-links">
        <button type="button" id="showLoginForm">Sign in with Google</button>
        <a id="toggleLogin" onClick={toggleForm}>Already have an account? Login</a>
      </div>
    </form>
    </div>
    </div>
    
  );
}

export default SignUp;