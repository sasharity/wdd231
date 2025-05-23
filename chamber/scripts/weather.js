

const apiKey = '2d4da22b568436fcf7b5811f5290e5bf'; 
const lat = 6.52;  
const lon = 3.39; 
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=6.52&lon=3.39&exclude=minutely,hourly,alerts&units=metric&appid=2d4da22b568436fcf7b5811f5290e5bf';

async function fetchWeather() {
try {
    const response = await fetch(weatherURL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Weather fetch failed');
    }

    // Access weather info for /weather endpoint
    const weatherDesc = data.weather[0].description;
    const temp = data.main.temp;

    document.getElementById('currentWeather').textContent = `Currently: ${weatherDesc}, ${temp}°F`;

  } catch (error) {
    console.error('Weather fetch error:', error);
    document.getElementById('currentWeather').textContent = "Unable to fetch weather.";
  }
}