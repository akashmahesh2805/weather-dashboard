const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('frontend'));

app.get('/api/weather', async (req, res) => {
  const city = req.query.city || 'New York';

  try {
    // Get coordinates from city name
    const geoRes = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const place = geoRes.data.results?.[0];

    if (!place) return res.status(404).json({ error: 'City not found' });

    const { latitude, longitude } = place;

    // Fetch weather from Open-Meteo
    const weatherRes = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
      params: {
        latitude,
        longitude,
        daily: 'temperature_2m_max,temperature_2m_min,weathercode',
        current_weather: true,
        timezone: 'auto'
      }
    });

    res.json({
      city: place.name,
      country: place.country,
      current: weatherRes.data.current_weather,
      daily: weatherRes.data.daily
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
