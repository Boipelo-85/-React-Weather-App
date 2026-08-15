import { useEffect, useState, useRef } from 'react'

import './App.css'
// import { Text } from './Components/Text/Text';
// import { Header } from './Components/Header/Header';
import { MainWeatherCard } from './Components/MainWeatherCard/MainWeatherCard';
import { SearchBar } from './Components/SearchBar/SearchBar';
import { SavedLocation } from './SavedLocation';

import { FaLocationDot } from 'react-icons/fa6';
import { Text } from './Components/Text/Text';


function App() {

  const [search,setSearch] = useState('');
  const [city,setCity] = useState('Polokwane');
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [coordinates, setCoordinates] = useState<{lat: number; lon: number} | null>(null);
  const [isLocating, setIsLocating] = useState(true);
  const [geoBlocked, setGeoBlocked] = useState(false);
  const [savedLocations, setSavedLocations] = useState<{name: string; lat: number; lon: number;}[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  
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
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setIsLocating(false);
      setGeoBlocked(true);
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
        setGeoBlocked(false);
      },
      (error) => {
        console.log('Geolocation denied or failed', error);
        setIsLocating(false);
        setGeoBlocked(true);
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
    setGeoBlocked(false);
    setCity(city);
    setSearch('');
    setSearchTrigger(prev => prev + 1);

  }

  const handleSelectSaved = (name: string) => {
    setGeoBlocked(false);
    setMenuOpen(false);
    setSearch('');
    setCity(name);
    setSearchTrigger(prev => prev + 1);
  }

  const handleRemoveSaved = (name: string) => {

    setSavedLocations(prev => prev.filter(p => p.name.toLowerCase() !== name.toLowerCase()));

  }

  const handleRetryLocation = () => {
    setGeoBlocked(false);
    setIsLocating(true);
    
    if (!navigator.geolocation) {
      setIsLocating(false);
      setGeoBlocked(true);
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
        setGeoBlocked(false);
      },
      (error) => {
        console.log('Geolocation denied or failed', error);
        setIsLocating(false);
        setGeoBlocked(true);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }

  const handleFocusSearch = () => {
    searchInputRef.current?.focus();
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
                  ) : geoBlocked ? (
                    <>
                      <SearchBar
                        value={search}
                        onChange={setSearch}
                        onSearch={handleSearch}
                        onSumit={() => handleSearch(search)}
                        inputRef={searchInputRef}
                        activeCity={undefined}
                        onBookmark={undefined}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '300px', gap: '20px' }}>
                        <Text variant={'span'} style={{ color: '#000', fontSize: '18px', fontFamily: "'Courier New', Courier, monospace", textAlign: 'center' }}>
                          Location access denied
                        </Text>
                        <div style={{ display: 'flex', gap: '15px' }}>
                          <button
                            type='button'
                            onClick={handleRetryLocation}
                            style={{
                              padding: '12px 24px',
                              borderRadius: '999px',
                              border: '1px solid #000',
                              background: '#000',
                              color: '#fff',
                              cursor: 'pointer',
                              fontFamily: "'Courier New', Courier, monospace",
                              fontSize: '14px',
                              fontWeight: 'bold'
                            }}
                          >
                            Use My Location
                          </button>
                          <button
                            type='button'
                            onClick={handleFocusSearch}
                            style={{
                              padding: '12px 24px',
                              borderRadius: '999px',
                              border: '1px solid #000',
                              background: '#fff',
                              color: '#000',
                              cursor: 'pointer',
                              fontFamily: "'Courier New', Courier, monospace",
                              fontSize: '14px',
                              fontWeight: 'bold'
                            }}
                          >
                            Search for a Location
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                          <SearchBar
                            value={search}
                            onChange={setSearch}
                            onSearch={handleSearch}
                            onSumit={() => handleSearch(search)}
                            inputRef={searchInputRef}
                            activeCity={city}
                            onBookmark={handleBookmark}
                          />
                          <div id='Location-name'>
                            <div className='humbuger-button' ref={menuRef}>
                              <button
                                type='button'
                                onClick={() => setMenuOpen(prev => !prev)}
                                className='OuterButtonBugger'
                                title='saved location section'
                              >
                                ☰
                              </button>
                              {menuOpen && (
                                <div className='openButton'>
                                  <div style={{padding: '8px'}}>
                                    <SavedLocation
                                      savedLocations={savedLocations}
                                      onSelect={handleSelectSaved}
                                      onRemove={handleRemoveSaved}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                            <Text variant={'span'} style={{ color: '#000', paddingRight: '5px', fontFamily: "'Courier New', Courier, monospace", fontSize: '40px',fontWeight:'bold',marginLeft:'300px'}}> <FaLocationDot className='location' /> {city} </Text>
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
