import { Text } from '../Text/Text';

interface HourlyData {
  time: string;
  temperature: number;
  icon: string;
}

interface HourlyForecastCardProps {
  hourlyData: HourlyData[];
}

export const HourlyForecastCard = ({ hourlyData }: HourlyForecastCardProps) => {
  return (
    <div className='hourly-forecast-card'>
      <Text variant={'h3'} style={{marginBottom: '16px'}}>Hourly Forecast</Text>
      <div className='hourly-list'>
        {hourlyData.map((hour, index) => (
          <div key={index} className='hourly-item'>
            <Text variant={'span'}>{hour.time}</Text>
            <div className='hourly-icon'>{hour.icon}</div>
            <Text variant={'span'} style={{fontWeight: 600}}>{hour.temperature}°</Text>
          </div>
        ))}
      </div>
    </div>
  );
};
