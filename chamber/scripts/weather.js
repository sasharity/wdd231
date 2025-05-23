

const apiKey = '2d4da22b568436fcf7b5811f5290e5bf'; 
const lat = 6.52;  
const lon = 3.39; 
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat=6.52&lon=3.39&exclude=minutely,hourly,alerts&units=imperial&appid=2d4da22b568436fcf7b5811f5290e5bf';

async function getWeatherData() {
  try {
    const response = await fetch(weatherURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (!data.current) {
      throw new Error("No current weather data available");
    }

    const current = data.current;

    document.getElementById('currentWeather').innerHTML = `
      ${current.weather[0].description}<br>
      Temp: ${current.temp}°F
    `;

    // ...rest of your forecast code

  } catch (error) {
    console.error('Weather fetch error:', error);
    document.getElementById('currentWeather').textContent = "Unable to fetch weather.";
  }
}
