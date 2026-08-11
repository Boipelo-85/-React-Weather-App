import { Text } from '../Text/Text';
import { FaLocationDot } from 'react-icons/fa6';
import searchLoogo from '../../assets/searchbar.png'
import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { SavedLocation } from '../../SavedLocation';

interface WeatherData {
    
  location: string,
  country : string
}

export type SearchProp = {

  value: string,
  onChange: (value: string) => void,
  onSearch: (city: string) => void,
  onSuggestSave?: (loc: {name: string; lat: number; lon: number}) => void,
  savedLocations?: {name: string; lat: number; lon: number}[],
  onSelectSaved?: (name: string) => void,
  onRemoveSaved?: (name: string) => void,
  activeCity?: string
}

export const SearchBar: React.FC<SearchProp> = ({ value, onChange, onSearch, onSuggestSave, savedLocations = [], onSelectSaved, onRemoveSaved, activeCity }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const weatherSearch = async (city: string, promptSave = true) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url)
      const data = await response.json();
      console.log(data);

      setWeather({ location: data.name,
                country : data.sys.country
      })

      if (promptSave) {
        onSearch(city)
        onChange('');
        if (data && data.coord && typeof onSuggestSave === 'function') {
          onSuggestSave({ name: data.name, lat: data.coord.lat, lon: data.coord.lon });
        }
      }

    } catch (error) {
      console.error('Search failed', error);
    }
  }

  // When an active city is provided (e.g., selected from saved list), fetch its weather without prompting to save
  
  useEffect(() => {
    if (activeCity) {
      weatherSearch(activeCity, false);
    }
  }, [activeCity]);

  return (
    <div>
      <nav className='nav'>
        <div className='Heading-items'>
          <Text variant={'span'} style={{ color: '#fdfdfd', fontWeight: 'bold', fontSize: '30px', paddingRight: '10px', paddingLeft: '5px', fontFamily: "'Courier New', Courier, monospace" }}>Weather forecast</Text>
          <Text variant={'span'} style={{ paddingRight: '90px'}}><ThemeToggle /></Text>

          <Text variant={'span'} style={{ color: '#fdfdfd', paddingRight: '5px', fontFamily: "'Courier New', Courier, monospace", fontSize: '20px' }}> <FaLocationDot className='location' />{weather?.location},{weather?.country}</Text>

          <div className='search-controls'>
            <img src={searchLoogo} alt='search logo' className='search-logo' onClick={() => weatherSearch(inputRef.current?.value || '')} />
            <input type="text" ref={inputRef} className='search-bar' placeholder='Search City' value={value} onChange={(e) => onChange(e.target.value)} />
          </div>

          <div className='humbuger-button'>
            <button
              type='button'
              onClick={() => setMenuOpen(prev => !prev)}
              className='OuterButtonBugger'
            >
              ☰
            </button>
            {menuOpen && (
              <div className='openButton'>
                <div style={{padding: '8px'}}>
                  <SavedLocation
                    savedLocations={savedLocations}
                    onSelect={name => { setMenuOpen(false); onSelectSaved && onSelectSaved(name); }}
                    onRemove={name => onRemoveSaved && onRemoveSaved(name)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default SearchBar;
