import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country=({country})=>{
    const [temperature, setTemperature]=useState('')
    const [weatherIcon, setWeatherIcon]=useState('')
    const [wind, setWind]=useState('')
    const [windDir, setWindDir]=useState('')
    const api_key = process.env.REACT_APP_API_KEY
  
    useEffect(()=>{
      axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
        .then(response=>{
          setTemperature(response.data.current.temperature)
          setWeatherIcon(response.data.current.weather_icons[0])
          setWind(response.data.current.wind_speed)
          setWindDir(response.data.current.wind_dir)
        })
    },[])
  
    return(
      <>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Spoken Languages:</h3>
        <ul>
          {Object.values(country.languages).map((e,i)=><li key={i}>{e}</li>)}
        </ul>
        <img src={`${country.flags}`} alt={`Bandera de ${country.name}`} width="120px"></img>
        <h3>Weather in {country.capital}</h3>
        <p><strong>Temperature: </strong>{temperature} celcius</p>
        <img src={`${weatherIcon}`} alt={`Logo de clima`} width="120px"></img>
        <p><strong>Wind: </strong>{wind} mph direction {windDir}</p>
      </>
    )
  }

  export default Country