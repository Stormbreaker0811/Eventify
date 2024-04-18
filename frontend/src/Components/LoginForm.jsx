import React,{ useState,useContext } from 'react';
import Lottie, { LottiePlayer } from 'lottie-react'
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/style.css";
import '../Styles/loginform.css'
import animation from '../Assets/Lottie Assets/Login.json'


const LoginForm = () => {
    const baseUrl = "http://localhost:5000";
    axios.defaults.baseURL = baseUrl;

    const [showEmail,setShowEmail] = useState(true);
    const [showMobile,setShowMobile] = useState(false);

    const toggleEmail = (e) =>{
        e.preventDefault();
        setShowEmail(!showEmail);
        if(showMobile === true){
            setShowMobile(!showMobile);
        }
    };

    const toggleMobile = (e) => {
        e.preventDefault();
        setShowMobile(!showMobile);
        if(showEmail === true){
            setShowEmail(!setShowEmail);
        }
    };


    const [password, setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [mobileNo,setMobileNo] = useState('');
    const [formState,setFormState] = useState({
        password: '',
        email: '',
        mobile: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
    <div className='container'>
        <div className='lottie-container'>
            <Lottie animationData={animation} className='lottieAnimate' />
        </div>
        <div className='form-container'>
        <button onClick={toggleEmail}>Toggle Email</button>
        <button onClick={toggleMobile}>Toggle Mobile</button>
        <form method="post" onSubmit={handleSubmit}>
            {showEmail && <input type="email" placeholder='Enter Email' />}
            {showMobile && <PhoneInput country="in" placeholder='Enter Mobile Number' />}
            <br /><input type="text" name="email/mobile" id="" placeholder='Enter Password: '/>
            <br />
        </form>
        </div>
    </div>
    )
}

export default LoginForm
