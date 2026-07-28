import { useState } from 'react';
import { Text } from './Components/Text/Text';

interface SavedLocation {
  name: string;
  temperature: number;
  condition: string;
}

export const SavedLocation = () => {
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([
    { name: 'New York', temperature: 22, condition: 'Sunny' },
    { name: 'London', temperature: 15, condition: 'Cloudy' },
    { name: 'Tokyo', temperature: 28, condition: 'Partly Cloudy' },
  ]);

  const removeLocation = (index: number) => {
    setSavedLocations(savedLocations.filter((_, i) => i !== index));
  };

  return (
    <div className='saved-locations'>
      <Text variant={'h3'} style={{marginBottom: '16px'}}>Saved Locations</Text>
      <div className='locations-list'>
        {savedLocations.map((location, index) => (
          <div key={index} className='location-item'>
            <div className='location-info'>
              <Text variant={'span'} style={{fontWeight: 600}}>{location.name}</Text>
              <Text variant={'span'} style={{opacity: 0.8}}>{location.condition}</Text>
            </div>
            <div className='location-temp'>
              <Text variant={'span'} style={{fontWeight: 600}}>{location.temperature}°</Text>
              <button 
                className='remove-btn'
                onClick={() => removeLocation(index)}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
