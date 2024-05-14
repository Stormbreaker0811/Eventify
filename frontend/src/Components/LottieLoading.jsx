import React from 'react';
import Lottie from 'lottie-react';
import animation from '../Assets/Lottie Assets/Loading.json';
import '../Styles/lottie.css';

const LottieLoading = () => {
    return (
    <div className='lottie-load'>
        <Lottie animationData={animation} />
    </div>
    )
}

export default LottieLoading
