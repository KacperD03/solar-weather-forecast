'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [weatherData, setWeatherData] = useState([]);
  const [summaryData, setSummaryData] = useState({});
  const [location, setLocation] = useState({ lat: 52.1111, lon: 22.2222 });

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
    <div className="bg-gradient-to-br from-indigo-200 via-purple-200 to-blue-200 min-h-screen flex flex-col justify-start items-center p-4">
      <main className="max-w-screen-lg mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-extrabold text-center text-indigo-800 mb-6">
          Prognoza Pogody i Produkcja Energii
        </h1>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">7-dniowa Prognoza</h2>
          <div className="overflow-x-auto bg-gray-100 p-4 rounded-lg shadow-md">
            <table className="min-w-full bg-white text-center rounded-lg shadow-md">
              <thead>
                <tr className="bg-indigo-600 text-white text-lg">
                  <th className="py-3 px-4">Data</th>
                  <th className="py-3 px-4">Min Temp</th>
                  <th className="py-3 px-4">Max Temp</th>
                  <th className="py-3 px-4">Energia (kWh)</th>
                </tr>
              </thead>
              <tbody>
                {weatherData.map((day, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-gray-300 hover:bg-indigo-50 transition-all duration-200"
                  >
                    <td className="py-3 px-4">{day.date}</td>
                    <td className="py-3 px-4">{day.minTemp}°C</td>
                    <td className="py-3 px-4">{day.maxTemp}°C</td>
                    <td className="py-3 px-4">{day.energy} kWh</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <footer className="bg-indigo-700 text-white p-4 rounded-lg mt-8 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Podsumowanie tygodnia</h3>
          <p className="mb-2">Średnie ciśnienie: {summaryData.avgPressure} hPa</p>
          <p className="mb-2">Średni czas ekspozycji na słońce: {summaryData.avgSunshineFixed} h</p>
          <p className="mb-2">Skrajne temperatury: {summaryData.minTemp}°C - {summaryData.maxTemp}°C</p>
          <p className="text-lg font-semibold">{summaryData.weatherSummary}</p>
        </footer>
      </main>
    </div>
  );
}
