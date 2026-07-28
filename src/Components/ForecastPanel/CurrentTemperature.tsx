import { Text } from '../Text/Text';

interface CurrentTemperatureProps {
  temperature: number;
  condition: string;
}

export const CurrentTemperature = ({ temperature, condition }: CurrentTemperatureProps) => {
  return (
    <div className='current-temperature'>
      <Text variant={'h1'} style={{fontSize: '72px', fontWeight: 700, margin: 0}}>
        {temperature}°
      </Text>
      <Text variant={'span'} style={{opacity: 0.8}}>{condition}</Text>
    </div>
  );
};
