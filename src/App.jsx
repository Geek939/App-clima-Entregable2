import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'


function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, settemperature] = useState()
  const [isCelsius, setisCelsius] = useState(true)

  const success = (pos) =>{
    
    const newCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(newCoords);
  }

  const changetoFahrenheit = () => setisCelsius(!isCelsius)


  useEffect (()=>{ 

    navigator.geolocation.getCurrentPosition(success)

  },[])

  useEffect (()=> {
  if (coords){
  const API_KEY = "d1aaf929e7ddd12d0d62e133ec7107e1"
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
  
  axios.get(URL)
  .then(res => {
    const tempKelvin = res.data.main.temp
    const tempCelsius = (tempKelvin - 273.15).toFixed(1)
    const tempFahrenheit = ((tempCelsius* 9/5) + 32).toFixed(1) 
    const newTemperature = 
    {
      celsius: tempCelsius,
      fahrenheit: tempFahrenheit
    }
    settemperature (newTemperature)
    setWeather(res.data)})
    .catch(err => console.log(err))
  }
  },[coords])


  return (
    <div className="App">
      {
        weather ? (
        <WeatherCard 
        weather={weather} 
        temperature = {temperature}
        changetoFahrenheit={changetoFahrenheit}  
        isCelsius={isCelsius}
        />
        ):<div className="flex items-center justify-center h-screen w-screen">
          <p><span className="font-medium text-2xl">Loading</span><img className='h-12 w-12 animate-spin mt-5' src="https://www.svgrepo.com/show/48804/spinner-of-dots.svg" alt="spiner"/></p>
          </div>
      }
    </div>
  )
}

export default App
