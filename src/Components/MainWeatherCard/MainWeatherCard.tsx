import React, { useState } from 'react'
import { Text } from '../Text/Text';


// type TogProp = {

//     onSwitch: () => void
// }


export const MainWeatherCard = () => {

    const [toggled,setToggled] = useState(false)

    return (

        <div>

            <Text variant={'span'}> Wednesday,December 11 </Text>
            <Text variant={'span'}> 11 am </Text>

            <div>
                <Text variant={'h1'}> Number 26 </Text>
            </div>

            <Text variant={'h3'}> The Next Day </Text>

            <div className='switch-buttons'>
                <button className='toggle-btn' onClick={() => setToggled(!toggled)}

                >
                    
                    <span><button> 7 days </button></span>
                    <span><button> 14 days </button></span>
                    <span><button> 30 days </button></span>

                </button>
            </div>
        </div>
    )
}
