import { Text } from './Components/Text/Text';

export type SavedLocationItem = {
  name: string;
  lat?: number;
  lon?: number;
}

export type SavedLocationProps = {
  savedLocations?: SavedLocationItem[];
  onSelect?: (name: string) => void;
  onRemove?: (name: string) => void;
}

export const SavedLocation: React.FC<SavedLocationProps> = ({ savedLocations = [], onSelect, onRemove }) => {
  return (
    <div className='saved-locations' style={{background: '#0f1720', borderRadius: 12, padding: 12, color: '#fff', minWidth: 220}}>
      <Text variant={'h3'} style={{marginBottom: '12px'}}>Saved Locations</Text>
      <div className='locations-list'>
        {savedLocations.length === 0 && (
          <Text variant={'span'} style={{opacity: 0.8}}>No saved locations</Text>
        )}
        {savedLocations.map((location, index) => (
          <div key={index} className='location-item' style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 4px', borderRadius: 8}}>
            <div className='location-info' style={{cursor: 'pointer'}} onClick={() => onSelect && onSelect(location.name)}>
              <Text variant={'span'} style={{fontWeight: 700}}>{location.name}</Text>
              {location.lat != null && (
                <Text variant={'span'} style={{opacity: 0.7, display: 'block', fontSize: 12}}>{location.lat.toFixed(2)}, {location.lon?.toFixed(2)}</Text>
              )}
            </div>
            <div className='location-actions'>
              <button 
                className='remove-btn'
                onClick={() => onRemove && onRemove(location.name)}
                style={{background: 'transparent', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer'}}
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
