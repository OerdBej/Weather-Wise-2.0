import React, { useState, useEffect } from 'react';
import { Link, useLocation as useRouterLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
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
  
  // Check if we have location data for enabling navigation
  const [hasLocation, setHasLocation] = useState(false);
  const [hasSport, setHasSport] = useState(false);
  
  // Check for location and sport data on mount and when route changes
  useEffect(() => {
    const locationData = localStorage.getItem('weatherLocation');
    const sportData = localStorage.getItem('selectedSport');
    
    setHasLocation(!!locationData);
    setHasSport(!!sportData);
  }, [location.pathname]);
  
  // Handle restricted navigation
  const handleRestrictedNav = (e: React.MouseEvent, path: string, requiresLocation: boolean, requiresSport: boolean) => {
    // Always allow home and about
    if (path === '/' || path === '/about') return;
    
    if (requiresLocation && !hasLocation) {
      e.preventDefault();
      alert('Please select a location on the home page first');
      return;
    }
    
    if (requiresSport && !hasSport) {
      e.preventDefault();
      alert('Please select a sport first');
      return;
    }
  };
  
  return (
  <div className={`nav-bar ${scrolled ? 'scrolled' : ''}`}>
    <nav>
      <ul>
        {/* Order matches requested flow: Home => Sport => Weather => About */}
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/"><HomeIcon /> Home</Link>
        </li>
        <li className={location.pathname === '/sport' ? 'active' : ''}>
          <Link to="/sport" onClick={(e) => handleRestrictedNav(e, '/sport', true, false)}>
            <DirectionsRunIcon /> Sport
          </Link>
        </li>
        <li className={location.pathname === '/current-weather' ? 'active' : ''}>
          <Link to="/current-weather" onClick={(e) => handleRestrictedNav(e, '/current-weather', true, true)}>
            <CloudIcon /> Weather
          </Link>
        </li>
        <li className={location.pathname === '/about' ? 'active' : ''}>
          <Link to="/about"><InfoIcon /> About</Link>
        </li>
      </ul>
    </nav>
  </div>
  );
};

export default NavBar;
