import React, { useState } from 'react'
import axios from 'axios';
import '../Styles/login.css';
import LoginForm from '../Components/LoginForm';
import vector from '../Assets/event_vector.jpg';
import SignUp from './SignUp';


const Login = () => {

  const [state,setState] = useState('');
  const [showLogin,setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(prevState => !prevState);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/login")
  }

  return (
    <div className='container'>
      <div className="login-container">
        <div className={showLogin ? "form-container" : "form-container"}>
        {showLogin ? <LoginForm toggleForm = {toggleForm} /> : <SignUp toggleForm = {toggleForm} />}
        </div>
      </div>
    </div>
  )
}

export default Login
