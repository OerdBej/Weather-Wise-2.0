const master = (currentWeather, rangeStart, totalDif, StartRate) => {
    let increase = currentWeather - rangeStart;
    let increasePer = increase/totalDif;
    let reduction = (StartRate * increasePer).toFixed(2);
    let newRate = StartRate - reduction;
    // eslint-disable-next-line no-unused-expressions
    newRate <= 0 ? newRate= -3 : newRate
    return newRate;
}
// Real Feel Temperature
// The range is between: 26 - 42
const currentTemp = 36;
const tempStartValue = 26;
const totalTempDif = 16;
const tempStartRate = 3; 

let tempFinRate = currentTemp > tempStartValue ? master(currentTemp, tempStartValue, totalTempDif, tempStartRate) : realFeelTempStartRate;
console.log(`The temp rating is ${tempFinRate}`);

//Wind Speed Calculation
//The range is between 12 - 32
const currentWindSpeed = 18;
const totalWindDif = 20;
const windStartValue = 12;
const windStartRate = 3;

let windFinRate = currentWindSpeed > windStartValue ? master(currentWindSpeed, windStartValue, totalWindDif, windStartRate) : tempStartRate;
  console.log(`The wind rating is ${windFinRate}`);

//Probability of Rain
//The range is between 0 - 70
const currentPoP = 0.2;
const popStartValue = 0;
const totalPopDif = 0.7;
const popStartRate = 3;

let popFinRate = currentPoP >= 0.7 ? 0 : master(currentPoP, popStartValue, totalPopDif, popStartRate);
console.log(`The pop rating is ${popFinRate}`);

//UV Index Score
//The range is between 0 - 10
const currentUV = 4;
const uvStartValue = 0;
const totalUVDif = 10;
const uvStartRate = 1;

let uvFinRate = master(currentUV, uvStartValue, totalUVDif, uvStartRate);

console.log(`The UV Index rating is ${uvFinRate}`);

const totalRate = ((tempFinRate + windFinRate + popFinRate + uvFinRate).toFixed(2));

console.log(`The Rating is: ${totalRate}`);

