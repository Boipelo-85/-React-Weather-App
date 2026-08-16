// import { Text } from '../Text/Text';

interface ForecastItemData {
  day: string;
  temperature: number;
  icon: string;
}

interface DailyForecastItemProps {
  forecastData?: ForecastItemData[];
}



export const DailyForecastItem: React.FC<DailyForecastItemProps> = ({ forecastData = [] }) => {


  const defaultForecastData: ForecastItemData[] = [
    { day: 'Today', temperature: 22, icon: '☁️' },
    { day: 'Thu', temperature: 18, icon: '☀️' },
    { day: 'Fri', temperature: 19, icon: '☁️' },
    { day: 'Sat', temperature: 19, icon: '☀️' },
    { day: 'Sun', temperature: 21, icon: '☀️' },
    { day: 'Mon', temperature: 22, icon: '☀️' },
    { day: 'Tue', temperature: 23, icon: '☀️' },
    { day: 'Wed', temperature: 23, icon: '☀️' },
  ];

  // const items = forecastData.length > 0 ? forecastData : defaultForecastData;

  return (
    <div className='forecast-row'>
      {/* {items.map((item, index) => {
        const isToday = item.day === 'Today';

        return ( 
          <div
            key={`${item.day}-${index}`}
            className={`forecast-pill ${isToday ? 'forecast-pill--today' : 'forecast-pill--standard'}`}
          >
            <div className='forecast-pill-content'>
              <Text variant={'span'} style={{ fontSize: '17px', fontWeight: 700 }}>
                {item.day} {item.temperature}
              </Text>
              <span className='forecast-icon'>{item.icon}</span>
            </div>
          </div>
        );
      })} */}
    </div>
  );
};
