import React from 'react'

const Course =({course})=>{
    return(
      <>
        <Header header={course.name}></Header>
        <Content parts={course.parts}></Content>
        <Total parts={course.parts.map(e=>e.exercises)}></Total>
      </>
    )
  }
  
  const Header=({header})=>{
    return(
      <h1>{header}</h1>
    )
  }
  
  const Part=({part, exercises})=>{
    return(
      <p>
        {part} {exercises}
      </p>
    )
  }
  const Content=({parts})=>{
    return(
      <>
        {parts.map(e=><Part key={e.id} part={e.name} exercises={e.exercises}></Part>)}
      </>
    )
  }
  
  const Total=({parts})=>{
    const Total = parts.reduce((a,b)=>a+b,0)
    return(
      <p>Number of exercises {Total}</p>
    )
  }

  export default Course
  