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
import CurrentWeather from './components/CurrentWeather/CurrentWeather';

function App() {
  return (
    <LocationProvider>
      <WeatherProvider>
        <NavBar />
        <div className='App'>
          <Routes>
            <Route path='/' element={<LocationSection />} />
            <Route path='/about' element={<About />} />
            <Route path='/sport' element={<SelectSport />} />
            {/* Rating functionality now integrated into the Weather page */}
            <Route path='/current-weather' element={<CurrentWeather />} />
          </Routes>
        </div>
      </WeatherProvider>
    </LocationProvider>
  );
}

export default App;
