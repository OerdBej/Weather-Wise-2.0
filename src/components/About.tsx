import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-section">
      <div className="about-section-container">
        <h1 className="about-title">About Weather Wise 2.0</h1>
        
        <section className="about-content">
          <div className="overview-section">
            <h2 className="section-title">Overview</h2>
            <p className="about-description">
              Weather Wise 2.0 is your ultimate companion for planning outdoor activities. We analyze
              real-time weather data to provide personalized recommendations for your chosen sport with an
              easy-to-understand rating system that considers specific weather factors affecting each activity.
            </p>
          </div>

          <div className="how-it-works-section">
            <h2 className="section-title">How It Works</h2>
            <ol className="how-it-works-steps">
              <li><span className="step-description">Search your location</span></li>
              <li><span className="step-description">Select your sport</span></li>
              <li><span className="step-description">View current weather and sport rating</span></li>
              <li><span className="step-description">Get activity-specific tips and alerts</span></li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
