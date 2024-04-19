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

    const [activeEmail,setActiveEmail] = useState(true);

    const toggleEmail = (e) =>{
        e.preventDefault();
        setShowEmail(true);
        setActiveEmail(!activeEmail)
        setActiveMobile(false)
        if(showMobile === true){
            setShowMobile(!showMobile);
        }
    };

    const [activeMobile,setActiveMobile] = useState(false);
    const toggleMobile = (e) => {
        e.preventDefault();
        setShowMobile(!showMobile);
        setActiveMobile(!activeMobile);
        setActiveEmail(false)
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

    const showPassword = () => {
        const password = document.getElementById('password');
        if(password.type === "password"){
            password.type = "text";
        }else{
            password.type = "password"
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormState({
            password: password,
            email: email,
            mobile: mobileNo
        });
        try{
            console.log(formState)
            const response = await axios.post('/login',formState);
            console.log(response)
            if(response.data === true){
                window.location.href = '/home';
            }
        }catch(err){console.error(err);}

    }

    return (
    <div className='container'>
        <h1>Login</h1>
        <div className="login-container">
            <div className='lottie-container'>
                <Lottie animationData={animation} className='lottieAnimate' />
            </div>
            <div className='form-container'>
                <div className="button">
                    <button onClick={toggleEmail} className={activeEmail ? 'active' : 'not-active'}>Login with Email</button>
                    <button onClick={toggleMobile} className={activeMobile ? 'active' : 'not-active'}>Login with Mobile</button>
                </div>
                <form method="post" onSubmit={handleSubmit}>
                    <div className="form">
                    {showEmail && <input type="email" placeholder='Enter Email' className='email' name='email' onChange={(e) => {setEmail(e.target.value)}}/>}
                    {showMobile && <PhoneInput country="in" placeholder='Enter Mobile Number' onChange={(e) => {setMobileNo(e)}}/>}
                    <br /><input type="password" id="password" placeholder='Enter Password: ' className='password' onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                    <br /><input type="submit" value="Login" className='login-btn'/>
                </form>
                <button onClick={showPassword}>Show Password</button>
            </div>
        </div>
    </div>
    )
}

export default LoginForm
