
import React, { useState } from 'react';
import '../Styles/signUpPage.css';
import PhoneInput from 'react-phone-input-2';

const SignUp = () => {

  const [email,setEmail] = useState('');
  const [mobile,setMobile] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  }


  return (
    <div className="signupform">
      <form id="signupForm" method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required />
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />
      <label htmlFor="phone">Phone Number:</label>
      <PhoneInput country={"in"} value="" />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required />
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" name="confirmPassword" required />
      <input type="submit" value="Sign Up" />
      <div className="or">or</div>
      <div className="additional-links">
        <button type="button" id="showLoginForm">Sign in with Google</button>
        <a href="#" id="toggleLogin">Already have an account? Login</a>
      </div>
    </form>
    </div>
    
  );
}

export default SignUp;