import React, { useState } from 'react';
import './style.css';
import config from '../../config'
import MenuAppBar from '../../component/menu-bar';

export default function Home() {
  const [weather, setWeather] = useState([])
  const [city, setCity] = useState('')
  const [error, setError] = useState('')
  const { BACKEND_URL, ICON_API_URL } = config;

  const handleSearch = (city) => {
    setCity(city)
    fetch(`${BACKEND_URL}/weather/${city}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'Application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        let weatherList = [];
        console.log(response)
        if (response.cod === "200") {
          setError('')
          response.list.map(item => {
            const date = new Date(item.dt * 1000).toDateString();
            weatherList.push({ date, ...item.weather[0], ...item.main })
          })
          const newList = weatherList.filter((value, index, array) => array.findIndex(t => (t.date === value.date)) === index)
          setWeather(newList.slice(0, 5))
        } else {
          setError(response.message)
        }
      })
      .catch((err) => {
        setError(err.message)
      })
  }
  return (
    <div>
      <MenuAppBar title="Weather Forecast" searchBar={true} searchFunc={(prop) => handleSearch(prop)} />
      {city && !error ? <section className="forecast-detail">
        <h1>{city}</h1>
        <section className="detail-list">
          {weather.map((item, index) => {
            return (
              <div className="weather-wrapper detail-card" key={index}>
                <div className="card">
                  <img src={`${ICON_API_URL}/${item.icon}@2x.png`} alt={`${item.icon}`} />
                  <p className="temperature">{item.temp}℃</p>
                  <p className="message">{item.description}</p>
                </div>
                <p className="message">{item.date}</p>
              </div>
            )
          })}</section> </section> : <section className="forecast-detail"><h1>{error}</h1></section>}
    </div>
  )
}