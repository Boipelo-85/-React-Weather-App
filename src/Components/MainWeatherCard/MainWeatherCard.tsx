import { useCallback, useEffect, useState } from 'react'

import { Text } from '../Text/Text';
// import { DailyForecastItem } from './DailyForecastItem';


interface WeatherData {


    windSpeed: number,
    humidity: string,
    visibility: number
    temperature: number
    description: string

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

    const [weather, setWeather] = useState<WeatherData | null>(null);
    // const allIcons = {

    //         // "01d" : clear_icon

    // }
    const weatherInfo = useCallback(async (city: string) => {

        try {

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url)
            const data = await response.json();
            console.log(data);

            setWeather({

                windSpeed: data.wind.speed,
                humidity: data.main.humidity,
                visibility: data.visibility,
                temperature: Math.floor(data.main.temp),
                description: data.weather[0].description

            })
        } catch (error) {

        }
    }, [])

    useEffect(() => {
        if (city) {
            weatherInfo(city);
        } else {
            weatherInfo('Polokwane');
        }
    }, [city, weatherInfo])
    return (

        <>
            <div className='main-weather-card'>


                <div className='card-image-container'>
                    {/* <img src={cloudyPicture} alt="cloudy picture" className='weatherPic' /> */}
                    <div className='picture-content'>
                        <Text variant={'span'} style={{ color: '#fdfdfd', fontSize: '35px', paddingTop: '170px', paddingRight: '190px', fontFamily: "'Courier New', Courier, monospace" }}> {weather?.temperature}°</Text>
                        <Text variant={'span'} style={{ color: '#fdfdfd', fontSize: '15px', paddingTop: '170px', paddingLeft: '20px', fontFamily: "'Courier New', Courier, monospace" }}> {weather?.description}</Text>

                    </div>
                </div>

                <div className='card-content'>
                    <div className='weatherItems'>

                        <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}>Wind</Text>
                        <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}>{weather?.windSpeed}km/hr</Text>
                    </div>
                    <div className='weatherItems'>
                        <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}> Humidity </Text>
                        <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}>{weather?.humidity}%</Text>

                    </div>
                    <div className='weatherItems'>
                        <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}> Visibility </Text>
                        <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}>{weather?.visibility}km</Text>
                    </div>
                </div>

            </div>

            <div className='weatherDisplay'>

                <Text variant={'span'} style={{ color: '#000', paddingRight: '350px', fontSize: '20px', fontWeight: 'bold', fontFamily: "'Courier New', Courier, monospace" }}> Hourly forecast </Text>

                <div className='hourlyData'>


                    <Text variant={'h3'}> Weather Forecast</Text>
                    <Text variant={'h1'}> Overcast cloudy </Text>
                    <Text variant={'h3'}> Overcast sky with muted grey - calm ,soft ,quiet</Text>
                    <Text variant={'h1'}> Overcast cloudy </Text>
                    <Text variant={'h3'}> Overcast sky with muted grey - calm ,soft ,quiet</Text>
                </div>
                <div className='card-content'>

                     <div className='weatherItems'>

                    <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}>Wind</Text>
                    <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}>{weather?.windSpeed}km/hr</Text>
                </div>
                <div className='weatherItems'>
                    <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}> Humidity </Text>
                    <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}>{weather?.humidity}%</Text>

                </div>
                <div className='weatherItems'>
                    <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}> Visibility </Text>
                    <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}>{weather?.visibility}km</Text>
                </div>
                  <div className='weatherItems'>
                    <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}> Visibility </Text>
                    <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}>{weather?.visibility}km</Text>
                </div>
                  <div className='weatherItems'>
                    <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}> Visibility </Text>
                    <Text variant={'h3'} style={{ color: '#000', fontSize: '10px' }}>{weather?.visibility}km</Text>
                </div>

                </div>

               

            </div>

        </>

    )
}
