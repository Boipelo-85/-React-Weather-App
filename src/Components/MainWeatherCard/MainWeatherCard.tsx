import { useState } from 'react'

import { Text } from '../Text/Text';
import { DailyForecastItem } from './DailyForecastItem';



export const MainWeatherCard = () => {

    const [toggled, setToggled] = useState(0)

    const forecastData = [
        { day: 'Thursday', date: 'Dec 12', weather: 'Partly Cloudy', temperature: 29, icon: '⛅' },
        { day: 'Friday', date: 'Dec 13', weather: 'Mostly Cloudy', temperature: 26, icon: '☁️' },
        { day: 'Saturday', date: 'Dec 14', weather: 'Light Rain', temperature: 23, icon: '🌧️' },
        { day: 'Sunday', date: 'Dec 15', weather: 'Partly Sunny', temperature: 27, icon: '⛅' },
        { day: 'Monday', date: 'Dec 16', weather: 'Partly Cloudy', temperature: 26, icon: '⛅' },
        
    ]

    return (

        <div className='main-weather-card'>

            <div className='card-header'>
                <Text variant={'span'}> Wednesday, December 11 </Text>
                <Text variant={'span'}> 11:00 AM </Text>
            </div>

            <div className='current-weather'>
                <Text variant={'h1'}>26°</Text>
                <Text variant={'span'}>Southwest, 12.5 km/h</Text>
            </div>

            <hr className='divider' />

            <Text variant={'h3'} >The Next Day Forecast</Text>

            <div className='toggle-buttons'>
                <button className={`toggle-btn ${toggled === 0 ? 'active' : ''}`} onClick={() => setToggled(0)}>
                    7 days
                </button>
                <button className={`toggle-btn ${toggled === 1 ? 'active' : ''}`} onClick={() => setToggled(1)}>
                    14 days
                </button>
                <button className={`toggle-btn ${toggled === 2 ? 'active' : ''}`} onClick={() => setToggled(2)}>
                    30 days
                </button>
            </div>

            <div className='daily-forecast-list'>
                {forecastData.map((forecast, index) => (
                    <DailyForecastItem  
                        key={index}
                        day={forecast.day}
                        date={forecast.date}
                        weather={forecast.weather}
                        temperature={forecast.temperature}
                        icon={forecast.icon}
                    />
                ))}
            </div>
        </div>

    )
}
