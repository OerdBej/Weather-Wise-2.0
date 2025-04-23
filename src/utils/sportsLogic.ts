// Weather parameter rating function - calculates a rating component for each parameter
const calculateRating = (
  currentValue: number, 
  optimalValue: number, 
  totalRange: number, 
  maxContribution: number,
  inversed: boolean = false
): number => {
  // Calculate difference from optimal
  let difference: number = inversed ? 
    (optimalValue - currentValue) : // For cases where higher is better (like visibility)
    (currentValue - optimalValue);  // For cases where lower is better (like wind)
  
  // If value is better than optimal, give full points
  if (difference <= 0 && !inversed) return maxContribution;
  if (difference >= 0 && inversed) return maxContribution;
  
  // Calculate percentage reduction in points
  let percentageReduction: number = Math.min(difference / totalRange, 1);
  let finalRating: number = maxContribution * (1 - percentageReduction);
  
  return Math.max(0, finalRating); // Ensure non-negative
};

// Sport-specific parameters
const PARAMETERS = {
  cycling: {
    temperature: { optimal: 21, range: 15, weight: 3 },   // 15-27°C ideal, very sensitive
    wind: { optimal: 2, range: 15, weight: 4 },          // Very sensitive to wind
    precipitation: { optimal: 0, range: 0.5, weight: 3 }, // Very sensitive to rain
    uvIndex: { optimal: 2, range: 8, weight: 1 },         // Less sensitive to UV
    humidity: { optimal: 50, range: 40, weight: 1 },      // Mild sensitivity to humidity
    visibility: { optimal: 10, range: 7, weight: 1, inversed: true }, // Some sensitivity to visibility
  },
  hiking: {
    temperature: { optimal: 18, range: 20, weight: 2 },   // 10-25°C ideal, less sensitive
    wind: { optimal: 5, range: 20, weight: 1 },          // Less sensitive to wind
    precipitation: { optimal: 0, range: 0.4, weight: 4 }, // Very sensitive to rain
    uvIndex: { optimal: 3, range: 7, weight: 2 },         // More sensitive to UV due to exposure
    humidity: { optimal: 60, range: 50, weight: 1 },      // Some sensitivity to humidity
    visibility: { optimal: 15, range: 10, weight: 3, inversed: true }, // Very sensitive to visibility
  },
  swimming: {
    temperature: { optimal: 27, range: 10, weight: 3 },   // 25-30°C ideal for air temp
    waterTemp: { optimal: 25, range: 8, weight: 5 },     // Critical factor
    wind: { optimal: 3, range: 25, weight: 1 },          // Less important
    precipitation: { optimal: 0, range: 0.7, weight: 2 }, // Moderate sensitivity (you're already wet)
    uvIndex: { optimal: 2, range: 5, weight: 3 },         // Very sensitive due to water reflection
    humidity: { optimal: 65, range: 40, weight: 0.5 },    // Minor factor
    visibility: { optimal: 8, range: 7, weight: 1, inversed: true }, // Some importance
  }
};

// Function to determine which sport algorithm to use
export const getSportRating = (
  sport: string,
  weatherData: {
    feelsLike: number,
    windSpeed: number, 
    precipitation: number, 
    uvIndex: number,
    humidity?: number,
    visibility?: number,
    waterTemp?: number
  }
): number => {
  // Default to cycling if sport not found
  const sportKey = sport.toLowerCase() in PARAMETERS ? 
    sport.toLowerCase() : 
    'cycling';
  
  const params = PARAMETERS[sportKey as keyof typeof PARAMETERS];
  
  // Calculate individual ratings
  const ratings: Record<string, number> = {};
  let totalWeight = 0;
  let totalWeightedRating = 0;
  
  // Process each parameter if data is available
  if ('temperature' in params && weatherData.feelsLike !== undefined) {
    const p = params.temperature;
    ratings.temperature = calculateRating(weatherData.feelsLike, p.optimal, p.range, p.weight);
    totalWeight += p.weight;
    totalWeightedRating += ratings.temperature;
  }
  
  if ('wind' in params && weatherData.windSpeed !== undefined) {
    const p = params.wind;
    ratings.wind = calculateRating(weatherData.windSpeed, p.optimal, p.range, p.weight);
    totalWeight += p.weight;
    totalWeightedRating += ratings.wind;
  }
  
  if ('precipitation' in params && weatherData.precipitation !== undefined) {
    const p = params.precipitation;
    ratings.precipitation = calculateRating(weatherData.precipitation, p.optimal, p.range, p.weight);
    totalWeight += p.weight;
    totalWeightedRating += ratings.precipitation;
  }
  
  if ('uvIndex' in params && weatherData.uvIndex !== undefined) {
    const p = params.uvIndex;
    ratings.uvIndex = calculateRating(weatherData.uvIndex, p.optimal, p.range, p.weight);
    totalWeight += p.weight;
    totalWeightedRating += ratings.uvIndex;
  }
  
  if ('humidity' in params && weatherData.humidity !== undefined) {
    const p = params.humidity;
    ratings.humidity = calculateRating(weatherData.humidity, p.optimal, p.range, p.weight);
    totalWeight += p.weight;
    totalWeightedRating += ratings.humidity;
  }
  
  if ('visibility' in params && weatherData.visibility !== undefined) {
    const p = params.visibility;
    ratings.visibility = calculateRating(weatherData.visibility, p.optimal, p.range, p.weight, p.inversed);
    totalWeight += p.weight;
    totalWeightedRating += ratings.visibility;
  }
  
  if ('waterTemp' in params && weatherData.waterTemp !== undefined) {
    const p = params.waterTemp;
    ratings.waterTemp = calculateRating(weatherData.waterTemp, p.optimal, p.range, p.weight);
    totalWeight += p.weight;
    totalWeightedRating += ratings.waterTemp;
  }
  
  // Normalize to 0-10 scale based on maximum possible score
  const maxPossibleScore = totalWeight;
  const normalizedScore = (totalWeightedRating / maxPossibleScore) * 10;
  
  // Ensure score is within 0-10 range
  const finalScore = Math.min(10, Math.max(0, normalizedScore));
  
  console.log(`${sport} rating calculated:`, { 
    ratings,
    totalWeight,
    totalWeightedRating,
    normalizedScore,
    finalScore
  });
  
  return Number(finalScore.toFixed(0));
};

// For backwards compatibility
export const getCyclingStatus = (
  weatherFeelsLike: number, 
  weatherWindSpeed: number, 
  weatherPop: number, 
  weatherUv: number
): number => {
  return getSportRating('cycling', {
    feelsLike: weatherFeelsLike,
    windSpeed: weatherWindSpeed,
    precipitation: weatherPop,
    uvIndex: weatherUv
  });
};
