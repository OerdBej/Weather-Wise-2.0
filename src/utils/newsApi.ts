// News API integration
import axios from 'axios';

// Define interfaces for news data following GNews API format
export interface NewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string | null;        // GNews uses 'image' not 'urlToImage'
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

export interface NewsResponse {
  articles: NewsArticle[];
  totalArticles: number;      // GNews uses 'totalArticles' not 'totalResults'
  errors?: any[];            // Error messages if any
}

// News API endpoints
const GNEWS_API_URL = 'https://gnews.io/api/v4/search';

/**
 * Fetch news articles related to a specific sport
 * @param sport The sport to get news for
 * @param limit Maximum number of articles to return
 * @returns News articles related to the sport
 */
// In a real production environment, this would be in a separate config file that's gitignored
// or even better, handled through environment variables on the server
const GNEWS_API_KEY = '2d72c7c5102b94b4614ad6a56aba0bd2';

/**
 * Fetch sport news from GNews API or fallback to mock data
 */
export const fetchSportNews = async (sport: string, limit: number = 3): Promise<NewsArticle[]> => {
  // Using the API key
  const API_KEY = GNEWS_API_KEY;
  
  // Verify API key exists
  if (!API_KEY) {
    console.warn('No GNews API key found. Using mock data.');
    return getMockNewsData(sport, limit);
  }
  
  try {
    // GNews API parameters - note the different parameter naming scheme
    const response = await axios.get<NewsResponse>(GNEWS_API_URL, {
      params: {
        q: sport,          // search query
        lang: 'en',        // language
        country: 'us',     // country focus
        max: limit,        // number of results
        apikey: API_KEY    // your API key
      }
    });
    
    console.log('GNews API response status:', response.status);
    
    // Check if we have articles in the response
    if (response.data && response.data.articles && response.data.articles.length > 0) {
      console.log(`Found ${response.data.articles.length} news articles for ${sport}`);
      return response.data.articles.slice(0, limit);
    } else {
      console.warn('No articles found in GNews API response, using mock data');
      return getMockNewsData(sport, limit);
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    return getMockNewsData(sport, limit);
  }
};

/**
 * Generate mock news data for demo purposes when an API key is not available
 */
const getMockNewsData = (sport: string, limit: number): NewsArticle[] => {
  const baseArticles: NewsArticle[] = [
    {
      title: `Latest ${sport} trends for enthusiasts`,
      description: `Discover what's new in the world of ${sport.toLowerCase()} and how it can enhance your experience.`,
      content: `Discover what's new in the world of ${sport.toLowerCase()} and how it can enhance your experience. Modern techniques, equipment innovations, and training methodologies are revolutionizing the sport.`,
      url: '#',
      image: 'https://via.placeholder.com/300x150',
      publishedAt: new Date().toISOString(),
      source: { name: 'Sports Today', url: 'https://sportstoday.example.com' }
    },
    {
      title: `Health benefits of ${sport} revealed in new study`,
      description: `Research shows that regular ${sport.toLowerCase()} activity can significantly improve both physical and mental health.`,
      content: `A new comprehensive study published in the Journal of Sports Medicine shows that regular ${sport.toLowerCase()} activity can significantly improve both physical and mental health, with benefits ranging from improved cardiovascular health to reduced stress levels.`,
      url: '#',
      image: 'https://via.placeholder.com/300x150',
      source: { name: 'Health & Fitness', url: 'https://healthfitness.example.com' },
      publishedAt: new Date().toISOString()
    },
    {
      title: `Top 5 ${sport} destinations around the world`,
      description: `Explore the most beautiful and challenging locations for ${sport.toLowerCase()} enthusiasts across the globe.`,
      content: `Explore the most beautiful and challenging locations for ${sport.toLowerCase()} enthusiasts across the globe. From the scenic routes of the Alps to the challenging trails of New Zealand, these destinations offer unforgettable experiences.`,
      url: '#',
      image: 'https://via.placeholder.com/300x150',
      source: { name: 'Travel & Adventure', url: 'https://travelandadventure.example.com' },
      publishedAt: new Date().toISOString()
    },
    {
      title: `Essential gear for ${sport} in 2025`,
      description: `The latest equipment and accessories that every ${sport.toLowerCase()} fan should consider this year.`,
      content: `The latest equipment and accessories that every ${sport.toLowerCase()} fan should consider this year. From high-tech wearables to environmentally friendly apparel, these innovations are changing how people approach the sport.`,
      url: '#',
      image: 'https://via.placeholder.com/300x150',
      source: { name: 'Gear Review', url: 'https://gearreview.example.com' },
      publishedAt: new Date().toISOString()
    },
    {
      title: `${sport} championship highlights from this weekend`,
      description: `Recap of the exciting moments from the recent ${sport.toLowerCase()} competitions around the world.`,
      content: `Recap of the exciting moments from the recent ${sport.toLowerCase()} competitions around the world. The championship saw record-breaking performances and unexpected upsets that have reshaped rankings globally.`,
      url: '#',
      image: 'https://via.placeholder.com/300x150',
      source: { name: 'Sports Network', url: 'https://sportsnetwork.example.com' },
      publishedAt: new Date().toISOString()
    }
  ];
  
  return baseArticles.slice(0, limit);
};
