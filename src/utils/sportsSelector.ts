import cyclingImg from '../assets/cyclingImg.png';
import runningImg from '../assets/runningImg.png';

interface SportOption {
  name: string;
  img: string;
  description?: string;
  idealConditions?: string[];
  weatherFactors?: string[];
}

// Placeholder for hiking and swimming images, assuming they'll be added to assets
// We'll import actual images when available, for now we'll reuse existing ones
const hikingImg = runningImg;
const swimmingImg = cyclingImg;

export const sportsOptions: SportOption[] = [
  {
    name: 'Cycling',
    img: cyclingImg,
    description: 'Get insights on the best conditions for cycling in your area',
    idealConditions: [
      'Low wind',
      'Moderate temperature',
      'Dry conditions',
      'Good air quality',
    ],
    weatherFactors: [
      'Wind speed',
      'Temperature',
      'Precipitation',
      'UV index',
      'Air quality',
    ],
  },
  {
    name: 'Hiking',
    img: hikingImg,
    description:
      'Plan the perfect hiking trip with our weather-based recommendations',
    idealConditions: [
      'Clear skies',
      'Moderate temperature',
      'Low precipitation chance',
      'Low humidity',
    ],
    weatherFactors: [
      'Visibility',
      'Temperature',
      'Precipitation chance',
      'UV index',
      'Wind chill',
    ],
  },
  {
    name: 'Swimming',
    img: swimmingImg,
    description: 'Find the best conditions for outdoor swimming activities',
    idealConditions: [
      'Warm temperature',
      'Low wind',
      'No precipitation',
      'High UV protection',
    ],
    weatherFactors: [
      'Water temperature',
      'Air temperature',
      'UV index',
      'Wind speed',
      'Precipitation',
    ],
  },
];
