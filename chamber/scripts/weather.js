

const apiKey = '2d4da22b568436fcf7b5811f5290e5bf'; 
const city = 'Lagos';  
const units = 'metric';

const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

async function getWeather() {
  try {
    // Fetch current weather
    const currentResponse = await fetch(currentWeatherURL);
    if (!currentResponse.ok) throw new Error('Failed to fetch current weather');
    const currentData = await currentResponse.json();

    // Display current weather
    document.getElementById('currentWeather').innerHTML = `
      <p>${currentData.weather[0].description}</p>
      <p>Temperature: ${currentData.main.temp.toFixed(1)}°${units === 'imperial' ? 'F' : 'C'}</p>
    `;

    // Fetch forecast
    const forecastResponse = await fetch(forecastURL);
    if (!forecastResponse.ok) throw new Error('Failed to fetch forecast');
    const forecastData = await forecastResponse.json();

    const forecastEl = document.getElementById('weatherForecast');
    forecastEl.innerHTML = '<h3>3-Day Forecast</h3>';

    // Group forecast by date
    const days = {};
    forecastData.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!days[date]) days[date] = [];
      days[date].push(item);
    });

    const today = new Date().toISOString().split('T')[0];
    let dayCount = 0;

    for (const date in days) {
      if (date <= today) continue;
      if (dayCount >= 3) break;

      // Find forecast closest to 12:00
      const noonForecast = days[date].find(f => f.dt_txt.includes('12:00:00')) || days[date][0];

      // Find min and max temps for the day
      const temps = days[date].map(f => f.main.temp);
      const tempMin = Math.min(...temps);
      const tempMax = Math.max(...temps);

      const options = { weekday: 'long', month: 'short', day: 'numeric' };
      const dayName = new Date(date).toLocaleDateString(undefined, options);
      const temp = noonForecast.main.temp.toFixed(1);
      const desc = noonForecast.weather[0].description;

      forecastEl.innerHTML += `
        <p><strong>${dayName}:</strong> ${temp}°${units === 'imperial' ? 'F' : 'C'}, ${desc} <br>
        High: ${tempMax.toFixed(1)}°, Low: ${tempMin.toFixed(1)}°</p>
      `;

      dayCount++;
    }

  } catch (error) {
    console.error('Weather fetch error:', error);
    document.getElementById('currentWeather').textContent = 'Unable to fetch weather.';
  }
}

getWeather();
