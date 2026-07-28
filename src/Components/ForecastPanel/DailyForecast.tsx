import { Text } from '../Text/Text';

interface DailyForecastProps {
  day: string;
  date: string;
  highTemp: number;
  lowTemp: number;
  condition: string;
}

export const DailyForecast = ({ day, date, highTemp, lowTemp, condition }: DailyForecastProps) => {
  return (
    <div className='daily-forecast'>
      <div className='forecast-date'>
        <Text variant={'span'} style={{fontWeight: 600}}>{day}</Text>
        <Text variant={'span'} style={{opacity: 0.7}}>{date}</Text>
      </div>
      <div className='forecast-temps'>
        <Text variant={'span'}>{highTemp}°</Text>
        <Text variant={'span'} style={{opacity: 0.6}}>{lowTemp}°</Text>
      </div>
      <Text variant={'span'} style={{opacity: 0.9}}>{condition}</Text>
    </div>
  );
};
