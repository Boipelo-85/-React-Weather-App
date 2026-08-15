import { Text } from '../Text/Text';
import { FaBookmark } from 'react-icons/fa';
import searchLoogo from '../../assets/searchbar.png'
import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

interface WeatherData {
    
  location: string,
  country : string
}

export type SearchProp = {

  value: string,
  onChange: (value: string) => void,
  onSearch: (city: string) => void,
  onSuggestSave?: (loc: {name: string; lat: number; lon: number}) => void,
  activeCity?: string,
  onSumit : () => void,
  onBookmark?: (loc: {name: string; lat: number; lon: number}) => void
}

export const SearchBar: React.FC<SearchProp> = ({ value, onChange, onSearch, onSuggestSave, activeCity, onBookmark }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [currentCoords, setCurrentCoords] = useState<{lat: number; lon: number} | null>(null);

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      weatherSearch(inputRef.current?.value || '');
    }
  };

  const getCachedSearchLocation = (city: string): WeatherData | null => {
    const normalizedCity = city.trim().toLowerCase();
    const cacheKeys = [`search:${normalizedCity}`, normalizedCity];

    for (const key of cacheKeys) {
      const cached = localStorage.getItem(key);
      if (!cached) continue;

      try {
        const parsed = JSON.parse(cached);

        if (parsed?.location && parsed?.country) {
          return { location: parsed.location, country: parsed.country };
        }

        if (parsed?.weather) {
          return { location: city.trim(), country: '' };
        }
      } catch (error) {
        console.error('Failed to read cached search data', error);
      }
    }

    return null;
  };

  const weatherSearch = async (city: string, promptSave = true) => {
    const offCity = city.trim();
    if (!offCity) return;

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${offCity}&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url)
      const data = await response.json();
      console.log(data);

      const searchResult = {
        location: data.name,
        country: data.sys.country
      };

      setWeather(searchResult);
      setCurrentCoords({ lat: data.coord.lat, lon: data.coord.lon });
      localStorage.setItem(`search:${offCity.toLowerCase()}`, JSON.stringify({
        ...searchResult,
        timestamp: Date.now()
      }));

      if (promptSave) {
        onSearch(offCity)
        onChange('');
        if (data && data.coord && typeof onSuggestSave === 'function') {
          onSuggestSave({ name: data.name, lat: data.coord.lat, lon: data.coord.lon });
        }
      }

    } catch (error) {
      console.error('Search failed', error);

      const cachedSearch = getCachedSearchLocation(offCity);
      if (cachedSearch) {
        setWeather(cachedSearch);

        if (promptSave) {
          onSearch(offCity);
          onChange('');
        }

        console.log('Offline mode: loaded cached search data');
        return;
      }

      if (promptSave) {
        onSearch(offCity);
        onChange('');
      }
    }
  }

  const handleBookmark = () => {
    if (weather && currentCoords && onBookmark) {
      onBookmark({ name: weather.location, lat: currentCoords.lat, lon: currentCoords.lon });
    }
  };
  
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
          
          {/* <Text variant={'span'} style={{ color: '#fdfdfd', paddingRight: '5px', fontFamily: "'Courier New', Courier, monospace", fontSize: '20px' }}> <FaLocationDot className='location' />{weather?.location},{weather?.country}</Text> */}
 
          <div className='search-controls'>
            <img src={searchLoogo} alt='search logo' className='search-logo' onClick={() => weatherSearch(inputRef.current?.value || '')} />
            <input
              type="text"
              ref={inputRef}
              className='search-bar'
              placeholder='Search City'
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={onEnter}
            />
           
          </div>
          <Text variant={'span'} style={{ paddingRight: '0px'}}><ThemeToggle /></Text>
          
           <button 
              type='button'
              onClick={handleBookmark}
              className='bookmark-button'
              title='save location'
            >
              <FaBookmark />
            </button>
        </div>
      </nav>
    </div>
  )
}
export default SearchBar;
