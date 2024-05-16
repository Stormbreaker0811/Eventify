import React,{ useState,useContext, useEffect } from 'react';
import Lottie, { LottiePlayer } from 'lottie-react';
import app from '../firebase.init.js';
import { getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/style.css";
import '../Styles/loginform.css';
import Google from '../Assets/Social Links/google.svg';
import Button from '@mui/material/Button';
import Logo from '../Assets/Logo.png';
import animation from '../Assets/Lottie Assets/Login.json';
import Forgotpass from './Forgotpass';
import { initializeApp } from 'firebase/app';


const LoginForm = ({ toggleForm }) => {
    const baseUrl = "http://localhost:4000";
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
    // const [formState,setFormState] = useState({
    //     user_email:'',
    //     user_password: '',
    //     user_mobile: '',
    // });

    const [showModal , setShowModal] = useState(false);

    const handleGoogleSignin = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth,provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            axios.post("/google-login",user)
            sessionStorage.setItem("Email",user.email);
            sessionStorage.setItem("Name",user.displayName);
            sessionStorage.setItem("Mobile",user.phoneNumber);
            sessionStorage.setItem("loginState","true");
        }).catch((err) => {
            const errorCode = err.code;
            const errorMessage = err.message;
            console.error(errorMessage);
        })
    }

    // const [fullName , setFullName] = useState('')
    // const [password, setPassword] = useState('');
    // const [email,setEmail] = useState('');
    // const [mobileNo,setMobileNo] = useState('');
    // const [age,setAge] = useState('');
    // const [gender,setGender] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        let formState = {}
        if(email.includes('@')){
            formState = {
                user_email: email,
                user_password: password
            }
            console.log("email set");
        }else {
            formState = {
                user_mobile: email,
                user_password: password
            }
            console.log("mobile set");
        }
        axios.post('/login',formState).then((res) => {
            if(res.status === 200){
                sessionStorage.setItem("Email",res.data.Email);
                sessionStorage.setItem("Name",res.data.Name);
                sessionStorage.setItem("Mobile",res.data.Mobile);
                sessionStorage.setItem("loginState","true");
                window.location.href = "/";
            }else{
                alert("User Not Found..//");
            }
            console.log("Login Data Sent..//");
        }).catch((err) => {
            console.error(err);
        });
    }

    return (
        <div className="contain">
            <div className="login-container">
                <div className="lottie-login">
                    <Lottie animationData={animation} />
                </div>
                <form method="POST" onSubmit={handleSubmit}>
                    <h2 className='login-title'>Login</h2>
                    <label htmlFor="email">Email / Phone No :</label>
                    <input type="text" id="email" name="email" aria-errormessage='' onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
                    <div className="forgot-password">
                        <a href='/forgot-pass'>Forgot Password?</a>
                    </div>
                    <input type="submit" value="Login" />
                    <div className="or">or</div>
                    <div className="additional-links">
                        <div className="social-links">
                            <h4>Sign In With: </h4>
                        <img src={Google} onClick={handleGoogleSignin}/>
                        </div>
                        <a id="toggleSignUp" onClick={toggleForm}>New User? Create Account</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
