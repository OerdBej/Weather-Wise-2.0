import { Routes, Route } from 'react-router-dom';
import './App.css';
// Import modern TypeScript context providers
import { LocationProvider } from './context/LocationContext';
import { WeatherProvider } from './context/WeatherContext';

// Component imports
import LocationSection from './components/LocationSection';
import NavBar from './components/NavBar';
import About from './components/About';
import SelectSport from './components/SelectSport';
import CurrentRating from './components/CurrentRating/CurrentRating';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';

function App() {
  return (
    <LocationProvider>
      <WeatherProvider>
        <NavBar />
        <div className="App">
          <Routes>
            <Route path="/" element={<LocationSection />} />
            <Route path="/about" element={<About />} />
            <Route path="/sport" element={<SelectSport />} />
            <Route path="/rating" element={<CurrentRating />} />
            <Route path="/current-weather" element={<CurrentWeather />} />
          </Routes>
        </div>
      </WeatherProvider>
    </LocationProvider>
  );
}

export default App;
