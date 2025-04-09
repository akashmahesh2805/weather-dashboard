function getIcon(code) {
    // Map Open-Meteo weather codes to icon filenames
    const map = {
      0: '/assets/sun.png',
      1: '/assets/sun.png',
      2: '/assets/cloud.png',
      3: '/assets/cloud.png',
      45: '/assets/fog.png',
      48: '/assets/fog.png',
      51: '/assets/rain.png',
      61: '/assets/rain.png',
      63: '/assets/rain.png',
      65: '/assets/rain.png',
      71: '/assets/snow.png',
      80: '/assets/rain.png',
      95: '/assets/storm.png'
    };
    return map[code] || '/assets/cloud.png';
  }
  
  async function getWeather() {
    const city = document.getElementById("city").value || "New York";
  
    const res = await fetch(`/api/weather?city=${city}`);
    const data = await res.json();
  
    if (data.error) {
      document.getElementById("weather-card").innerHTML = `<p>${data.error}</p>`;
      return;
    }
  
    const current = data.current;
    const daily = data.daily;
  
    let html = `
      <div class="weather-info">
        <h2>${data.city}, ${data.country}</h2>
        <img src="${getIcon(current.weathercode)}" />
        <p><strong>${current.temperature}°C</strong> | Wind: ${current.windspeed} km/h</p>
      </div>
  
      <h3>Next 5 Days Forecast</h3>
      <div class="weather-forecast">
    `;
  
    for (let i = 0; i < 5; i++) {
      html += `
        <div class="forecast-day">
          <p><strong>${daily.time[i]}</strong></p>
          <img src="${getIcon(daily.weathercode[i])}" />
          <p>${daily.temperature_2m_min[i]}°C - ${daily.temperature_2m_max[i]}°C</p>
        </div>
      `;
    }
  
    html += `</div>`;
    document.getElementById("weather-card").innerHTML = html;
  }
  