import React,{ useState } from 'react';
import Lottie, { LottiePlayer } from 'lottie-react';
import { SlLogin } from "react-icons/sl";
import { Button } from '@mui/material';
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

    const toggleEmail = (e) => {
        e.preventDefault()
        setShowEmail(true);
        setShowMobile(false);
    }
    
    const toggleMobile = (e) => {
        e.preventDefault()
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
    }

    const handleChange = (e) => {
        e.preventDefault();
    }

    return (
    <div className='container'>
        <div className='lottie-container'>
            <Lottie 
            animationData={animation}/>
        </div>
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <button onClick={toggleEmail} className='toggleEmail'>Login with Email</button>
                <button onClick={toggleMobile} className='toggleMobile'>Login with Mobile</button>
                <br />{showEmail && <input type='email' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)}/>}
                <br />{showMobile && <PhoneInput country={'in'} placeholder='Enter Mobile Number ' value='' onChange={(value) => setMobileNo(value)} />}
                <br /><input type="password" placeholder='Enter Password: ' className='pass' onChange={(e) => setPassword(e.target.value)}/>
                <br /><Button variant='contained' >Login</Button>
            </form>
        </div>
    </div>
    )
}

export default LoginForm
