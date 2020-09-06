import React from 'react';
import { forecasts } from '../../data'

export default function Home() {
  return (
    <div>
      <h1>Weather Forecast</h1>
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