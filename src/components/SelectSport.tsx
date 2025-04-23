import React, { useEffect, useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import { sportsOptions } from '../utils/sportsSelector';
import { fetchSportNews, NewsArticle } from '../utils/newsApi';
import './SelectSport.css';

const SelectSport: React.FC = () => {
  const { selectSport, sportSelected } = useWeather();
  const [selectedSport, setSelectedSport] = useState<string>(sportSelected || '');
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [showNewsPrompt, setShowNewsPrompt] = useState<boolean>(false);
  const [loadingNews, setLoadingNews] = useState<boolean>(false);
  const [showNews, setShowNews] = useState<boolean>(false);

  // Setup default sport and check for location data when component loads
  useEffect(() => {
    // Always set a default sport
    const defaultSport = localStorage.getItem('selectedSport') || 'Cycling';
    localStorage.setItem('selectedSport', defaultSport);
    setSelectedSport(defaultSport);

    // Check if we have location data stored - we need this for the rating to work
    const savedLocation = localStorage.getItem('weatherLocation');
    if (!savedLocation) {
      console.error('No location data found! Cannot calculate ratings');
      // We could redirect to home here, but let's allow manual sport selection
    }
  }, []);

  // Handle sport selection with news feature
  const handleSportSelect = (sportName: string) => {
    console.log('Sport selected:', sportName);
    setSelectedSport(sportName);
    
    // Show news prompt after selecting a sport
    setShowNewsPrompt(true);
    setShowNews(false); // Reset news display when selecting a new sport
    
    // Ensure we have a location first before proceeding to weather rating
    const savedLocation = localStorage.getItem('weatherLocation');
    if (!savedLocation) {
      console.error('No location data found! Cannot calculate ratings');
      alert('Please select a location first on the home page');
      return;
    }
  };
  
  // Load news for the selected sport
  const loadSportNews = async () => {
    if (!selectedSport) return;
    
    setLoadingNews(true);
    try {
      const articles = await fetchSportNews(selectedSport, 3);
      setNewsArticles(articles);
      setShowNews(true);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoadingNews(false);
    }
  };
  
  // Proceed to weather rating without viewing news
  const proceedToWeather = () => {
    // This will calculate ratings and navigate to the rating page
    selectSport(selectedSport);
  };

  return (
    <div className='select-sport-container'>
      <h1 className='select-sport-title'>Choose your sport</h1>

      <div className='sport-icons-container'>
        {sportsOptions.map((sport, i) => (
          <div
            className={`sport-icon-wrapper ${
              sport.name === selectedSport ? 'active' : ''
            }`}
            key={i}
            onClick={() => handleSportSelect(sport.name)}
          >
            <div className='sport-icon'>
              <img src={sport.img} alt={sport.name} />
            </div>
            <p className='sport-name'>{sport.name}</p>
          </div>
        ))}
      </div>
      
      {/* News prompt that appears after selecting a sport */}
      {showNewsPrompt && selectedSport && (
        <div className='news-prompt-container'>
          <div className='news-prompt'>
            <h2>Would you like to read the latest news about {selectedSport}?</h2>
            <div className='news-prompt-buttons'>
              <button 
                className='news-btn yes-btn' 
                onClick={loadSportNews}
                disabled={loadingNews}
              >
                {loadingNews ? 'Loading...' : 'Yes, show me news'}
              </button>
              <button 
                className='news-btn no-btn'
                onClick={proceedToWeather}
              >
                No, continue to weather
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* News articles display */}
      {showNews && (
        <div className='sport-news-container'>
          <h2 className='news-section-title'>Latest {selectedSport} News</h2>
          <div className='news-articles-grid'>
            {newsArticles.map((article, index) => (
              <div key={index} className='news-article-card'>
                {article.image && (
                  <div className='article-image'>
                    <img src={article.image} alt={article.title} />
                  </div>
                )}
                <div className='article-content'>
                  <h3 className='article-title'>{article.title}</h3>
                  <p className='article-description'>{article.description}</p>
                  <div className='article-meta'>
                    <span className='article-source'>{article.source.name}</span>
                    <span className='article-date'>
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <a 
                    href={article.url} 
                    target='_blank' 
                    rel='noopener noreferrer'
                    className='read-more-link'
                  >
                    Read more
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className='news-action-buttons'>
            <button 
              className='news-btn continue-btn'
              onClick={proceedToWeather}
            >
              Continue to weather
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectSport;
