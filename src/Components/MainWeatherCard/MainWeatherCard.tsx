import { useState } from 'react'

import { Text } from '../Text/Text';
// import { DailyForecastItem } from './DailyForecastItem';
import cloudyPicture from '../../assets/cloudy.jpg'


export const MainWeatherCard = () => {

    

    // const forecastData = [
    //     { day: 'Thursday', date: 'Dec 12', weather: 'Partly Cloudy', temperature: 29, icon: '⛅' },
    //     { day: 'Friday', date: 'Dec 13', weather: 'Mostly Cloudy', temperature: 26, icon: '☁️' },
    //     { day: 'Saturday', date: 'Dec 14', weather: 'Light Rain', temperature: 23, icon: '🌧️' },
    //     { day: 'Sunday', date: 'Dec 15', weather: 'Partly Sunny', temperature: 27, icon: '⛅' },
    //     { day: 'Monday', date: 'Dec 16', weather: 'Partly Cloudy', temperature: 26, icon: '⛅' },
        
    // ]


    return (

        <>
        <div className='main-weather-card'>

             <div className='Hourly-forecast'>
                            <Text variant={'span'}> Current Location</Text>
                             <Text variant={'h3'}> Weather Forecast</Text>
                             <Text variant={'h1'}> Overcast cloudy </Text>
                             <Text variant={'h3'}> Overcast sky with muted grey - calm ,soft ,quiet</Text>
                </div> 
        </div>
        
                  <div className='weatherDisplay'>

                            <img src={cloudyPicture} alt="cloudy picture" className='weatherPic'/>

                  </div>
   
        </>
        

    )
}
