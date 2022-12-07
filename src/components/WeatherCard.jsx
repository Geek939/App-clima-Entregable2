import React from "react"

const WeatherCard = ({weather, temperature, isCelsius, changetoFahrenheit}) => {
  return (
    <article className="flex flex-col justify-center gap-3 items-center mt-14">
        <h1 className="text-5xl border-solid font-bold">Weather App</h1>
        <h3 className="text-xl">{`${weather.name}, ${weather.sys.country}`}</h3>
        <section>
            <div>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
            </div>
            <ul className="flex flex-col items-center gap-1 text-xl">
              <li>{weather.weather[0].description}</li>
              <li>Wind Speed: {weather.wind.speed} m/s</li>
              <li>Clouds: {weather.clouds.all} %</li>
              <li>Pressure: {weather.main.pressure} hPa</li>
            </ul>
        </section>
          <p className="text-2xl font-semibold">{isCelsius ? `${temperature.celsius} °C`: `${temperature.fahrenheit} °F`}</p>
          <button className="h-8 w-36 rounded-md bg-gray-500 font-semibold animate-pulse" onClick={changetoFahrenheit}>Degrees °F / °C </button>
    </article>
  )
}

export default WeatherCard