
import { Text } from '../Text/Text';
import { FaLocationDot } from 'react-icons/fa6';
import searchLoogo from '../../assets/searchbar.png'
import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

interface WeatherData {

  location: string

}

export type SearchProp = {

  value: string,
  onChange: (value: string) => void,
  onSearch: (city: string) => void
}

export const SearchBar: React.FC<SearchProp> = ({ value, onChange, onSearch }) => {

  const inputRef = useRef<HTMLInputElement>(null)

  const [weather, setWeather] = useState<WeatherData | null>(null);


  const weatherSearch = async (city: string) => {

    try {

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url)
      const data = await response.json();
      console.log(data);

      setWeather({

        location: data.name

      })
      onSearch(city)
      onChange('');  

    } catch (error) {

    }

  }

  useEffect(() => {


  }, [])
  return (

    <div>

      <nav className='nav'>

        <div className='Heading-items'>

          <Text variant={'span'} style={{ color: '#fdfdfd', fontWeight: 'bold', fontSize: '30px', paddingRight: '15px', paddingLeft: '5px', fontFamily: "'Courier New', Courier, monospace" }}>Weather forecast</Text>
          <Text variant={'span'} style={{ paddingRight: '120px'}}><ThemeToggle></ThemeToggle></Text>
          <Text variant={'span'} style={{ color: '#fdfdfd', paddingRight: '5px', fontFamily: "'Courier New', Courier, monospace", fontSize: '20px' }}> <FaLocationDot className='location' />{weather?.location} </Text>

          <img src={searchLoogo} alt='search logo' className='search-logo' onClick={() => weatherSearch(inputRef.current?.value || '')} />
          <input type="text" ref={inputRef} className='search-bar' placeholder='Search City' value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
      </nav>
    </div>
  )
}

