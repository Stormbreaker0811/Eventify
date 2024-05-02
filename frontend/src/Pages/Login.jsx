import React, { useState } from 'react'
import axios from 'axios';
import '../Styles/login.css';
import LoginForm from '../Components/LoginForm';


const Login = () => {

  const [state,setState] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/login")
  }

  return (
    <div className='container'>
      <div className="login-container">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
