import React,{ useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import animation from '../Assets/Lottie Assets/Loading.json';
import '../Styles/lottie.css';

const LottieLoading = () => {

    const [loadingText,setLoadingText] = useState('');

    const loadingTexts =[
        'One Moment Please...',
        'Loading...',
        'Almost There...'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * loadingTexts.length);
            setLoadingText(loadingTexts[randomIndex])
        },2000);

        return () => clearInterval(interval);
    },[]);

    return (
    <div className='lottie-load'>
        <div className="lottie">
            <Lottie animationData={animation} />
        </div>
        <div className="loading-text">
            <p>{loadingText}</p>
        </div>
    </div>
    )
}

export default LottieLoading
