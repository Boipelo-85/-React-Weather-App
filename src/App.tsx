import { useState } from 'react'

import './App.css'
import { Text } from './Components/Text/Text';
import { Header } from './Components/Header/Header';
import { MainWeatherCard } from './Components/MainWeatherCard/MainWeatherCard';
import { SearchBar } from './Components/SearchBar/SearchBar';
import { ThemeToggle } from './Components/ThemeToggle/ThemeToggle';
import { DailyForecastItem } from './Components/ForecastPanel/DailyForecastItem';


function App() {

  const [search,setSearch] = useState('');
  const [city,setCity] = useState('Polokwane');

  return (
    <>    

        <div id='app-container'>

            <div id='main-content'>

                <div id='sub-container'>
                  
                          <SearchBar value={search} onChange={setSearch} onSearch={setCity} /> 
                       
                          <div className='weather-cards-container'>
                            <MainWeatherCard city={city}/>
                          </div>
                          {/* <div>
                            <ThemeToggle />
                          </div> */}
                </div>              
            </div>
        </div>

    </>
  )
}

export default App
