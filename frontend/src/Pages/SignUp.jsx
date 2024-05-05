
import React, { useState } from 'react';
import '../Styles/signUpPage.css';
import app from '../firebase.init';
import PhoneInput from 'react-phone-input-2';
import animation from '../Assets/Lottie Assets/Login.json';
import Lottie from 'lottie-react';
import Google from '../Assets/Social Links/google.svg';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';


const SignUp = ({ toggleForm }) => {

  const [email,setEmail] = useState('');
  const [mobile,setMobile] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');

  const [formState,setFormState] = useState({
    user_name : '',
    user_email: '',
    user_mobile: '',
    user_password: '',
  });

  axios.defaults.baseURL = "http://localhost:4000";


  const handleSubmit = (e) => {
    e.preventDefault();
    if(password === confirmPassword){
      setFormState({
        user_name: name,
        user_email: email,
        user_password: password,
        user_mobile: mobile
      });
      axios.post("/register",formState).then((res) => {
        const status = res.status;
        if(status === 200){
          alert("User Registered Successfully");
          window.location.href = "/";
        }else if(status === 400){
          alert("User Exists..//");
          toggleForm(false);
        }
      }).catch((err) => {
        console.error(err);
      })
    }else{
      alert("Passwords do not match");
    }
  }

  const handleGoogleSignin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth,provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        if(user){
          // const email = user.email;
          // const mobile = user.phoneNumber;
          // const name = user.displayName;
          axios.post("/google-signin",user).then((res) => {
            if(res.status === 200){
              alert("User Registration successfull..//");
            }
          }).catch((err) => {
            console.error(err);
          })
        }
    }).catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.error(errorMessage);
    })
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
      <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" name="confirmPassword" required onChange={(e) => setConfirmPassword(e.target.value)} />
      <input type="submit" value="Sign Up" />
      <div className="or">or</div>
      <div className="additional-links">
      <div className="social-links">
        <h4>Sign Up With:</h4>
        <img src={Google} onClick={handleGoogleSignin}/>
      </div>
        <a id="toggleLogin" onClick={toggleForm}>Already have an account? Login</a>
      </div>
    </form>
    </div>
    </div>
    
  );
}

export default SignUp;