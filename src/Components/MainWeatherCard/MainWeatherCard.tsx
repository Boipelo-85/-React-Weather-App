import { useCallback, useEffect, useState } from 'react'

import { Text } from '../Text/Text';
// import { DailyForecastItem } from './DailyForecastItem';
import clear_icon from '../../assets/cloud.jpg'
import sunny_icon from '../../assets/sunny_icon.jpg'
import  cloudyy from '../../assets/cloud.jpg'
import rainy_icon from '../../assets/rainy_cloud.jpg'
import sunny_cloud from '../../assets/sunny_cloud.jpg'
import { CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, Legend, ResponsiveContainer } from "recharts";

import axios from "axios";
import moment from "moment";
interface WeatherData {

    wind_speed: number,
    humidity: number,
    visibility: number,
    temperature: number,
    description: string,
    hour: string,



}

interface MainWeatherCardProps {
    city?: string
}

export const MainWeatherCard: React.FC<MainWeatherCardProps> = ({ city }) => {



    // const forecastData = [
    //     { day: 'Thursday', date: 'Dec 12', weather: 'Partly Cloudy', temperature: 29, icon: '⛅' },
    //     { day: 'Friday', date: 'Dec 13', weather: 'Mostly Cloudy', temperature: 26, icon: '☁️' },
    //     { day: 'Saturday', date: 'Dec 14', weather: 'Light Rain', temperature: 23, icon: '🌧️' },
    //     { day: 'Sunday', date: 'Dec 15', weather: 'Partly Sunny', temperature: 27, icon: '⛅' },
    //     { day: 'Monday', date: 'Dec 16', weather: 'Partly Cloudy', temperature: 26, icon: '⛅' },

    // ]

    const [weather, setWeather] = useState<WeatherData[] | null>(null);
    const allIcons = {

            "01d" : clear_icon,
             "01n" : clear_icon,
              "02d" : cloudyy,
               "02n" : cloudyy,
                "03d" : cloudyy,
                 "03n" : cloudyy,
               "04d" : rainy_icon,
                "04n" : rainy_icon,
               "09d" : rainy_icon,
                "09n" : rainy_icon,
                  "010d" : clear_icon,
                "10n" : cloudyy,
                  "13d" : clear_icon,
                "13n" : cloudyy,
              

    }
    const weatherInfo = useCallback(async (city: string) => {
        
// setLoading();

        try {

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
          
            console.log(url);
            

            // const response = await fetch(url)
            // const data = await response.json();
            // console.log(data);
            // const icon = allIcons[data.weather[0].icon] || clear_icon;
              const geoResponse = await axios.get(url);
              const { lat, lon } = geoResponse.data.coord;
              const weatherDescription = geoResponse.data.weather[0].description;

            const response = await axios.get( `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`)
              const data = response.data;

            const maxHours = 24;
             const currentHour = new Date().getHours();
            const formattedData: WeatherData[] = data.hourly.time
                    .slice(currentHour, currentHour + maxHours)
                     .map((time: string, index: number) => ({
                     hour: new Date(time).toLocaleTimeString([], {
                     hour: "2-digit",
                     minute: "2-digit",
                
          }),
             wind_speed: data.hourly.wind_speed_10m[index],
                humidity: data.hourly.relative_humidity_2m[index],
                temperature: Math.floor(data.hourly.temperature_2m[index]),
                description: weatherDescription,
                visibility: 10,
                
        }))
            setWeather(formattedData)

        }catch (error) {

                console.error('Failed to fetch ', error)
        }
    }, [])

    useEffect(() => {
        if (city) {
            weatherInfo(city);
        } else {
            weatherInfo('Polokwane');
        }
    }, [city, weatherInfo])

     const currentWeather = weather && weather.length > 0 ? weather[0] : null;

    return (
        <>
            <div className='main-weather-row'>
                <div className='main-weather-card'>
                    <div className='card-image-container'>
                        <div className='picture-content'>
                            <Text variant={'span'} style={{ color: '#fdfdfd', fontSize: '35px', paddingTop: '170px', paddingRight: '190px', fontFamily: "'Courier New', Courier, monospace" }}>
                                {currentWeather?.temperature ? `${currentWeather.temperature}°C` : '--°C'}
                            </Text>
                            <Text variant={'span'} style={{ color: '#fdfdfd', fontSize: '15px', paddingTop: '170px', paddingLeft: '20px', fontFamily: "'Courier New', Courier, monospace" }}>
                                {currentWeather?.description || 'Loading...'}
                            </Text>
                        </div>
                    </div>

                    <div className='card-content'>
                        <div className='weatherItems'>
                            <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}>Wind</Text>
                            <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}>
                                {currentWeather?.wind_speed ? `${currentWeather.wind_speed} km/hr` : '--'}
                            </Text>
                        </div>
                        <div className='weatherItems'>
                            <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}>Humidity</Text>
                            <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}>
                                {currentWeather?.humidity ? `${currentWeather.humidity}%` : '--%'}
                            </Text>
                        </div>
                        <div className='weatherItems'>
                            <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}>Visibility</Text>
                            <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}>
                                {currentWeather?.visibility ? `${currentWeather.visibility}km` : '10km'}
                            </Text>
                        </div>
                    </div>
                </div>

                <div className='weatherDisplay'>
                <Text variant={'span'} style={{ color: '#000', paddingRight: '350px', fontSize: '20px', fontWeight: 'bold', fontFamily: "'Courier New', Courier, monospace" }}>
                    Hourly forecast
                </Text>

                <div className='hourlyData'>
                     {weather && (
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={weather}>
                            <XAxis dataKey="hour" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="wind_speed" stroke="#8884d8" name="Wind Speed" />
                            <Line type="monotone" dataKey="temperature" stroke="#82ca9d" name="Temperature" />
                            <Line type="monotone" dataKey="humidity" stroke="#dc34ac" name="Humidity" />
                        </LineChart>
                    </ResponsiveContainer>
                )}
                </div>

                <div className='card-content'>
                    {weather && weather.slice(0, 6).map((item, index) => (
                        <div className='weatherItems' key={index}>
                            <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}>
                                {item.hour}
                            </Text>
                            <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}>
                                {item.temperature}°C
                            </Text>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}

