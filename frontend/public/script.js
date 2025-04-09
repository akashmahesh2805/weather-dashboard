function getIcon(code) {
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

async function getWeather(cityInput) {
  const city = cityInput || document.getElementById("city").value || "New York";

  const res = await fetch(`/api/weather?city=${city}`);
  const data = await res.json();

  const weatherCard = document.getElementById("weather-card");

  if (data.error) {
    weatherCard.innerHTML = `<p>${data.error}</p>`;
    weatherCard.classList.remove("hidden");
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
  weatherCard.innerHTML = html;
  weatherCard.classList.remove("hidden");
  document.getElementById("suggestions").innerHTML = "";
}

async function fetchSuggestions(query) {
  if (!query) {
    document.getElementById("suggestions").innerHTML = "";
    return;
  }

  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}`);
  const data = await res.json();
  const suggestionsBox = document.getElementById("suggestions");
  suggestionsBox.innerHTML = "";

  if (data.results && data.results.length > 0) {
    data.results.slice(0, 5).forEach((place) => {
      const div = document.createElement("div");
      div.textContent = `${place.name}, ${place.country}`;
      div.onclick = () => {
        document.getElementById("city").value = `${place.name}`;
        getWeather(place.name);
        suggestionsBox.innerHTML = "";
      };
      suggestionsBox.appendChild(div);
    });
  }
}

const input = document.getElementById("city");

input.addEventListener("input", (e) => {
  fetchSuggestions(e.target.value);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    getWeather();
  }
});
