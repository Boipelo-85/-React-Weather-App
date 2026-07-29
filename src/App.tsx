import { useState } from 'react'

import './App.css'
import { Text } from './Components/Text/Text';
import { Header } from './Components/Header/Header';
import { MainWeatherCard } from './Components/MainWeatherCard/MainWeatherCard';
import { SearchBar } from './Components/SearchBar/SearchBar';


function App() {

  const [search,setSearch] = useState('');

  return (
    <>    

        <div id='app-container'>

            <div id='main-content'>

                <div id='sub-container'>
                  
                          <SearchBar value={search} onChange={setSearch} /> 
                          <Text variant={'h1'} style={{color:'white'}}> Boipelo </Text> 
                          <div className='weather-cards-container'>
                            <MainWeatherCard />
                          </div>
                </div>              
            </div>
        </div>

    </>
  )
}

export default App
