import React, { useState, useEffect } from 'react';
import { Link, useLocation as useRouterLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import StarIcon from '@mui/icons-material/Star';
import CloudIcon from '@mui/icons-material/Cloud';

const NavBar: React.FC = () => {
  const location = useRouterLocation();
  const [scrolled, setScrolled] = useState(false);
  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  // Dark mode logic removed for a cleaner, more consistent design
  
  return (
  <div className={`nav-bar ${scrolled ? 'scrolled' : ''}`}>
    <nav>
      <ul>
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/"><HomeIcon /> Home</Link>
        </li>
        <li className={location.pathname === '/about' ? 'active' : ''}>
          <Link to="/about"><InfoIcon /> About</Link>
        </li>
        <li className={location.pathname === '/sport' ? 'active' : ''}>
          <Link to="/sport"><DirectionsRunIcon /> Sport</Link>
        </li>
        <li className={location.pathname === '/rating' ? 'active' : ''}>
          <Link to="/rating"><StarIcon /> Rating</Link>
        </li>
        <li className={location.pathname === '/current-weather' ? 'active' : ''}>
          <Link to="/current-weather"><CloudIcon /> Weather</Link>
        </li>
      </ul>
    </nav>
  </div>
  );
};

export default NavBar;
