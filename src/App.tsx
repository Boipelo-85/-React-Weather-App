import { useEffect, useState } from 'react'

import './App.css'
// import { Text } from './Components/Text/Text';
// import { Header } from './Components/Header/Header';
import { MainWeatherCard } from './Components/MainWeatherCard/MainWeatherCard';
import { SearchBar } from './Components/SearchBar/SearchBar';

import { SaveConfirmModal } from './Components/SavedLocations/SaveConfirmModal';


function App() {

  const [search,setSearch] = useState('');
  const [city,setCity] = useState(' ');
  const [coordinates, setCoordinates] = useState<{lat: number; lon: number} | null>(null);
  const [isLocating, setIsLocating] = useState(true);
  const [savedLocations, setSavedLocations] = useState<{name: string; lat: number; lon: number;}[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [candidateToSave, setCandidateToSave] = useState<{name: string; lat: number; lon: number;} | null>(null);

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
    setCandidateToSave(loc);
    setShowSaveModal(true);
  }

  const handleSearch = (city: string) => {
    setCity(city);
    setSearch('');
  }

  const handleConfirmSave = () => {
    if (!candidateToSave) return;
    const exists = savedLocations.some(s => s.name.toLowerCase() === candidateToSave.name.toLowerCase());
    if (!exists) {
      setSavedLocations(prev => [...prev, candidateToSave]);
    }
    setCandidateToSave(null);
    setShowSaveModal(false);
  }

  const handleCancelSave = () => {
    setCandidateToSave(null);
    setShowSaveModal(false);
  }

  const handleSelectSaved = (name: string) => {
    setSearch('');
    setCity(name);
  }

  const handleRemoveSaved = (name: string) => {
    setSavedLocations(prev => prev.filter(p => p.name.toLowerCase() !== name.toLowerCase()));
  }
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
                          />
                          {/* <div id='DaysCard'>
                                       <DailyForecastItem />
                          </div>
                           */}
                          {showSaveModal && candidateToSave && (
                            <SaveConfirmModal
                              cityName={candidateToSave.name}
                              onConfirm={handleConfirmSave}
                              onCancel={handleCancelSave}
                            />
                          )}
                          <div className='weather-cards-container'>
                            <MainWeatherCard city={city} coordinates={coordinates}/>
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
