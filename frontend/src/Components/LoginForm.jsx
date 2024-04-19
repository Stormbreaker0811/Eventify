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
    
    const emailOrMobileNo = (state) => {
        if(state === "email"){
            return(
                <input type="email" name="email" id="" placeholder='Enter Email: ' onChange={(e) => setEmail(e.target.value)} />
            );
        }else{
            return(
                <PhoneInput
                className="number"
                country={"in"}
                value={this.state.phone} />
            )
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

    const [fullName , setFullName] = useState('')
    const [password, setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [mobileNo,setMobileNo] = useState('');
    const [age,setAge] = useState('');
    const [gender,setGender] = useState('');

    const handleSubmit = (e) => {

    }

    return (
    <div className='container'>
        <h1>Login</h1>
        <form method="post" onSubmit={handleSubmit}>
            Email<input type="checkbox" name="" id="" />Mobile
            <br /><input type="text" name="email/mobile" id="" placeholder='Enter Password: '/>
            <br />
        </form>
    </div>
    )
}

export default LoginForm
