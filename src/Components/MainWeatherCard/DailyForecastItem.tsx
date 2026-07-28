import { Text } from '../Text/Text';

interface DailyForecastItemProps {
  day: string;
  date: string;
  weather: string;
  temperature: number;
  icon?: string;
}

export const DailyForecastItem = ({ day, date, weather, temperature, icon }: DailyForecastItemProps) => {
  return (
    <div className='daily-forecast-item'>
      <div className='forecast-day-info'>
        <Text variant={'span'} style={{fontWeight: 600}}>{day}</Text>
        <Text variant={'span'} style={{opacity: 0.7}}>{date}</Text>
      </div>
      <div className='forecast-weather'>
        <div className='weather-icon'>{icon || '☁️'}</div>
        <Text variant={'span'} style={{opacity: 0.9}}>{weather}</Text>
      </div>
      <Text variant={'span'} style={{fontWeight: 600}}>{temperature}°</Text>
    </div>
  );
};
