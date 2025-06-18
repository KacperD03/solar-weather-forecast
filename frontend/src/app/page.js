'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [weatherData, setWeatherData] = useState([]);
  const [summaryData, setSummaryData] = useState({});
  const [location, setLocation] = useState({ lat: 52.2298, lon: 21.0118 });

  useEffect(() => {

    const fetchWeatherData = async () => {
      const weatherResponse = await axios.get(`http://localhost:5000/weather`, {
        params: { lat: location.lat, lon: location.lon }
      });
      setWeatherData(weatherResponse.data);
      
      const summaryResponse = await axios.get(`http://localhost:5000/summary`, {
        params: { lat: location.lat, lon: location.lon }
      });
      setSummaryData(summaryResponse.data);
    };

    fetchWeatherData();
  }, [location]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Prognoza Pogody i Produkcja Energii</h1>
        <div className="flex flex-col gap-8 items-center sm:items-start">
          <h2 className="text-xl font-medium">7-dniowa Prognoza</h2>
          <table className="table-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Data</th>
                <th className="border px-4 py-2">Min Temp</th>
                <th className="border px-4 py-2">Max Temp</th>
                <th className="border px-4 py-2">Energia (kWh)</th>
              </tr>
            </thead>
            <tbody>
              {weatherData.map((day, idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{day.date}</td>
                  <td className="border px-4 py-2">{day.minTemp}°C</td>
                  <td className="border px-4 py-2">{day.maxTemp}°C</td>
                  <td className="border px-4 py-2">{day.energy} kWh</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="mt-12">
          <h3 className="text-lg font-medium">Podsumowanie tygodnia</h3>
          <p>Średnie ciśnienie: {summaryData.avgPressure} hPa</p>
          <p>Średni czas ekspozycji na słońce: {summaryData.avgSunshine} h</p>
          <p>Skrajne temperatury: {summaryData.minTemp}°C - {summaryData.maxTemp}°C</p>
          <p>Podsumowanie: {summaryData.weatherSummary}</p>
        </footer>
      </main>
    </div>
  );
}
