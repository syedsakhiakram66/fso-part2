import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");


  
  function handleNumberChange(event) {
    setNewNumber(event.target.value);
  }

  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  function addNameAndNumber(event) {
    event.preventDefault();

    const name = newName.trim();

    if (!name) return;
    const exists = persons.some(
      (person) => person?.name?.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      alert(`${name} is already added to phonebook`);
      return;
    }

 axios.post('http://localhost:3001/persons', { name, number: newNumber })
    .then(res => {
      const returned = res.data
      if (!returned || typeof returned.name !== 'string') {
        console.warn('POST returned unexpected data:', returned)
        return
      }
      setPersons(prev => prev.concat(returned)) 

      setNewName('')
      setNewNumber('')
    })
    .catch(err => console.error('create failed', err))
  }

  const normalizedFilter = filter.trim().toLowerCase()
  const shownPeople = persons.filter((person) =>
    person && typeof person.name === 'string' && person.name.toLowerCase().includes(normalizedFilter)
  );
  
  useEffect(() => {
  axios.get('http://localhost:3001/persons')
    .then(res => {
      const data = res.data
      if (!Array.isArray(data)) {
        console.warn('GET /persons returned non-array:', data)
        setPersons([])
        return
      }
      const valid = data.filter(p => p && typeof p.name === 'string')
      setPersons(valid)
    })
    .catch(err => console.error('fetch failed', err))
}, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addNameAndNumber={addNameAndNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={shownPeople} />
    </div>
  );
};

export default App;
