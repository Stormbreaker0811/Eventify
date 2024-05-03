import React,{ useState,useContext } from 'react';
import Lottie, { LottiePlayer } from 'lottie-react';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/style.css";
import '../Styles/loginform.css'
import animation from '../Assets/Lottie Assets/Login.json';
import Button from '@mui/material/Button';


const LoginForm = () => {
    const baseUrl = "http://localhost:5000";
    axios.defaults.baseURL = baseUrl;

    const [showEmail,setShowEmail] = useState(true);
    const [showMobile,setShowMobile] = useState(false);

    const toggleEmail = (e) => {
        setShowEmail(true);
        setShowMobile(false);
    }
    
    const toggleMobile = (e) => {
        setShowEmail(false);
        setShowMobile(true);
    }

    const [password, setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [mobileNo,setMobileNo] = useState('');
    const [formState,setFormState] = useState({
        password: '',
        email: '',
        mobile: '',
    });

    // const [fullName , setFullName] = useState('')
    // const [password, setPassword] = useState('');
    // const [email,setEmail] = useState('');
    // const [mobileNo,setMobileNo] = useState('');
    // const [age,setAge] = useState('');
    // const [gender,setGender] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(showEmail === true){
            setFormState({
                email: email,
                password: password
            })
        }else if(showMobile === true){
            setFormState({
                mobile: mobileNo,
                password: password
            })
        }
        axios.post('/login').then((res) => {
            
        })
    }

    const handleToggleRegister = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        e.preventDefault();
    }

    return (
        <div className="container">
        <form id="loginForm" action="/login" method="POST">
          <h2>Login</h2>
          <label htmlFor="email">Email / Phone No :</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
          <input type="submit" value="Login" />
          <div className="or">or</div>
          <div className="additional-links">
            <button type="button" id="showSignUpForm">Sign in with Google</button>
            <a href="#" id="toggleSignUp">New User? Create Account</a>
          </div>
        </form>
      </div>
    )
}

export default LoginForm
