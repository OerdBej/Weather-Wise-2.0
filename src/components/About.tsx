import React, { useState } from 'react';
import './About.css';

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');

  return (
    <div className="about-section">
      <div className="about-section-container">
        <h1 className="about-title">About Weather Wise 2.0</h1>
        
        <div className="tab-container">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button 
            className={`tab-button ${activeTab === 'how-it-works' ? 'active' : ''}`}
            onClick={() => setActiveTab('how-it-works')}
          >
            How It Works
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-content">
              <p className="about-description">
                Weather Wise 2.0 is your ultimate companion for planning outdoor activities. We analyze
                real-time weather data to provide personalized recommendations for different sports and activities.
              </p>
              <p className="about-description">
                Our application was designed to give you information in a fast and effective way about how the weather 
                would impact your day participating in your chosen sport. We take into account the specific weather factors 
                that affect each activity, providing you with an easy-to-understand rating system.
              </p>
              <p className="about-description">
                With our enhanced UI featuring pulsating rating circles, color-coded ratings, and sport-specific insights,
                you'll have all the information you need to make the most of your outdoor adventures.
              </p>
            </div>
          )}
          
          {activeTab === 'features' && (
            <div className="features-content">
              <div className="feature-item">
                <h3>Rating Circle Enhancements</h3>
                <ul>
                  <li><span className="feature-highlight">Pulsating Circle Effect:</span> Multiple concentric animated rings that pulse outward from the circle border</li>
                  <li><span className="feature-highlight">Color-coded Ratings:</span> Color gradient system from red (poor) to green (excellent)</li>
                  <li><span className="feature-highlight">Smooth Animations:</span> Subtle animations when ratings change</li>
                </ul>
              </div>
              
              <div className="feature-item">
                <h3>UI and Content Improvements</h3>
                <ul>
                  <li><span className="feature-highlight">Beautiful Typography:</span> Updated to Quicksand and Montserrat fonts for a cleaner, more modern look</li>
                  <li><span className="feature-highlight">Sport Selection:</span> Multiple sports (Cycling, Hiking, Swimming) with sport-specific data</li>
                  <li><span className="feature-highlight">Interactive Elements:</span> Buttons to switch between sports and content sections</li>
                </ul>
              </div>
              
              <div className="feature-item">
                <h3>Technical Improvements</h3>
                <ul>
                  <li><span className="feature-highlight">Clean Project Structure:</span> Organized components logically</li>
                  <li><span className="feature-highlight">Enhanced Algorithm:</span> More accurate weather rating calculations</li>
                  <li><span className="feature-highlight">Responsive Design:</span> Optimized for all device sizes</li>
                </ul>
              </div>
            </div>
          )}
          
          {activeTab === 'how-it-works' && (
            <div className="how-it-works-content">
              <p className="how-it-works-description">
                Weather Wise 2.0 uses advanced algorithms to analyze multiple weather parameters and calculate
                sport-specific ratings:
              </p>
              
              <ol className="how-it-works-steps">
                <li>
                  <span className="step-number">1</span>
                  <span className="step-description">We collect real-time weather data for your location including temperature, wind speed, precipitation probability, UV index, and air quality.</span>
                </li>
                <li>
                  <span className="step-number">2</span>
                  <span className="step-description">Our algorithm weighs each factor differently based on the sport you've selected - for example, wind speed is more important for cycling than for running.</span>
                </li>
                <li>
                  <span className="step-number">3</span>
                  <span className="step-description">We calculate a rating from 0-10 that represents how ideal the current conditions are for your chosen activity.</span>
                </li>
                <li>
                  <span className="step-number">4</span>
                  <span className="step-description">The system provides specific alerts and recommendations based on current conditions, helping you prepare for your activity.</span>
                </li>
              </ol>
              
              <p className="how-it-works-conclusion">
                All of this happens instantly, giving you the information you need to make informed decisions about your outdoor activities.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
