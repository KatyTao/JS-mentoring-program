import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { forecasts } from '../../data';
import config from '../../config'

export default function Cities(props) {
  const [weather, setWeather] = useState([])
  const { city } = useParams();
  const { BACKEND_URL, ICON_API_URL } = config;
  useEffect(() => {
    fetch(`${BACKEND_URL}/weather/${city}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'Application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setWeather({...response.weather[0],...response.main})
        console.log(response)
      })
  }, [])
  console.log(weather)
  return (
    <section className="forecast-detail">
      <h1>{city}</h1>
      <section className="detail-list">
        <div className="card detail-card">
          <img src={`${ICON_API_URL}/${weather.icon}@2x.png`} />
          <p className="temperature">{weather.temp}℃</p>
          <p className="message">{weather.description}</p>
        </div>
      </section>
    </section>

  )
}