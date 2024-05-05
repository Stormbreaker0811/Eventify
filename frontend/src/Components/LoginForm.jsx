import React,{ useState,useContext } from 'react';
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
    const baseUrl = "http://localhost:5000";
    axios.defaults.baseURL = baseUrl;

    const [showEmail,setShowEmail] = useState(true);
    const [showMobile,setShowMobile] = useState(false);

    const firbaseapp = initializeApp(app);

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

    const [showModal , setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
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
        }).catch((err) => {
            const errorCode = err.code;
            const errorMessage = err.message;
            console.error(errorMessage);
        })
    }

    const closeModal = () => {
        setShowModal(false);
    }

    // const [fullName , setFullName] = useState('')
    // const [password, setPassword] = useState('');
    // const [email,setEmail] = useState('');
    // const [mobileNo,setMobileNo] = useState('');
    // const [age,setAge] = useState('');
    // const [gender,setGender] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email.includes('@')){
            setFormState({
                email: email,
                password: password
            })
        }else {
            setFormState({
                mobile: mobileNo,
                password: password
            })
        }
        axios.post('/login',formState).then((res) => {
            console.log("Login Data Sent..//");
        }).catch((err) => {
            console.error(err);
        });
    }

    const handleToggleRegister = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        e.preventDefault();
    }

    return (
        <div className="contain">
            <div className="login-container">
                <div className="lottie">
                    <Lottie animationData={animation} />
                </div>
                <form method="POST" onSubmit={handleSubmit}>
                    <h2 className='login-title'>Login</h2>
                    <label htmlFor="email">Email / Phone No :</label>
                    <input type="text" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
                    <div className="forgot-password">
                        <a href='#' onClick={openModal}>Forgot Password?</a>
                    </div>
                    <input type="submit" value="Login" />
                    <div className="or">or</div>
                    <div className="additional-links">
                        <div className="social-links">
                        <img src={Google} onClick={handleGoogleSignin}/>
                        </div>
                        <a id="toggleSignUp" onClick={toggleForm}>New User? Create Account</a>
                    </div>
                </form>
            </div>
            {showModal && <Forgotpass onClose={closeModal}/>}
        </div>
    )
}

export default LoginForm
