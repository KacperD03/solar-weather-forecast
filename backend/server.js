const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());  // Pozwala na CORS, żeby frontend mógł się łączyć z backendem

// Endpoint do 7-dniowej prognozy
app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const weatherResponse = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: lat,
        longitude: lon,
        daily: 'temperature_2m_min,temperature_2m_max,precipitation_sum,sunshine_duration', // Usunięto `pressure_mean`
        timezone: 'Europe/Warsaw',
      }
    });

    const data = weatherResponse.data.daily;

    console.log('API response data:', data);  // Logowanie odpowiedzi z API

    // Sprawdzamy, czy odpowiedź zawiera odpowiednie dane
    const weatherData = data.time.map((date, idx) => {
      const energy = (2.5 * data.sunshine_duration[idx] / 3600 * 0.2).toFixed(2); // Przelicza energię na kWh
      return {
        date: date,
        minTemp: data.temperature_2m_min[idx],
        maxTemp: data.temperature_2m_max[idx],
        energy: energy,
        weatherCode: data.precipitation_sum[idx] > 0 ? 'Rainy' : 'Clear', // Prosty przykład na podstawie opadów
      };
    });

    res.json(weatherData); // Zwrócenie danych w formacie JSON
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Endpoint do podsumowania tygodnia
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
        daily: 'temperature_2m_min,temperature_2m_max,sunshine_duration,precipitation_sum', // Usunięto `pressure_mean`
        timezone: 'Europe/Warsaw',
      }
    });

    const data = response.data.daily;

    const avgSunshine = data.sunshine_duration.reduce((acc, day) => acc + day, 0) / data.sunshine_duration.length;
    const minTemp = Math.min(...data.temperature_2m_min);
    const maxTemp = Math.max(...data.temperature_2m_max);
    const hasRain = data.precipitation_sum.some(day => day > 0);

    res.json({
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
