import { useEffect, useState } from 'react'

import './App.css'
// import { Text } from './Components/Text/Text';
// import { Header } from './Components/Header/Header';
import { MainWeatherCard } from './Components/MainWeatherCard/MainWeatherCard';
import { SearchBar } from './Components/SearchBar/SearchBar';

import { FaLocationDot } from 'react-icons/fa6';
import { Text } from './Components/Text/Text';


function App() {

  const [search,setSearch] = useState('');
  const [city,setCity] = useState('Polokwane');
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [coordinates, setCoordinates] = useState<{lat: number; lon: number} | null>(null);
  const [isLocating, setIsLocating] = useState(true);
  const [savedLocations, setSavedLocations] = useState<{name: string; lat: number; lon: number;}[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('savedLocations');
      if (raw) setSavedLocations(JSON.parse(raw));
    } catch (e) {
      window.alert('Failed to load saved locations');
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
    } catch (e) {
      window.alert('Failed to save locations');
    }
  }, [savedLocations])

  useEffect(() => {
    if (!navigator.geolocation) {
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lon: longitude });

        try {
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_APP_ID}`;
          const response = await fetch(url);
          const data = await response.json();
          setCity(data.name || 'Current Location');
        } catch (error) {
          console.error('Failed to get city name from coordinates', error);
          setCity('Current Location');
        }

        setIsLocating(false);
      },
      () => {
        console.log('Geolocation denied or failed, using default city');
        setIsLocating(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }, [])

  const handleSuggestSave = (loc: {name: string; lat: number; lon: number}) => {
    const exists = savedLocations.some(s => s.name.toLowerCase() === loc.name.toLowerCase());
    
    if (exists) return; 
    setSavedLocations(prev => [...prev, loc]);
  }

  const handleSearch = (city: string) => {

    setCity(city);
    setSearch('');
    setSearchTrigger(prev => prev + 1);

  }

  const handleSelectSaved = (name: string) => {

    setSearch('');
    setCity(name);
    setSearchTrigger(prev => prev + 1);

  }

  const handleRemoveSaved = (name: string) => {

    setSavedLocations(prev => prev.filter(p => p.name.toLowerCase() !== name.toLowerCase()));

  }

    const handleBookmark = (loc: { name: string; lat: number; lon: number }) => {
      const exists = savedLocations.some(
        s => s.name.toLowerCase() === loc.name.toLowerCase());

      if (exists) {
        window.alert(`${loc.name} is already saved!`);
      } else {
        setSavedLocations(prev => [...prev, loc]);
        window.alert(`${loc.name} has been saved to your locations!`);
      }

      localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
      console.log(savedLocations)
    };
    
  return (
    <>

        <div id='app-container'>
            <div id='main-content'>

                <div id='sub-container'>

                  {isLocating ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', color: '#fff' }}>
                      <div style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '16px', fontFamily: "'Courier New', Courier, monospace" }}>
                          Detecting your location...
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                          <SearchBar
                            value={search}
                            onChange={setSearch}
                            onSearch={handleSearch}
                            onSumit={() => handleSearch(search)}
                            onSuggestSave={handleSuggestSave}
                            savedLocations={savedLocations}
                            activeCity={city}
                            onSelectSaved={handleSelectSaved}
                            onRemoveSaved={handleRemoveSaved}
                            onBookmark={handleBookmark}
                          />
                          {/* <div id='DaysCard'>
                                       <DailyForecastItem />
                          </div>
                           */}
                          {/* {showSaveModal && candidateToSave && (
                            <SaveConfirmModal
                              cityName={candidateToSave.name}
                              onConfirm={handleConfirmSave}
                              onCancel={handleCancelSave}
                            />
                          )} */}
                          <div id='Location-name'>
                             <Text variant={'span'} style={{ color: '#000', paddingRight: '5px', fontFamily: "'Courier New', Courier, monospace", fontSize: '40px',fontWeight:'bold'}}> <FaLocationDot className='location' /> {city} </Text>
                          </div>
                          <div className='weather-cards-container'>
                            <MainWeatherCard city={city} coordinates={coordinates} searchTrigger={searchTrigger}/>
                          </div>

                          {/* <div>

                            <ThemeToggle />

                          </div> */}
                    </>
                  )}

                </div>
            </div>
        </div>
    </>
  )
}

export default App
