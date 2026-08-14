import { useCallback, useEffect, useState } from 'react'

import { Text } from '../Text/Text';


import { WindIcon } from 'lucide-react'
// import { WiBarometer, WiHumidity, WiThermometer } from "react-icons/wi";
import { FaEye } from "react-icons/fa";

// import { CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, Legend, ResponsiveContainer } from "recharts";

import axios from "axios";

interface WeatherData {

    wind_speed: number,
    humidity: number,
    visibility: number,
    temperature: number,
    description: string,
    hour: string,
    icon: string,
    weather: { icon: string }[],
    minWeather: number,
    maxWeather: number,
    feelsLike: number,
    pressure: number,
    dateTime: string

}

interface MainWeatherCardProps {
    city?: string
    coordinates?: { lat: number; lon: number } | null
}

export const MainWeatherCard: React.FC<MainWeatherCardProps> = ({ city }) => {

    const [isDark, setIsDark] = useState<boolean>(false);
    
    useEffect(() => {
        const update = () => setIsDark(document.body.classList.contains('dark-mode'));
        // set initial
        update();
        // watch for class changes on body so toggling theme updates chart colors
        const obs = new MutationObserver(() => update());
        obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        return () => obs.disconnect();
    }, []);


    const [weather, setWeather] = useState<WeatherData[] | null>(null);
    const [dailyForecast, setDailyForecast] = useState<any[]>([]);
    const [unit, setUnit] = useState<'C' | 'F'>('C');

    const convertTemp = (value: number) => unit === 'C' ? Math.round(value) : Math.round(value * 9 / 5 + 32);
    // const formatTemp = (value?: number, fallback = '--') => value != null ? `${convertTemp(value)}°${unit}` : `${fallback}°${unit}`;

    const displayedWeather = weather?.map(item => ({
        ...item,
        temperature: convertTemp(item.temperature),
        minWeather: item.minWeather != null ? convertTemp(item.minWeather) : item.minWeather,
        maxWeather: item.maxWeather != null ? convertTemp(item.maxWeather) : item.maxWeather,
    })) || null;

    const displayedDailyForecast = dailyForecast.map(item => ({
        ...item,
        min: unit === 'C' ? item.min : Math.round(item.min * 9 / 5 + 32),
        max: unit === 'C' ? item.max : Math.round(item.max * 9 / 5 + 32),
    }));

    const weatherInfo = useCallback(async (city: string) => {

        // setLoading();

        try {

            

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            console.log(url);

            // const response = await fetch(url)
            // const data = await response.json();
            // console.log(data);
            // const icon = allIcons[data.weather[0].icon] || clear_icon;
                // 1. Check cache first
        
            const cached = localStorage.getItem(city);
            if (cached) {
                const parsed = JSON.parse(cached);
                const now = Date.now();

                if (now - parsed.timestamp < 60 * 60 * 1000) {
                    // Use cached weather + forecast
                    
                    setWeather(parsed.weather);
                    setDailyForecast(parsed.dailyForecast);

                    // 🔑 But still fetch current time for location
                    const timeResponse = await axios.get(url);
                    const timestamp = timeResponse.data.dt * 1000;
                    const dateObj = new Date(timestamp);

                    const formattedDateTime = dateObj.toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    });

                    // Update only the time field
                    setWeather(prev =>
                        prev?.map((item, idx) =>
                            idx === 0 ? { ...item, dateTime: formattedDateTime } : item
                        ) || null
                    );

                    console.log("Loaded from cache (fresh) + updated time");
                    return; // Skip full API call
                }
            }
            const geoResponse = await axios.get(url);
            const { lat, lon } = geoResponse.data.coord;
            const currentDescription = geoResponse.data.weather[0].description;
            const currentTemp = Math.floor(geoResponse.data.main.temp);
            const currentWind = geoResponse.data.wind.speed;
            const currentHumidity = geoResponse.data.main.humidity;
            const current_feel = Math.floor(geoResponse.data.main.feels_like);
            const current_pressure = Math.floor(geoResponse.data.main.pressure);

            const timestamp = geoResponse.data.dt * 1000; // convert seconds → ms
            const dateObj = new Date(timestamp);

            // Format date as "13 Aug 2026"
            const datePart = dateObj.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            });

            // Format time as "17:30"
            const timePart = dateObj.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });

            // Combine
            const formattedDateTime = `${datePart} ${timePart}`;

            console.log(formattedDateTime);

            // const currentIconCode = geoResponse.data.weather[0].icon;

            const minWeatherGet = Math.floor(geoResponse.data.main.temp_min);
            const maxWeatherGet = Math.floor(geoResponse.data.main.temp_max);

            //Five days weather retrieves
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const forecastResponse = await axios.get(forecastUrl);

            console.log(forecastResponse.data);
            console.log(forecastResponse.data.list);


            const grouped: Record<string, any[]> = {};
            forecastResponse.data.list.forEach((item: any) => {
                const date = item.dt_txt.split(" ")[0]; // "2026-08-04"
                if (!grouped[date]) grouped[date] = [];
                grouped[date].push(item);
            });

            // Now reduce each date group into one summary

            const daily = Object.keys(grouped).map(date => {
                const entries = grouped[date];
                const temps = entries.map(e => e.main.temp);
                const minTemp = Math.floor(Math.min(...temps));
                const maxTemp = Math.floor(Math.max(...temps));

                return {
                    day: new Date(date).toLocaleDateString("en-US", {
                        weekday: "short"

                    }),
                    weather: entries[0].weather[0].description, // pick first description
                    icon: entries[0].weather[0].icon,           // pick first icon

                    min: minTemp,
                    max: maxTemp
                };
            });



            console.log(dailyForecast);


            const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`)
            const data = response.data;

            const maxHours = 24;
            // const tempCelsius = geoResponse.data.main.temp;

            const currentIcon = geoResponse.data.weather[0].icon;
            console.log(currentIcon);
            console.log(`https://openweathermap.org/img/wn/${currentIcon}`);


            const currentHour = new Date().getHours();
            const formattedData: WeatherData[] = data.hourly.time
                .slice(currentHour, currentHour + maxHours)
                .map((time: string, index: number) => ({
                    hour: new Date(time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",

                    }),
                    wind_speed: data.hourly.wind_speed_10m[index],
                    humidity: data.hourly.relative_humidity_2m[index],
                    temperature: Math.floor(data.hourly.temperature_2m[index]),
                    description: currentDescription,
                    visibility: geoResponse.data.visibility / 1000,
                    icon: geoResponse.data.weather[0].icon,
                    // icon: iconMap[currentIconCode] || 'default_icon',
                    weather: geoResponse.data.weather,
                    feelsLike: current_feel,
                    pressure: current_pressure,
                    minWeather: minWeatherGet,
                    maxWeather: maxWeatherGet,
                    dateTime: formattedDateTime.toString()

                }));

            if (formattedData.length > 0) {
                formattedData[0].temperature = currentTemp;
                formattedData[0].humidity = currentHumidity,
                    formattedData[0].wind_speed = currentWind,
                    formattedData[0].description = currentDescription,
                    formattedData[0].minWeather = minWeatherGet,
                    formattedData[0].maxWeather = maxWeatherGet,
                    formattedData[0].feelsLike = current_feel,
                    formattedData[0].pressure = current_pressure
            }
            setWeather(formattedData)
            setDailyForecast(daily);
            console.log(`Current Date & Time: ${formattedData[0].dateTime}`);

                    // Save to cache WITHOUT dateTime
                localStorage.setItem(city, JSON.stringify({
                weather: formattedData.map(({ dateTime, ...rest }) => rest), // strip dateTime
                dailyForecast: daily,
            }));

            console.log("Saved to cache");

        } catch (error) {

            console.error('Failed to fetch ', error)

            // 4. Fallback to cache if offline
            const cached = localStorage.getItem(city);
            if (cached) {

                const parsed = JSON.parse(cached);
                setWeather(parsed.weather);
                setDailyForecast(parsed.dailyForecast);
                console.log("Offline mode: loaded cached data");

            }
        }
    }, [])

    useEffect(() => {
        if (city) {
            weatherInfo(city);
        } else {
            weatherInfo('Polokwane');
        }
    }, [city, weatherInfo])

    const currentWeather = displayedWeather && displayedWeather.length > 0 ? displayedWeather[0] : null;

    return (
        <>

            <div className='switchButtons'>
                <button
                    type='button'
                    onClick={() => setUnit('C')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '999px',
                        border: unit === 'C' ? '1px solid #fff' : '1px solid #999',
                        background: unit === 'C' ? '#000' : '#fff',
                        color: unit === 'C' ? '#fff' : '#000',
                        cursor: 'pointer'
                    }}
                >
                    °C
                </button>
                <button
                    type='button'
                    onClick={() => setUnit('F')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: '999px',
                        border: unit === 'F' ? '1px solid #fff' : '1px solid #999',
                        background: unit === 'F' ? '#000' : '#fff',
                        color: unit === 'F' ? '#fff' : '#000',
                        cursor: 'pointer'
                    }}
                >
                    °F
                </button>
            </div>

            {/* <div className='dailyForecast-row'>

                {displayedDailyForecast.slice(0, 5).map((item, index) => (

                    <div key={index} className="forecast-pill-content">
                        <Text variant={'span'} style={{ fontSize: '15px', fontWeight: 700, fontFamily: "'Courier New', Courier, monospace" }}>
                            {item.day} {item.max}°{unit}
                        </Text>
                        <span>
                            <img
                                src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                                alt={item.weather}
                                className='forecast-icon'
                            />
                        </span>
                    </div>
                ))}
            </div> */}
            <div className='dateAndTime'>
                <Text variant={'span'} style={{color:'#000',marginTop: '10px',fontFamily: "'Courier New', Courier, monospace", fontWeight: 'bold'}}>{currentWeather?.dateTime}</Text>
            </div>
            <div className='main-weather-row'>
                <div className='main-weather-card'>
                    <div className='card-image-container'>
                        <div className='picture-content'>
                            {/* <img src={currentWeather?.icon} alt={currentWeather?.description} /> */}
                            <img
                                style={{ paddingTop: '2px' }}
                                src={`https://openweathermap.org/img/wn/${currentWeather?.icon}@4x.png`}
                                alt="Weather icon"
                            />
                            <Text variant={'h3'} style={{ color: '#fdfdfd', fontSize: '60px', alignItems: 'center', marginTop: '-20px', fontFamily: "'Courier New', Courier, monospace", fontWeight: 'bold' }}>
                                {currentWeather?.temperature != null ? `${currentWeather.temperature}°${unit}` : `--°${unit}`}
                            </Text>
                            <Text variant={'h3'} style={{ color: '#fdfdfd', fontSize: '25px', paddingLeft: '25px', marginTop: '-30px', fontFamily: "'Courier New', Courier, monospace" }}>
                                {currentWeather?.description || 'Loading...'}
                            </Text>
                            <Text variant={'h3'} style={{ color: '#fdfdfd', fontSize: '12px', paddingLeft: '25px', marginTop: '-20px', fontFamily: "'Courier New', Courier, monospace" }}>
                                H: {currentWeather?.maxWeather != null ? `${currentWeather.maxWeather}°${unit}` : `--°${unit}`} | L: {currentWeather?.minWeather != null ? `${currentWeather.minWeather}°${unit}` : `--°${unit}`}
                            </Text>
                        </div>
                    </div>

                    <div className='card-content'>

                        
                        {displayedWeather && displayedWeather.slice(0, 5).map((item, index) => (
                            <div className='weatherItemsHourly' key={index}>
                                <Text variant={'h3'} style={{ color: '#000', fontSize: '10px', fontFamily: "'Courier New', Courier, monospace" }}>
                                    {item.hour}
                                </Text>
                                <Text variant={'h3'} style={{ color: '#000', fontSize: '10px', fontFamily: "'Courier New', Courier, monospace" }}>
                                    {item.temperature}°{unit}
                                </Text>
                            </div>
                        ))}
                 
                        {/* <div className='weatherItems'>
                            <Text variant={'h3'} style={{ color: '#000', fontSize: '10px', fontFamily: "'Courier New', Courier, monospace" }}>Wind   '  </Text>
                            <Text variant={'h3'} ><WindIcon style={{ color: '#000' }} /></Text>
                            <Text variant={'h3'} style={{ color: '#000', fontSize: '10px', fontFamily: "'Courier New', Courier, monospace" }}>
                                {currentWeather?.wind_speed ? `${currentWeather.wind_speed} km/hr` : '--'}
                            </Text>
                        </div>
                        <div className='weatherItems'>
                            <Text variant={'h3'} style={{ color: '#000', fontSize: '10px', fontFamily: "'Courier New', Courier, monospace" }}>Humidity</Text>
                            <Text variant={'h3'} ><WiHumidity style={{ color: '#000' }} /></Text>
                            <Text variant={'h3'} style={{ color: '#000', fontSize: '10px', fontFamily: "'Courier New', Courier, monospace" }}>
                                {currentWeather?.humidity ? `${currentWeather.humidity}%` : '--%'}
                            </Text>
                        </div>

                        <div className='weatherItems'>
                            <Text variant={'h3'} style={{ color: '#000', fontSize: '10px', fontFamily: "'Courier New', Courier, monospace" }}>Visibility</Text>
                            <Text variant={'h3'} ><FaEye style={{ color: '#000' }} /></Text>
                            <Text variant={'h3'} style={{ color: '#000', fontSize: '10px', fontFamily: "'Courier New', Courier, monospace" }}>
                                {currentWeather?.visibility ? `${currentWeather.visibility}km` : '10km'}
                            </Text>
                        </div> */}
                    </div>
                </div>
                {/* <div className='weatherDisplay'>
                    <Text variant={'span'} style={{ color: '#000 ', paddingRight: '350px', fontSize: '20px', fontWeight: 'bold', fontFamily: "'Courier New', Courier, monospace" }}>
                        HourlyForecast
                    </Text> */}
                    {/* <div className='hourlyData'>
                        {displayedWeather && (
                            <ResponsiveContainer width="90%" height={350}>
                                <LineChart data={displayedWeather}>
                                    <XAxis dataKey="hour" stroke={isDark ? '#fdfdfd' : '#000'} />
                                    <YAxis stroke={isDark ? '#fdfdfd' : '#000'} />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="wind_speed" stroke={ '#8884d8'} name="Wind Speed" />
                                    <Line type="monotone" dataKey="temperature" stroke={ '#82ca9d'} name="Temperature" />
                                    <Line type="monotone" dataKey="humidity" stroke={ '#dc34ac'} name="Humidity" />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>  */}
                    {/* <div className='card-content'>
                        {displayedWeather && displayedWeather.slice(0, 7).map((item, index) => (
                            <div className='weatherItemsHourly' key={index}>
                                <Text variant={'h3'} style={{ color: '#000', fontSize: '10px', fontFamily: "'Courier New', Courier, monospace" }}>
                                    {item.hour}
                                </Text>
                                <Text variant={'h3'} style={{ color: '#000', fontSize: '10px', fontFamily: "'Courier New', Courier, monospace" }}>
                                    {item.temperature}°{unit}
                                </Text>
                            </div>
                        ))}
                    </div> */}
                {/* </div> */}
                {/* <div className='last-card'>
                    <div className='lastWeatherCards'>

                        <div className='additionCardInfo'>

                            <Text variant={'h3'} style={{ color: '#000', fontSize: '15px', fontFamily: "'Courier New', Courier, monospace" }}>Feelslike</Text>
                            <Text variant={'h3'} ><WiThermometer style={{ color: '#000' }} /></Text>
                            <Text variant={'h3'} style={{ color: '#000', fontSize: '10px', fontFamily: "'Courier New', Courier, monospace" }}>
                                {currentWeather?.feelsLike ? `${currentWeather.feelsLike}°` : '--'}
                            </Text>
                        </div>
                        <div className='additionCardInfo'>

                            <Text variant={'h3'} style={{ color: '#000', fontSize: '15px', fontFamily: "'Courier New', Courier, monospace" }}>Pressure</Text>
                            <Text variant={'h3'} ><WiBarometer style={{ color: '#000' }} /></Text>
                            <Text variant={'h3'} style={{ color: '#000', fontSize: '10px', fontFamily: "'Courier New', Courier, monospace" }}>
                                {currentWeather?.pressure ? `${currentWeather.pressure} hPa` : '--'}
                            </Text>
                        </div>
                        <div className='additionCardInfo'>

                            <Text variant={'h3'} style={{ color: '#000', fontSize: '15px', fontFamily: "'Courier New', Courier, monospace" }}>Maintemp</Text>
                            <Text variant={'h3'} ><WiHumidity style={{ color: '#000' }} /></Text>
                            <Text variant={'h3'} style={{ color: '#000', fontSize: '10px', fontFamily: "'Courier New', Courier, monospace" }}>
                                {currentWeather?.wind_speed ? `${currentWeather.wind_speed} km/hr` : '--'}
                            </Text>
                        </div>
                    </div>


                </div> */}
                <div className='hoour'>
                        {displayedDailyForecast.slice(0, 5).map((item, index) => (

                    <div key={index} className="forecast-pill-content">
                        <Text variant={'span'} style={{ fontSize: '15px', fontWeight: 700, fontFamily: "'Courier New', Courier, monospace" }}>
                            {item.day} {item.max}°{unit}
                        </Text>
                        <span>
                            <img
                                src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                                alt={item.weather}
                                className='forecast-icon'
                            />
                        </span>
                    </div>
                ))}
                    </div>
            </div>
        </>
    )
}

