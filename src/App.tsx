import { useState } from 'react'

import './App.css'
import { Text } from './Components/Text/Text';
import { MainWeatherCard } from './Components/MainWeatherCard/MainWeatherCard';

function App() {


  return (
    <>    

        <div id='app-container'>

            <div id='main-content'>

                <div id='sub-container'>
                  
                          <Text variant={'h1'} style={{color:'white'}}> Boipelo </Text>
                          <MainWeatherCard />

                </div>
              
            </div>
        </div>

    </>
  )
}

export default App
