const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());


app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: lat,
        longitude: lon,
        daily: 'temperature_2m_min,temperature_2m_max,precipitation_sum,sunshine_duration',
        timezone: 'Europe/Warsaw',
      }
    });

    const data = response.data.daily;
    
    const energyData = data.map(day => {
      const energy = (2.5 * day.sunshine_duration / 3600 * 0.2).toFixed(2);
      return {
        date: day.time,
        minTemp: day.temperature_2m_min,
        maxTemp: day.temperature_2m_max,
        energy: energy,
        weatherCode: day.weathercode,
      };
    });

    res.json(energyData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});


app.get('/summary', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: lat,
        longitude: lon,
        daily: 'temperature_2m_min,temperature_2m_max,pressure_mean,sunshine_duration,precipitation_sum',
        timezone: 'Europe/Warsaw', 
      }
    });

    const data = response.data.daily;
    
    const avgPressure = data.reduce((acc, day) => acc + day.pressure_mean, 0) / data.length;
    const avgSunshine = data.reduce((acc, day) => acc + day.sunshine_duration, 0) / data.length;
    const minTemp = Math.min(...data.map(day => day.temperature_2m_min));
    const maxTemp = Math.max(...data.map(day => day.temperature_2m_max));
    const hasRain = data.some(day => day.precipitation_sum > 0);

    res.json({
      avgPressure,
      avgSunshine,
      minTemp,
      maxTemp,
      weatherSummary: hasRain ? 'z opadami' : 'bez opadów',
    });
  } catch (error) {
    console.error('Error fetching summary data:', error);
    res.status(500).json({ error: 'Failed to fetch weather summary' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
