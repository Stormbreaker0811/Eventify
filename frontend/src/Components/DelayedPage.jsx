import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const DelayedPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Change 2000 to the desired delay in milliseconds (e.g., 2000 for 2 seconds)
    
    // Cleanup function to clear the timeout in case component unmounts before the delay completes
    return () => clearTimeout(delay);
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  const animationProps = useSpring({
    opacity: isLoading ? 0 : 1,
    transform: isLoading ? 'translateY(-50px)' : 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(-50px)' },
    delay: 500, // Optional delay for the animation to start
  });

  // Render loading spinner or content based on isLoading state
  return (
    <animated.div style={animationProps}>
      {isLoading ? <LoadingSpinner /> : <PageContent />}
    </animated.div>
  );
}

export default DelayedPage;
