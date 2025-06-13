import React, { useEffect, useState } from 'react'
import './Header.css'

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong with the header.</h2>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

const Header = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const backgrounds = [
    {
      image: 'url("/header_img1.png")',
      offer: 'Summer Sale - Up to 50% Off!',
      cta: 'Shop Now'
    },
    {
      image: 'url("/header_img2.jpg")',
      offer: 'New Arrivals - Limited Stock',
      cta: 'Discover'
    },
    {
      image: 'url("/header_img3.jpg")',
      offer: 'Free Shipping on Orders Over ₹499',
      cta: 'Learn More'
    },
    {
      image: 'url("/header_img4.jpg")',
      offer: 'Free Shipping on Orders Over ₹999',
      cta: 'Learn More'
    }
  ];

  useEffect(()=>{
    const  interval  = setInterval(()=>{
      setCurrentBgIndex((prevIndex)=>prevIndex === backgrounds.length - 1?0 : prevIndex + 1 );
    },5000);
    return () => clearInterval(interval);
  },[backgrounds.length])


  // Safely get current background
  const getCurrentBackground = () => {
    return backgrounds[currentBgIndex] || backgrounds[0];
  };
  const currentBg = getCurrentBackground();

  return (
    <ErrorBoundary>
       <div className='header'>
        <div>
          <div className='header-image' style={{ 
            backgroundImage: currentBg.image,transition: 'background-image 1s ease-in-out'
          }}></div>

            <div className="header-contents">
                <h1>{currentBg.offer}</h1>
                <p>Don't miss out on these amazing deals</p>
                <button>
                {currentBg.cta}
              </button>
                
            </div>
        </div>
          
        </div>
    </ErrorBoundary>
   
  )
}

export default Header