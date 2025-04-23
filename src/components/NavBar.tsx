import React, { useState, useEffect } from 'react';
import { Link, useLocation as useRouterLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import StarIcon from '@mui/icons-material/Star';
import CloudIcon from '@mui/icons-material/Cloud';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const NavBar: React.FC = () => {
  const location = useRouterLocation();
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user previously enabled dark mode
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });
  
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
  
  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  return (
  <div className={`nav-bar ${scrolled ? 'scrolled' : ''}`}>
    <nav>
      <ul>
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/"><HomeIcon fontSize="small" /> Home</Link>
        </li>
        <li className={location.pathname === '/about' ? 'active' : ''}>
          <Link to="/about"><InfoIcon fontSize="small" /> About</Link>
        </li>
        <li className={location.pathname === '/sport' ? 'active' : ''}>
          <Link to="/sport"><DirectionsRunIcon fontSize="small" /> Sport</Link>
        </li>
        <li className={location.pathname === '/rating' ? 'active' : ''}>
          <Link to="/rating"><StarIcon fontSize="small" /> Rating</Link>
        </li>
        <li className={location.pathname === '/current-weather' ? 'active' : ''}>
          <Link to="/current-weather"><CloudIcon fontSize="small" /> Weather</Link>
        </li>
      </ul>
    </nav>
    <div className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </div>
  </div>
  );
};

export default NavBar;
