import { Text } from '../Text/Text';

interface TemperatureData {
  time: string;
  temperature: number;
}

interface TemperatureChartProps {
  temperatureData: TemperatureData[];
}

export const TemperatureChart = ({ temperatureData }: TemperatureChartProps) => {
  const maxTemp = Math.max(...temperatureData.map(d => d.temperature));
  const minTemp = Math.min(...temperatureData.map(d => d.temperature));

  return (
    <div className='temperature-chart'>
      <Text variant={'h3'} style={{marginBottom: '16px'}}>Temperature Trend</Text>
      <div className='chart-container'>
        <div className='chart-bars'>
          {temperatureData.map((data, index) => {
            const height = ((data.temperature - minTemp) / (maxTemp - minTemp)) * 100;
            return (
              <div key={index} className='chart-bar-wrapper'>
                <div 
                  className='chart-bar'
                  style={{height: `${height}%`}}
                />
                <Text variant={'span'} style={{fontSize: '12px', marginTop: '8px'}}>
                  {data.time}
                </Text>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
