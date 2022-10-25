const Persons = ({PersonsToShow,deleteContact}) =>{
    return(
      <ul>{PersonsToShow.map((e,i)=><li key={i}><span>{`${e.name}:${e.number}`} </span><button onClick={()=>deleteContact(e)}>Delete</button></li>)}</ul>
    )
} 
export default Persons