import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {

 const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
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
        person => person.name.toLowerCase() === name.toLowerCase()
      )

      if (exists) {
        alert(`${name} is already added to phonebook`);
        return;
      }

      setPersons([...persons, { name, number: newNumber }]);
      setNewNumber("");
      setNewName("");
    
  }

  const shownPeople = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  );


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
