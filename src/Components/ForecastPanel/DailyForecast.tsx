import { Text } from '../Text/Text';

interface DailyForecastProps {
  day: string;
  temperature: number;
  icon: string;
}

export const DailyForecast = ({ day, temperature,icon}: DailyForecastProps) => {
  return (
    <div className='daily-forecast'>
      <div className='forecast-date'>
        <Text variant={'span'} style={{fontWeight: 600}}>{day}</Text>
         <Text variant={'span'}>{temperature}°</Text>
        <Text variant={'span'} style={{opacity: 0.7}}>{icon}</Text>
      </div>
    </div>
  );
};
