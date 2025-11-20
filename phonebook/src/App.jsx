import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ 
    name: "Arto Hellas", 
    number: "040-123456"
  }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  function handleNumberChange(event) {
    setNewNumber(event.target.value);
  }

  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  function addNameAndNumber(event) {
    event.preventDefault();
    
      const name = newName.trim();

      if (!name) return;
      const exists = persons.some(
        person => person.name.toLowerCase() == name.toLowerCase()
      )

      if (exists) {
        alert(`${name} is already added to phonebook`);
        return;
      }

      setPersons([...persons, { name, number: newNumber }]);
      setNewNumber("");
      setNewName("");
    
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNameAndNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br />
          number : <input value={newNumber} onChange={handleNumberChange} required/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person, index) => (
          <p key={index}>{person.name} {person.number}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
