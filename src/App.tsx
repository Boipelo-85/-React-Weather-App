import { useState, useEffect } from 'react'

import './App.css'
import { Text } from './Components/Text/Text';
import { Header } from './Components/Header/Header';
import { MainWeatherCard } from './Components/MainWeatherCard/MainWeatherCard';
import { SearchBar } from './Components/SearchBar/SearchBar';


function App() {

  const [search, setSearch] = useState('');
  const [currentCity, setCurrentCity] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          // Reverse geocode to get city name from coordinates
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            );
            const data = await response.json();
            setCurrentCity(data.name);
          } catch (error) {
            console.error('Error getting city name:', error);
            setCurrentCity('London'); // Fallback to London if geocoding fails
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setCurrentCity('London'); // Fallback to London if geolocation is denied
        }
      );
    } else {
      setCurrentCity('London'); // Fallback if geolocation is not supported
    }
  }, []);

  return (
    <>    

        <div id='app-container'>

            <div id='main-content'>

                <div id='sub-container'>
                  
                          <SearchBar value={search} onChange={setSearch} /> 
                          <Text variant={'h1'} style={{color:'white'}}> Boipelo </Text> 
                          <div className='weather-cards-container'>
                            <MainWeatherCard city={search || currentCity || 'London'} />
                          </div>
                </div>              
            </div>
        </div>

    </>
  )
}

export default App
