import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from './components/searchbar'
import Result from './components/result'



const App=()=>{
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data.map(({name, capital, population, languages, flags})=>({name: name.common,capital,population,languages, flags: flags.svg})))
      })
  }, [])

  const countriesToShow=countries.filter(e=>e.name.toLowerCase().startsWith(newFilter.toLowerCase()))

  const handleFilterChange=(e)=>{
    setNewFilter(e.target.value)
  }

  return(
    <>
      <SearchBar newFilter={newFilter} onChange={handleFilterChange}></SearchBar>
      <Result countriesToShow={countriesToShow}></Result>
    </>
  )
}

export default App