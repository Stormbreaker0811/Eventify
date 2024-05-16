import Lottie from 'lottie-react';
import React from 'react';
import '../Styles/PlaneLoading.css';
import animation from '../Assets/Lottie Assets/PlaneLoading.json';

const PlaneLoading = () => {

    return (
    <div className='planeLoading-container'>
        <div className="planeLoading">
            <Lottie animationData={animation} />
        </div>
        <div className="landing-text">
            <p>One Moment Please!!</p>
            <p>You are about to land on the Landing Page!!</p>
        </div>
    </div>
    )
}

export default PlaneLoading
