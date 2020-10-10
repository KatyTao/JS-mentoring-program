import React, {useState} from 'react';
import './style.css';
import { forecasts } from '../../data'

export default function Home() {
  const [city, setCity] = useState('')
  return (
    <div>
      <h1>Weather Forecast</h1>
      <div className="search-container">
        <input className="city-search" type="text" onChange={event => setCity(event.target.value)}/>
        <a href={`/cities/${city}`}>Search</a>
      </div>
      <section className="forecast-list">
        {forecasts.map((item, index) => {
          return (
            <a className="card" href={`/cities/${item.city}`} key={index}>
              <div className="location">
                <p>{item.city}</p>
                <p>{item.location}</p>
              </div>
              <p className="temperature">{item.weather[0].temp}℃</p>
              <img src={`/images/${item.weather[0].icon}.png`} alt="item.weather[0].icon" />
            </a>
          )
        })}
      </section>
    </div>
  )
}