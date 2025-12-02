import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from './components/services/persons';

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

    const personObject = { name, number: newNumber }

    personService 
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
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
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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
      <Persons persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;