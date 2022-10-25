import React, { useState, useEffect } from 'react'
import contactService from './services/phonebook'
import Notification from './components/notification'
import Persons from './components/persons'
import PersonForm from './components/personForm'
import Filter from './components/filter'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [message, setMessage] = useState({message:'',success:true})

  useEffect(()=>{
    contactService
      .getAll()
      .then(initialContacts=>{
        setPersons(initialContacts)
      })
  },[])

  const handleNameChange=(event)=>setNewName(event.target.value)

  const handleNumberChange=(event)=>setNewNumber(event.target.value)

  const handleFilterChange=(event)=>setNewFilter(event.target.value)

  const showMessage=(messageObject)=>{
    setMessage(
      messageObject
    )
    setTimeout(() => {
      setMessage({...message,message:''})
    }, 5000)
  }

  const resetInputs=()=>{
    setNewName('')
    setNewNumber('')
  }

  const addName=(event)=>{
    event.preventDefault()

    const contactObject = {
      name:newName,
      number:newNumber
    }
  
    if(persons.find(e=>e.name===newName)){ 
      if(window.confirm(`${newName} is already added to phonebook, replace the old number whit a new one?`)){
          const personToUpdate = persons.filter(e=>e.name===newName)[0]
          contactService
            .update(personToUpdate.id,contactObject)
            .then(()=>{
              setPersons(persons.map(e=>e.id===personToUpdate.id ?{...e,number:newNumber} :e))
              resetInputs()
              showMessage({message:`${newName} was updated sucessfully`,success:true})
            })
            .catch(error=>{
              showMessage({message:`Error '${newName}' is already removed from your contacts`,success:false})
              setPersons(persons.filter(n => n.id !== personToUpdate.id))
            })
      }
      return
    }

    if(persons.find(e=>e.number===newNumber)){ 
      alert(`${newNumber} is already added to a phonebook contact`)
      return
    }

    contactService
          .create(contactObject)
          .then(()=>{
            setPersons(persons.concat({...contactObject,id:((persons[persons.length-1].id)+1)}))
            resetInputs()
            showMessage({message:`'${newName}' was added to your contacts`,success:true})
          })
  }

  const deleteContact=(e)=>{
    if(window.confirm(`Delete ${e.name}`)){
        contactService
          .erase(e.id)
          .then(()=>{
            setPersons(persons.filter(p=>p.id!==e.id ))
            showMessage({message:`Error '${newName}' is already removed from your contacts`,success:false})
          })
          .catch(error=>{
              showMessage({message:`Error '${newName}' is already removed from your contacts`,success:false})
              setPersons(persons.filter(p=>p.id!==e.id ))
            }
          )
    }
  }

  const PersonsToShow=persons.filter(e=>e.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.message} success={message.success}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}></Filter>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} ></PersonForm>
      <h2>Numbers</h2>
      <Persons PersonsToShow={PersonsToShow} deleteContact={deleteContact}></Persons>
    </div>
  )
}

export default App
