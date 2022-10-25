import React, { useState, useEffect } from 'react'
import Country from './country'

const Result =({countriesToShow})=>{
    const [view, setView] = useState('')
  
    if(countriesToShow.length>10){
      return(
        <><br></br>Too many matches, specify another filter</>
      )
    }
    if(countriesToShow.length<10 && view!==''){
      return(
        <>
          <ul>
            {countriesToShow.map((e,i)=><li key={i}>{e.name}<button type="button" onClick={()=>{setView(e.name)}}>Show</button></li>)}
          </ul>
          <Country country={countriesToShow.filter(e=>e.name===view)[0]}></Country>
        </>
      )
    }
    if(countriesToShow.length===1){
      return(
        <Country country={countriesToShow[0]}></Country>
      )
    }
    if(countriesToShow.length<10){
      return(
        <>
          <ul>
            {countriesToShow.map((e,i)=><li key={i}>{e.name}<button type="button" onClick={()=>{setView(e.name)}}>Show</button></li>)}
          </ul>
        </>
      )
    }
  }

  export default Result