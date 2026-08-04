import { useState } from 'react';
import { Text } from '../Text/Text';



export const DailyForecastItem = () =>  {

  const forecastData = [

        {day : 'Monday',temperature:'29',icon:'☀️'},
        {day : 'Monday',temperature:'29',icon:'⛅'},
        {day : 'Monday',temperature:'29',icon:'☀️'},
        {day : 'Monday',temperature:'29',icon:'☀️'}
  ]

  return (
    
      <>
          <div>
              <Text variant={'h3'}> Forecast days </Text>
          </div>
      </>
      
  )
};
