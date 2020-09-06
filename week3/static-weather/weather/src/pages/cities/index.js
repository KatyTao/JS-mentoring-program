import React from 'react';
import { useParams } from 'react-router-dom';
import { forecasts } from '../../data';

export default function Cities(props) {
  const { city } = useParams();
  const { weather } = forecasts[forecasts.findIndex(item => item.city === city)]

  return (
    <section className="forecast-detail">
      <h1>{city}</h1>
      <section className="detail-list">
        {weather.map((item, index) => {
          return (
            <div className="card detail-card" key={index}>
              <img src={`/images/${item.icon}.png`} alt={`${item.icon}`} />
              <p className="temperature">{item.temp}℃</p>
              <p className="message">{item.message}</p>
            </div>
          )
        })}
      </section>
    </section>

  )
}