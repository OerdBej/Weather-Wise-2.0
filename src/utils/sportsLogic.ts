//The real feel temp variables
const tempStartValue: number = 26;
const totalTempDif: number = 12;
const tempStartRate: number = 3; 

//The wind variables
const totalWindDif: number = 20;
const windStartValue: number = 6;
const windStartRate: number = 3;

//The probability of rain variables
const popStartValue: number = 0;
const totalPopDif: number = 0.6;
const popStartRate: number = 3;

//The UV Index variables
const uvStartValue: number = 0;
const totalUvDif: number = 6;
const uvStartRate: number = 1;

//The function that controls the percentage rating system set-up - can be used for all weather parameters
const master = (
  currentWeather: number, 
  rangeStart: number, 
  totalDif: number, 
  StartRate: number
): number => {
  let increase: number = currentWeather - rangeStart;
  let increasePer: number = increase/totalDif;
  let reduction: number = (StartRate * increasePer);
  let newRate: number = (StartRate - reduction);

  return newRate;
};

export const getCyclingStatus = (
  weatherFeelsLike: number, 
  weatherWindSpeed: number, 
  weatherPop: number, 
  weatherUv: number
): number => {
  let tempFinRate: number = weatherFeelsLike > tempStartValue 
    ? master(weatherFeelsLike, tempStartValue, totalTempDif, tempStartRate) 
    : tempStartRate;

  let windFinRate: number = weatherWindSpeed > windStartValue 
    ? master(weatherWindSpeed, windStartValue, totalWindDif, windStartRate) 
    : windStartRate;

  let popFinRate: number = master(weatherPop, popStartValue, totalPopDif, popStartRate);

  let uvFinRate: number = master(weatherUv, uvStartValue, totalUvDif, uvStartRate);

  // Make sure all rates are valid numbers
  if (isNaN(tempFinRate) || isNaN(windFinRate) || isNaN(popFinRate) || isNaN(uvFinRate)) {
    console.error('Invalid rating calculation parameters', { tempFinRate, windFinRate, popFinRate, uvFinRate });
    return 5; // Return a moderate default rating if calculation fails
  }
  
  // Calculate total and ensure it's within 0-10 range
  const totalRate: number = tempFinRate + windFinRate + popFinRate + uvFinRate;
  const normalizedRate = Math.min(10, Math.max(0, totalRate));
  
  console.log('Weather rating calculated:', { 
    temp: tempFinRate, 
    wind: windFinRate, 
    rain: popFinRate, 
    uv: uvFinRate, 
    total: normalizedRate 
  });

  return Number(normalizedRate.toFixed(0));
};
