import { useState } from 'react';

interface WeatherData {
  temperature: number;
  condition: string;
  windSpeed: number;
  windDirection: string;
  humidity: number;
  location: string;
}

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (location: string) => {
    setLoading(true);
    setError(null);

    try {
      // Placeholder for actual API call
      // Replace with actual weather API integration
      const mockData: WeatherData = {
        temperature: 26,
        condition: 'Overcast cloudy',
        windSpeed: 12.5,
        windDirection: 'Southwest',
        humidity: 65,
        location: location
      };

      setWeatherData(mockData);
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return { weatherData, loading, error, fetchWeather };
};
