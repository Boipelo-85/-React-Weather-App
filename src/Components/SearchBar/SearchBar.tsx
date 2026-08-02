

import { Text } from '../Text/Text';

import { FaLocationDot } from 'react-icons/fa6';

import searchLoogo from '../../assets/searchbar.png'

import { useEffect, useRef, useState } from 'react';



interface WeatherData {



  location: string

}



export type SearchProp = {



  value: string,

  onChange: (value: string) => void

 



}



export const SearchBar: React.FC<SearchProp> = ({ value, onChange }) => {





        const inputRef =  useRef('')  



        const [weather ,setWeather] = useState<WeatherData | null >(null);



        

        const weatherSearch = async (city : string) => {



              try {



                    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;



                    const  response = await fetch(url)

                    const data = await response.json();

                    console.log(data);



                    setWeather({



                          location: data.name



                    })



              } catch (error) {

                

                      

              }

        }



  useEffect(() =>{



          weatherSearch("London");

  },[])

  return (



    <div>



      <nav className='nav'>



        <div className='Heading-items'>

          <Text variant={'span'} style={{ color: '#fdfdfd', padding: '0px 120px', paddingLeft: '10px', fontWeight: 'bold', fontSize: '20px' }}>Weather forecast</Text>



          <Text variant={'span'} style={{ color: '#fdfdfd', padding: '0px 120px' }}> <FaLocationDot className='location' />{weather?.location} </Text>

    

            <img src={searchLoogo} alt='search logo ' className='search-logo' />

            <input type="text" ref={inputRef}   className='search-bar' placeholder='Search City' value={value} onChange={(e) => onChange(e.target.value)} />

 

        </div>

      </nav>

    </div>

  )

}



